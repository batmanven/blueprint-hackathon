import { Link } from 'react-router-dom';
import { Shield, Sparkles, ArrowRight, Activity, Database, HeartPulse, Calculator, FileSearch, Search, Building, DollarSign, Globe, Users, Heart, Stethoscope, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import { CountUp } from '@/components/ui/CountUp';
import { useEffect, useState } from 'react';

const HomePage = () => {
  const { t, language, toggleLanguage } = useLanguage();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const stats = [
    { label: "₹40,000 Crore", labelHi: "₹40,000 करोंड़", sub: "Saved by Jan Aushadhi (11 Years)", subHi: "जन औषधि से बचत (11 वर्ष)", icon: DollarSign },
    { label: "18,646", sub: "Jan Aushadhi Kendras", subHi: "जन औषधि केंद्र", icon: Building },
    { label: "84.79 Crore", sub: "ABHA Health IDs Created", subHi: "ABHA स्वास्थ्य आईडी", icon: Users },
    { label: "1 in 3", sub: "Families Face Catastrophic Health Costs", subHi: "परिवार आपातकालिन स्वास्थ्य लागत का सामना", icon: AlertTriangle },
  ];

  const modules = [
    {
      icon: FileSearch,
      title: t.modules.schemeMatcher?.title || "AI Scheme Matcher" || "AI योजना मिलानकर्ता",
      titleHi: "AI योजना मिलानकर्ता",
      desc: t.modules.schemeMatcher?.desc || "Find 200+ government schemes you're eligible for. Smart matching in 30 seconds." || "200+ सरकारी योजनाओं में अपनी पात्रता जांचें।",
      link: "/schemes",
      color: "from-blue-500 to-cyan-400"
    },
    {
      icon: Activity,
      title: t.modules.billAnalyzer?.title || "Bill Auditor" || "बिल ऑडिटर",
      titleHi: "बिल ऑडिटर",
      desc: t.modules.billAnalyzer?.desc || "Upload hospital bills. AI detects overcharging up to 1000%+." || "अस्पताल बिल अपलोड करें। AI 1000%+ अधिक शुल्क का पता लगाता है।",
      link: "/bill-analysis",
      color: "from-purple-500 to-pink-400"
    },
    {
      icon: Search,
      title: t.modules.medicineFinder?.title || "Medicine Finder" || "दवा खोजक",
      titleHi: "दवा खोजक",
      desc: t.modules.medicineFinder?.desc || "Switch to Jan Aushadhi generics. Save up to 90% on medicines." || "जन औषधि जेनेरिक में बदलें। दवाओं पर 90% तक बचत करें।",
      link: "/medicines",
      color: "from-green-500 to-emerald-400"
    },
    {
      icon: Calculator,
      title: t.modules.expensePlanner?.title || "Expense Planner" || "व्यय योजनाकार",
      titleHi: "व्यय योजनाकार",
      desc: t.modules.expensePlanner?.desc || "Plan medical expenses. Know costs before treatment." || "चिकित्सा व्यय की योजना बनाएं। उपचार से पहले लागत जानें।",
      link: "/expenses",
      color: "from-orange-500 to-amber-400"
    },
  ];

  const dpiComponents = [
    { name: "ABDM", desc: "84 Crore+ Health IDs" },
    { name: "PM-JAY", desc: "₹5 Lakh Coverage" },
    { name: "NHCX", desc: "Claims Automation" },
    { name: "Jan Aushadhi", desc: "18,646 Stores" },
    { name: "CGHS", desc: "Rate Benchmarks" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 pointer-events-none">
        <div 
          className="absolute w-[600px] h-[600px] rounded-full bg-blue-500/10 blur-[120px] transition-transform duration-500 ease-out"
          style={{ 
            left: mousePosition.x / 10 - 300, 
            top: mousePosition.y / 10 - 300 
          }}
        />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-green-500/5 blur-[100px]" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-white/10">
        <div className="layout-container py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-green-400 flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-semibold tracking-tight">
              Aarogya<span className="text-blue-400">Raksha</span>
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link to="/schemes" className="text-white/70 hover:text-white transition-colors">{language === 'hi' ? 'योजनाएं' : 'Schemes'}</Link>
            <Link to="/bill-analysis" className="text-white/70 hover:text-white transition-colors">{language === 'hi' ? 'बिल ऑडिट' : 'Bills'}</Link>
            <Link to="/medicines" className="text-white/70 hover:text-white transition-colors">{language === 'hi' ? 'दवाएं' : 'Medicines'}</Link>
            <Link to="/expenses" className="text-white/70 hover:text-white transition-colors">{language === 'hi' ? 'योजना' : 'Plan'}</Link>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleLanguage}
              className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm font-medium hover:bg-white/10 transition-colors"
            >
              {language === 'en' ? 'हिंदी' : 'English'}
            </button>
            <Link to="/login" className="btn-gradient-primary text-sm">
              {language === 'hi' ? 'शुरू करें' : 'Get Started'}
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-24 relative">
        <div className="layout-container text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 mb-8 glass-card px-5 py-2"
            >
              <Sparkles className="h-4 w-4 text-blue-400" />
              <span className="mono-label text-white/60">
                {language === 'hi' ? 'भारत का स्���ा��्थ्य DPI इंटेलिजेंस लेयर' : 'India Healthcare DPI Intelligence Layer'}
              </span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 max-w-5xl leading-[1.1]">
              {language === 'hi' ? (
                <>
                  आपके परिवार को <br />
                  <span className="gradient-text">चिकित्सा दिवालियेपन</span> से <br />
                  बचाएं
                </>
              ) : (
                <>
                  Protect Your Family from <br />
                  <span className="gradient-text">Medical Bankruptcy</span> <br />
                  — One Family at a Time
                </>
              )}
            </h1>

            <p className="text-xl md:text-2xl text-white/60 max-w-3xl mx-auto leading-relaxed mb-12">
              {language === 'hi' 
                ? "AI-संचालित वित्तीय ढाल जो भारत के स्वास्थ्य DPI को कार्यात्मक बुद्धिमत्ता में बदल देती है। 200+ योजनाएं, बिल ऑडिट, 90% तक दवा बचत।"
                : "The AI-powered financial shield that translates India's Health DPI into actionable intelligence. 200+ schemes, bill audits, 90% medicine savings — all in one platform."
              }
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/schemes" className="btn-gradient-primary btn-hero">
                {language === 'hi' ? 'अपनी योजनाएं खोजें' : 'Find Your Schemes'}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link to="/bill-analysis" className="btn-gradient-outline btn-hero">
                {language === 'hi' ? 'बिल ऑडिट करें' : 'Audit a Bill'}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Live Statistics */}
      <section className="py-16 border-y border-white/10 bg-white/5">
        <div className="layout-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="stat-card"
              >
                <stat.icon className="w-8 h-8 mx-auto mb-4 text-blue-400" />
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                  {language === 'hi' ? stat.labelHi : stat.label}
                </div>
                <div className="text-white/50 text-sm">
                  {language === 'hi' ? stat.subHi : stat.sub}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* DPI Integration */}
      <section className="py-20">
        <div className="layout-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {language === 'hi' ? 'भारत के स्वास्थ्य DPI पर बने' : 'Built on India\'s Health DPI'}
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              {language === 'hi' 
                ? 'AarogyaRaksha मौजूदा सरकारी अवसंरचना के शीर्ष पर ना���र���क-सामना बुद्धिमत्ता परत बनाता है।'
                : 'AarogyaRaksha sits on top of government infrastructure as a citizen-facing intelligence layer.'
              }
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {dpiComponents.map((comp, i) => (
              <div key={i} className="glass-card px-6 py-3 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-400" />
                <div>
                  <div className="font-medium">{comp.name}</div>
                  <div className="text-white/50 text-sm">{comp.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modules Grid */}
      <section className="py-24">
        <div className="layout-container">
          <div className="mb-16 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {language === 'hi' ? '5 मॉड्यूल - पूर्ण सुरक्षा' : '5 Modules — Complete Protection'}
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto text-lg">
              {language === 'hi'
                ? 'हर विफलता बिंदु के लिए एक AI-संचालित समाधान।'
                : 'An AI-powered solution for every failure point.'
              }
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {modules.map((mod, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Link to={mod.link} className="block group">
                  <div className="glass-card-hover p-8 h-full">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${mod.color} flex items-center justify-center mb-6`}>
                      <mod.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-2xl font-semibold mb-3 group-hover:text-blue-400 transition-colors">
                      {language === 'hi' ? mod.titleHi : mod.title}
                    </h3>
                    <p className="text-white/60 mb-4">
                      {language === 'hi' ? mod.descHi : mod.desc}
                    </p>
                    <div className="flex items-center text-blue-400 text-sm font-medium">
                      {language === 'hi' ? 'जांचें' : 'Explore'} <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Emergency Fund Module */}
          <div className="mt-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Link to="/emergency-fund" className="block group">
                <div className="glass-card-hover p-8">
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-red-500 to-orange-400 flex items-center justify-center shrink-0">
                      <Heart className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                        {language === 'hi' ? 'आपातकालीन स्वास्थ्य निधि कैलकुलेटर' : 'Emergency Health Fund Calculator'}
                      </h3>
                      <p className="text-white/60">
                        {language === 'hi'
                          ? 'अपने परिवार के लिए आपातकालीन निधि लक्ष्य जानें। वैयक्तिक बचत योजना बनाएं।'
                          : 'Know your emergency fund target. Personalized micro-savings plan.'
                        }
                      </p>
                    </div>
                    <ArrowRight className="w-6 h-6 text-blue-400 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-24 bg-white/5">
        <div className="layout-container">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {language === 'hi' ? 'समस्या: भारत का स्वास्थ्य वित्तीय संकट' : 'The Problem: India\'s Healthcare Financial Crisis'}
              </h2>
              <div className="space-y-6">
                {[
                  { num: "31.6%", label: "Households face catastrophic health expenditure", labelHi: "परिवारों को आपातकालीन स्वास्थ्य व्यय", source: "JCHM 2023-24" },
                  { num: "55M+", label: "People pushed below poverty line annually", labelHi: "वर्ष में गरीबी रेखा से नीचे धकेले जाते हैं", source: "World Bank" },
                  { num: "₹50,508", label: "Avg OOP private hospital cost", labelHi: "औसत निजी अस्पताल लागत", source: "NSS 2025" },
                  { num: "89%", label: "Rural OOP increase since 2017-18", labelHi: "ग्रामीण OOP वृद्धि (2017-18 से)", source: "Forbes India" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-lg bg-white/5">
                    <div className="text-3xl font-bold text-blue-400 w-28">{item.num}</div>
                    <div>
                      <div className="font-medium">{language === 'hi' ? item.labelHi : item.label}</div>
                      <div className="text-white/40 text-sm">{item.source}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-green-500/20 rounded-3xl blur-3xl" />
              <div className="relative glass-card p-8 rounded-2xl">
                <HeartPulse className="w-24 h-24 mx-auto mb-6 text-blue-400" />
                <div className="text-center">
                  <div className="text-6xl font-bold gradient-text mb-2">90%</div>
                  <div className="text-white/60 mb-8">
                    {language === 'hi' 
                      ? 'जन औषधि से संभावित बचत'
                      : 'Potential Savings with Jan Aushadhi'
                    }
                  </div>
                  <Link to="/medicines" className="btn-gradient-primary">
                    {language === 'hi' ? 'अभी बचत शुरू करें' : 'Start Saving Now'}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why We Win */}
      <section className="py-24">
        <div className="layout-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {language === 'hi' ? 'क्यों हम जीतते हैं' : 'Why We Win'}
            </h2>
            <p className="text-white/60">
              {language === 'hi'
                ? 'BUID (Building Unique India Demonstration)'
                : 'Cross-domain synthesis — Healthcare × FinTech × DPI'
              }
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { 
                title: language === 'hi' ? 'नवाचार' : 'Innovation', 
                desc: language === 'hi' 
                  ? 'AI बिल विश्लेषण अद्वितीय है। कोई अन्य बनाता।'
                  : 'AI bill analysis is UNIQUE. No one else builds this.',
                score: "18/20"
              },
              { 
                title: language === 'hi' ? 'व्यावहारिकता' : 'Practicality', 
                desc: language === 'hi'
                  ? 'काम करने वाला डेमो। मुक्त स्टैक। छात्र-निर्माण योग्य।'
                  : 'WORKING demo. Free stack. Student-buildable.',
                score: "24/25"
              },
              { 
                title: language === 'hi' ? 'प्रभाव' : 'Impact', 
                desc: language === 'hi'
                  ? '55M लोगों के लिए राष्ट्रीय पैमाने पर।'
                  : 'National scale. 55M people affected.',
                score: "18/20"
              },
            ].map((item, i) => (
              <div key={i} className="glass-card p-8 text-center">
                <div className="text-4xl font-bold gradient-text mb-4">{item.score}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-white/60">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-white/10 bg-white/5">
        <div className="layout-container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-green-400 flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-semibold">
                Aarogya<span className="text-blue-400">Raksha</span>
              </span>
            </div>
            <div className="text-center md:text-right">
              <p className="text-white/60 mb-2">
                {language === 'hi'
                  ? '"चिकित्सा दिवालियेपन से भारत की रक्षा — एक परिवार को एक समय पर"'
                  : '"Protecting India from Medical Bankruptcy — One Family at a Time"'
                }
              </p>
              <p className="text-white/40 text-sm">
                BluePrint 2026 | {language === 'hi' ? 'समय सीमा: 30 अप्रैल 2026' : 'Deadline: April 30, 2026'}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;