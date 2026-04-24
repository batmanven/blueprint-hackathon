import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { 
  CheckCircle2, ChevronRight, Info, Shield, ArrowLeft, 
  Sparkles, ExternalLink, Scale, UserCircle, MapPin, Wallet
} from 'lucide-react';

const SchemeResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { results, formData } = (location.state as { results: any; formData: any }) || {};

  useEffect(() => {
    if (!results) {
      navigate('/schemes', { replace: true });
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
          onClick={() => navigate('/schemes')}
          className="flex items-center gap-2 text-[13px] font-bold text-black/40 uppercase tracking-[0.2em] hover:text-off-black transition-colors group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Analysis
        </motion.button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-fin rounded-xl flex items-center justify-center shadow-md">
              <CheckCircle2 className="h-5 w-5 text-white" />
            </div>
            <p className="font-saans-mono text-[11px] font-bold text-fin uppercase tracking-[0.25em]">
              Matching Complete · AI Verified
            </p>
          </div>
          <h1 className="text-[54px] md:text-[72px] font-normal leading-[1.0] tracking-[-0.04em] text-off-black">
            Personalized Policies
          </h1>
          <p className="text-[18px] text-black/40 max-w-xl font-normal">
            We found {results.matchedSchemes.length} health schemes tailored to your specific profile and medical history.
          </p>
        </motion.div>

        {/* Profile Snapshot */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid md:grid-cols-3 gap-6"
        >
          {[
            { icon: <UserCircle className="h-5 w-5 text-fin" />, label: "Demographics", value: `${formData.name}, ${formData.age}` },
            { icon: <MapPin className="h-5 w-5 text-fin" />, label: "Location", value: formData.state },
            { icon: <Wallet className="h-5 w-5 text-fin" />, label: "Income Bracket", value: formData.income }
          ].map((item, i) => (
            <div key={i} className="bg-white border border-oat rounded-[16px] p-6 flex items-center gap-5 shadow-sm">
              <div className="h-12 w-12 bg-fin/5 rounded-xl flex items-center justify-center shrink-0">
                {item.icon}
              </div>
              <div>
                <p className="font-saans-mono text-[10px] font-bold text-black/20 uppercase tracking-[0.2em]">{item.label}</p>
                <p className="text-[15px] font-semibold text-off-black mt-0.5">{item.value}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Results Grid */}
        <div className="grid md:grid-cols-2 gap-10">
          {results.matchedSchemes.map((scheme, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + (i * 0.1) }}
              className="group bg-white border border-oat rounded-[24px] p-10 flex flex-col hover:border-fin/30 hover:shadow-xl transition-all"
            >
              <div className="flex-1 space-y-8">
                <div className="flex justify-between items-start">
                  <div className="space-y-3">
                    <div className="inline-flex px-3 py-1 bg-fin/10 rounded-full text-[10px] font-bold text-fin uppercase tracking-widest border border-fin/20">
                      High Eligibility Match
                    </div>
                    <h3 className="text-[32px] font-normal tracking-tight text-off-black leading-tight group-hover:text-fin transition-colors">{scheme.name}</h3>
                  </div>
                  <div className="h-12 w-12 bg-[#faf9f6] rounded-xl flex items-center justify-center shrink-0 border border-oat">
                    <Shield className="h-6 w-6 text-black/20" />
                  </div>
                </div>

                <div className="p-6 bg-[#faf9f6] rounded-xl border border-oat space-y-1">
                  <p className="font-saans-mono text-[10px] font-bold text-black/30 uppercase tracking-[0.25em]">Coverage Scope</p>
                  <p className="text-[18px] font-semibold text-off-black tracking-tight">{scheme.coverage}</p>
                </div>

                <div className="space-y-4">
                  <p className="font-saans-mono text-[11px] font-bold text-black/30 uppercase tracking-[0.25em] ml-1">Key Benefits</p>
                  <ul className="space-y-4">
                    {scheme.benefits.map((benefit, j) => (
                      <li key={j} className="flex items-start gap-4 text-[15px] text-black/50 leading-relaxed font-normal">
                        <div className="h-5 w-5 bg-fin/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                          <CheckCircle2 className="h-3 w-3 text-fin" />
                        </div>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-10">
                <a
                  href={scheme.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-16 bg-off-black text-white rounded-xl flex items-center justify-center gap-3 font-bold text-[15px] hover:bg-fin transition-all group/btn active:scale-95"
                >
                  Verify & Apply <ExternalLink size={16} className="opacity-50 group-hover/btn:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* AI Reasoning Panel */}
        {results.aiReasoning && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white border border-oat rounded-[24px] overflow-hidden shadow-sm"
          >
            <div className="p-12 space-y-8 relative">
              <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
                <Sparkles size={120} />
              </div>
              
              <div className="flex items-center gap-3 text-fin font-bold uppercase tracking-[0.25em] text-[13px]">
                <Sparkles className="h-5 w-5" /> AI Recommendation Intelligence
              </div>
              
              <p className="text-[28px] text-off-black leading-[1.3] font-normal max-w-3xl">
                "{results.aiReasoning}"
              </p>

              <div className="flex flex-col sm:flex-row gap-6 pt-6 border-t border-oat">
                <div className="flex items-start gap-4 p-6 bg-[#faf9f6] rounded-xl border border-oat flex-1">
                  <Info className="h-6 w-6 text-black/20 shrink-0 mt-1" />
                  <div className="space-y-1">
                    <p className="text-[14px] font-bold text-off-black uppercase tracking-tight">Important Note</p>
                    <p className="text-[14px] text-black/40 font-normal leading-relaxed">
                      Final eligibility is subject to physical verification of documents at the designated government kiosk or online portal.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-6 bg-fin/5 rounded-xl border border-fin/10 flex-1">
                  <Scale className="h-6 w-6 text-fin shrink-0 mt-1" />
                  <div className="space-y-1">
                    <p className="text-[14px] font-bold text-fin uppercase tracking-tight">DPI Optimization</p>
                    <p className="text-[14px] text-fin/60 font-normal leading-relaxed">
                      These schemes have been cross-verified with the latest 2026 Digital Public Infrastructure (DPI) updates.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
};

export default SchemeResultPage;
