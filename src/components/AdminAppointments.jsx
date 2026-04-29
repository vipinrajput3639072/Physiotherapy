import React, { useState } from "react";
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
    <div className="md:ml-64 min-h-screen bg-gray-50/50 p-6 lg:p-10 animate-in fade-in duration-500">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* --- COMPACT HEADER --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
          <div>
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">
              Appointment <span className="text-blue-600">Ledger</span>
            </h1>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mt-1">
              {filteredAppointments.length} {activeTab} Records Found
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-gray-100 p-1 rounded-xl">
            {["pending", "approved", "cancelled"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
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

        {/* --- COMPACT SEARCH BAR --- */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name..."
              className="w-full pl-11 pr-4 py-3 bg-white border border-gray-100 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-600 outline-none text-sm font-medium"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center justify-center gap-2 px-6 py-3 bg-white border border-gray-100 rounded-xl shadow-sm font-bold text-xs text-gray-600 hover:bg-gray-50 transition-all">
            <Filter className="w-4 h-4" />
            Filter Date
          </button>
        </div>

        {/* --- COMPACT APPOINTMENT LIST --- */}
        <div className="grid grid-cols-1 gap-3">
          {filteredAppointments.length > 0 ? (
            filteredAppointments.map((app) => (
              <div
                key={app.id}
                className="bg-white px-5 py-3.5 rounded-[1.5rem] shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-blue-100 hover:shadow-md transition-all group"
              >
                {/* Left: Patient Info */}
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                    app.status === "pending" ? "bg-amber-50 text-amber-600" :
                    app.status === "approved" ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                  }`}>
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm leading-tight">{app.patient}</h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="flex items-center gap-1 text-[11px] font-medium text-gray-500">
                        <User className="w-3 h-3 text-blue-500" /> {app.therapist}
                      </span>
                      <span className="text-[9px] font-black uppercase text-blue-600 tracking-tighter bg-blue-50 px-1.5 rounded">
                        {app.type}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Middle: Schedule Info */}
                <div className="flex items-center gap-8 lg:gap-12">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Schedule</span>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <Clock className="w-3.5 h-3.5 text-blue-500" />
                      <span className="text-xs font-bold text-gray-700">{app.date} | {app.time}</span>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex items-center gap-2">
                    {app.status === "pending" && (
                      <>
                        <button
                          onClick={() => handleStatusChange(app.id, "approved")}
                          className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 text-white rounded-lg text-[10px] font-black uppercase hover:bg-emerald-700 transition-all active:scale-95 shadow-sm shadow-emerald-100"
                        >
                          <Check className="w-3.5 h-3.5" /> Approve
                        </button>
                        <button
                          onClick={() => handleStatusChange(app.id, "cancelled")}
                          className="flex items-center gap-1.5 px-4 py-2 bg-white border border-rose-100 text-rose-600 rounded-lg text-[10px] font-black uppercase hover:bg-rose-50 transition-all active:scale-95"
                        >
                          <X className="w-3.5 h-3.5" /> Cancel
                        </button>
                      </>
                    )}

                    {app.status === "approved" && (
                      <button className="flex items-center gap-1.5 px-4 py-2 bg-gray-900 text-white rounded-lg text-[10px] font-black uppercase hover:bg-black transition-all">
                        <RefreshCw className="w-3.5 h-3.5" /> Reschedule
                      </button>
                    )}

                    <button className="p-2 hover:bg-gray-50 rounded-lg text-gray-300 hover:text-gray-600 transition-colors">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            /* COMPACT EMPTY STATE */
            <div className="bg-white py-16 rounded-[2rem] border-2 border-dashed border-gray-100 flex flex-col items-center justify-center text-gray-400">
              <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                <AlertCircle className="w-6 h-6 opacity-20" />
              </div>
              <p className="font-black text-[10px] uppercase tracking-[0.2em] text-gray-900">
                No {activeTab} Bookings
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentManagement;