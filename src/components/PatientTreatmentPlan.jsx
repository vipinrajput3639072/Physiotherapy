import React, { useState } from 'react';
import { 
  Target, Activity, Calendar, CheckCircle2, 
  ArrowRight, FileText, AlertCircle, Award, 
  ChevronRight, Circle
} from 'lucide-react';

const PatientTreatmentPlan = () => {
  // 1. Interactive State for Checklist
  const [dailyGoals, setDailyGoals] = useState([
    { id: 1, task: "Morning Stretching Routine", time: "15 mins", completed: true },
    { id: 2, task: "Icing & Elevation", time: "20 mins", completed: true },
    { id: 3, task: "Quad Activation Exercises", time: "10 mins", completed: false },
    { id: 4, task: "Evening Walk (Flat surface)", time: "10 mins", completed: false },
  ]);

  // 2. State for active roadmap phase
  const [selectedPhase, setSelectedPhase] = useState(2); // Default to "Current" phase

  const planDetails = {
    diagnosis: "Grade II ACL Strain (Left Knee)",
    startDate: "March 15, 2026",
    estimatedDuration: "12 Weeks",
    progress: 65,
    doctor: "Dr. Sarah Wilson"
  };

  const recoveryPhases = [
    { id: 1, title: 'Inflammation Control', status: 'Completed', date: 'Weeks 1-2', details: 'Focused on reducing swelling and protecting the ligament.' },
    { id: 2, title: 'Range of Motion', status: 'Current', date: 'Weeks 3-6', details: 'Regaining full extension and 120° flexion through guided mobility.' },
    { id: 3, title: 'Strength Building', status: 'Upcoming', date: 'Weeks 7-10', details: 'Weight-bearing exercises and eccentric quad loading.' },
    { id: 4, title: 'Return to Sport', status: 'Upcoming', date: 'Weeks 11-12', details: 'Plyometrics, agility drills, and sport-specific movements.' },
  ];

  const toggleGoal = (id) => {
    setDailyGoals(dailyGoals.map(goal => 
      goal.id === id ? { ...goal, completed: !goal.completed } : goal
    ));
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-10">
      {/* Header Card */}
      <div className="bg-emerald-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl shadow-emerald-200">
        <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="flex items-center gap-2 text-emerald-300 mb-2">
              <Activity className="w-5 h-5 animate-pulse" />
              <span className="text-sm font-bold uppercase tracking-widest">Active Plan</span>
            </div>
            <h1 className="text-4xl font-bold mb-4">{planDetails.diagnosis}</h1>
            <div className="flex flex-wrap gap-4 text-sm text-emerald-100/80 font-medium">
              <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full border border-white/10">
                <Calendar className="w-4 h-4" /> Started {planDetails.startDate}
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full border border-white/10">
                <Target className="w-4 h-4" /> {planDetails.estimatedDuration} Plan
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20">
            <div className="flex justify-between items-end mb-4">
              <span className="text-sm font-medium">Recovery Progress</span>
              <span className="text-3xl font-black">{planDetails.progress}%</span>
            </div>
            <div className="h-3 bg-white/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-emerald-400 to-teal-300 rounded-full transition-all duration-1000 shadow-[0_0_15px_rgba(52,211,153,0.5)]" 
                style={{ width: `${planDetails.progress}%` }}
              />
            </div>
          </div>
        </div>
        <div className="absolute top-[-50%] right-[-10%] w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl" />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column: Roadmap */}
        <div className="lg:col-span-2 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              Recovery Roadmap
              <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-1 rounded-lg uppercase tracking-tighter">Phase {selectedPhase} of 4</span>
            </h2>
            <div className="space-y-4">
              {recoveryPhases.map((phase) => (
                <button 
                  key={phase.id} 
                  onClick={() => setSelectedPhase(phase.id)}
                  className={`w-full flex items-center gap-6 p-5 rounded-3xl border text-left transition-all duration-300 ${
                    selectedPhase === phase.id 
                    ? 'bg-white border-emerald-500 shadow-xl shadow-emerald-500/10 scale-[1.02]' 
                    : 'bg-white/50 border-slate-100 hover:border-emerald-200'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-colors ${
                    phase.status === 'Completed' ? 'bg-emerald-100 text-emerald-600' : 
                    selectedPhase === phase.id ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-400'
                  }`}>
                    {phase.status === 'Completed' ? <CheckCircle2 className="w-6 h-6" /> : <span className="font-bold">{phase.id}</span>}
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] font-black text-emerald-600/60 uppercase tracking-widest">{phase.date}</p>
                    <h3 className={`font-bold transition-colors ${selectedPhase === phase.id ? 'text-emerald-900' : 'text-slate-700'}`}>
                      {phase.title}
                    </h3>
                    {selectedPhase === phase.id && (
                      <p className="text-sm text-slate-500 mt-2 animate-in fade-in slide-in-from-top-1">
                        {phase.details}
                      </p>
                    )}
                  </div>
                  <ChevronRight className={`w-5 h-5 transition-transform ${selectedPhase === phase.id ? 'rotate-90 text-emerald-500' : 'text-slate-300'}`} />
                </button>
              ))}
            </div>
          </section>

          {/* Clinical Notes */}
          <section className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-2 h-full bg-emerald-500" />
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-emerald-50 rounded-xl text-emerald-600">
                <FileText className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Latest Clinical Notes</h2>
            </div>
            <p className="text-slate-600 leading-relaxed italic text-lg">
              "Patient is showing excellent progress in terminal knee extension. Focus for the next two weeks will be on eccentric quad strengthening and improving gait symmetry."
            </p>
            <div className="mt-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-xs">SW</div>
              <div>
                <p className="text-sm font-bold text-slate-900">{planDetails.doctor}</p>
                <p className="text-xs text-slate-400">Updated 2 days ago</p>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Interactive Checklist */}
        <div className="space-y-8">
          <section className="bg-emerald-50/50 p-6 rounded-[2.5rem] border border-emerald-100 shadow-inner">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-emerald-900 flex items-center gap-2">
                <Award className="w-5 h-5 text-emerald-600" /> Today's Goals
              </h3>
              <span className="text-[10px] font-bold text-emerald-600 bg-white px-2 py-1 rounded-lg">
                {dailyGoals.filter(g => g.completed).length}/{dailyGoals.length}
              </span>
            </div>
            
            <div className="space-y-3">
              {dailyGoals.map(goal => (
                <button 
                  key={goal.id} 
                  onClick={() => toggleGoal(goal.id)}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all border ${
                    goal.completed 
                    ? 'bg-emerald-500/5 border-emerald-200/50 opacity-75' 
                    : 'bg-white border-transparent shadow-sm hover:border-emerald-300'
                  }`}
                >
                  <div className={`shrink-0 transition-all ${goal.completed ? 'text-emerald-500 scale-110' : 'text-slate-300'}`}>
                    {goal.completed ? <CheckCircle2 className="w-6 h-6" /> : <Circle className="w-6 h-6" />}
                  </div>
                  <div className="flex-1 text-left">
                    <p className={`text-sm font-bold transition-all ${goal.completed ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
                      {goal.task}
                    </p>
                    <p className="text-[10px] text-emerald-600/60 font-black uppercase tracking-widest">{goal.time}</p>
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* Safety Alerts */}
          <section className="bg-rose-50 p-6 rounded-[2.5rem] border border-rose-100 relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center gap-2 text-rose-700 font-black mb-4 text-xs uppercase tracking-widest">
                <AlertCircle className="w-4 h-4" /> Safety Protocol
              </div>
              <div className="space-y-3">
                {[
                  "Pain exceeds 4/10 during exercise",
                  "Significant new swelling occurs",
                  "Feeling lightheaded or dizzy"
                ].map((alert, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-rose-600 font-medium">
                    <span className="mt-1 w-1 h-1 rounded-full bg-rose-400 shrink-0" />
                    {alert}
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute bottom-[-20%] right-[-10%] w-24 h-24 bg-rose-200/30 rounded-full blur-2xl" />
          </section>
        </div>
      </div>
    </div>
  );
};

export default PatientTreatmentPlan;