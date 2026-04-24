import { Link } from 'react-router-dom';
import { Shield, Sparkles, ArrowRight, Activity, Database, HeartPulse } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import { CountUp } from '@/components/ui/CountUp';

const HomePage = () => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen bg-[#faf9f6]">
      {/* Hero Section */}
      <section className="pt-32 pb-24 border-b border-oat">
        <div className="layout-container text-center space-y-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center"
          >
            <div className="inline-flex items-center gap-2 mb-10 bg-white border border-oat px-5 py-2 rounded-full shadow-sm">
              <Sparkles className="h-4 w-4 text-fin fill-fin" />
              <span className="font-saans-mono text-[11px] font-bold uppercase tracking-[0.2em] text-black/40">
                {t.hero.badge}
              </span>
            </div>
            
            <h1 className="text-[64px] md:text-[88px] font-normal leading-[1.00] tracking-[-0.05em] text-off-black mb-8 max-w-5xl">
              {t.hero.title1} <br /> <span className="text-fin italic">{t.hero.title2}</span>.
            </h1>
            
            <p className="text-[20px] md:text-[26px] text-black/50 max-w-3xl mx-auto leading-[1.3] mb-14 font-normal">
              {t.hero.subtitle}
            </p>
            
            <div className="flex flex-wrap justify-center gap-6">
              <Link to="/schemes" className="btn-intercom-primary h-16 px-12 text-[18px]">
                {t.hero.ctaPrimary}
              </Link>
              <Link to="/bill-analysis" className="btn-intercom-outline bg-white h-16 px-12 text-[18px]">
                {t.hero.ctaSecondary} <ArrowRight className="ml-3 h-5 w-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white border-b border-oat">
        <div className="layout-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-16 text-center">
            {[
              { label: "Savings Generated", value: 24000000, prefix: "₹", suffix: "+" },
              { label: "Active Users", value: 140000, suffix: "+" },
              { label: "Bills Audited", value: 85000, suffix: "+" },
              { label: "Schemes Matched", value: 200000, suffix: "+" },
            ].map((s, i) => (
              <div key={i} className="space-y-3">
                <div className="text-[48px] font-normal tracking-tighter text-off-black leading-none">
                  <CountUp end={s.value} prefix={s.prefix} suffix={s.suffix} />
                </div>
                <div className="font-saans-mono text-[11px] font-bold uppercase tracking-[0.2em] text-black/30">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-32">
        <div className="layout-container">
          <div className="mb-24 space-y-6 max-w-2xl">
            <h2 className="text-[54px] md:text-[64px] font-normal tracking-[-0.04em] text-off-black leading-[1.00]">
              Built for the <br /> Indian middle class.
            </h2>
            <p className="text-[20px] text-black/40 font-normal">Precise tools engineered to secure your medical future.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { 
                icon: Activity, 
                title: "Scheme Matcher", 
                desc: "Intelligent matching against 200+ health schemes using Gemini AI reasoning. Instant eligibility checks.",
                link: "/schemes"
              },
              { 
                icon: Shield, 
                title: "Bill Auditor", 
                desc: "Audit hospital bills for overcharging with direct vision-based AI. No manual OCR required.",
                link: "/bill-analysis"
              },
              { 
                icon: Database, 
                title: "Medicine Finder", 
                desc: "Instantly swap branded medicines for PMBJP generic alternatives and save up to 90%.",
                link: "/medicines"
              }
            ].map((f, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -8 }}
                className="card-intercom flex flex-col items-start space-y-10 bg-white border-oat"
              >
                <div className="h-14 w-14 rounded-[4px] bg-[#faf9f6] flex items-center justify-center border border-oat shadow-sm">
                  <f.icon className="h-7 w-7 text-fin" />
                </div>
                <div className="space-y-4 flex-1">
                  <h3 className="text-[32px] font-normal tracking-tight text-off-black">{f.title}</h3>
                  <p className="text-[17px] text-black/50 leading-relaxed font-normal">{f.desc}</p>
                </div>
                <Link to={f.link} className="text-fin font-bold flex items-center gap-2 group/link">
                  Learn more <ArrowRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-32 bg-white border-t border-oat">
        <div className="layout-container">
          <div className="grid md:grid-cols-2 gap-24 items-center">
            <div className="space-y-12">
              <h2 className="text-[64px] font-normal leading-[1.00] tracking-[-0.04em] text-off-black">
                Healthcare should <span className="text-fin italic">never</span> break a family.
              </h2>
              <p className="text-[22px] text-black/50 leading-relaxed font-normal max-w-xl">
                55 Million Indians fall below the poverty line every year due to medical expenses. We're here to stop that cycle with AI advocacy.
              </p>
              <Link to="/schemes" className="btn-intercom-primary h-16 px-12 inline-flex">
                Join the Mission
              </Link>
            </div>
            <div className="bg-[#faf9f6] border border-oat rounded-[12px] p-16 aspect-square flex items-center justify-center relative group overflow-hidden shadow-sm">
              <div className="absolute inset-0 bg-fin opacity-[0.02] group-hover:opacity-[0.05] transition-opacity duration-1000" />
              <HeartPulse className="h-48 w-48 text-fin/5 animate-pulse" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-2">
                  <div className="text-[88px] font-normal tracking-tighter text-off-black leading-none">90%</div>
                  <div className="font-saans-mono text-[13px] font-bold uppercase tracking-[0.2em] text-black/30">Average Savings</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 border-t border-oat bg-[#faf9f6]">
        <div className="layout-container">
          <div className="flex flex-col md:flex-row justify-between items-start gap-16 mb-24">
            <div className="space-y-8 max-w-xs">
              <div className="flex items-center space-x-2.5">
                <Shield className="h-7 w-7 text-fin fill-fin/10" />
                <span className="text-2xl font-normal tracking-[-1.5px]">Aarogya</span>
              </div>
              <p className="text-[15px] text-black/50 leading-relaxed">
                The AI-first financial layer for India's healthcare system. Securing families, one bill at a time.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-24">
              <div className="space-y-8">
                <div className="font-saans-mono text-[12px] font-bold uppercase tracking-[0.25em] text-black/40">Product</div>
                <ul className="space-y-5 text-[16px] text-black/60 font-medium">
                  <li><Link to="/schemes" className="hover:text-fin transition-colors">{t.nav.schemes}</Link></li>
                  <li><Link to="/bill-analysis" className="hover:text-fin transition-colors">{t.nav.bills}</Link></li>
                  <li><Link to="/medicines" className="hover:text-fin transition-colors">{t.nav.meds}</Link></li>
                  <li><Link to="/expenses" className="hover:text-fin transition-colors">{t.nav.plan}</Link></li>
                </ul>
              </div>
              <div className="space-y-8">
                <div className="font-saans-mono text-[12px] font-bold uppercase tracking-[0.25em] text-black/40">Company</div>
                <ul className="space-y-5 text-[16px] text-black/60 font-medium">
                  <li><a href="#" className="hover:text-fin transition-colors">About Us</a></li>
                  <li><a href="#" className="hover:text-fin transition-colors">Mission</a></li>
                  <li><a href="#" className="hover:text-fin transition-colors">Contact</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="pt-12 border-t border-oat flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-[14px] text-black/30 font-medium">© 2026 Aarogya. Built for BluePrint 2026.</p>
            <div className="flex space-x-10 text-[11px] font-bold text-black/30 uppercase tracking-[0.3em]">
              <a href="#" className="hover:text-off-black transition-colors">Privacy</a>
              <a href="#" className="hover:text-off-black transition-colors">Terms</a>
              <a href="#" className="hover:text-off-black transition-colors">Security</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
