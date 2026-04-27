import React, { useState } from "react";
import {
  CreditCard,
  Download,
  Clock,
  CheckCircle2,
  Receipt,
  ArrowUpRight,
  Plus,
  Smartphone,
  ShieldCheck,
  Tag,
  ChevronRight,
  AlertCircle,
  Wallet,
  Globe
} from "lucide-react";

const Payments = () => {
  // --- States for Interactivity ---
  const [selectedPlan, setSelectedPlan] = useState("p2"); // Default to 'Popular'
  const [promoCode, setPromoCode] = useState("");
  const [isApplied, setIsApplied] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("upi");

  const packages = [
    { id: "p1", sessions: 5, price: 550, discount: "8%", tag: "Starter" },
    { id: "p2", sessions: 10, price: 1000, discount: "15%", tag: "Most Popular" },
    { id: "p3", sessions: 20, price: 1800, discount: "25%", tag: "Best Value" },
  ];

  const transactions = [
    { id: "INV-8821", service: "Knee Flexion Therapy", therapist: "Dr. Smith", date: "Apr 26, 2026", amount: "$120.00", status: "Paid", method: "GPay" },
    { id: "INV-8819", service: "10-Session Bundle", therapist: "Clinic", date: "Apr 10, 2026", amount: "$1000.00", status: "Paid", method: "Card" },
    { id: "INV-8810", service: "Consultation Fee", therapist: "Dr. Khanna", date: "Mar 25, 2026", amount: "$250.00", status: "Refunded", method: "Net Banking" },
  ];

  const handleApplyPromo = () => {
    if (promoCode.trim() !== "") {
      setIsApplied(true);
      setTimeout(() => setIsApplied(false), 3000); // Reset after 3s
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#f8fafc] p-4 md:p-8 lg:pl-12">
      <div className="max-w-[1400px] mx-auto space-y-8">
        
        {/* 1. SECURE HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-100">
              <CreditCard className="text-white w-7 h-7" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">Payments & Billing</h1>
              <div className="flex items-center gap-2 text-emerald-600 text-[10px] font-black mt-1 uppercase tracking-widest">
                <ShieldCheck className="w-4 h-4" /> Secure SSL Encrypted
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl text-xs font-bold hover:bg-slate-800 transition-all">
              <Plus className="w-4 h-4" /> Add Money to Wallet
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT SIDE: Selection & History */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* 2. PACKAGES (EMI & DISCOUNTS) */}
            <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-slate-900">Therapy Packages</h2>
                <div className="flex items-center gap-2 text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg text-[10px] font-black uppercase">
                  <Clock className="w-3 h-3" /> No-Cost EMI Available
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {packages.map((pkg) => (
                  <button 
                    key={pkg.id}
                    onClick={() => setSelectedPlan(pkg.id)}
                    className={`relative text-left p-6 rounded-[2rem] border-2 transition-all duration-300 ${
                      selectedPlan === pkg.id 
                      ? "border-indigo-600 bg-indigo-50/40 shadow-xl shadow-indigo-100 scale-[1.02]" 
                      : "border-slate-50 bg-slate-50/50 hover:border-slate-200"
                    }`}
                  >
                    {selectedPlan === pkg.id && (
                      <CheckCircle2 className="absolute top-4 right-4 w-5 h-5 text-indigo-600" />
                    )}
                    <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">{pkg.tag}</span>
                    <h4 className="text-xl font-black text-slate-900 mt-1">{pkg.sessions} Sessions</h4>
                    <p className="text-3xl font-black text-slate-900 mt-4">${pkg.price}</p>
                    <div className="mt-3 py-1 px-2 bg-emerald-100 text-emerald-700 text-[10px] font-black rounded-md w-fit">
                      SAVE {pkg.discount}
                    </div>
                  </button>
                ))}
              </div>

              {/* 3. PROMO CODE SYSTEM */}
              <div className="mt-8 flex flex-col md:flex-row items-center gap-4 border-t border-slate-50 pt-8">
                <div className="relative flex-1 w-full">
                  <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Have a coupon? Enter here..."
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-indigo-500/20 outline-none"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                  {isApplied && <span className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-600 text-xs font-bold">Applied!</span>}
                </div>
                <button 
                  onClick={handleApplyPromo}
                  className="w-full md:w-auto px-8 py-4 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-700 transition-all shadow-lg active:scale-95"
                >
                  Apply & Checkout
                </button>
              </div>
            </div>

            {/* 4. HISTORY & INVOICE DOWNLOAD */}
            <div className="bg-white rounded-[3rem] p-8 border border-slate-100 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 mb-8">Payment History</h2>
              <div className="space-y-4">
                {transactions.map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between p-5 rounded-2xl border border-slate-50 hover:border-slate-200 transition-all bg-slate-50/30">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-slate-100 shadow-sm">
                        <Receipt className="w-5 h-5 text-slate-400" />
                      </div>
                      <div>
                        <p className="text-sm font-black text-slate-900">{tx.service}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                          {tx.date} • Therapist: {tx.therapist}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-sm font-black text-slate-900">{tx.amount}</p>
                        <span className={`text-[9px] font-black uppercase ${tx.status === 'Paid' ? 'text-emerald-500' : 'text-rose-400'}`}>
                          {tx.status}
                        </span>
                      </div>
                      <button className="p-2 bg-white rounded-lg border border-slate-100 hover:text-indigo-600 transition-all shadow-sm">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Summary & Methods */}
          <div className="space-y-8">
            
            {/* 5. SESSION-WISE BILLING CARD */}
            <div className="bg-[#0f172a] rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden">
              <div className="relative z-10">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Current Due</p>
                <h3 className="text-5xl font-black mb-10">$120<span className="text-lg text-slate-500 font-medium">.00</span></h3>
                
                <div className="space-y-3 mb-8">
                  <div className="flex justify-between text-xs font-bold text-slate-400 border-b border-white/5 pb-2">
                    <span>Next Session:</span>
                    <span className="text-white">May 02, 2026</span>
                  </div>
                  <div className="flex justify-between text-xs font-bold text-slate-400 border-b border-white/5 pb-2">
                    <span>Therapist:</span>
                    <span className="text-white">Dr. Sarah Miller</span>
                  </div>
                </div>

                <button className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-2xl transition-all flex items-center justify-center gap-2">
                  Pay Now <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-600/10 rounded-full blur-3xl" />
            </div>

            {/* 6. MULTIPLE PAYMENT CHOICES */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
              <h4 className="text-xs font-black text-slate-900 uppercase mb-6 tracking-widest">Select Method</h4>
              <div className="grid grid-cols-2 gap-3 mb-6">
                <button 
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${paymentMethod === 'upi' ? 'border-indigo-600 bg-indigo-50' : 'border-slate-50 hover:border-slate-200'}`}
                >
                  <Smartphone className="w-5 h-5 text-indigo-600" />
                  <span className="text-[10px] font-black">UPI / GPay</span>
                </button>
                <button 
                   onClick={() => setPaymentMethod('card')}
                   className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${paymentMethod === 'card' ? 'border-indigo-600 bg-indigo-50' : 'border-slate-50 hover:border-slate-200'}`}
                >
                  <Globe className="w-5 h-5 text-indigo-600" />
                  <span className="text-[10px] font-black">Net Banking</span>
                </button>
              </div>
              
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white rounded-md border border-slate-200 flex items-center justify-center font-bold text-[8px]">VISA</div>
                  <p className="text-xs font-bold text-slate-600">•••• 4242</p>
                </div>
                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
              </div>
            </div>

            {/* 7. REFUND & CANCELLATION INFO */}
            <div className="bg-amber-50 border border-amber-100 rounded-3xl p-6 flex gap-4">
              <AlertCircle className="w-6 h-6 text-amber-600 shrink-0" />
              <div>
                <p className="text-xs font-black text-amber-900 uppercase">Refund Policy</p>
                <p className="text-[11px] text-amber-700 mt-1 leading-relaxed font-medium">
                  Cancellations made 24h prior to the session are eligible for 100% refund to your wallet.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* 8. MOBILE FRIENDLY FOOTER SUPPORT */}
        <div className="flex flex-col md:flex-row items-center justify-between p-8 bg-white border border-slate-100 rounded-[2.5rem] gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center">
              <Wallet className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <p className="font-bold text-slate-900">Need help with billing?</p>
              <p className="text-xs text-slate-400 font-medium">Chat with our financial support team 24/7</p>
            </div>
          </div>
          <button className="px-8 py-3 bg-slate-100 hover:bg-slate-200 text-slate-900 rounded-xl text-xs font-black transition-all">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payments; 