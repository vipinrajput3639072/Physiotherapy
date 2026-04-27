import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ShieldAlert,
  FileText,
  Settings,
  Camera,
  CheckCircle2,
  Lock,
  LogOut,
  ChevronRight,
  EyeOff,
  Bell,
  Smartphone,
} from "lucide-react";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("personal");

  const patientInfo = {
    name: "John Cooper",
    age: 28,
    bloodGroup: "O+",
    email: "j.cooper@example.com",
    phone: "+1 (555) 000-1234",
    location: "New York, NY",
    injury: "Post-ACL Reconstruction (Left Knee)",
    surgeryDate: "March 10, 2026",
    surgeon: "Dr. Robert Khanna",
  };

  // --- Tab Content Components ---

  const PersonalDetails = () => (
    <div className="space-y-10 animate-in fade-in duration-500">
      <section className="space-y-6">
        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <User className="w-5 h-5 text-indigo-600" /> Basic Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Full Name
            </label>
            <input
              type="text"
              defaultValue={patientInfo.name}
              className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Email Address
            </label>
            <input
              type="email"
              defaultValue={patientInfo.email}
              className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Phone Number
            </label>
            <input
              type="text"
              defaultValue={patientInfo.phone}
              className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Location
            </label>
            <input
              type="text"
              defaultValue={patientInfo.location}
              className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>
        </div>
      </section>

      <section className="bg-rose-50 p-8 rounded-[2.5rem] border border-rose-100 relative overflow-hidden">
        <div className="relative z-10 flex items-center gap-6">
          <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm">
            <ShieldAlert className="w-7 h-7 text-rose-500" />
          </div>
          <div>
            <h4 className="text-rose-900 font-black tracking-tight">
              Emergency Contact
            </h4>
            <p className="text-rose-700 text-sm font-bold mt-1">
              Jane Cooper (Spouse) • +1 (555) 999-8877
            </p>
          </div>
        </div>
      </section>
    </div>
  );

  const MedicalHistory = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
        <FileText className="w-5 h-5 text-indigo-600" /> Clinical Overview
      </h3>

      <div className="grid gap-4">
        {[
          {
            label: "Primary Condition",
            value: patientInfo.injury,
            status: "Ongoing",
          },
          {
            label: "Last Surgery",
            value: patientInfo.surgeryDate,
            status: "Completed",
          },
          {
            label: "Primary Surgeon",
            value: patientInfo.surgeon,
            status: "Assigned",
          },
          {
            label: "Blood Type",
            value: patientInfo.bloodGroup,
            status: "Verified",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="flex items-center justify-between p-6 bg-slate-50 rounded-[2rem] border border-slate-100"
          >
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase">
                {item.label}
              </p>
              <p className="text-sm font-black text-slate-900 mt-1">
                {item.value}
              </p>
            </div>
            <span className="px-3 py-1 bg-white rounded-lg text-[9px] font-black text-indigo-600 border border-indigo-50 uppercase shadow-sm">
              {item.status}
            </span>
          </div>
        ))}
      </div>

      <div className="p-6 border-2 border-dashed border-slate-200 rounded-[2rem] flex flex-col items-center justify-center text-center space-y-3 py-12">
        <div className="p-4 bg-slate-100 rounded-full text-slate-400">
          <FileText className="w-8 h-8" />
        </div>
        <div>
          <p className="font-bold text-slate-900">Upload Lab Reports</p>
          <p className="text-xs text-slate-400">PDF, JPG up to 10MB</p>
        </div>
        <button className="px-6 py-2 bg-white border border-slate-200 rounded-xl text-xs font-black text-slate-600 hover:bg-slate-50">
          Choose File
        </button>
      </div>
    </div>
  );

  const AccountSettings = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
        <Settings className="w-5 h-5 text-indigo-600" /> Preferences
      </h3>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-6 bg-white border border-slate-100 rounded-[2rem]">
          <div className="flex items-center gap-4">
            <Bell className="w-5 h-5 text-slate-400" />
            <div>
              <p className="text-sm font-black text-slate-900">
                Push Notifications
              </p>
              <p className="text-xs text-slate-400">
                Reminders for therapy & meds
              </p>
            </div>
          </div>
          <div className="w-12 h-6 bg-indigo-600 rounded-full relative cursor-pointer">
            <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-md" />
          </div>
        </div>

        <div className="flex items-center justify-between p-6 bg-white border border-slate-100 rounded-[2rem]">
          <div className="flex items-center gap-4">
            <Smartphone className="w-5 h-5 text-slate-400" />
            <div>
              <p className="text-sm font-black text-slate-900">SMS Alerts</p>
              <p className="text-xs text-slate-400">
                Billing and appointment updates
              </p>
            </div>
          </div>
          <div className="w-12 h-6 bg-slate-200 rounded-full relative cursor-pointer">
            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-md" />
          </div>
        </div>
      </div>
    </div>
  );

  const Security = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
        <Lock className="w-5 h-5 text-indigo-600" /> Security Settings
      </h3>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            Current Password
          </label>
          <div className="relative">
            <input
              type="password"
              placeholder="••••••••"
              className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-700 outline-none"
            />
            <EyeOff className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            New Password
          </label>
          <input
            type="password"
            placeholder="Min. 8 characters"
            className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-700 outline-none"
          />
        </div>

        <div className="p-6 bg-indigo-50 rounded-[2rem] border border-indigo-100 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white rounded-xl shadow-sm text-indigo-600">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-black text-indigo-900">
                Two-Factor Authentication
              </p>
              <p className="text-xs text-indigo-600">
                Add an extra layer of security
              </p>
            </div>
          </div>
          <button className="text-xs font-black text-indigo-600 hover:underline">
            Enable
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen w-full bg-[#f8fafc] p-4 md:p-8 lg:pl-12">
      <div className="max-w-[1200px] mx-auto space-y-8">
        {/* Profile Header Card */}
        <div className="bg-white rounded-[3rem] p-8 border border-slate-100 shadow-sm relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div className="relative group">
              <div className="w-32 h-32 rounded-[2.5rem] bg-indigo-100 border-4 border-white shadow-xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=200"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <button className="absolute -bottom-2 -right-2 p-3 bg-indigo-600 text-white rounded-2xl shadow-lg hover:scale-110 transition-transform">
                <Camera className="w-4 h-4" />
              </button>
            </div>

            <div className="text-center md:text-left space-y-2">
              <div className="flex flex-col md:flex-row items-center gap-3">
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                  {patientInfo.name}
                </h1>
                <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase rounded-lg border border-emerald-100">
                  Active Recovery
                </span>
              </div>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-slate-500 font-medium text-sm">
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" /> {patientInfo.location}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" /> Joined Feb 2026
                </span>
              </div>
            </div>

            <div className="flex gap-4 md:ml-auto">
              <div className="text-center px-6 py-4 bg-slate-50 rounded-3xl border border-slate-100">
                <p className="text-[10px] font-black text-slate-400 uppercase">
                  Age
                </p>
                <p className="text-xl font-black text-slate-900">
                  {patientInfo.age}
                </p>
              </div>
              <div className="text-center px-6 py-4 bg-slate-50 rounded-3xl border border-slate-100">
                <p className="text-[10px] font-black text-slate-400 uppercase">
                  Blood
                </p>
                <p className="text-xl font-black text-rose-600">
                  {patientInfo.bloodGroup}
                </p>
              </div>
            </div>
          </div>
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-50 rounded-full blur-3xl opacity-50" />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Navigation Sidebar */}
          <div className="space-y-4">
            {[
              { id: "personal", label: "Personal Details", icon: User },
              { id: "medical", label: "Medical History", icon: FileText },
              { id: "settings", label: "Account Settings", icon: Settings },
              { id: "security", label: "Security", icon: Lock },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center justify-between p-5 rounded-[2rem] font-bold text-sm transition-all ${
                  activeTab === tab.id
                    ? "bg-indigo-600 text-white shadow-xl shadow-indigo-100 scale-[1.02]"
                    : "bg-white text-slate-500 hover:bg-slate-50 border border-slate-100"
                }`}
              >
                <div className="flex items-center gap-4">
                  <tab.icon className="w-5 h-5" />
                  {tab.label}
                </div>
                <ChevronRight
                  className={`w-4 h-4 ${activeTab === tab.id ? "opacity-100" : "opacity-0"}`}
                />
              </button>
            ))}

           
          </div>

          {/* Dynamic Content Card */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm min-h-[500px]">
              {activeTab === "personal" && <PersonalDetails />}
              {activeTab === "medical" && <MedicalHistory />}
              {activeTab === "settings" && <AccountSettings />}
              {activeTab === "security" && <Security />}

              <div className="mt-12 pt-8 border-t border-slate-50">
                <button className="w-full py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-slate-800 transition-all shadow-xl flex items-center justify-center gap-3 active:scale-95">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" /> Save
                  Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
