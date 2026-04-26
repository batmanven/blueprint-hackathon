/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import {
  CheckCircle2, ArrowLeft, Sparkles,
  PieChart, ShieldAlert, ArrowUpRight, TrendingDown,
  Activity, Wallet, Landmark
} from 'lucide-react';
import { CountUp } from '@/components/ui/CountUp';

const ExpenseResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { results, mode } = (location.state as { results: any; formData: any; mode?: string }) || {};
  const isEmergencyMode = mode === 'emergency';

  useEffect(() => {
    if (!results) {
      navigate('/expenses', { replace: true });
    }
  }, [results]);

  if (!results) return null;

  return (
    <div className="bg-[#faf9f6] min-h-screen py-32">
      <div className="max-w-5xl mx-auto px-6 space-y-16">

        {/* Back */}
        <motion.button
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/expenses')}
          className="flex items-center gap-2 text-[13px] font-bold text-black/40 uppercase tracking-[0.2em] hover:text-off-black transition-colors group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Simulation
        </motion.button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-fin rounded-xl flex items-center justify-center shadow-md">
              <Activity className="h-5 w-5 text-white" />
            </div>
            <p className="font-saans-mono text-[11px] font-bold text-fin uppercase tracking-[0.25em]">
              {isEmergencyMode ? 'Emergency Fund Calculator' : 'Simulation Complete · Actuarial Confirmed'}
            </p>
          </div>
          <h1 className="text-[54px] md:text-[72px] font-normal leading-[1.0] tracking-[-0.04em] text-off-black">
            {isEmergencyMode ? 'Healthcare Shield Target' : 'Financial Forecast'}
          </h1>
          <p className="text-[18px] text-black/40 max-w-xl font-normal">
            Based on your medical history and local inflation indices, here is your 12-month healthcare capital requirement.
          </p>
        </motion.div>

        {/* Key Metrics Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white border border-oat rounded-[24px] p-10 space-y-6 shadow-sm"
          >
            <div className="h-12 w-12 bg-fin/5 rounded-xl flex items-center justify-center">
              <Wallet className="h-6 w-6 text-fin" />
            </div>
            <div className="space-y-2">
              <p className="font-saans-mono text-[11px] font-bold text-black/30 uppercase tracking-[0.2em]">
                {isEmergencyMode ? 'Recommended Shield' : 'Annual Burn Rate'}
              </p>
              <div className="text-[48px] font-normal text-off-black tracking-tighter leading-none">
                <CountUp end={results.recommendedFund || results.estimatedAnnualCost} prefix="₹" />
              </div>
            </div>
            <p className="text-[14px] text-black/40 leading-relaxed">
              {isEmergencyMode ? 'Your healthcare financial safety net target' : 'Projected recurring cost for medicines & consultations.'}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-off-black text-white rounded-[24px] p-10 space-y-6 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <ShieldAlert size={80} className="text-fin" />
            </div>
            <div className="h-12 w-12 bg-fin rounded-xl flex items-center justify-center relative z-10">
              <Landmark className="h-6 w-6 text-white" />
            </div>
            <div className="space-y-2 relative z-10">
              <p className="font-saans-mono text-[11px] font-bold text-white/40 uppercase tracking-[0.2em]">Monthly Savings</p>
              <div className="text-[48px] font-normal text-fin tracking-tighter leading-none">
                <CountUp end={results.monthlySavings || 0} prefix="₹" />
              </div>
            </div>
            <p className="text-white/60 text-[14px] leading-relaxed relative z-10 italic">
              {isEmergencyMode ? 'Amount to save monthly for 3 years' : 'Recommended liquid reserve for critical health events.'}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white border border-oat rounded-[24px] p-10 space-y-6 shadow-sm"
          >
            <div className="h-12 w-12 bg-[#faf9f6] rounded-xl flex items-center justify-center">
              <TrendingDown className={`h-6 w-6 ${results.riskLevel === 'High' ? 'text-fin' : 'text-off-black'}`} />
            </div>
            <div className="space-y-2">
              <p className="font-saans-mono text-[11px] font-bold text-black/30 uppercase tracking-[0.2em]">Risk Score</p>
              <div className={`text-[48px] font-normal tracking-tighter leading-none ${results.riskLevel === 'High' ? 'text-fin' : 'text-off-black'}`}>
                {results.riskScore || results.riskLevel}
              </div>
            </div>
            <p className="text-[14px] text-black/40 leading-relaxed">Health risk probability based on your profile.</p>
          </motion.div>
        </div>

        {/* Detailed Breakdown */}
        <div className="grid md:grid-cols-3 gap-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="md:col-span-2 bg-white border border-oat rounded-[24px] p-12 space-y-12"
          >
            <div className="flex items-center justify-between border-b border-oat pb-8">
              <h3 className="text-[32px] font-normal tracking-tight text-off-black flex items-center gap-4">
                <PieChart className="h-8 w-8 text-fin" /> Capital Allocation
              </h3>
            </div>
            <div className="space-y-10">
              {results.costBreakdown.map((item: any, i: number) => (
                <div key={i} className="flex justify-between items-start gap-10 group">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-4">
                      <div className="h-4 w-4 rounded-full shadow-sm" style={{ backgroundColor: item.color }} />
                      <h4 className="text-[22px] font-normal text-off-black group-hover:text-fin transition-colors leading-none">{item.category}</h4>
                    </div>
                    <p className="text-[16px] text-black/50 leading-relaxed font-normal pl-8">{item.explanation}</p>
                  </div>
                  <div className="text-[22px] font-saans-mono font-bold text-off-black shrink-0 tracking-tight">₹{item.amount.toLocaleString()}</div>
                </div>
              ))}
            </div>
            <div className="pt-10 border-t border-oat flex justify-between items-center">
              <span className="text-[20px] font-bold text-off-black uppercase tracking-widest">Total Forecast</span>
              <span className="text-[42px] font-normal text-off-black tracking-tighter">₹{results.estimatedAnnualCost.toLocaleString()}</span>
            </div>
          </motion.div>

          {/* AI Recommendation Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-8"
          >
            <div className="bg-fin text-white rounded-[24px] p-10 space-y-8 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none group-hover:rotate-12 transition-transform duration-700">
                <Sparkles size={100} />
              </div>
              <h3 className="font-saans-mono text-[12px] font-bold text-white/60 uppercase tracking-widest flex items-center gap-3 relative z-10">
                <Sparkles className="h-5 w-5 text-white" /> AI Recommendation
              </h3>
              <p className="text-[20px] text-white leading-relaxed font-normal italic relative z-10">"{results.planningAdvice}"</p>
              <button className="w-full bg-white text-fin font-bold h-16 rounded-xl uppercase tracking-widest text-[14px] hover:bg-[#faf9f6] transition-all relative z-10 active:scale-95 shadow-lg">
                Optimize My Shield
              </button>
            </div>

            <div className="bg-white border border-oat rounded-[24px] p-10 space-y-8 shadow-sm">
              <h4 className="font-saans-mono text-[12px] font-bold text-off-black uppercase tracking-widest flex items-center gap-2">
                <ShieldAlert size={16} /> Data Integrity
              </h4>
              <div className="space-y-5">
                {[
                  "95th percentile local hospital inflation",
                  "Age-adjusted chronic progression risk",
                  "Generic drug substitution enabled"
                ].map((t, i) => (
                  <div key={i} className="flex items-start gap-4 text-[15px] text-black/50 font-normal leading-snug">
                    <div className="h-5 w-5 bg-fin/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="h-3 w-3 text-fin" />
                    </div>
                    {t}
                  </div>
                ))}
              </div>
              <button className="w-full h-14 border border-oat rounded-xl text-[12px] font-bold text-black/30 uppercase tracking-widest hover:text-off-black hover:border-off-black transition-all">
                Actuarial Source Data <ArrowUpRight className="inline ml-1 h-3 w-3" />
              </button>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default ExpenseResultPage;
