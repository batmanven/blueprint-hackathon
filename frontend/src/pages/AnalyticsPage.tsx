import { motion } from 'framer-motion';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import {
  TrendingDown, ShieldCheck, Activity, CreditCard,
  ArrowUpRight, Sparkles, HeartPulse
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const savingsData = [
  { month: 'Jan', savings: 4500 },
  { month: 'Feb', savings: 5200 },
  { month: 'Mar', savings: 12000 },
  { month: 'Apr', savings: 8500 },
  { month: 'May', savings: 15600 },
  { month: 'Jun', savings: 18400 },
];

const expenseData = [
  { name: 'Medicines', value: 35 },
  { name: 'Diagnostics', value: 25 },
  { name: 'Consultations', value: 20 },
  { name: 'Insurance', value: 20 },
];

const COLORS = ['#ff5600', '#111111', '#65b5ff', '#dedbd6'];

const AnalyticsPage = () => {
  return (
    <div className="bg-[#faf9f6] min-h-screen py-24">
      <div className="layout-container max-w-6xl mx-auto space-y-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 font-saans-mono text-[12px] font-bold text-fin uppercase tracking-widest">
              <Activity className="h-4 w-4 fill-current" />
              Intelligence Reporting
            </div>
            <h1 className="text-[54px] md:text-[64px] font-normal leading-[1.00] tracking-[-3.2px] text-off-black">
              Impact Analytics
            </h1>
            <p className="text-[20px] text-black/50 leading-relaxed max-w-xl font-normal">
              A comprehensive view of your healthcare financial performance and risk mitigation metrics.
            </p>
          </div>
          <div className="flex gap-6">
            <div className="bg-white border border-oat rounded-[8px] p-6 flex items-center gap-6 shadow-sm">
              <div className="h-14 w-14 bg-[#faf9f6] border border-oat rounded-[4px] flex items-center justify-center">
                <ShieldCheck className="h-7 w-7 text-fin" />
              </div>
              <div className="space-y-1">
                <div className="font-saans-mono text-[11px] font-bold text-black/30 uppercase tracking-widest">Shield Score</div>
                <div className="text-[28px] font-normal text-off-black leading-none">84/100</div>
              </div>
            </div>
          </div>
        </div>

        {/* Core Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "Aggregate Savings", value: "₹64,200", trend: "+12.5%", icon: TrendingDown, color: "text-fin" },
            { label: "Policy Coverage", value: "03 Active", trend: "Verified", icon: Sparkles, color: "text-[#65b5ff]" },
            { label: "Audits Completed", value: "14 Units", trend: "Processed", icon: CreditCard, color: "text-off-black" },
            { label: "Financial Buffer", value: "₹2.4L", trend: "Secured", icon: HeartPulse, color: "text-[#c41c1c]" }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white border border-oat rounded-[8px] p-8 space-y-4 hover:border-sand transition-colors group"
            >
              <div className="flex justify-between items-center">
                <stat.icon className={`h-6 w-6 ${stat.color} group-hover:scale-110 transition-transform`} />
                <span className={`font-saans-mono text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-[2px] bg-[#faf9f6] border border-oat text-black/40`}>
                  {stat.trend}
                </span>
              </div>
              <div className="space-y-1">
                <div className="text-[32px] font-normal text-off-black tracking-tighter leading-none">{stat.value}</div>
                <p className="font-saans-mono text-[11px] font-bold text-black/30 uppercase tracking-widest">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid md:grid-cols-3 gap-10">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="md:col-span-2 bg-white border border-oat rounded-[8px] p-12 space-y-10"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-[24px] font-normal tracking-tight text-off-black flex items-center gap-3">
                Savings Trajectory <ArrowUpRight className="h-5 w-5 text-black/20" />
              </h3>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-fin" />
                  <span className="font-saans-mono text-[11px] font-bold text-black/30 uppercase tracking-widest">Monthly Growth</span>
                </div>
              </div>
            </div>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={savingsData}>
                  <defs>
                    <linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ff5600" stopOpacity={0.15}/>
                      <stop offset="95%" stopColor="#ff5600" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#dedbd6" />
                  <XAxis 
                    dataKey="month" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fontSize: 11, fill: '#7b7b78', fontWeight: 600, fontFamily: 'Geist Mono'}} 
                    dy={15}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fontSize: 11, fill: '#7b7b78', fontWeight: 600, fontFamily: 'Geist Mono'}} 
                  />
                  <Tooltip 
                    contentStyle={{ 
                      borderRadius: '4px', 
                      border: '1px solid #dedbd6', 
                      backgroundColor: '#ffffff',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                      fontFamily: 'Geist Mono',
                      fontSize: '12px'
                    }}
                  />
                  <Area type="step" dataKey="savings" stroke="#ff5600" strokeWidth={3} fillOpacity={1} fill="url(#colorSavings)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white border border-oat rounded-[8px] p-12 space-y-12"
          >
            <h3 className="text-[24px] font-normal tracking-tight text-off-black">Resource Allocation</h3>
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={expenseData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={90}
                    paddingAngle={10}
                    dataKey="value"
                  >
                    {expenseData.map((_entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-4 pt-4 border-t border-oat">
              {expenseData.map((item, i) => (
                <div key={i} className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="h-3 w-3 rounded-[2px]" style={{ backgroundColor: COLORS[i] }} />
                    <span className="font-saans-mono text-[11px] font-bold text-black/50 uppercase tracking-widest">{item.name}</span>
                  </div>
                  <span className="text-[15px] font-bold text-off-black font-saans-mono">{item.value}%</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* AI Action Card */}
        <div className="bg-off-black text-white rounded-[8px] p-16 flex flex-col md:flex-row items-center gap-16 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-fin opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-1000 -skew-x-12 translate-x-20" />
          <div className="h-24 w-24 bg-fin rounded-[4px] flex items-center justify-center shrink-0 shadow-2xl">
            <Sparkles className="h-12 w-12 text-white" />
          </div>
          <div className="space-y-6 flex-1 text-center md:text-left relative z-10">
            <h2 className="text-[40px] font-normal text-white leading-[1.00] tracking-tight">Financial Shield Recommendation</h2>
            <p className="text-white/50 text-[18px] max-w-2xl leading-relaxed font-normal">
              Your pharmaceutical savings of <span className="text-fin font-bold">₹15,000/mo</span> could secure a <span className="text-fin font-bold">₹2.4 Lakh</span> emergency buffer in 18 months. We recommend automating this into a low-risk health mutual fund.
            </p>
          </div>
          <Button className="btn-intercom-primary h-16 px-12 rounded-[4px] text-[16px] font-bold shadow-none shrink-0 relative z-10">
            Automate My Savings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
