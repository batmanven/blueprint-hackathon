import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, ArrowRight, Loader2, Mail, Lock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { authAPI } from '@/lib/api';

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await authAPI.login(formData);
      localStorage.setItem('aarogya-token', response.data.token);
      localStorage.setItem('aarogya-user', JSON.stringify(response.data));
      toast.success("Welcome back to Aarogya.");
      navigate('/analytics');
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#faf9f6] p-6 pt-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[480px] bg-white border border-oat rounded-[8px] p-12 shadow-2xl"
      >
        <div className="flex flex-col items-center text-center space-y-6 mb-12">
          <div className="h-16 w-16 bg-[#faf9f6] border border-oat rounded-[4px] flex items-center justify-center shadow-sm">
            <Shield className="h-8 w-8 text-fin fill-fin/10" />
          </div>
          <div className="space-y-2">
            <h1 className="text-[40px] font-normal tracking-[-2px] text-off-black leading-none">Enter the Shield.</h1>
            <p className="text-[17px] text-black/40 font-normal">Continue to your medical financial dashboard.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="email" className="font-saans-mono text-[11px] font-bold text-black/40 uppercase tracking-widest ml-1">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-black/20" />
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="name@company.com" 
                  className="rounded-[4px] h-14 pl-12 border-oat bg-[#faf9f6] focus:ring-fin"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-end">
                <Label htmlFor="password" className="font-saans-mono text-[11px] font-bold text-black/40 uppercase tracking-widest ml-1">Password</Label>
                <a href="#" className="text-[12px] font-bold text-fin/60 hover:text-fin transition-colors">Forgot?</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-black/20" />
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="••••••••" 
                  className="rounded-[4px] h-14 pl-12 border-oat bg-[#faf9f6] focus:ring-fin"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required
                />
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="btn-intercom-primary w-full h-16 text-[18px] flex items-center justify-center gap-3"
          >
            {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : <>Access Dashboard <ArrowRight className="h-5 w-5" /></>}
          </button>
        </form>

        <div className="mt-12 pt-8 border-t border-oat text-center">
          <p className="text-[15px] text-black/40">
            New to Aarogya? <Link to="/register" className="text-fin font-bold hover:underline">Create an account</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
