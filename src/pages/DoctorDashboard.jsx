import { useEffect } from 'react';
import DashboardCard from '../components/DashboardCard';
import { fakeData } from '../utils/fakeData';
import { Users, CalendarDays, FileText, Clock, ClipboardList } from 'lucide-react';
import toast from 'react-hot-toast';

const DoctorDashboard = () => {
  useEffect(() => {
    toast.success('Welcome to Doctor Dashboard!');
  }, []);

  const upcomingPatients = fakeData.doctor.patients.length;
  const availableSlots = fakeData.doctor.schedule.filter((slot) => slot.patient === 'Free').length;
  const nextAppointment = fakeData.doctor.schedule.find((slot) => slot.patient !== 'Free');

  return (
    <div className="space-y-8">
      {/* Doctor Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="Today's Appointments"
          value="5"
          change={2}
          trend="up"
          icon={CalendarDays}
          color="from-indigo-500 to-purple-600"
        />
        <DashboardCard
          title="Active Patients"
          value="23"
          change={3}
          trend="up"
          icon={Users}
          color="from-teal-500 to-emerald-600"
        />
        <DashboardCard
          title="Reports Pending"
          value="4"
          change={-1}
          trend="up"
          icon={FileText}
          color="from-amber-500 to-orange-600"
        />
        <DashboardCard
          title="Avg Session Time"
          value="45min"
          change={-5}
          trend="up"
          icon={Clock}
          color="from-pink-500 to-rose-600"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border border-white/50 bg-white/80 p-8 shadow-xl backdrop-blur-md">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Careload Overview</p>
              <h2 className="mt-2 text-2xl font-bold text-slate-900">Today at a glance</h2>
            </div>
            <ClipboardList className="h-10 w-10 text-indigo-500" />
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl bg-indigo-50 p-5">
              <p className="text-sm text-slate-600">Patients due today</p>
              <p className="mt-2 text-3xl font-black text-slate-900">{upcomingPatients}</p>
            </div>
            <div className="rounded-2xl bg-emerald-50 p-5">
              <p className="text-sm text-slate-600">Open slots</p>
              <p className="mt-2 text-3xl font-black text-slate-900">{availableSlots}</p>
            </div>
            <div className="rounded-2xl bg-orange-50 p-5">
              <p className="text-sm text-slate-600">Next session</p>
              <p className="mt-2 text-3xl font-black text-slate-900">{nextAppointment?.time ?? '--'}</p>
            </div>
          </div>
        </div>
        <div className="rounded-3xl border border-white/50 bg-slate-950 p-8 text-white shadow-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">Priority Focus</p>
          <h2 className="mt-3 text-2xl font-bold">Next patient</h2>
          <p className="mt-4 text-3xl font-black">{nextAppointment?.patient ?? 'No appointment'}</p>
          <p className="mt-2 text-slate-300">{nextAppointment?.type ?? 'Schedule clear'}</p>
          <div className="mt-6 rounded-2xl bg-white/10 p-4 text-sm text-slate-200">
            Keep reports updated between sessions so the admin view stays current and patients see accurate progress notes.
          </div>
        </div>
      </div>

      {/* Patients Today & Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Today's Patients */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/50">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            Today's Patients
          </h2>
          <div className="space-y-4">
            {fakeData.doctor.patients.map((patient) => (
              <div key={patient.name} className="flex items-center gap-4 p-5 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100 hover:shadow-md transition-all">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center text-white font-bold text-lg">
                  {patient.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900">{patient.name}</h3>
                  <p className="text-sm text-gray-600">{patient.status}</p>
                </div>
                <span className="px-3 py-1 bg-white text-indigo-700 rounded-full text-sm font-medium">
                  {patient.nextAppt}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Schedule */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/50 space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            Schedule
          </h2>
          <div className="space-y-3">
            {fakeData.doctor.schedule.map((slot, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-teal-50 to-emerald-50 rounded-xl border">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    slot.patient === 'Free' ? 'bg-green-500' : 'bg-orange-500'
                  }`} />
                  <span className="font-mono text-lg">{slot.time}</span>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${
                    slot.patient === 'Free' ? 'text-green-800' : 'text-gray-900'
                  }`}>
                    {slot.patient}
                  </p>
                  <p className="text-sm text-gray-600">{slot.type}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button className="group relative overflow-hidden rounded-3xl p-8 bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02]">
          <div className="absolute inset-0 bg-white/20 group-hover:bg-white/30 transition-all" />
          <div className="relative z-10 text-center">
            <Users className="w-16 h-16 mx-auto mb-4 opacity-90" />
            <h3 className="text-2xl font-bold mb-2">Add Patient</h3>
            <p className="opacity-90">Register new patient</p>
          </div>
        </button>
        <button className="group relative overflow-hidden rounded-3xl p-8 bg-gradient-to-br from-green-500 to-teal-600 text-white shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02]">
          <div className="absolute inset-0 bg-white/20 group-hover:bg-white/30 transition-all" />
          <div className="relative z-10 text-center">
            <CalendarDays className="w-16 h-16 mx-auto mb-4 opacity-90" />
            <h3 className="text-2xl font-bold mb-2">New Appointment</h3>
            <p className="opacity-90">Schedule session</p>
          </div>
        </button>
        <button className="group relative overflow-hidden rounded-3xl p-8 bg-gradient-to-br from-orange-500 to-red-600 text-white shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02]">
          <div className="absolute inset-0 bg-white/20 group-hover:bg-white/30 transition-all" />
          <div className="relative z-10 text-center">
            <FileText className="w-16 h-16 mx-auto mb-4 opacity-90" />
            <h3 className="text-2xl font-bold mb-2">Generate Report</h3>
            <p className="opacity-90">Patient progress</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default DoctorDashboard;

