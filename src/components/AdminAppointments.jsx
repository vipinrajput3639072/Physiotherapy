import { useState } from "react";
import {
  Calendar,
  Clock,
  Check,
  X,
  MoreVertical,
  Filter,
  Search,
  User,
  RefreshCw,
  AlertCircle,
} from "lucide-react";
import toast from "react-hot-toast";

const AppointmentManagement = () => {
  const [activeTab, setActiveTab] = useState("pending");
  const [searchTerm, setSearchTerm] = useState("");

  // Mock Appointment Data
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patient: "John Cooper",
      therapist: "Dr. Sarah Jenkins",
      date: "2024-05-20",
      time: "10:00 AM",
      status: "pending",
      type: "Initial Assessment",
    },
    {
      id: 2,
      patient: "Maria Garcia",
      therapist: "Dr. Michael Chen",
      date: "2024-05-20",
      time: "11:30 AM",
      status: "approved",
      type: "Follow-up",
    },
    {
      id: 3,
      patient: "Robert Fox",
      therapist: "Dr. Elena Rodriguez",
      date: "2024-05-21",
      time: "02:00 PM",
      status: "pending",
      type: "Sports Therapy",
    },
  ]);

  // --- Handlers ---
  const handleStatusChange = (id, newStatus) => {
    setAppointments((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app)),
    );

    if (newStatus === "approved") toast.success("Appointment Approved");
    if (newStatus === "cancelled") toast.error("Appointment Cancelled");
  };

  const filteredAppointments = appointments.filter(
    (app) =>
      app.status === activeTab &&
      app.patient.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    /* Sidebar ke liye ml-72 aur background styling */
    <div className="ml-72 min-h-screen bg-gray-50/50 p-8 pt-10 animate-in fade-in duration-500">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* --- Header Section --- */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">
              Appointment <span className="text-blue-600">Ledger</span>
            </h1>
            <p className="text-gray-500 font-medium mt-1">
              Manage bookings, reschedules, and clinical flow
            </p>
          </div>

          <div className="flex items-center gap-2 bg-gray-100 p-1.5 rounded-2xl">
            {["pending", "approved", "cancelled"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  activeTab === tab
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* --- Search & Filter Bar --- */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search patient or therapist..."
              className="w-full pl-14 pr-6 py-4 bg-white border-none rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-600 outline-none text-sm font-medium"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center justify-center gap-3 px-8 py-4 bg-white rounded-2xl shadow-sm font-bold text-gray-600 hover:bg-gray-50 transition-all border border-transparent hover:border-gray-200">
            <Filter className="w-4 h-4" />
            Filter Date
          </button>
        </div>

        {/* --- Appointment List --- */}
        <div className="grid grid-cols-1 gap-4">
          {filteredAppointments.length > 0 ? (
            filteredAppointments.map((app) => (
              <div
                key={app.id}
                className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-blue-200 transition-all group"
              >
                <div className="flex items-center gap-6">
                  <div
                    className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center shadow-inner ${
                      app.status === "pending"
                        ? "bg-amber-50 text-amber-600"
                        : app.status === "approved"
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-rose-50 text-rose-600"
                    }`}
                  >
                    <Calendar className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-xl">
                      {app.patient}
                    </h3>
                    <div className="flex items-center gap-3 text-sm text-gray-500 mt-1 font-medium">
                      <span className="flex items-center gap-1.5">
                        <User className="w-4 h-4 text-blue-500" /> {app.therapist}
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-200" />
                      <span className="text-blue-600 font-black uppercase text-[10px] tracking-widest">
                        {app.type}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-12">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                      Schedule
                    </span>
                    <div className="flex items-center gap-2 mt-1.5">
                      <Clock className="w-4 h-4 text-blue-500" />
                      <span className="text-sm font-bold text-gray-700">
                        {app.date} • {app.time}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {app.status === "pending" && (
                      <>
                        <button
                          onClick={() => handleStatusChange(app.id, "approved")}
                          className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-emerald-700 shadow-lg shadow-emerald-100 transition-all active:scale-95"
                        >
                          <Check className="w-4 h-4" /> Approve
                        </button>
                        <button
                          onClick={() => handleStatusChange(app.id, "cancelled")}
                          className="flex items-center gap-2 px-6 py-3 bg-white border border-rose-100 text-rose-600 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-rose-50 transition-all active:scale-95"
                        >
                          <X className="w-4 h-4" /> Cancel
                        </button>
                      </>
                    )}

                    {app.status === "approved" && (
                      <button className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-black transition-all active:scale-95">
                        <RefreshCw className="w-4 h-4" /> Reschedule
                      </button>
                    )}

                    <button className="p-3 hover:bg-gray-50 rounded-xl text-gray-400 transition-colors">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            /* Empty State */
            <div className="bg-white py-24 rounded-[3rem] border-2 border-dashed border-gray-100 flex flex-col items-center justify-center text-gray-400">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                <AlertCircle className="w-10 h-10 opacity-20" />
              </div>
              <p className="font-bold text-xl text-gray-900 mb-1 uppercase tracking-widest text-[12px]">
                No {activeTab} Appointments
              </p>
              <p className="text-sm font-medium">Awaiting new patient bookings in this category.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentManagement;