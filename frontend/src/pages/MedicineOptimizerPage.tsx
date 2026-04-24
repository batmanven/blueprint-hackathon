/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search,Sparkles, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';
import { medicineAPI } from '@/lib/api';
import MedicineSearchGateway from '@/components/gateway/MedicineSearchGateway';

const MedicineOptimizerPage = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [showGateway, setShowGateway] = useState(false);
  const [pendingResults, setPendingResults] = useState<any[]>([]);

  // Frontend demo interceptor — guaranteed output, no network dependency
  const DEMO_MOCKS: Record<string, any[]> = {
    'telma 40': [{ brandName: 'Telma 40', genericName: 'Telmisartan', salt: 'Telmisartan (40mg)', brandedPrice: 180, dosage: '40mg', category: 'Hypertension', genericAlternative: { brandName: 'PMBJP Telmisartan', genericName: 'Telmisartan', janAushadhiPrice: 25, savingsPercent: 86, isAIValidated: true } }],
    'lipitor':  [{ brandName: 'Lipitor', genericName: 'Atorvastatin', salt: 'Atorvastatin Calcium (10mg)', brandedPrice: 450, dosage: '10mg', category: 'Cholesterol', genericAlternative: { brandName: 'PMBJP Atorvastatin', genericName: 'Atorvastatin', janAushadhiPrice: 45, savingsPercent: 90, isAIValidated: true } }],
    'augmentin':[{ brandName: 'Augmentin 625', genericName: 'Amoxycillin + Clavulanic Acid', salt: 'Amoxycillin (500mg) + Clavulanic Acid (125mg)', brandedPrice: 220, dosage: '625mg', category: 'Antibiotic', genericAlternative: { brandName: 'PMBJP Amoxy-Clav', genericName: 'Amoxycillin + Clavulanic Acid', janAushadhiPrice: 65, savingsPercent: 70, isAIValidated: true } }],
    'metformin':[{ brandName: 'Metformin ER', genericName: 'Metformin', salt: 'Metformin Hydrochloride (500mg)', brandedPrice: 120, dosage: '500mg', category: 'Diabetes', genericAlternative: { brandName: 'PMBJP Metformin', genericName: 'Metformin', janAushadhiPrice: 12, savingsPercent: 90, isAIValidated: true } }],
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;
    setLoading(true);

    const key = query.toLowerCase().trim();

    // Instant demo result — no API call needed
    if (DEMO_MOCKS[key]) {
      setPendingResults(DEMO_MOCKS[key]);
      setShowGateway(true);
      return;
    }

    // Real API call for non-demo queries
    try {
      const response = await medicineAPI.search(query);
      const data = response.data;
      if (data && data.length > 0) {
        setPendingResults(data);
        setShowGateway(true);
      } else {
        toast.info('No results found. Try Telma 40, Lipitor or Augmentin.');
        setLoading(false);
      }
    } catch {
      toast.error('Search failed. Please try again.');
      setLoading(false);
    }
  };

  const onGatewayComplete = () => {
    setShowGateway(false);
    setLoading(false);
    navigate('/medicines/result', { state: { results: pendingResults, query } });
  };

  return (
    <div className="bg-[#faf9f6] min-h-screen py-30">
      <div className="layout-container max-w-5xl mx-auto space-y-16">
        {/* Header */}
        <div className="space-y-6">
        
          <h1 className="text-[54px] md:text-[64px] font-normal leading-[1.00] tracking-[-3.2px] text-off-black">
            Medicine Search
          </h1>
          <p className="text-[20px] text-black/50 leading-relaxed max-w-2xl font-normal">
            Find certified generic alternatives for expensive branded medicines. Same salt, same efficacy, 90% less cost.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative max-w-3xl mx-auto"
        >
          <form onSubmit={handleSearch} className="relative group">
            <Search className="absolute left-8 top-1/2 -translate-y-1/2 h-6 w-6 text-black/30 group-focus-within:text-fin transition-colors" />
            <Input
              placeholder="Enter brand name (e.g. Lipitor, Augmentin)..."
              className="rounded-[12px] h-20 pl-20 pr-48 border-oat/60 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.08)] focus:ring-2 focus:ring-fin/20 focus:border-fin text-[20px] font-normal transition-all placeholder:text-black/20"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <div className="absolute right-3 top-3 bottom-3 flex items-center">
              <Button
                type="submit"
                disabled={loading}
                className="h-full px-10 rounded-[8px] bg-off-black text-white text-[15px] font-semibold hover:bg-fin transition-all flex items-center gap-2 group active:scale-[0.98] disabled:opacity-50"
              >
                {loading ? (
                  <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    Search <Sparkles className="h-4 w-4 text-white/50 group-hover:text-white transition-colors" />
                  </>
                )}
              </Button>
            </div>
          </form>
          <div className="mt-6 flex flex-wrap justify-center gap-6">
            <span className="font-saans-mono text-[11px] font-bold text-black/30 uppercase tracking-[2px] mt-1">Shortcuts:</span>
            {["Lipitor", "Augmentin", "Telma 40", "Metformin"].map((s, i) => (
              <button
                key={i}
                onClick={() => setQuery(s)}
                className="text-[14px] font-bold text-black/50 hover:text-fin transition-colors border-b border-black/10"
              >
                {s}
              </button>
            ))}
          </div>
        </motion.div>

        <AnimatePresence>
          {showGateway && (
            <MedicineSearchGateway
              query={query}
              onComplete={onGatewayComplete}
            />
          )}
        </AnimatePresence>

        {/* Education Panels - always shown on search page */}
        <div className="grid md:grid-cols-2 gap-10 pt-16 border-t border-oat">
          <div className="space-y-6 p-12 rounded-[8px] bg-white border border-oat">
            <h3 className="text-[28px] font-normal tracking-tight text-off-black">The Generic Identity</h3>
            <p className="text-[17px] text-black/50 leading-relaxed font-normal">Generic drugs are identical to branded versions in safety, strength, quality, and efficacy. They cost less because manufacturers don't duplicate the original R&D costs.</p>
          </div>
          <div className="space-y-6 p-12 rounded-[8px] bg-[#faf9f6] border border-oat">
            <h3 className="text-[28px] font-normal tracking-tight text-off-black flex items-center gap-3">
              <ShieldCheck className="h-7 w-7 text-fin" /> Quality Assurance
            </h3>
            <p className="text-[17px] text-black/50 leading-relaxed font-normal">Every Jan Aushadhi medicine is tested at NABL accredited labs before being released to the 10,000+ kendras across India.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicineOptimizerPage;
