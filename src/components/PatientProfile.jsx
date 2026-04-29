import React, { useState } from "react";
import {
  User, Mail, Phone, MapPin, Calendar, ShieldAlert, FileText, Settings,
  Camera, CheckCircle2, Lock, LogOut, ChevronRight, EyeOff, Bell,
  Smartphone, History, Users, Activity, Clock
} from "lucide-react";

const Profile = () => {
  // 1. All Patients Data (History)
  const allPatients = [
    {
      id: 1,
      name: "John Cooper",
      age: 28,
      bloodGroup: "O+",
      email: "j.cooper@example.com",
      phone: "+1 (555) 000-1234",
      location: "Agra, UP",
      injury: "Post-ACL Reconstruction",
      surgeryDate: "March 10, 2026",
      surgeon: "Dr. Robert Khanna",
      status: "Active Recovery",
      image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=200"
    },
    {
      id: 2,
      name: "Sarah Ahmed",
      age: 34,
      bloodGroup: "A-",
      email: "sarah.a@example.com",
      phone: "+91 98765-43210",
      location: "Sanjay Place, Agra",
      injury: "Frozen Shoulder (Right)",
      surgeryDate: "N/A",
      surgeon: "Dr. Amit Singh",
      status: "Physiotherapy",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200"
    },
    {
      id: 3,
      name: "Rajesh Kumar",
      age: 52,
      bloodGroup: "B+",
      email: "rajesh.k@example.com",
      phone: "+91 70001-22334",
      location: "Dayalbagh, Agra",
      injury: "Lower Back Chronic Pain",
      surgeryDate: "Jan 15, 2026",
      surgeon: "Dr. Robert Khanna",
      status: "Maintenance",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200"
    }
  ];

  // 2. States for Active Patient and Tab
  const [activeTab, setActiveTab] = useState("personal");
  const [selectedPatient, setSelectedPatient] = useState(allPatients[0]);

  // --- Sub-Components ---

  const ProfileHistory = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
        <History className="w-5 h-5 text-indigo-600" /> Visit History
      </h3>
      <div className="space-y-4">
        {[
          { date: "24 April 2026", task: "Physical Assessment", type: "Clinic Visit" },
          { date: "18 April 2026", task: "Electrotherapy Session", type: "Home Visit" },
          { date: "10 April 2026", task: "Exercise Protocol Setup", type: "Clinic Visit" },
        ].map((log, i) => (
          <div key={i} className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white rounded-xl shadow-sm"><Clock className="w-4 h-4 text-indigo-500" /></div>
              <div>
                <p className="text-sm font-black text-slate-900">{log.task}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{log.date}</p>
              </div>
            </div>
            <span className="text-[9px] font-black px-2 py-1 bg-indigo-50 text-indigo-600 rounded-md uppercase">{log.type}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const PersonalDetails = () => (
    <div className="space-y-10 animate-in fade-in duration-500">
      <section className="space-y-6">
        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <User className="w-5 h-5 text-indigo-600" /> Basic Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase">Full Name</label>
            <input type="text" readOnly value={selectedPatient.name} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-700 outline-none" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase">Injury Details</label>
            <input type="text" readOnly value={selectedPatient.injury} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-700 outline-none" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase">Contact Number</label>
            <input type="text" readOnly value={selectedPatient.phone} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-700 outline-none" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase">Assigned Surgeon</label>
            <input type="text" readOnly value={selectedPatient.surgeon} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-700 outline-none" />
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <div className="min-h-screen w-full bg-[#f8fafc] p-4 md:p-8">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        {/* LEFT SIDEBAR: Patient List (The History Switcher) */}
        <div className="xl:col-span-3 space-y-6">
          <div className="bg-white rounded-[2.5rem] p-6 border border-slate-100 shadow-sm">
            <h2 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
              <Users className="w-5 h-5 text-indigo-600" /> Patient Directory
            </h2>
            <div className="space-y-3">
              {allPatients.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedPatient(p)}
                  className={`w-full flex items-center gap-4 p-3 rounded-2xl transition-all border ${
                    selectedPatient.id === p.id 
                    ? "bg-indigo-50 border-indigo-100 ring-2 ring-indigo-500/10" 
                    : "bg-white border-transparent hover:bg-slate-50"
                  }`}
                >
                  <img src={p.image} className="w-10 h-10 rounded-xl object-cover" alt="" />
                  <div className="text-left overflow-hidden">
                    <p className={`text-sm font-black truncate ${selectedPatient.id === p.id ? "text-indigo-900" : "text-slate-700"}`}>
                      {p.name}
                    </p>
                    <p className="text-[10px] font-bold text-slate-400 truncate">{p.injury}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* MAIN CONTENT AREA */}
        <div className="xl:col-span-9 space-y-8">
          {/* Header Card */}
          <div className="bg-white rounded-[3rem] p-8 border border-slate-100 shadow-sm relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
              <div className="w-32 h-32 rounded-[2.5rem] bg-indigo-100 border-4 border-white shadow-xl overflow-hidden">
                <img src={selectedPatient.image} alt="Profile" className="w-full h-full object-cover transition-all duration-500 scale-105" key={selectedPatient.id} />
              </div>
              <div className="text-center md:text-left flex-1">
                <div className="flex flex-col md:flex-row items-center gap-3">
                  <h1 className="text-3xl font-black text-slate-900 tracking-tight">{selectedPatient.name}</h1>
                  <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase rounded-lg border border-emerald-100">
                    {selectedPatient.status}
                  </span>
                </div>
                <div className="flex flex-wrap justify-center md:justify-start gap-4 text-slate-500 font-medium text-sm mt-2">
                  <span className="flex items-center gap-1"><MapPin className="w-4 h-4 text-indigo-500" /> {selectedPatient.location}</span>
                  <span className="flex items-center gap-1"><Activity className="w-4 h-4 text-indigo-500" /> {selectedPatient.bloodGroup} Group</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Tabs Navigation */}
            <div className="space-y-3">
              {[
                { id: "personal", label: "Overview", icon: User },
                { id: "history", label: "Treatment History", icon: History },
                { id: "medical", label: "Clinical Records", icon: FileText },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center justify-between p-5 rounded-[2rem] font-bold text-sm transition-all ${
                    activeTab === tab.id
                      ? "bg-indigo-600 text-white shadow-xl shadow-indigo-100"
                      : "bg-white text-slate-500 border border-slate-100 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-4"><tab.icon className="w-5 h-5" />{tab.label}</div>
                  <ChevronRight className={`w-4 h-4 ${activeTab === tab.id ? "opacity-100" : "opacity-0"}`} />
                </button>
              ))}
            </div>

            {/* Dynamic Content */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm min-h-[450px]">
                {activeTab === "personal" && <PersonalDetails />}
                {activeTab === "history" && <ProfileHistory />}
                {activeTab === "medical" && (
                  <div className="text-center py-20 text-slate-400 font-bold">
                    Medical documents for {selectedPatient.name} are being loaded...
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;