/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { 
   Upload, Sparkles, AlertCircle, 
  TrendingDown, ShieldCheck, X, ArrowRight 
} from 'lucide-react';
import { toast } from 'sonner';
import { useLanguage } from '@/lib/LanguageContext';
import { billAPI } from '@/lib/api';
import BillAuditGateway from '@/components/gateway/BillAuditGateway';
import { AnimatePresence } from 'framer-motion';

const BillAnalysisPage = () => {
  const { t } = useLanguage();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [showAuditGateway, setShowAuditGateway] = useState(false);
  const [pendingResults, setPendingResults] = useState<any>(null);
  const [results, setResults] = useState<any>(null);
  
  const demoBills = [
    { name: "Fortis Hospital Delhi", amount: 85000, id: "demo-fortis" },
    { name: "Apollo Chennai", amount: 125000, id: "demo-apollo" },
    { name: "Max Healthcare Gurgaon", amount: 62000, id: "demo-max" }
  ];

  const loadDemoBill = (demo) => {
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 600;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, 400, 600);
      ctx.fillStyle = '#111827';
      ctx.font = 'bold 24px Georgia';
      ctx.fillText(demo.name, 20, 50);
      ctx.font = '16px Arial';
      ctx.fillText("Invoice Date: " + new Date().toLocaleDateString(), 20, 80);
      ctx.fillText("--- HOSPITAL CHARGES ---", 20, 120);
      ctx.fillText("Room Rent (3 days)          ₹18,000", 20, 160);
      ctx.fillText("Surgeon Fee               ₹25,000", 20, 190);
      ctx.fillText("Medicines                ₹22,000", 20, 220);
      ctx.fillText("IV Set (5)               ₹4,500", 20, 250);
      ctx.fillText("Surgical Gloves (10)      ₹3,500", 20, 280);
      ctx.fillText("Blood Tests               ₹3,200", 20, 310);
      ctx.fillText("MRI Scan                ₹8,000", 20, 340);
      ctx.fillText("--------------------------", 20, 380);
      ctx.font = 'bold 20px Georgia';
      ctx.fillText("TOTAL: ₹" + demo.amount.toLocaleString(), 20, 420);
      ctx.fillStyle = '#ef4444';
      ctx.font = '14px Arial';
      ctx.fillText("* Overcharged on consumables", 20, 480);
    }
    canvas.toBlob((blob) => {
      if (blob) {
        const demoFile = new File([blob], `${demo.id}.png`, { type: 'image/png' });
        setFile(demoFile);
        setPreview(canvas.toDataURL());
      }
    });
  };

  const onFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(selectedFile);
    } else {
      toast.error("Please upload a valid image file");
    }
  };

  const handleAnalyze = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('bill', file);
      
      const response = await billAPI.analyze(formData);
      setPendingResults(response.data);
      setShowAuditGateway(true);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Analysis failed. Please try again.");
      setLoading(false);
    }
  };

  const onAuditComplete = () => {
    setResults(pendingResults);
    setShowAuditGateway(false);
    setLoading(false);
    toast.success("Analysis complete! Significant savings identified.");
  };

  const exportPDF = () => {
    if (!results) return;
    import('jspdf').then(({ default: jsPDF }) => {
      import('jspdf-autotable').then(() => {
        const doc = new jsPDF();
        
        // Header
        doc.setFillColor(17, 17, 17);
        doc.rect(0, 0, 210, 40, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(22);
        doc.text("AAROGYARAKSHA AUDIT REPORT", 20, 25);
        
        // Hospital Info
        doc.setTextColor(17, 17, 17);
        doc.setFontSize(16);
        doc.text(results.hospitalName, 20, 55);
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 62);
        doc.text(`Report ID: #AR-${Math.floor(Math.random() * 100000)}`, 20, 67);
        
        // Summary Box
        doc.setFillColor(250, 249, 246);
        doc.rect(20, 75, 170, 30, 'F');
        doc.setTextColor(255, 86, 0);
        doc.setFontSize(12);
        doc.text("POTENTIAL SAVINGS VERDICT", 25, 85);
        doc.setFontSize(20);
        doc.text(`INR ${results.potentialSavings.toLocaleString()}`, 25, 95);
        
        // Table
        const tableData = results.lineItems.map(item => [
          item.description,
          `INR ${item.amount.toLocaleString()}`,
          item.isFlagged ? `FLAGGED: ${item.flagReason}` : "Verified"
        ]);
        
        (doc as any).autoTable({
          startY: 115,
          head: [['Item Description', 'Amount', 'Audit Status']],
          body: tableData,
          headStyles: { fillColor: [17, 17, 17], textColor: [255, 255, 255] },
          alternateRowStyles: { fillColor: [250, 249, 246] },
        });
        
        doc.save(`AarogyaAudit_${results.hospitalName.replace(/\s/g, '_')}.pdf`);
        toast.success("PDF Report Generated!");
      });
    });
  };

  return (
    <div className="bg-[#faf9f6] min-h-screen py-30">
      <div className="layout-container max-w-5xl mx-auto space-y-16">
        {/* Header */}
        <div className="space-y-6">
       
          <h1 className="text-[54px] md:text-[72px] font-normal leading-[1.00] tracking-[-0.05em] text-off-black">
            {t.bills.title}
          </h1>
          <p className="text-[20px] text-black/50 leading-relaxed max-w-2xl font-normal">
            {t.bills.subtitle}
          </p>
        </div>

        {!results ? (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-oat rounded-[8px] overflow-hidden shadow-sm"
          >
            <div className="p-16 flex flex-col items-center justify-center space-y-10 border-b border-oat bg-[#faf9f6]/40">
              <div className="flex gap-3 mb-4 flex-wrap justify-center">
                {demoBills.map((demo) => (
                  <button
                    key={demo.id}
                    onClick={() => loadDemoBill(demo)}
                    className="px-4 py-2 text-xs font-bold uppercase tracking-wider border border-oat rounded-full hover:border-fin hover:bg-fin hover:text-white transition-all"
                  >
                    Load {demo.name}
                  </button>
                ))}
              </div>
              {preview ? (
                <div className="relative group">
                  <img src={preview} alt="Bill Preview" className="max-h-[400px] rounded-[4px] shadow-2xl border border-off-black" />
                  <button 
                    onClick={() => { setFile(null); setPreview(null); }}
                    className="absolute -top-4 -right-4 h-10 w-10 bg-off-black text-white rounded-[4px] flex items-center justify-center shadow-xl hover:scale-110 transition-transform"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              ) : (
                <label className="w-full max-w-2xl flex flex-col items-center justify-center px-10 py-24 border-2 border-dashed border-oat rounded-[8px] bg-white hover:border-fin transition-colors cursor-pointer group">
                  <div className="h-16 w-16 bg-[#faf9f6] rounded-[4px] border border-oat flex items-center justify-center mb-8 group-hover:scale-110 group-hover:border-fin transition-all">
                    <Upload className="h-8 w-8 text-black/20 group-hover:text-fin" />
                  </div>
                  <h3 className="text-[32px] font-normal text-off-black mb-3 tracking-tight">Drop bill image here</h3>
                  <p className="text-[14px] font-saans-mono font-bold text-black/30 uppercase tracking-[0.2em]">JPG, PNG, PDF (Max 5MB)</p>
                  <input type="file" className="hidden" accept="image/*" onChange={onFileChange} />
                </label>
              )}

          
            </div>

            <div className="p-12 bg-white flex justify-center">
              <button 
                onClick={handleAnalyze}
                disabled={!file || loading}
                className="btn-intercom-primary btn-hero min-w-[280px] disabled:opacity-40 disabled:hover:scale-100 disabled:cursor-not-allowed"
              >
                Run AI Audit <Sparkles className="ml-4 h-6 w-6" />
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-12"
          >
            <div className="grid md:grid-cols-3 gap-12">
              <div className="md:col-span-2 space-y-10">
                <div className="bg-white border border-oat rounded-[8px] p-12 space-y-12 shadow-sm">
                  <div className="flex justify-between items-center border-b border-oat pb-10">
                    <h3 className="text-[40px] font-normal tracking-tighter text-off-black leading-none">{results.hospitalName}</h3>
                    <Badge variant="outline" className="rounded-[4px] px-5 py-2 border-off-black text-off-black font-bold uppercase tracking-[0.2em] text-[10px]">Report #8524</Badge>
                  </div>

                  {/* Summary Area */}
                  <div className="p-10 bg-[#faf9f6] border border-oat rounded-[8px] space-y-6">
                    <div className="flex items-center gap-3 text-fin font-bold uppercase tracking-[0.2em] text-[13px] font-saans-mono">
                      <TrendingDown className="h-6 w-6" /> Critical Inflation Identified
                    </div>
                    <p className="text-[20px] text-black/60 leading-relaxed font-normal italic">"{results.summary}"</p>
                  </div>

                  {/* Audit Insights Grid */}
                  {results.auditMetadata && (
                    <div className="grid md:grid-cols-2 gap-10 pt-6">
                      <div className="space-y-4">
                        <h4 className="font-saans-mono text-[11px] font-bold text-black/30 uppercase tracking-[2px]">Inflation Severity</h4>
                        <div className="flex items-center gap-4">
                          <div className={`h-3 flex-1 rounded-full bg-[#faf9f6] overflow-hidden`}>
                            <div 
                              className={`h-full ${results.auditMetadata.inflationSeverity === 'High' ? 'bg-fin' : 'bg-sand'}`} 
                              style={{ width: results.auditMetadata.inflationSeverity === 'High' ? '90%' : '40%' }}
                            />
                          </div>
                          <span className="text-[14px] font-bold text-off-black uppercase">{results.auditMetadata.inflationSeverity}</span>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h4 className="font-saans-mono text-[11px] font-bold text-black/30 uppercase tracking-[2px]">Savings Breakdown</h4>
                        <div className="flex gap-4 text-[13px] font-bold">
                          <div className="flex items-center gap-2 text-fin">
                            <div className="h-2 w-2 rounded-full bg-fin" /> Ph: ₹{results.auditMetadata.savingsBreakdown?.pharmacy || 0}
                          </div>
                          <div className="flex items-center gap-2 text-off-black">
                            <div className="h-2 w-2 rounded-full bg-off-black" /> Cons: ₹{results.auditMetadata.savingsBreakdown?.consumables || 0}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Itemized Table */}
                  <div className="space-y-8 pt-8">
                    <h4 className="font-saans-mono text-[12px] font-bold text-black/30 uppercase tracking-[0.3em] ml-1">Itemized Audit Log</h4>
                    <div className="border border-oat rounded-[8px] overflow-hidden shadow-inner">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-[#faf9f6] border-b border-oat">
                            <th className="px-10 py-6 font-saans-mono text-[12px] font-bold text-off-black uppercase tracking-[0.2em]">Charge Description</th>
                            <th className="px-10 py-6 font-saans-mono text-[12px] font-bold text-off-black uppercase tracking-[0.2em] text-right">Amount (INR)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {results.lineItems.map((item, i) => (
                            <tr key={i} className={`border-b border-oat last:border-0 ${item.isFlagged ? 'bg-fin/[0.03]' : 'bg-white'}`}>
                              <td className="px-10 py-8">
                                <div className="space-y-3">
                                  <div className="text-[19px] font-normal text-off-black flex items-center gap-4 tracking-tight">
                                    {item.description}
                                    {item.isFlagged && <AlertCircle className="h-5 w-5 text-fin" />}
                                  </div>
                                  {item.isFlagged && <p className="text-[15px] text-fin font-medium italic leading-relaxed max-w-md">{item.flagReason}</p>}
                                </div>
                              </td>
                              <td className="px-10 py-8 text-right font-saans-mono text-[19px] font-bold text-off-black">
                                {item.amount.toLocaleString()}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr className="bg-off-black text-white font-normal">
                            <td className="px-10 py-8 text-[22px] tracking-tight">Total Bill Value</td>
                            <td className="px-10 py-8 text-right text-[32px] font-normal tracking-tighter">₹{results.totalAmount.toLocaleString()}</td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Sidebar */}
              <div className="space-y-10">
                <div className="bg-fin text-white rounded-[8px] p-12 space-y-8 shadow-2xl hover:scale-[1.02] transition-transform group">
                  <span className="font-saans-mono text-[12px] font-bold text-white/50 uppercase tracking-[0.3em]">Audit Verdict</span>
                  <div className="text-[64px] font-normal tracking-tighter leading-none group-hover:scale-110 transition-transform origin-left">
                    ₹{results.potentialSavings.toLocaleString()}
                  </div>
                  <p className="text-white/80 text-[17px] font-normal leading-relaxed">Inflation detected in generic drugs and bulk consumables. Recommended for correction.</p>
                  <button 
                    onClick={exportPDF}
                    className="w-full bg-white text-fin font-bold h-16 rounded-[4px] hover:bg-[#faf9f6] transition-colors mt-6 uppercase tracking-[0.2em] text-[14px]"
                  >
                    Export Audit PDF
                  </button>
                </div>

                <div className="bg-white border border-oat rounded-[8px] p-12 space-y-10 shadow-sm">
                  <h4 className="font-saans-mono text-[13px] font-bold text-off-black uppercase tracking-[0.25em]">Strategic Moves</h4>
                  <div className="space-y-8">
                    {[
                      { icon: TrendingDown, text: "Present this audit to the hospital billing desk for immediate correction." },
                      { icon: ShieldCheck, text: "Send a copy to your health insurance provider for claim verification." },
                      { icon: ArrowRight, text: "Request a GSTR-compliant itemized receipt for tax deduction." }
                    ].map((a, i) => (
                      <div key={i} className="flex gap-6 group">
                        <div className="h-12 w-12 rounded-[4px] bg-[#faf9f6] border border-oat flex items-center justify-center shrink-0 group-hover:border-fin transition-colors shadow-sm">
                          <a.icon className="h-5 w-5 text-black/20 group-hover:text-fin" />
                        </div>
                        <p className="text-[16px] text-black/50 leading-relaxed font-normal">{a.text}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={() => setResults(null)}
                  className="btn-intercom-outline w-full"
                >
                  Audit Another Bill
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
      <AnimatePresence>
        {showAuditGateway && (
          <BillAuditGateway onComplete={onAuditComplete} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default BillAnalysisPage;
