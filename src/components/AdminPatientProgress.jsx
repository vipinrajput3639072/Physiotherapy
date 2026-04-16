import { useState } from 'react';
import { 
  TrendingUp, Activity, Target, ChevronRight, 
  FileText, Calendar, Download, AlertCircle,
  Plus, ArrowUpRight, Thermometer, Footprints
} from 'lucide-react';
import toast from 'react-hot-toast';

const PatientProgress = () => {
  const [selectedPatient, setSelectedPatient] = useState('John Cooper');

  // Mock Progress Data
  const progressData = {
    patient: "John Cooper",
    condition: "Post-ACL Reconstruction",
    startDate: "Jan 12, 2026",
    overallRecovery: 72,
    metrics: [
      { label: 'Range of Motion', value: 85, trend: '+15%', icon: Activity, color: 'text-blue-600', bg: 'bg-blue-50' },
      { label: 'Muscle Strength', value: 64, trend: '+8%', icon: Target, color: 'text-purple-600', bg: 'bg-purple-50' },
      { label: 'Pain Reduction', value: 90, trend: '+5%', icon: Thermometer, color: 'text-rose-600', bg: 'bg-rose-50' },
      { label: 'Mobility/Gait', value: 55, trend: '+12%', icon: Footprints, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    ],
    timeline: [
      { date: 'Mar 15', event: 'Weight-bearing exercises started', status: 'completed' },
      { date: 'Mar 01', event: 'Range of motion hit 90 degrees', status: 'completed' },
      { date: 'Feb 15', event: 'Inflammation significantly reduced', status: 'completed' },
      { date: 'Apr 01', event: 'Running drills on treadmill', status: 'upcoming' },
    ]
  };

  return (
    <div className="flex-1 ml-72 overflow-y-auto space-y-8 animate-in fade-in duration-700 pb-12">
      {/* --- Header Section --- */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-3xl bg-indigo-600 flex items-center justify-center text-white shadow-xl shadow-indigo-100">
            <TrendingUp className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Patient Recovery Tracker</h1>
            <p className="text-sm text-gray-500 font-medium tracking-wide">Monitoring: <span className="text-indigo-600 font-bold">{progressData.patient}</span> • {progressData.condition}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => toast.success('Report generated')}
            className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-2xl font-bold hover:bg-black transition-all shadow-lg"
          >
            <Download className="w-4 h-4" />
            Download PDF Report
          </button>
        </div>
      </div>

      {/* --- Progress Grid --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {progressData.metrics.map((metric, i) => (
          <div key={i} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className={`${metric.bg} ${metric.color} p-3 rounded-2xl`}>
                <metric.icon className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-black bg-emerald-50 text-emerald-600 px-2 py-1 rounded-lg flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3" /> {metric.trend}
              </span>
            </div>
            <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest">{metric.label}</h3>
            <div className="flex items-end gap-2 mt-2">
              <p className="text-2xl font-black text-gray-900">{metric.value}%</p>
              <div className="flex-1 h-1.5 bg-gray-100 rounded-full mb-2 overflow-hidden">
                <div className={`h-full transition-all duration-1000 ${metric.color.replace('text', 'bg')}`} style={{ width: `${metric.value}%` }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* --- Visual Progress Chart (Placeholder) --- */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-bold text-gray-900 text-lg">Recovery Trend Line</h3>
            <div className="flex gap-4 text-xs font-bold">
              <span className="flex items-center gap-2 text-indigo-600">
                <div className="w-3 h-3 rounded-full bg-indigo-600" /> Mobility
              </span>
              <span className="flex items-center gap-2 text-gray-300">
                <div className="w-3 h-3 rounded-full bg-gray-300" /> Pain Level
              </span>
            </div>
          </div>
          <div className="h-72 bg-gray-50 rounded-[2rem] border-2 border-dashed border-gray-100 flex flex-col items-center justify-center text-gray-400 space-y-2">
            <Activity className="w-10 h-10 opacity-20" />
            <p className="text-sm italic">[Interactive Multi-Line Chart: Jan - Mar Progress]</p>
          </div>
        </div>

        {/* --- Recovery Timeline --- */}
        <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-900 text-lg mb-8">Clinical Milestones</h3>
          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-4 before:-z-10 before:h-full before:w-0.5 before:bg-gray-100">
            {progressData.timeline.map((item, i) => (
              <div key={i} className="flex gap-6 items-start">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-4 border-white shadow-sm ${
                  item.status === 'completed' ? 'bg-emerald-500 text-white' : 'bg-gray-200 text-gray-400'
                }`}>
                  {item.status === 'completed' ? <CheckCircle className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                </div>
                <div>
                  <p className="text-[10px] font-black text-indigo-500 uppercase tracking-tighter">{item.date}</p>
                  <p className={`text-sm font-bold ${item.status === 'completed' ? 'text-gray-900' : 'text-gray-400 italic'}`}>
                    {item.event}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <button className="w-full mt-10 py-4 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 text-xs font-bold hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
            <Plus className="w-4 h-4" /> Add Custom Milestone
          </button>
        </div>
      </div>
    </div>
  );
};

// Internal icon for the timeline
const CheckCircle = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
  </svg>
);

const Clock = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export default PatientProgress;