import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
  Calculator, Sparkles, ShieldAlert,
  PieChart, CheckCircle2, ArrowUpRight
} from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import ExpenseSimGateway from '@/components/gateway/ExpenseSimGateway';
import { AnimatePresence } from 'framer-motion';

const ExpensePlannerPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showSimGateway, setShowSimGateway] = useState(false);
  const [pendingResults, setPendingResults] = useState<any>(null);
  const [formData, setFormData] = useState({
    age: '',
    chronicConditions: '',
    income: '',
    familySize: '',
    coverage: 'none',
    location: '',
    history: ''
  });

  const handlePlan = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const incomeMonthly = parseInt(formData.income || '50000');
      const familySize = parseInt(formData.familySize || '4');
      const age = parseInt(formData.age || '30');
      const hasConditions = formData.history.toLowerCase().includes('diabetes') || 
                        formData.history.toLowerCase().includes('bp') ||
                        formData.history.toLowerCase().includes('heart') ||
                        formData.history.toLowerCase().includes('cancer');
      
      const cityTiers = { delhi: 1.6, mumbai: 1.6, bangalore: 1.5, chennai: 1.5, hyderabad: 1.4, kolkata: 1.4, other: 1.0 };
      const cityKey = Object.keys(cityTiers).find(k => formData.location?.toLowerCase().includes(k)) || 'other';
      const cityMultiplier = cityTiers[cityKey];
      
      const baseAnnual = 25000 * cityMultiplier;
      const familyMultiplier = familySize > 4 ? 1.3 : familySize > 2 ? 1.1 : 1.0;
      const conditionMultiplier = hasConditions ? 1.8 : 1.0;
      const ageMultiplier = age > 50 ? 1.5 : age > 35 ? 1.2 : 1.0;
      
      const estimatedAnnualCost = Math.round(baseAnnual * familyMultiplier * conditionMultiplier * ageMultiplier);
      const riskLevel = conditionMultiplier > 1.5 || ageMultiplier > 1.3 ? 'High' : 'Medium';
      const recommendedEmergencyFund = Math.round(estimatedAnnualCost * 2.5 * (riskLevel === 'High' ? 1.5 : 1.0));
      
      const costBreakdown = [
        { category: "Routine Checkups", amount: Math.round(estimatedAnnualCost * 0.18), explanation: "Regular consultations and preventive screenings.", color: "#65b5ff" },
        { category: "Medicines", amount: Math.round(estimatedAnnualCost * 0.35), explanation: "Monthly maintenance drugs for identified conditions.", color: "#0bdf50" },
        { category: "Diagnostics", amount: Math.round(estimatedAnnualCost * 0.24), explanation: "Bi-annual blood work and required scans.", color: "#ff2067" },
        { category: "Incidentals", amount: Math.round(estimatedAnnualCost * 0.23), explanation: "Buffer for acute illnesses and OPD visits.", color: "#fe4c02" }
      ];
      
      let advice = `Based on your profile in ${formData.location || 'your area'}, we estimate annual healthcare costs at ₹${(estimatedAnnualCost/100000).toFixed(1)}L.`;
      if (hasConditions) {
        advice += " Your medical history suggests a need for regular monitoring and maintenance medication.";
      }
      if (riskLevel === 'High') {
        advice += " We recommend prioritizing health insurance with OPD cover and building a ₹" + (recommendedEmergencyFund/100000).toFixed(1) + "L emergency fund.";
      }
      
      const mockResult = {
        estimatedAnnualCost,
        riskLevel,
        recommendedEmergencyFund,
        costBreakdown,
        planningAdvice: advice
      };
      
      setPendingResults(mockResult);
      setShowSimGateway(true);
    } catch (error: any) {
      toast.error("Failed to generate plan. Please try again.");
      setLoading(false);
    }
  };

  const onSimComplete = () => {
    setShowSimGateway(false);
    setLoading(false);
    navigate('/expenses/result', { state: { results: pendingResults, formData } });
  };

  return (
    <div className="bg-[#faf9f6] min-h-screen py-24">
      <div className="layout-container max-w-5xl mx-auto space-y-16">
        {/* Header */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 font-saans-mono text-[12px] font-bold text-fin uppercase tracking-widest">
            <Calculator className="h-4 w-4 fill-current" />
            Medical Actuarial Unit
          </div>
          <h1 className="text-[54px] md:text-[64px] font-normal leading-[1.00] tracking-[-3.2px] text-off-black">
            Expense Planner
          </h1>
          <p className="text-[20px] text-black/50 leading-relaxed max-w-2xl font-normal">
            Predict your healthcare financial future. Our AI models localized medical inflation and actuarial risks based on your profile.
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-oat rounded-[8px] p-12 md:p-16 shadow-sm"
        >
          <form onSubmit={handlePlan} className="grid md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <Label className="font-saans-mono text-[11px] font-bold text-black/40 uppercase tracking-widest ml-1">Current Age</Label>
              <Input 
                type="number" 
                placeholder="e.g. 32" 
                className="rounded-[4px] h-14 px-6 border-oat bg-[#faf9f6] focus:ring-fin"
                required
                onChange={(e) => setFormData({...formData, age: e.target.value})}
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
              <Label className="font-saans-mono text-[11px] font-bold text-black/40 uppercase tracking-widest ml-1">Location (City)</Label>
              <Input 
                placeholder="e.g. Mumbai, Maharashtra" 
                className="rounded-[4px] h-14 px-6 border-oat bg-[#faf9f6] focus:ring-fin"
                required
                onChange={(e) => setFormData({...formData, location: e.target.value})}
              />
            </div>

            <div className="space-y-4">
              <Label className="font-saans-mono text-[11px] font-bold text-black/40 uppercase tracking-widest ml-1">Current Insurance</Label>
              <Select onValueChange={(v) => setFormData({...formData, coverage: v})}>
                <SelectTrigger className="rounded-[4px] h-14 border-oat bg-[#faf9f6] px-6 focus:ring-fin">
                  <SelectValue placeholder="Select Coverage" />
                </SelectTrigger>
                <SelectContent className="bg-white border-oat rounded-[4px]">
                  <SelectItem value="none">No Insurance</SelectItem>
                  <SelectItem value="corporate">Corporate Cover</SelectItem>
                  <SelectItem value="personal">Personal Policy</SelectItem>
                  <SelectItem value="government">Government Scheme</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="md:col-span-2 space-y-4">
              <Label className="font-saans-mono text-[11px] font-bold text-black/40 uppercase tracking-widest ml-1">Medical History Summary</Label>
              <Textarea 
                placeholder="e.g. History of chronic asthma. One major surgery in 2021. Regular medications for BP." 
                className="rounded-[4px] min-h-[160px] p-8 border-oat bg-[#faf9f6] focus:ring-fin text-[17px] font-normal"
                onChange={(e) => setFormData({...formData, history: e.target.value})}
              />
            </div>

            <div className="md:col-span-2 pt-10">
              <Button
                type="submit"
                disabled={loading}
                className="btn-intercom-primary w-full !py-5"
              >
                Run Financial Simulation <Sparkles className="ml-3 h-6 w-6" />
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
      <AnimatePresence>
        {showSimGateway && (
          <ExpenseSimGateway onComplete={onSimComplete} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ExpensePlannerPage;
