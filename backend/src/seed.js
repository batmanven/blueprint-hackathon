import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import Scheme from './models/Scheme.js';
import Medicine from './models/Medicine.js';
import DiseaseCost from './models/DiseaseCost.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected for Seeding...');

    // Seed Schemes
    const schemesData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data/schemes.json'), 'utf-8'));
    await Scheme.deleteMany({});
    await Scheme.insertMany(schemesData);
    console.log('✅ Schemes Seeded Successfully');

    // Seed Medicines
    const medicinesData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data/medicines.json'), 'utf-8'));
    await Medicine.deleteMany({});
    await Medicine.insertMany(medicinesData);
    console.log('✅ Medicines Seeded Successfully');

    // Seed Disease Costs
    const diseaseCostsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data/disease-costs.json'), 'utf-8'));
    // We'll store these in a separate collection or as a utility
    // For now, let's just log or create a simple model if needed
    // Assuming DiseaseCost model exists (I'll create it next)
    await DiseaseCost.deleteMany({});
    const formattedDiseaseCosts = Object.entries(diseaseCostsData).map(([key, value]) => ({
      conditionId: key,
      ...value
    }));
    await DiseaseCost.insertMany(formattedDiseaseCosts);
    console.log('✅ Disease Costs Seeded Successfully');

    console.log('All Data Seeded! Press Ctrl+C to exit.');
    process.exit();
  } catch (error) {
    console.error('❌ Seeding Failed: ', error);
    process.exit(1);
  }
};

seedDatabase();
