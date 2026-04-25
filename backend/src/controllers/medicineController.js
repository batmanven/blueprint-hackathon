import Medicine from '../models/Medicine.js';
import { getStructuredAIResponse } from '../services/geminiService.js';

// @desc    Search for medicines and find generic alternatives
// @route   GET /api/medicines/search
export const searchMedicines = async (req, res, next) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.json([]);
    }

    const normalizedQuery = query.trim();
    
    // 1. Search Local Database using Text Search or partial match
    let medicines = await Medicine.find({
      $or: [
        { brandName: { $regex: normalizedQuery, $options: 'i' } },
        { genericName: { $regex: normalizedQuery, $options: 'i' } },
        { salt: { $regex: normalizedQuery, $options: 'i' } }
      ]
    }).limit(20);

    // 2. If no local matches, use AI to identify the medicine and find generic salt
    if (medicines.length === 0) {
      try {
        const globalSearchPrompt = `
          The user is searching for a medicine: "${normalizedQuery}".
          1. Identify the brand name.
          2. Find its primary generic salt/composition.
          3. Estimate the branded market price in India for a standard pack.
          4. Find the generic PMBJP (Jan Aushadhi) alternative and its price.
          5. Provide dosage information.
          
          Return JSON array with ONE object:
          [{
            "brandName": "Exact Brand Name",
            "genericName": "Generic Name",
            "salt": "Full Chemical Composition",
            "brandedPrice": number,
            "janAushadhiPrice": number,
            "dosage": "Standard Dosage",
            "category": "Therapeutic Category",
            "savingsPercent": number,
            "isAIValidated": true
          }]
        `;
        
        const aiResults = await getStructuredAIResponse(globalSearchPrompt, "You are a Global Pharmaceutical Intelligence Agent specializing in India's Jan Aushadhi network.");
        
        const formattedResults = aiResults.map(res => ({
          ...res,
          genericAlternative: {
            brandName: "PMBJP " + res.genericName,
            genericName: res.genericName,
            janAushadhiPrice: res.janAushadhiPrice,
            savingsPercent: res.savingsPercent,
            isAIValidated: true
          }
        }));
        
        return res.json(formattedResults);
      } catch (error) {
        console.error('AI Medicine Search Error:', error);
        return res.json([]);
      }
    }

    // 3. For each found medicine, ensure we have a generic alternative
    const results = await Promise.all(medicines.map(async (med) => {
      // If the medicine itself is a Jan Aushadhi generic (has janAushadhiPrice in our data)
      if (med.janAushadhiPrice && !med.brandedPrice) {
         return {
           ...med._doc,
           genericAlternative: med
         };
      }

      // If it's a branded medicine, find the generic version in our DB
      const genericVersion = await Medicine.findOne({
        $or: [
          { genericName: med.genericName, janAushadhiPrice: { $exists: true } },
          { salt: med.salt, janAushadhiPrice: { $exists: true } }
        ]
      });
      
      if (genericVersion) {
        return { ...med._doc, genericAlternative: genericVersion };
      }

      // If no generic in DB, use AI to find/estimate one
      try {
        const aiPrompt = `Find the generic PMBJP (Jan Aushadhi) alternative for ${med.brandName} (${med.genericName}). Estimate the PMBJP price for ${med.dosage}. Return JSON { genericName, salt, janAushadhiPrice, savingsPercent }.`;
        const aiSuggestion = await getStructuredAIResponse(aiPrompt, "You are a pharmaceutical bio-equivalence expert.");
        return {
          ...med._doc,
          genericAlternative: {
            ...aiSuggestion,
            brandName: "PMBJP Alternative",
            isAIValidated: true
          }
        };
      } catch {
        return med._doc;
      }
    }));

    res.json(results);
  } catch (error) {
    next(error);
  }
};

// @desc    Get top savings medicines
// @route   GET /api/medicines/top-savings
export const getTopSavings = async (req, res, next) => {
  try {
    const topMeds = await Medicine.find({ savingsPercent: { $exists: true } })
      .sort({ savingsPercent: -1 })
      .limit(10);
    res.json(topMeds);
  } catch (error) {
    next(error);
  }
};

// @desc    Seed some initial medicine data for demo
// @route   POST /api/medicines/seed
export const seedMedicines = async (req, res, next) => {
  try {
    const initialMeds = [
      {
        brandName: "Lipitor",
        genericName: "Atorvastatin",
        salt: "Atorvastatin Calcium",
        brandedPrice: 450,
        janAushadhiPrice: 45,
        dosage: "10mg",
        category: "Cholesterol",
        savingsPercent: 90
      },
      {
        brandName: "Augmentin 625",
        genericName: "Amoxycillin + Clavulanic Acid",
        salt: "Amoxycillin (500mg) + Clavulanic Acid (125mg)",
        brandedPrice: 220,
        janAushadhiPrice: 65,
        dosage: "625mg",
        category: "Antibiotic",
        savingsPercent: 70
      },
      {
        brandName: "Metformin ER",
        genericName: "Metformin",
        salt: "Metformin Hydrochloride",
        brandedPrice: 120,
        janAushadhiPrice: 12,
        dosage: "500mg",
        category: "Diabetes",
        savingsPercent: 90
      },
      {
        brandName: "Telma 40",
        genericName: "Telmisartan",
        salt: "Telmisartan",
        brandedPrice: 180,
        janAushadhiPrice: 25,
        dosage: "40mg",
        category: "Hypertension",
        savingsPercent: 86
      }
    ];

    await Medicine.deleteMany({});
    const meds = await Medicine.insertMany(initialMeds);
    res.status(201).json(meds);
  } catch (error) {
    next(error);
  }
};
