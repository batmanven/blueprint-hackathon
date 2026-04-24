import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Search, ShieldCheck, Zap, Loader2, CheckCircle2, FileSearch, UserCheck, Scale, Award } from 'lucide-react';

interface SchemeMatchGatewayProps {
  onComplete: () => void;
}

const SchemeMatchGateway = ({ onComplete }: SchemeMatchGatewayProps) => {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  const steps = [
    { icon: <UserCheck size={18} />, label: 'Profile Analysis', text: 'Analyzing ABHA Health records & demographics...', duration: 1000 },
    { icon: <Scale size={18} />, label: 'Policy Benchmarking', text: 'Cross-referencing 450+ Central & State policies...', duration: 1400 },
    { icon: <Search size={18} />, label: 'Eligibility Engine', text: 'Validating income & category-based criteria...', duration: 1100 },
    { icon: <Award size={18} />, label: 'Coverage Optimization', text: 'Identifying maximum benefit combinations...', duration: 800 },
  ];

  useEffect(() => {
    if (step < steps.length) {
      const t = setTimeout(() => setStep(p => p + 1), steps[step].duration);
      return () => clearTimeout(t);
    } else {
      setDone(true);
      const t = setTimeout(onComplete, 700);
      return () => clearTimeout(t);
    }
  }, [step]);

  return (
    <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-4 sm:p-0">
      <motion.div
        className="absolute inset-0 bg-off-black/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      <motion.div
        className="relative w-full sm:max-w-[560px] bg-white rounded-[28px] shadow-[0_40px_100px_rgba(0,0,0,0.25)] overflow-hidden border border-oat/50 mx-4"
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.95 }}
        transition={{ type: 'spring', damping: 28, stiffness: 300 }}
      >
        <div className="px-10 pt-10 pb-8 flex flex-col items-center gap-5 text-center">
          <div className="relative">
            <div className="h-20 w-20 bg-fin/10 rounded-3xl flex items-center justify-center">
              <motion.div
                className="absolute inset-0 rounded-3xl bg-fin/20"
                animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              />
              <Scale className="h-9 w-9 text-fin relative z-10" />
            </div>
          </div>
          <div>
            <h2 className="text-[22px] font-semibold text-off-black">Scheme Intelligence</h2>
            <p className="text-[13px] text-black/40 mt-1 font-medium">Policy Matching & Eligibility Engine · v2.4.0-PEAK</p>
          </div>
        </div>

        <div className="px-10 pb-8 space-y-3">
          {steps.map((s, i) => {
            const isActive = i === step && !done;
            const isDone = i < step || done;
            return (
              <motion.div
                key={i}
                animate={{ opacity: isDone ? 1 : isActive ? 1 : 0.25 }}
                transition={{ duration: 0.3 }}
                className={`flex items-center gap-4 p-4 rounded-2xl border transition-colors ${
                  isActive ? 'bg-fin/5 border-fin/25' : isDone ? 'bg-[#faf9f6] border-oat' : 'bg-transparent border-transparent'
                }`}
              >
                <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                  isDone ? 'bg-fin text-white' : isActive ? 'bg-fin/15 text-fin' : 'bg-black/5 text-black/25'
                }`}>
                  {isDone
                    ? <CheckCircle2 size={18} />
                    : isActive
                    ? <Loader2 size={18} className="animate-spin" />
                    : s.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-[11px] font-bold uppercase tracking-[0.18em] mb-0.5 ${isDone ? 'text-fin' : isActive ? 'text-fin/70' : 'text-black/20'}`}>
                    {s.label}
                  </p>
                  <p className={`text-[14px] font-medium truncate ${isActive ? 'text-off-black' : 'text-black/40'}`}>
                    {isDone ? '✓ Verified' : s.text}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="px-10 py-5 bg-[#faf9f6] border-t border-oat flex items-center justify-between">
          <div className="flex items-center gap-2">
            <motion.div
              className="h-2 w-2 rounded-full bg-fin"
              animate={{ opacity: done ? 1 : [1, 0.3, 1] }}
              transition={{ duration: 1.2, repeat: done ? 0 : Infinity }}
            />
            <span className="text-[11px] font-bold text-black/30 uppercase tracking-[0.2em]">
              {done ? 'Analysis Complete' : 'AI Matching Logic Active'}
            </span>
          </div>
          <span className="text-[11px] font-bold text-black/20 uppercase tracking-[0.18em]">DPI · GOV.IN</span>
        </div>
      </motion.div>
    </div>
  );
};

export default SchemeMatchGateway;
