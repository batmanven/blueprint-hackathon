/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sparkles, CheckCircle2, ChevronRight, Info, Shield } from 'lucide-react';
import { toast } from 'sonner';
import { useLanguage } from '@/lib/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { schemeAPI } from '@/lib/api';
import ABHAGateway from '@/components/gateway/ABHAGateway';
import SchemeMatchGateway from '@/components/gateway/SchemeMatchGateway';

const SchemeMatcherPage = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [showGateway, setShowGateway] = useState(false);
  const [showMatchGateway, setShowMatchGateway] = useState(false);
  const [pendingResults, setPendingResults] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    state: '',
    income: '',
    category: '',
    occupation: '',
    conditions: ''
  });

  const handleABHASuccess = (profile: any) => {
    setFormData({
      name: profile.name,
      age: profile.age.toString(),
      state: profile.state,
      income: profile.income,
      category: profile.category,
      occupation: profile.occupation,
      conditions: profile.conditions
    });
    setShowGateway(false);
    toast.success("ABHA Profile Linked! Health records synced.");
  };

  const handleMatch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await schemeAPI.match(formData);
      setPendingResults(response.data);
      setShowMatchGateway(true);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Matching failed. Please try again.");
      setLoading(false);
    }
  };

  const onMatchComplete = () => {
    setShowMatchGateway(false);
    setLoading(false);
    navigate('/schemes/result', { state: { results: pendingResults, formData } });
  };

  return (
    <div className="bg-[#faf9f6] min-h-screen py-30">
      <div className="layout-container max-w-5xl mx-auto space-y-16">
        <div className="space-y-6">

          <h1 className="text-[54px] md:text-[64px] font-normal leading-none tracking-[-3.2px] text-off-black">
            {t.schemes.title}
          </h1>
          <p className="text-[20px] text-black/50 leading-relaxed max-w-2xl font-normal">
            {t.schemes.subtitle}
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-oat rounded-[8px] p-10 md:p-12 shadow-sm"
        >
          <div className="mb-12 p-8 bg-[#faf9f6] border border-oat rounded-[8px] flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="space-y-2">
              <h3 className="text-[20px] font-normal text-off-black tracking-tight">Have an ABHA ID?</h3>
              <p className="text-[14px] text-black/40 font-normal">Connect your health ID to auto-populate from national records.</p>
            </div>
            <button
              type="button"
              onClick={() => setShowGateway(true)}
              disabled={loading}
              className="btn-intercom-outline h-12 px-8 text-[14px] flex items-center gap-2 group"
            >
              <div className="h-5 w-5 bg-fin rounded-[2px] flex items-center justify-center">
                <Shield className="h-3 w-3 text-white" />
              </div>
              Connect ABHA ID
            </button>
          </div>

          <form onSubmit={handleMatch} className="grid md:grid-cols-2 gap-10">
            <div className="space-y-3">
              <Label htmlFor="name" className="font-saans-mono text-[11px] font-bold text-black/40 uppercase tracking-widest ml-1">Full Name</Label>
              <Input
                id="name"
                placeholder="Enter name..."
                className="rounded-[4px] h-14 border-oat bg-[#faf9f6] focus:ring-fin"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="age" className="font-saans-mono text-[11px] font-bold text-black/40 uppercase tracking-widest ml-1">Age</Label>
              <Input
                id="age"
                type="number"
                placeholder="e.g. 45"
                className="rounded-[4px] h-14 border-oat bg-[#faf9f6] focus:ring-fin"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                required
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="state" className="font-saans-mono text-[11px] font-bold text-black/40 uppercase tracking-widest ml-1">State of Residence</Label>
              <Select value={formData.state} onValueChange={(val) => setFormData({ ...formData, state: val })}>
                <SelectTrigger className="rounded-[4px] h-14 border-oat bg-[#faf9f6] focus:ring-fin">
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Bihar">Bihar</SelectItem>
                  <SelectItem value="Karnataka">Karnataka</SelectItem>
                  <SelectItem value="Maharashtra">Maharashtra</SelectItem>
                  <SelectItem value="Tamil Nadu">Tamil Nadu</SelectItem>
                  <SelectItem value="Delhi">Delhi</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label htmlFor="income" className="font-saans-mono text-[11px] font-bold text-black/40 uppercase tracking-widest ml-1">Annual Household Income</Label>
              <Select value={formData.income} onValueChange={(val) => setFormData({ ...formData, income: val })}>
                <SelectTrigger className="rounded-[4px] h-14 border-oat bg-[#faf9f6] focus:ring-fin">
                  <SelectValue placeholder="Select income range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="<1L">Below ₹1 Lakh</SelectItem>
                  <SelectItem value="1-3L">₹1 Lakh - ₹3 Lakh</SelectItem>
                  <SelectItem value="3-5L">₹3 Lakh - ₹5 Lakh</SelectItem>
                  <SelectItem value=">5L">Above ₹5 Lakh</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3 md:col-span-2">
              <Label htmlFor="conditions" className="font-saans-mono text-[11px] font-bold text-black/40 uppercase tracking-widest ml-1">Medical Conditions (Optional)</Label>
              <Input
                id="conditions"
                placeholder="e.g. Diabetes, Hypertension, Kidney Disease..."
                className="rounded-[4px] h-14 border-oat bg-[#faf9f6] focus:ring-fin"
                value={formData.conditions}
                onChange={(e) => setFormData({ ...formData, conditions: e.target.value })}
              />
            </div>

            <div className="md:col-span-2 pt-6">
              <button
                type="submit"
                disabled={loading}
                className="btn-intercom-primary w-full h-18 text-[18px] flex items-center justify-center gap-3"
              >
                {loading ? (
                  <div className="h-6 w-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>Run Match Analysis <Sparkles className="h-6 w-6" /></>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
      <AnimatePresence>
        {showGateway && (
          <ABHAGateway
            onSuccess={handleABHASuccess}
            onClose={() => setShowGateway(false)}
          />
        )}
        {showMatchGateway && (
          <SchemeMatchGateway
            onComplete={onMatchComplete}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default SchemeMatcherPage;
