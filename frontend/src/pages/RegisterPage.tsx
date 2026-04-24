import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, ArrowRight, Loader2, Mail, Lock, User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { authAPI } from '@/lib/api';

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await authAPI.register(formData);
      localStorage.setItem('aarogya-token', response.data.token);
      localStorage.setItem('aarogya-user', JSON.stringify(response.data));
      toast.success("Account created successfully.");
      navigate('/schemes');
    } catch {
      toast.error("Registration failed. Please try again.");
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
            <h1 className="text-[40px] font-normal tracking-[-2px] text-off-black leading-none">Join the Shield.</h1>
            <p className="text-[17px] text-black/40 font-normal">Start protecting your family's medical future.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-5">
            <div className="space-y-3">
              <Label htmlFor="name" className="font-saans-mono text-[11px] font-bold text-black/40 uppercase tracking-widest ml-1">Full Name</Label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-black/20" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Ramesh Kumar"
                  className="rounded-[4px] h-14 pl-12 border-oat bg-[#faf9f6] focus:ring-fin"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
            </div>

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
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="password" className="font-saans-mono text-[11px] font-bold text-black/40 uppercase tracking-widest ml-1">Create Password</Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-black/20" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="rounded-[4px] h-14 pl-12 border-oat bg-[#faf9f6] focus:ring-fin"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-intercom-primary w-full h-16 text-[18px] flex items-center justify-center gap-3 mt-4"
          >
            {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : <>Create Account <ArrowRight className="h-5 w-5" /></>}
          </button>
        </form>

        <div className="mt-12 pt-8 border-t border-oat text-center">
          <p className="text-[15px] text-black/40">
            Already have an account? <Link to="/login" className="text-fin font-bold hover:underline">Login here</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
