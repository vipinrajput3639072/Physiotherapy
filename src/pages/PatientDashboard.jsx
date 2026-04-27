import { useEffect } from 'react';
import { Calendar } from 'react-calendar';
import DashboardCard from '../components/DashboardCard';
import { fakeData } from '../utils/fakeData';
import { CalendarDays, CheckCircle, Activity, HeartPulse, ArrowUpRight } from 'lucide-react';
import toast from 'react-hot-toast';
import 'react-calendar/dist/Calendar.css';

const PatientDashboard = () => {
  useEffect(() => {
    toast.success('Welcome back!');
  }, []);

  const nextAppointment = fakeData.patient.appointments[0];
  const completedExercises = fakeData.patient.progress.filter((item) => item.completed >= 60).length;

  return (
    <div className="space-y-8 pb-10"> {/* Added padding bottom for breathing room */}
      {/* Progress Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard
          title="Sessions Completed"
          value="28"
          change={18}
          trend="up"
          icon={CheckCircle}
          color="from-emerald-500 to-green-600"
        />
        <DashboardCard
          title="Goal Progress"
          value="78%"
          change={12}
          trend="up"
          icon={Activity}
          color="from-blue-500 to-cyan-600"
        />
        <DashboardCard
          title="Pain Level"
          value="2.3/10"
          change={-25}
          trend="down"
          icon={HeartPulse}
          color="from-orange-400 to-red-500"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-white/50 bg-white/80 p-8 shadow-xl backdrop-blur-md">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Recovery Snapshot</p>
          <h2 className="mt-2 text-2xl font-bold text-slate-900">Stay on top of the next milestone</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl bg-orange-50 p-5">
              <p className="text-sm text-slate-600">Next session</p>
              <p className="mt-2 text-xl font-black text-slate-900">{nextAppointment.date}</p>
            </div>
            <div className="rounded-2xl bg-blue-50 p-5">
              <p className="text-sm text-slate-600">Doctor</p>
              <p className="mt-2 text-xl font-black text-slate-900 truncate">{nextAppointment.doctor}</p>
            </div>
            <div className="rounded-2xl bg-emerald-50 p-5">
              <p className="text-sm text-slate-600">On Track</p>
              <p className="mt-2 text-xl font-black text-slate-900">{completedExercises}/{fakeData.patient.progress.length}</p>
            </div>
          </div>
        </div>
        
        <div className="rounded-3xl bg-slate-950 p-8 text-white shadow-xl flex flex-col justify-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">Coach Note</p>
          <h2 className="mt-3 text-2xl font-bold">Consistency is improving</h2>
          <p className="mt-4 text-slate-300">
            You are maintaining strong completion. Keep your daily exercise streak locked in.
          </p>
          <button className="mt-6 w-fit inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-semibold text-slate-900 transition hover:bg-slate-100">
            Review Plan
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upcoming Appointments */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/50 space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <CalendarDays className="w-8 h-8 text-orange-500" />
            Appointments
          </h2>
          {fakeData.patient.appointments.map((appt) => (
            <div key={appt.id} className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="w-14 h-14 bg-emerald-500 rounded-xl flex flex-col items-center justify-center text-white font-bold flex-shrink-0">
                <div className="text-lg leading-none">{appt.date.split('-')[2]}</div>
                <div className="text-[10px] uppercase">{appt.date.split('-')[1]}</div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-900 truncate">{appt.doctor}</h3>
                <p className="text-sm text-gray-500">{appt.time}</p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700">
                {appt.status}
              </span>
            </div>
          ))}
        </div>

        {/* Exercise Progress */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/50 space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Exercise Progress</h2>
          <div className="space-y-5">
            {fakeData.patient.progress.map((prog) => (
              <div key={prog.exercise}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-bold text-gray-700">{prog.exercise}</span>
                  <span className="text-emerald-600 font-bold">{prog.completed}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div 
                    className="bg-emerald-500 h-2 rounded-full transition-all duration-700"
                    style={{ width: `${prog.completed}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;