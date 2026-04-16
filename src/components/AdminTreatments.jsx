import React, { useState } from "react";
import {
  ClipboardList,
  Plus,
  Activity,
  CheckCircle2,
  Clock,
  Dumbbell,
  Zap,
  HeartPulse,
  Search,
  X,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

const TreatmentManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [plans, setPlans] = useState([
    {
      id: 1,
      patient: "John Cooper",
      treatment: "ACL Post-Op Rehab",
      therapist: "Dr. Sarah Jenkins",
      sessionsDone: 8,
      totalSessions: 12,
      lastSession: "2024-05-18",
      type: "Orthopedic",
    },
    {
      id: 2,
      patient: "Maria Garcia",
      treatment: "Chronic Back Pain Management",
      therapist: "Dr. Michael Chen",
      sessionsDone: 4,
      totalSessions: 20,
      lastSession: "2024-05-19",
      type: "Pain Management",
    },
  ]);

  const [newPlan, setNewPlan] = useState({
    patient: "",
    treatment: "",
    therapist: "Dr. Sarah Jenkins",
    totalSessions: 10,
    type: "Orthopedic",
  });

  const handleAddPlan = (e) => {
    e.preventDefault();
    const planToAdd = {
      ...newPlan,
      id: Date.now(),
      sessionsDone: 0,
      lastSession: new Date().toISOString().split("T")[0],
    };
    setPlans([planToAdd, ...plans]);
    setIsModalOpen(false);
    toast.success("New Protocol Assigned", {
      style: { background: '#1E293B', color: '#fff', borderRadius: '12px' }
    });
  };

  const deletePlan = (id) => {
    setPlans(plans.filter((p) => p.id !== id));
    toast.error("Protocol Removed");
  };

  const filteredPlans = plans.filter(
    (plan) =>
      plan.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.treatment.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="flex-1 ml-62 overflow-y-auto min-h-screen bg-[#F1F5F9] p-6 md:p-10 space-y-10 animate-in fade-in duration-700 pb-20 overflow-x-hidden">
      <Toaster position="bottom-center" />

      {/* --- Top Search & Action Bar --- */}
      <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
        <div className="relative w-full lg:max-w-xl group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
          <input
            type="text"
            placeholder="Search patient or treatment..."
            className="w-full pl-16 pr-6 py-4 bg-white border border-slate-200 rounded-[1.5rem] shadow-sm outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 transition-all font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full lg:w-auto flex items-center justify-center gap-3 px-10 py-4 bg-blue-600 text-white rounded-[1.25rem] font-bold uppercase text-xs tracking-widest hover:bg-blue-700 hover:shadow-lg shadow-blue-200 transition-all active:scale-95 whitespace-nowrap"
        >
          <Plus className="w-5 h-5" />
          New Protocol
        </button>
      </div>

      {/* --- Main Header Section --- */}
      <div className="bg-slate-900 p-12 rounded-[3.5rem] shadow-xl shadow-slate-200 flex justify-between items-center relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-4xl font-black text-white tracking-tight">
            Treatment <span className="text-blue-400">Protocols</span>
          </h1>
          <p className="text-sm text-slate-400 font-bold mt-2 uppercase tracking-[0.3em]">
            Compliance & Recovery Tracking
          </p>
        </div>
        <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl z-10 border border-white/10">
          <span className="text-blue-400 text-sm font-black uppercase tracking-widest">
            {plans.length} Active Plans
          </span>
        </div>
        <Activity className="absolute -right-10 -bottom-10 w-64 h-64 text-white/5 -rotate-12" />
      </div>

      {/* --- Protocol Grid --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-8">
        {filteredPlans.map((plan) => (
          <div
            key={plan.id}
            className="bg-white rounded-[3.5rem] p-10 shadow-sm border border-slate-100 transition-all hover:shadow-md group relative"
          >
            <div className="flex justify-between items-start mb-10">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shadow-inner">
                  {plan.type === "Sports" ? (
                    <Dumbbell size={28} />
                  ) : plan.type === "Orthopedic" ? (
                    <Zap size={28} />
                  ) : (
                    <HeartPulse size={28} />
                  )}
                </div>
                <div>
                  <h3 className="font-black text-slate-900 text-2xl leading-tight">
                    {plan.treatment}
                  </h3>
                  <p className="text-[11px] text-slate-400 font-black uppercase tracking-[0.2em] mt-2">
                    {plan.patient}
                  </p>
                </div>
              </div>
              <button
                onClick={() => deletePlan(plan.id)}
                className="text-slate-200 hover:text-rose-500 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Progress Area */}
            <div className="space-y-5 bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100">
              <div className="flex justify-between items-end">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-500" />
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Adherence
                  </span>
                </div>
                <span className="text-2xl font-black text-slate-900">
                  {Math.round((plan.sessionsDone / plan.totalSessions) * 100)}%
                </span>
              </div>
              <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 transition-all duration-1000"
                  style={{
                    width: `${(plan.sessionsDone / plan.totalSessions) * 100}%`,
                  }}
                />
              </div>
              <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <span className="text-blue-600">{plan.sessionsDone} Sessions</span>
                <span>Goal: {plan.totalSessions}</span>
              </div>
            </div>

            {/* Footer */}
            <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-slate-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-blue-500">
                  <Clock size={18} />
                </div>
                <div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">
                    Last Session
                  </p>
                  <p className="text-xs font-black text-slate-700">
                    {plan.lastSession}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-blue-500">
                  <ClipboardList size={18} />
                </div>
                <div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">
                    Assignee
                  </p>
                  <p className="text-xs font-black text-slate-700 truncate">
                    {plan.therapist.split(' ')[1]}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- Assignment Modal --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-lg rounded-[3.5rem] p-12 shadow-2xl scale-in-center border border-slate-100">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-black text-slate-900">
                Assign <span className="text-blue-600">Protocol</span>
                </h2>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-900">
                    <X size={24} />
                </button>
            </div>
            <form onSubmit={handleAddPlan} className="space-y-6">
              <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 ml-2 tracking-widest">Patient Identity</label>
                  <input
                    placeholder="e.g. John Doe"
                    className="w-full p-5 bg-slate-50 rounded-2xl font-bold outline-none border border-transparent focus:border-blue-600 focus:bg-white transition-all"
                    required
                    onChange={(e) =>
                    setNewPlan({ ...newPlan, patient: e.target.value })
                    }
                  />
              </div>
              <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 ml-2 tracking-widest">Treatment Path</label>
                  <input
                    placeholder="e.g. Post-Op Shoulder"
                    className="w-full p-5 bg-slate-50 rounded-2xl font-bold outline-none border border-transparent focus:border-blue-600 focus:bg-white transition-all"
                    required
                    onChange={(e) =>
                    setNewPlan({ ...newPlan, treatment: e.target.value })
                    }
                  />
              </div>
              <button className="w-full py-5 bg-blue-600 text-white rounded-[1.5rem] font-black uppercase tracking-widest hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all">
                Confirm Assignment
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TreatmentManagement;