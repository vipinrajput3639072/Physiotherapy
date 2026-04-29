import React, { useState } from "react";
import { 
  User, Bell, Lock, Eye, Globe, ShieldCheck, 
  Trash2, Save, Smartphone, Mail, ChevronRight 
} from "lucide-react";

const PatientSettings = () => {
  const [activeSection, setActiveSection] = useState("account");

  // --- Setting Sections Components ---

  const AccountSettings = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Username</label>
          <input type="text" placeholder="johndoe_26" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-700 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all" />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Language</label>
          <select className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-700 outline-none">
            <option>English (US)</option>
            <option>Hindi</option>
          </select>
        </div>
      </div>

      <div className="p-6 bg-indigo-50 rounded-[2rem] border border-indigo-100 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white rounded-xl shadow-sm text-indigo-600"><Globe size={20} /></div>
          <div>
            <p className="text-sm font-black text-indigo-900">Public Profile</p>
            <p className="text-xs text-indigo-600/70 font-medium">Allow doctors to find your profile in the directory</p>
          </div>
        </div>
        <div className="w-12 h-6 bg-indigo-600 rounded-full relative cursor-pointer">
          <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-md" />
        </div>
      </div>
    </div>
  );

  const NotificationSettings = () => (
    <div className="space-y-4 animate-in fade-in duration-500">
      {[
        { title: "Appointment Reminders", desc: "Get notified 2 hours before your session", icon: Bell, active: true },
        { title: "Exercise Alerts", desc: "Daily reminders for your prescribed stretches", icon: Smartphone, active: true },
        { title: "Newsletter & Tips", desc: "Health blogs and clinic updates via email", icon: Mail, active: false }
      ].map((item, i) => (
        <div key={i} className="flex items-center justify-between p-6 bg-white border border-slate-100 rounded-[2rem] hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-slate-50 rounded-xl text-slate-400"><item.icon size={20} /></div>
            <div>
              <p className="text-sm font-black text-slate-900">{item.title}</p>
              <p className="text-xs text-slate-400 font-medium">{item.desc}</p>
            </div>
          </div>
          <div className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${item.active ? 'bg-emerald-500' : 'bg-slate-200'}`}>
            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-md transition-all ${item.active ? 'right-1' : 'left-1'}`} />
          </div>
        </div>
      ))}
    </div>
  );

  const SecuritySettings = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="p-6 border-2 border-dashed border-slate-200 rounded-[2rem] space-y-4">
        <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
          <Lock size={16} className="text-indigo-600" /> Password Management
        </h4>
        <button className="text-xs font-black text-indigo-600 bg-indigo-50 px-4 py-2 rounded-xl hover:bg-indigo-100 transition-colors">
          Change Password
        </button>
      </div>

      <div className="flex items-center justify-between p-6 bg-rose-50 border border-rose-100 rounded-[2rem]">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white rounded-xl text-rose-500 shadow-sm"><Trash2 size={20} /></div>
          <div>
            <p className="text-sm font-black text-rose-900">Deactivate Account</p>
            <p className="text-xs text-rose-600/70 font-medium">Temporarily hide your clinical data</p>
          </div>
        </div>
        <ChevronRight size={18} className="text-rose-300" />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] p-6 lg:p-12">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight italic">Settings</h1>
          <p className="text-slate-400 font-bold text-sm mt-2 uppercase tracking-widest">Manage your PhysioHub preferences</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar Nav */}
          <nav className="lg:col-span-4 space-y-3">
            {[
              { id: "account", label: "Account Info", icon: User },
              { id: "notifications", label: "Notifications", icon: Bell },
              { id: "security", label: "Privacy & Security", icon: ShieldCheck },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id)}
                className={`w-full flex items-center gap-4 p-5 rounded-[2rem] font-black text-sm transition-all ${
                  activeSection === tab.id
                    ? "bg-slate-900 text-white shadow-2xl scale-[1.02]"
                    : "bg-white text-slate-500 border border-slate-100 hover:bg-slate-50"
                }`}
              >
                <tab.icon size={18} className={activeSection === tab.id ? "text-indigo-400" : "text-slate-400"} />
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Main Content Area */}
          <main className="lg:col-span-8">
            <div className="bg-white rounded-[3rem] p-8 lg:p-12 border border-slate-100 shadow-sm min-h-[500px] relative overflow-hidden">
              {activeSection === "account" && <AccountSettings />}
              {activeSection === "notifications" && <NotificationSettings />}
              {activeSection === "security" && <SecuritySettings />}

              {/* Save Button Footer */}
              <div className="mt-12 pt-8 border-t border-slate-50">
                <button className="flex items-center justify-center gap-3 w-full py-5 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-200 transition-all active:scale-95">
                  <Save size={20} />
                  Update Settings
                </button>
              </div>
              
              {/* Decorative Background Element */}
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-indigo-50 rounded-full blur-3xl opacity-40 -z-0" />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default PatientSettings;