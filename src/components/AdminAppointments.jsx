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
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      {/* --- Header & Stats --- */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Appointment Ledger
          </h1>
          <p className="text-sm text-gray-500 font-medium">
            Manage bookings, reschedules, and clinical flow
          </p>
        </div>

        <div className="flex items-center gap-2 bg-gray-50 p-1.5 rounded-2xl">
          {["pending", "approved", "cancelled"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === tab
                  ? "bg-white text-gray-900 shadow-sm"
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
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search patient or therapist..."
            className="w-full pl-12 pr-4 py-4 bg-white border-none rounded-[1.5rem] shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="flex items-center justify-center gap-2 px-6 py-4 bg-white rounded-[1.5rem] shadow-sm font-bold text-gray-600 hover:bg-gray-50 transition-all">
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
              className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-indigo-100 transition-all group"
            >
              <div className="flex items-center gap-5">
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                    app.status === "pending"
                      ? "bg-amber-50 text-amber-600"
                      : app.status === "approved"
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-rose-50 text-rose-600"
                  }`}
                >
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">
                    {app.patient}
                  </h3>
                  <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                    <span className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5" /> {app.therapist}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-gray-300" />
                    <span className="text-indigo-600 font-semibold">
                      {app.type}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-8">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    Schedule
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-bold text-gray-700">
                      {app.date} • {app.time}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {app.status === "pending" && (
                    <>
                      <button
                        onClick={() => handleStatusChange(app.id, "approved")}
                        className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition-all"
                      >
                        <Check className="w-4 h-4" /> Approve
                      </button>
                      <button
                        onClick={() => handleStatusChange(app.id, "cancelled")}
                        className="flex items-center gap-2 px-5 py-2.5 bg-white border border-rose-100 text-rose-600 rounded-xl text-xs font-bold hover:bg-rose-50 transition-all"
                      >
                        <X className="w-4 h-4" /> Cancel
                      </button>
                    </>
                  )}

                  {app.status === "approved" && (
                    <button className="flex items-center gap-2 px-5 py-2.5 bg-gray-100 text-gray-600 rounded-xl text-xs font-bold hover:bg-gray-200 transition-all">
                      <RefreshCw className="w-4 h-4" /> Reschedule
                    </button>
                  )}

                  <button className="p-2.5 hover:bg-gray-50 rounded-xl text-gray-400">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white py-20 rounded-[3rem] border-2 border-dashed border-gray-100 flex flex-col items-center justify-center text-gray-400">
            <AlertCircle className="w-12 h-12 mb-4 opacity-20" />
            <p className="font-medium text-lg">
              No {activeTab} appointments found
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentManagement;
