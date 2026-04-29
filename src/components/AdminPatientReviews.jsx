import React, { useState } from "react";
import { 
  Star, Search, Filter, Calendar, 
  CheckCircle2, Activity, Heart, 
  ArrowUpRight, ChevronDown, UserCheck 
} from "lucide-react";

const PatientReviews = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const reviews = [
    { 
      id: 1, 
      patient: "Arjun Mehta", 
      treatment: "ACL Reconstruction", 
      rating: 5, 
      comment: "Operation ke baad recovery bahut smooth rahi. Exercise videos ne ghar par physio karne mein bahut help ki.", 
      date: "28 Apr 2026", 
      outcome: "Full Recovery",
      sentiment: "Excellent"
    },
    { 
      id: 2, 
      patient: "Sneha Kapoor", 
      treatment: "Post-Slip Disc Therapy", 
      rating: 4, 
      comment: "Pain kafi kam hai ab. Treatment plan bahut achha tha, lekin clinic ki timings thodi adjust ho sakti hain.", 
      date: "25 Apr 2026", 
      outcome: "Improving",
      sentiment: "Good"
    },
    { 
      id: 3, 
      patient: "Vikram Rathore", 
      treatment: "Shoulder Rehab", 
      rating: 5, 
      comment: "Highly professional doctors. Maine 2 saal se dard jhela tha, ab finally main cricket khel pa raha hoon.", 
      date: "22 Apr 2026", 
      outcome: "Full Recovery", 
      sentiment: "Excellent"
    },
  ];

  // --- YE LOGIC ADD KIYA HAI ---
  const filteredReviews = reviews.filter((review) =>
    review.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
    review.treatment.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star 
        key={i} 
        size={14} 
        className={i < rating ? "fill-amber-400 text-amber-400" : "text-slate-200"} 
      />
    ));
  };

  return (
    <div className="md:ml-64 min-h-screen bg-[#fcfcfd] p-6 lg:p-10 animate-in fade-in duration-700">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
        <div>
          <div className="flex items-center gap-2 text-rose-500 font-bold text-sm mb-2 uppercase tracking-widest">
            <Heart size={16} className="fill-rose-500"/>
            Post-Treatment Insights
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Patient Success Stories</h1>
          <p className="text-slate-500 mt-2 font-medium">Treatment ke baad patients ka feedback aur recovery status track karein.</p>
        </div>

        <button className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3.5 rounded-2xl font-bold hover:bg-indigo-600 transition-all shadow-lg active:scale-95">
          <ArrowUpRight size={18} />
          <span>Analytics Report</span>
        </button>
      </div>

      {/* --- QUICK RECOVERY STATS --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white border border-slate-100 p-6 rounded-[2rem] shadow-sm flex items-center gap-5">
            <div className="h-14 w-14 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center">
                <UserCheck size={28}/>
            </div>
            <div>
                <p className="text-slate-400 text-xs font-black uppercase tracking-wider">Success Rate</p>
                <h3 className="text-2xl font-black text-slate-800">98.2%</h3>
            </div>
        </div>
        <div className="bg-white border border-slate-100 p-6 rounded-[2rem] shadow-sm flex items-center gap-5">
            <div className="h-14 w-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
                <Activity size={28}/>
            </div>
            <div>
                <p className="text-slate-400 text-xs font-black uppercase tracking-wider">Avg. Recovery</p>
                <h3 className="text-2xl font-black text-slate-800">24 Days</h3>
            </div>
        </div>
        <div className="bg-white border border-slate-100 p-6 rounded-[2rem] shadow-sm flex items-center gap-5">
            <div className="h-14 w-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center">
                <Star size={28} className="fill-amber-600"/>
            </div>
            <div>
                <p className="text-slate-400 text-xs font-black uppercase tracking-wider">Avg. Rating</p>
                <h3 className="text-2xl font-black text-slate-800">4.9 / 5</h3>
            </div>
        </div>
      </div>

      {/* --- FEEDBACK TABLE CARD --- */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden">
        
        <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row justify-between items-center gap-6 bg-slate-50/20">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search by patient or treatment type..."
              className="w-full pl-14 pr-6 py-4 bg-white border border-slate-200 rounded-2xl outline-none font-medium transition-all focus:ring-4 focus:ring-indigo-500/5"
              value={searchTerm} // value add kiya
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center gap-2 px-6 py-4 bg-white border border-slate-200 rounded-2xl text-slate-600 font-bold hover:bg-slate-50">
                <Filter size={18}/>
                <span>Latest Feedback</span>
                <ChevronDown size={16}/>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-slate-400 text-[11px] uppercase tracking-[0.2em] bg-slate-50/50">
                <th className="px-10 py-6 font-black">Patient & Treatment</th>
                <th className="px-8 py-6 font-black">Recovery Feedback</th>
                <th className="px-8 py-6 font-black">Outcome</th>
                <th className="px-8 py-6 font-black">Sentiment</th>
                <th className="px-10 py-6 font-black text-right">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {/* YAHA 'reviews.map' KO 'filteredReviews.map' KIYA HAI */}
              {filteredReviews.map((review) => (
                <tr key={review.id} className="group hover:bg-indigo-50/20 transition-all cursor-default">
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center font-black">
                            {review.patient.charAt(0)}
                        </div>
                        <div>
                            <div className="font-bold text-slate-800 text-sm">{review.patient}</div>
                            <div className="text-[11px] text-indigo-500 font-black uppercase mt-1 tracking-wider">
                                {review.treatment}
                            </div>
                        </div>
                    </div>
                  </td>
                  <td className="px-8 py-8">
                    <div className="max-w-xs xl:max-w-md">
                        <div className="flex gap-0.5 mb-2">{renderStars(review.rating)}</div>
                        <p className="text-slate-600 text-sm leading-relaxed font-medium italic">
                            "{review.comment}"
                        </p>
                    </div>
                  </td>
                  <td className="px-8 py-8">
                    <div className="flex items-center gap-2">
                        <div className={`h-2 w-2 rounded-full ${review.outcome === 'Full Recovery' ? 'bg-green-500' : 'bg-amber-500'}`}></div>
                        <span className="text-slate-700 font-bold text-sm">{review.outcome}</span>
                    </div>
                  </td>
                  <td className="px-8 py-8">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        review.sentiment === "Excellent" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                    }`}>
                      {review.sentiment}
                    </span>
                  </td>
                  <td className="px-10 py-8 text-right text-slate-400 font-bold text-xs uppercase">
                    <div className="flex items-center justify-end gap-2">
                        <Calendar size={14}/> {review.date}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PatientReviews;