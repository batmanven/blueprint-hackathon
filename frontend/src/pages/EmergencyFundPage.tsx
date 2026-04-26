import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import {
  Shield, Sparkles, HeartPulse,
  TrendingUp, Wallet, Target,
  AlertTriangle, CheckCircle2
} from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/lib/LanguageContext';
import ExpenseSimGateway from '@/components/gateway/ExpenseSimGateway';
import { AnimatePresence } from 'framer-motion';

const EmergencyFundPage = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showSimGateway, setShowSimGateway] = useState(false);
  const [pendingResults, setPendingResults] = useState<any>(null);
  const [formData, setFormData] = useState({
    age: '',
    income: '',
    familySize: '',
    location: '',
    conditions: '',
    insurance: 'none'
  });

  const handleCalculate = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1800));
    
    const incomeMonthly = parseInt(formData.income.replace(/,/g, '')) || 50000;
    const familySize = parseInt(formData.familySize) || 4;
    const age = parseInt(formData.age) || 35;
    
    const baseMultiplier = age > 50 ? 3.5 : age > 35 ? 3 : 2.5;
    const familyMultiplier = familySize > 4 ? 1.3 : familySize > 2 ? 1.1 : 1;
    const recommendedFund = Math.round(incomeMonthly * 12 * baseMultiplier * familyMultiplier);
    const monthlySavings = Math.round(recommendedFund / 36);
    const riskScore = age > 50 || formData.conditions ? 75 : age > 35 ? 55 : 35;
    
    const mockResult = {
      recommendedFund,
      monthlySavings,
      riskScore,
      riskLevel: riskScore > 60 ? 'High' : riskScore > 40 ? 'Medium' : 'Low',
      breakdown: {
        hospitalization: Math.round(recommendedFund * 0.5),
        medicines: Math.round(recommendedFund * 0.25),
        emergency: Math.round(recommendedFund * 0.15),
        buffer: Math.round(recommendedFund * 0.1)
      },
      schemes: [
        { name: 'PM-JAY', coverage: '₹5,00,000', eligible: true },
        { name: 'Ayushman Card', coverage: '₹5,00,000', eligible: formData.income && parseInt(formData.income.replace(/,/g, '')) < 250000 }
      ].filter(s => s.eligible),
      advice: formData.conditions 
        ? "With your pre-existing conditions, prioritize comprehensive insurance with OPD cover. Consider building a larger buffer."
        : "Your profile suggests a moderate risk. Start with a ₹3L emergency fund and increase as your income grows."
    };
    
    setPendingResults(mockResult);
    setShowSimGateway(true);
  };

  const onSimComplete = () => {
    setShowSimGateway(false);
    setLoading(false);
    navigate('/expenses/result', { state: { results: pendingResults, formData, mode: 'emergency' } });
  };

  return (
    <div className="bg-[#faf9f6] min-h-screen py-24">
      <div className="layout-container max-w-5xl mx-auto space-y-16">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 font-saans-mono text-[12px] font-bold text-fin uppercase tracking-widest">
            <Shield className="h-4 w-4 fill-current" />
            {t.emergency.badge}
          </div>
          <h1 className="text-[54px] md:text-[64px] font-normal leading-[1.00] tracking-[-3.2px] text-off-black">
            {t.emergency.title}
          </h1>
          <p className="text-[20px] text-black/50 leading-relaxed max-w-2xl font-normal">
            {t.emergency.subtitle}
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-oat rounded-[8px] p-12 md:p-16 shadow-sm"
        >
          <form onSubmit={handleCalculate} className="grid md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <Label className="font-saans-mono text-[11px] font-bold text-black/40 uppercase tracking-widest ml-1">Your Age</Label>
              <Input 
                type="number" 
                placeholder="e.g. 32" 
                className="rounded-[4px] h-14 px-6 border-oat bg-[#faf9f6] focus:ring-fin"
                required
                onChange={(e) => setFormData({...formData, age: e.target.value})}
              />
            </div>

            <div className="space-y-4">
              <Label className="font-saans-mono text-[11px] font-bold text-black/40 uppercase tracking-widest ml-1">Monthly Family Income</Label>
              <Input 
                type="text" 
                placeholder="e.g. 75,000" 
                className="rounded-[4px] h-14 px-6 border-oat bg-[#faf9f6] focus:ring-fin"
                required
                onChange={(e) => setFormData({...formData, income: e.target.value})}
              />
            </div>

            <div className="space-y-4">
              <Label className="font-saans-mono text-[11px] font-bold text-black/40 uppercase tracking-widest ml-1">Family Members</Label>
              <Input 
                type="number" 
                placeholder="e.g. 4" 
                className="rounded-[4px] h-14 px-6 border-oat bg-[#faf9f6] focus:ring-fin"
                required
                onChange={(e) => setFormData({...formData, familySize: e.target.value})}
              />
            </div>

            <div className="space-y-4">
              <Label className="font-saans-mono text-[11px] font-bold text-black/40 uppercase tracking-widest ml-1">City</Label>
              <Input 
                placeholder="e.g. Delhi, NCR" 
                className="rounded-[4px] h-14 px-6 border-oat bg-[#faf9f6] focus:ring-fin"
                required
                onChange={(e) => setFormData({...formData, location: e.target.value})}
              />
            </div>

            <div className="space-y-4">
              <Label className="font-saans-mono text-[11px] font-bold text-black/40 uppercase tracking-widest ml-1">Current Insurance</Label>
              <Select onValueChange={(v) => setFormData({...formData, insurance: v})}>
                <SelectTrigger className="rounded-[4px] h-14 border-oat bg-[#faf9f6] px-6 focus:ring-fin">
                  <SelectValue placeholder="Select Coverage" />
                </SelectTrigger>
                <SelectContent className="bg-white border-oat rounded-[4px]">
                  <SelectItem value="none">No Insurance</SelectItem>
                  <SelectItem value="corporate">Corporate Cover</SelectItem>
                  <SelectItem value="personal">Personal Policy</SelectItem>
                  <SelectItem value="government">Government Scheme (PM-JAY)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <Label className="font-saans-mono text-[11px] font-bold text-black/40 uppercase tracking-widest ml-1">Pre-existing Conditions</Label>
              <Input 
                placeholder="e.g. Diabetes, BP (comma separated)" 
                className="rounded-[4px] h-14 px-6 border-oat bg-[#faf9f6] focus:ring-fin"
                onChange={(e) => setFormData({...formData, conditions: e.target.value})}
              />
            </div>

            <div className="md:col-span-2 pt-10">
              <Button
                type="submit"
                disabled={loading}
                className="btn-intercom-primary w-full !py-5"
              >
                Calculate Shield Fund <Sparkles className="ml-3 h-6 w-6" />
              </Button>
            </div>
          </form>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: Wallet, title: 'Smart Savings', desc: 'Automated micro-savings plan tailored to your income' },
            { icon: HeartPulse, title: 'Risk Assessment', desc: 'AI-powered health risk scoring based on profile' },
            { icon: Target, title: 'Scheme Integration', desc: 'Automatic linking to eligible government schemes' }
          ].map((f, i) => (
            <div key={i} className="bg-white border border-oat rounded-[8px] p-8 space-y-6 shadow-sm">
              <div className="h-12 w-12 bg-fin/10 rounded-xl flex items-center justify-center">
                <f.icon className="h-6 w-6 text-fin" />
              </div>
              <div>
                <h3 className="text-[20px] font-semibold text-off-black mb-2">{f.title}</h3>
                <p className="text-[15px] text-black/50 leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {showSimGateway && (
          <ExpenseSimGateway onComplete={onSimComplete} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default EmergencyFundPage;