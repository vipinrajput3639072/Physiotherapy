import { useState } from 'react';
import { 
  ClipboardList, Plus, Activity, // Changed 'activity' to 'Activity'
  CheckCircle2, Clock, ChevronRight, 
  Dumbbell, Zap, HeartPulse, MoreHorizontal, Search // Added Search icon
} from 'lucide-react';
import toast from 'react-hot-toast';

const TreatmentManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock Data for Treatment Plans
  const [plans, setPlans] = useState([
    { 
      id: 1, 
      patient: 'John Cooper', 
      treatment: 'ACL Post-Op Rehab', 
      therapist: 'Dr. Sarah Jenkins',
      sessionsDone: 8, 
      totalSessions: 12,
      lastSession: '2024-05-18',
      type: 'Orthopedic',
      intensity: 'High'
    },
    { 
      id: 2, 
      patient: 'Maria Garcia', 
      treatment: 'Chronic Back Pain Management', 
      therapist: 'Dr. Michael Chen',
      sessionsDone: 4, 
      totalSessions: 20,
      lastSession: '2024-05-19',
      type: 'Pain Management',
      intensity: 'Medium'
    },
    { 
      id: 3, 
      patient: 'Robert Fox', 
      treatment: 'Rotator Cuff Strengthening', 
      therapist: 'Dr. Elena Rodriguez',
      sessionsDone: 10, 
      totalSessions: 10,
      lastSession: '2024-05-15',
      status: 'Completed',
      type: 'Sports',
      intensity: 'Medium'
    },
  ]);

  // --- Search Logic ---
  const filteredPlans = plans.filter(plan => 
    plan.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plan.treatment.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      
      {/* --- Search and Action Bar --- */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text"
            placeholder="Search patient or treatment..."
            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-2xl shadow-sm outline-none focus:ring-2 focus:ring-orange-500"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <button 
          onClick={() => toast.success('Protocol builder opened')}
          className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-2xl font-bold hover:bg-orange-700 hover:shadow-lg transition-all active:scale-95"
        >
          <Plus className="w-5 h-5" />
          New Plan
        </button>
      </div>

      {/* --- Header Section --- */}
      <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900">Treatment Protocols</h1>
        <p className="text-sm text-gray-500 font-medium">Track recovery progress and session compliance</p>
      </div>

      {/* --- Treatment Cards --- */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {filteredPlans.map((plan) => (
          <div key={plan.id} className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 hover:shadow-md transition-all group">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                  plan.type === 'Sports' ? 'bg-blue-50 text-blue-600' : 
                  plan.type === 'Orthopedic' ? 'bg-purple-50 text-purple-600' : 'bg-rose-50 text-rose-600'
                }`}>
                  {plan.type === 'Sports' ? <Dumbbell className="w-6 h-6" /> : 
                   plan.type === 'Orthopedic' ? <Zap className="w-6 h-6" /> : <HeartPulse className="w-6 h-6" />}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg group-hover:text-orange-600 transition-colors">{plan.treatment}</h3>
                  <p className="text-sm text-gray-500 font-medium">Patient: {plan.patient}</p>
                </div>
              </div>
              <button className="p-2 hover:bg-gray-50 rounded-xl transition-colors">
                <MoreHorizontal className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* --- Progress Tracking --- */}
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-end">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span className="text-sm font-bold text-gray-700">Progress</span>
                </div>
                <span className="text-sm font-extrabold text-gray-900">
                  {Math.round((plan.sessionsDone / plan.totalSessions) * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-1000 ${
                    plan.sessionsDone === plan.totalSessions ? 'bg-emerald-500' : 'bg-orange-500'
                  }`}
                  style={{ width: `${(plan.sessionsDone / plan.totalSessions) * 100}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                <span>{plan.sessionsDone} Sessions Done</span>
                <span>{plan.totalSessions} Total Goal</span>
              </div>
            </div>

            {/* --- Meta Info --- */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                  <Clock className="w-4 h-4 text-gray-400" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase">Last Session</p>
                  <p className="text-xs font-bold text-gray-700">{plan.lastSession}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                  <ClipboardList className="w-4 h-4 text-gray-400" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase">Assignee</p>
                  <p className="text-xs font-bold text-gray-700 truncate">{plan.therapist}</p>
                </div>
              </div>
            </div>

            <button className="w-full mt-8 py-4 bg-gray-50 hover:bg-orange-50 hover:text-orange-600 rounded-2xl text-sm font-bold text-gray-600 transition-all flex items-center justify-center gap-2 group">
              View Detailed Session Logs
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TreatmentManagement; 