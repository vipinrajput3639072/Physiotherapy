import { useEffect } from 'react';
import { Calendar } from 'react-calendar';
import DashboardCard from '../components/DashboardCard';
import { fakeData } from '../utils/fakeData';
import { CalendarDays, CheckCircle, Activity, HeartPulse, ArrowUpRight } from 'lucide-react';
import toast from 'react-hot-toast';
import 'react-calendar/dist/Calendar.css';

const PatientDashboard = () => {
  useEffect(() => {
    toast.success('Welcome to your Patient Dashboard!');
  }, []);

  const nextAppointment = fakeData.patient.appointments[0];
  const completedExercises = fakeData.patient.progress.filter((item) => item.completed >= 60).length;

  return (
    <div className="space-y-8">
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
          trend="up"
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
              <p className="mt-2 text-2xl font-black text-slate-900">{nextAppointment.date}</p>
            </div>
            <div className="rounded-2xl bg-blue-50 p-5">
              <p className="text-sm text-slate-600">Assigned doctor</p>
              <p className="mt-2 text-2xl font-black text-slate-900">{nextAppointment.doctor}</p>
            </div>
            <div className="rounded-2xl bg-emerald-50 p-5">
              <p className="text-sm text-slate-600">Exercises on track</p>
              <p className="mt-2 text-2xl font-black text-slate-900">{completedExercises}/{fakeData.patient.progress.length}</p>
            </div>
          </div>
        </div>
        <div className="rounded-3xl bg-slate-950 p-8 text-white shadow-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">Coach Note</p>
          <h2 className="mt-3 text-2xl font-bold">Consistency is improving</h2>
          <p className="mt-4 text-slate-300">
            You are maintaining strong completion across your current therapy plan. Keep the next appointment and daily exercise streak locked in.
          </p>
          <button className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-semibold text-slate-900 transition hover:bg-slate-100">
            Review Plan
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Appointments & Progress Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upcoming Appointments */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/50 space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <CalendarDays className="w-8 h-8 text-orange-500" />
            Upcoming Appointments
          </h2>
          {fakeData.patient.appointments.map((appt) => (
            <div key={appt.id} className="flex items-center gap-4 p-6 bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl border border-orange-100">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex flex-col items-center justify-center text-white font-bold">
                <div className="text-2xl">{appt.date.split('-')[2]}</div>
                <div className="text-xs">{appt.date.split('-')[1]}</div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-xl text-gray-900 truncate">{appt.doctor}</h3>
                <p className="text-gray-600">{appt.time}</p>
              </div>
              <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                appt.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {appt.status}
              </span>
            </div>
          ))}
        </div>

        {/* Exercise Progress */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/50 space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Exercise Progress</h2>
          <div className="space-y-4">
            {fakeData.patient.progress.map((prog) => (
              <div key={prog.exercise} className="p-6 rounded-2xl bg-gradient-to-r from-gray-50 to-gray-100 border">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-lg">{prog.exercise}</h3>
                    <p className="text-sm text-gray-600">Goal: {prog.goal} sessions</p>
                  </div>
                  <span className="font-bold text-2xl text-gray-900">{prog.completed}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className={`bg-gradient-to-r from-blue-500 to-cyan-500 h-3 rounded-full transition-all duration-500`}
                    style={{ width: `${prog.completed}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Calendar */}
      <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/50">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Sessions Calendar</h2>
        <Calendar 
          tileClassName={({ date }) => date.getDate() === 20 ? 'bg-orange-500 text-white rounded-full' : ''}
        />
      </div>
    </div>
  );
};

export default PatientDashboard;

