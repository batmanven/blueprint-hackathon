import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="py-24 border-t border-oat bg-[#faf9f6]">
      <div className="layout-container">
        <div className="flex flex-col md:flex-row justify-between items-start gap-16 mb-24">
          <div className="space-y-8 max-w-xs">
            <div className="flex items-center space-x-2.5">
              <Shield className="h-7 w-7 text-fin fill-fin/10" />
              <span className="text-2xl font-semibold tracking-[-1.5px] text-off-black">Aarogya<span className="text-fin">Raksha</span></span>
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
          <p className="text-[14px] text-black/30 font-medium">© 2026 AarogyaRaksha. Built for BluePrint 2026.</p>
          <div className="flex space-x-10 text-[11px] font-bold text-black/30 uppercase tracking-[0.3em]">
            <a href="#" className="hover:text-off-black transition-colors">Privacy</a>
            <a href="#" className="hover:text-off-black transition-colors">Terms</a>
            <a href="#" className="hover:text-off-black transition-colors">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
