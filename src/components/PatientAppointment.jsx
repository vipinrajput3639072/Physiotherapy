import React from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Video,
  MoreVertical,
  Plus,
} from "lucide-react";
import { fakeData } from "../utils/fakeData";

const PatientAppointments = () => {
  // Pulling appointments from your existing fakeData
  const appointments = fakeData.patient.appointments;

  return (
    <div className="space-y-8 pb-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">My Appointments</h1>
          <p className="text-slate-500 mt-1">
            Manage and track your physical therapy sessions.
          </p>
        </div>
        <button className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-emerald-200">
          <Plus className="w-5 h-5" />
          Book New Session
        </button>
      </div>

      {/* Appointments List */}
      <div className="grid gap-6">
        {appointments.map((appt) => (
          <div
            key={appt.id}
            className="group relative bg-white border border-slate-100 p-6 rounded-3xl shadow-sm hover:shadow-xl hover:border-emerald-100 transition-all duration-300"
          >
            <div className="flex flex-col lg:flex-row lg:items-center gap-6">
              {/* Date Block */}
              <div className="flex flex-row lg:flex-col items-center justify-center bg-emerald-50 text-emerald-700 w-full lg:w-24 h-20 lg:h-24 rounded-2xl border border-emerald-100 shrink-0">
                <span className="text-3xl font-black">
                  {appt.date.split("-")[2]}
                </span>
                <span className="text-xs font-bold uppercase tracking-widest ml-2 lg:ml-0">
                  {new Date(appt.date).toLocaleString("default", {
                    month: "short",
                  })}
                </span>
              </div>

              {/* Main Info */}
              <div className="flex-1 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {appt.doctor}
                  </h3>
                  <span
                    className={`px-4 py-1.5 rounded-full text-xs font-bold ${
                      appt.status === "Confirmed"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {appt.status}
                  </span>
                </div>

                <div className="flex flex-wrap gap-y-2 gap-x-6 text-sm text-slate-500 font-medium">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-emerald-500" />
                    {appt.time}
                  </div>
                  <div className="flex items-center gap-2">
                    {/* Assuming sessions might be Video or Clinic based on status */}
                    {appt.status === "Confirmed" ? (
                      <>
                        <MapPin className="w-4 h-4 text-emerald-500" /> Main
                        Clinic - Suite 4
                      </>
                    ) : (
                      <>
                        <Video className="w-4 h-4 text-blue-500" /> Virtual
                        Session
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 lg:border-l lg:pl-6 border-slate-100">
                <button className="flex-1 lg:flex-none px-4 py-2 border border-slate-200 text-slate-600 rounded-xl font-semibold hover:bg-slate-50 transition-colors">
                  Reschedule
                </button>
                <button className="p-2 text-slate-400 hover:text-slate-600">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State / Notice */}
      <div className="bg-emerald-950 rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-xl font-bold">Preparation Tip</h2>
          <p className="mt-2 text-emerald-100/80 max-w-xl">
            Please wear comfortable clothing for your sessions and arrive 10
            minutes early to complete your daily check-in on the dashboard.
          </p>
        </div>
        <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl" />
      </div>
    </div>
  );
};

export default PatientAppointments;
