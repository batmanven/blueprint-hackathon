/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Loader2, ArrowRight, CheckCircle2, AlertCircle, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { abhaAPI } from '@/lib/api';
import { toast } from 'sonner';

interface ABHAGatewayProps {
  onSuccess: (profile: any) => void;
  onClose: () => void;
}

const ABHAGateway = ({ onSuccess, onClose }: ABHAGatewayProps) => {
  const [step, setStep] = useState(1); // 1: Number, 2: OTP, 3: Success
  const [abhaNumber, setAbhaNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [txnId, setTxnId] = useState('');

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await abhaAPI.verify(abhaNumber);
      setTxnId(res.data.transactionId);
      setStep(2);
      toast.success("OTP Sent to linked mobile");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleFetch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await abhaAPI.fetchProfile(txnId, otp);
      setStep(3);
      setTimeout(() => {
        onSuccess(res.data);
      }, 1500);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-off-black/60 backdrop-blur-md"
        onClick={onClose}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative w-full max-w-[450px] bg-white rounded-[12px] shadow-2xl overflow-hidden"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-black/20 hover:text-off-black transition-colors"
        >
          <X size={20} />
        </button>

        <div className="p-10">
          <div className="flex flex-col items-center text-center space-y-6 mb-10">
            <div className="h-16 w-16 bg-[#faf9f6] border border-oat rounded-[4px] flex items-center justify-center shadow-sm">
              <Shield className="h-8 w-8 text-fin fill-fin/10" />
            </div>
            <div className="space-y-2">
              <h2 className="text-[28px] font-normal tracking-tight text-off-black">ABDM Gateway</h2>
              <p className="text-[14px] text-black/40 uppercase tracking-widest font-bold font-saans-mono">National Health Authority</p>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.form
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handleVerify}
                className="space-y-6"
              >
                <div className="space-y-3">
                  <label className="font-saans-mono text-[11px] font-bold text-black/40 uppercase tracking-widest ml-1">ABHA Number / Address</label>
                  <Input
                    value={abhaNumber}
                    onChange={(e) => setAbhaNumber(e.target.value)}
                    placeholder="12-3456-7890-1234"
                    className="h-14 border-oat bg-[#faf9f6] text-[16px] rounded-[4px]"
                    required
                  />
                  <div className="flex items-center gap-2 text-[12px] text-black/30 bg-[#faf9f6] p-3 rounded-[4px] border border-oat border-dashed">
                    <AlertCircle size={14} />
                    Enter your 14-digit ID or username@abdm
                  </div>
                </div>
                <button
                  disabled={loading}
                  className="btn-intercom-primary w-full h-14 flex items-center justify-center gap-3"
                >
                  {loading ? <Loader2 className="animate-spin" /> : <>Continue <ArrowRight size={18} /></>}
                </button>
              </motion.form>
            )}

            {step === 2 && (
              <motion.form
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handleFetch}
                className="space-y-6"
              >
                <div className="space-y-3">
                  <label className="font-saans-mono text-[11px] font-bold text-black/40 uppercase tracking-widest ml-1">Enter OTP (Demo: 123456)</label>
                  <Input
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="••••••"
                    className="h-14 border-oat bg-[#faf9f6] text-[24px] tracking-[0.5em] text-center rounded-[4px]"
                    maxLength={6}
                    required
                  />
                  <p className="text-[12px] text-black/30 text-center">One-time password sent to registered mobile.</p>
                </div>
                <button
                  disabled={loading}
                  className="btn-intercom-primary w-full h-14 flex items-center justify-center gap-3"
                >
                  {loading ? <Loader2 className="animate-spin" /> : <>Verify & Fetch Profile <ArrowRight size={18} /></>}
                </button>
              </motion.form>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center text-center space-y-6 py-4"
              >
                <div className="h-20 w-20 bg-fin/10 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="h-10 w-10 text-fin" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-[22px] font-normal text-off-black">Identity Verified</h3>
                  <p className="text-[15px] text-black/40">Securely fetching health records from ABDM...</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>


      </motion.div>
    </div>
  );
};

export default ABHAGateway;
