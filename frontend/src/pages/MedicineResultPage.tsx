/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { CountUp } from '@/components/ui/CountUp';
import {
  Pill, Sparkles, TrendingDown, Database, Info, ExternalLink,
  ShieldCheck, ArrowLeft, CheckCircle2
} from 'lucide-react';

const MedicineResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { results } = (location.state as { results: any[]; query: string }) || {};

  // Guard: if no data, go back
  useEffect(() => {
    if (!results || results.length === 0) {
      navigate('/medicines', { replace: true });
    }
  }, [results]);

  if (!results || results.length === 0) return null;

  const med = results[0];
  const generic = med.genericAlternative;

  return (
    <div className="bg-[#faf9f6] min-h-screen py-32">
      <div className="max-w-5xl mx-auto px-6 space-y-16">

        {/* Back */}
        <motion.button
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/medicines')}
          className="flex items-center gap-2 text-[13px] font-bold text-black/40 uppercase tracking-[0.2em] hover:text-off-black transition-colors group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Search
        </motion.button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-fin rounded-xl flex items-center justify-center shadow-md">
              <CheckCircle2 className="h-5 w-5 text-white" />
            </div>
            <p className="font-saans-mono text-[11px] font-bold text-fin uppercase tracking-[0.25em]">
              Analysis Complete · PMBJP Verified
            </p>
          </div>
          <h1 className="text-[54px] md:text-[72px] font-normal leading-[1.0] tracking-[-0.04em] text-off-black">
            {med.brandName}
          </h1>
          <p className="text-[18px] text-black/40 max-w-xl">
            {med.genericName} · {med.dosage} · {med.category}
          </p>
        </motion.div>

        {/* Big Comparison Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white border border-oat rounded-[20px] overflow-hidden shadow-sm"
        >
          <div className="grid md:grid-cols-2">

            {/* Left: Branded */}
            <div className="p-12 border-r border-oat bg-[#faf9f6] space-y-10">
              <div className="flex items-start gap-5">
                <div className="h-14 w-14 rounded-[10px] bg-white border border-oat flex items-center justify-center shrink-0">
                  <Pill className="h-7 w-7 text-black/20" />
                </div>
                <div>
                  <h2 className="text-[26px] font-normal text-off-black">{med.brandName}</h2>
                  <p className="text-[14px] text-black/40 mt-1">{med.salt}</p>
                </div>
              </div>
              <div className="space-y-2">
                <p className="font-saans-mono text-[10px] font-bold text-black/25 uppercase tracking-[0.25em]">
                  Standard Market Price
                </p>
                <p className="text-[48px] font-normal text-black/20 line-through tracking-tighter leading-none">
                  ₹{med.brandedPrice}
                </p>
                <p className="text-[13px] text-black/30">per strip / unit dose</p>
              </div>
            </div>

            {/* Right: Generic */}
            <div className="p-12 bg-white space-y-10 relative overflow-hidden">
              <div className="absolute top-6 right-6">
                <div className="bg-fin text-white text-[12px] font-bold px-4 py-2 rounded-[8px] uppercase tracking-widest shadow-lg shadow-fin/20">
                  {generic?.savingsPercent}% Less
                </div>
              </div>
              <div className="flex items-start gap-5">
                <div className="h-14 w-14 rounded-[10px] bg-fin flex items-center justify-center shrink-0 shadow-lg shadow-fin/25">
                  <Sparkles className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h2 className="text-[26px] font-normal text-off-black">PMBJP Generic</h2>
                  <p className="font-saans-mono text-[11px] font-bold text-fin uppercase tracking-widest mt-1">
                    Jan Aushadhi Certified
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <p className="font-saans-mono text-[10px] font-bold text-fin/60 uppercase tracking-[0.25em]">
                  Aarogya Price Unit
                </p>
                <p className="text-[72px] font-normal text-fin tracking-tighter leading-none">
                  <CountUp end={generic?.janAushadhiPrice} prefix="₹" />
                </p>
                <p className="text-[13px] text-black/30">per strip · same efficacy</p>
              </div>
            </div>
          </div>

          {/* Savings Bar */}
          <div className="px-12 py-8 bg-fin/5 border-t border-fin/15 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <TrendingDown className="h-6 w-6 text-fin" />
              <div>
                <p className="text-[22px] font-semibold text-off-black">
                  You save ₹{(med.brandedPrice - generic?.janAushadhiPrice).toFixed(0)} per strip
                </p>
                <p className="text-[13px] text-black/40">Same salt, same efficacy, same NABL-certified quality</p>
              </div>
            </div>
            <div className="text-[13px] font-bold text-fin uppercase tracking-widest bg-fin/10 px-6 py-3 rounded-[10px]">
              Annual savings ≈ ₹{((med.brandedPrice - generic?.janAushadhiPrice) * 12).toFixed(0)}
            </div>
          </div>
        </motion.div>

        {/* Facts Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-3 gap-6"
        >
          {[
            { label: 'Salt Composition', value: med.salt, icon: <ShieldCheck className="h-5 w-5 text-fin" /> },
            { label: 'Therapeutic Category', value: med.category, icon: <Pill className="h-5 w-5 text-fin" /> },
            { label: 'Dosage Strength', value: med.dosage, icon: <Database className="h-5 w-5 text-fin" /> },
          ].map((fact, i) => (
            <div key={i} className="bg-white border border-oat rounded-[16px] p-8 space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 bg-fin/10 rounded-[8px] flex items-center justify-center">
                  {fact.icon}
                </div>
                <p className="font-saans-mono text-[10px] font-bold text-black/30 uppercase tracking-[0.2em]">{fact.label}</p>
              </div>
              <p className="text-[20px] font-medium text-off-black leading-tight">{fact.value}</p>
            </div>
          ))}
        </motion.div>

        {/* Nearby Kendras */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-8"
        >
          <div className="flex items-center gap-4 pb-6 border-b border-oat">
            <div className="h-12 w-12 bg-white border border-oat rounded-[10px] flex items-center justify-center">
              <Database className="h-6 w-6 text-fin" />
            </div>
            <div>
              <h3 className="text-[28px] font-normal tracking-tight text-off-black">Nearby Jan Aushadhi Kendras</h3>
              <p className="text-[14px] text-black/40">10,000+ stores nationwide stocking {generic?.genericName}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'PMBJP Kendra #10842', area: 'Indiranagar, Sector 12', dist: '1.2 km away', contact: '080-25421001' },
              { name: 'PMBJP Kendra #11953', area: 'Koramangala, 5th Block', dist: '2.8 km away', contact: '080-25422002' },
              { name: 'PMBJP Kendra #12104', area: 'HSR Layout, Sector 2', dist: '4.5 km away', contact: '080-25423003' },
            ].map((store, i) => (
              <div key={i} className="bg-white border border-oat rounded-[16px] p-8 space-y-5 hover:shadow-md transition-shadow group">
                <div>
                  <p className="text-[17px] font-semibold text-off-black">{store.name}</p>
                  <p className="text-[14px] text-black/40 mt-1">{store.area}</p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-oat">
                  <p className="font-saans-mono text-[11px] font-bold text-fin uppercase tracking-widest">{store.dist}</p>
                  <button className="h-9 w-9 bg-[#faf9f6] border border-oat rounded-[8px] flex items-center justify-center hover:bg-fin hover:text-white hover:border-fin transition-all group-hover:border-fin/50">
                    <ExternalLink className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full h-16 border border-dashed border-oat rounded-[12px] text-[13px] font-bold text-black/30 uppercase tracking-[0.3em] hover:border-fin hover:text-fin transition-colors">
            View all 18,646 stores nationwide
          </button>
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-start gap-3 text-[13px] text-black/30 italic border-t border-oat pt-8"
        >
          <Info className="h-4 w-4 mt-0.5 shrink-0" />
          <p>Pharmaceutical bio-equivalence confirmed. All Jan Aushadhi generics are tested at NABL-accredited laboratories and approved by CDSCO before retail.</p>
        </motion.div>

      </div>
    </div>
  );
};

export default MedicineResultPage;
