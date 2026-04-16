import { useState } from 'react';
import { 
  Settings, Building2, User, ShieldCheck, 
  Save, Globe, Lock, Info, Mail, Camera, KeyRound,
  Smartphone, Monitor, LogOut, Trash2, AlertTriangle, CheckCircle2
} from 'lucide-react';
import toast from 'react-hot-toast';

const SettingsManager = () => {
  const [activeSection, setActiveSection] = useState('clinic');
  const [twoFactor, setTwoFactor] = useState(true);

  const sections = [
    { id: 'clinic', label: 'Clinic Profile', icon: Building2 },
    { id: 'admin', label: 'Admin Account', icon: User },
    { id: 'roles', label: 'Roles & Permissions', icon: ShieldCheck },
    { id: 'security', label: 'Security', icon: Lock },
  ];

  return (
    <div className="flex-1 ml-72 overflow-y-auto max-w-5xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      
      {/* --- Top Tab Navigation --- */}
      <div className="flex flex-wrap gap-2 p-2 bg-gray-100/50 rounded-[2rem] border border-gray-100">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`flex-1 min-w-[150px] flex items-center justify-center gap-3 px-6 py-4 rounded-[1.5rem] font-bold transition-all ${
              activeSection === section.id 
                ? 'bg-white text-indigo-600 shadow-sm' 
                : 'text-gray-500 hover:text-gray-900 hover:bg-white/50'
            }`}
          >
            <section.icon className={`w-5 h-5 ${activeSection === section.id ? 'text-indigo-600' : 'text-gray-400'}`} />
            {section.label}
          </button>
        ))}
      </div>

      {/* --- Main Content Area --- */}
      <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
        
        {/* Section: Clinic Profile */}
        {activeSection === 'clinic' && (
          <div className="p-10 space-y-8 animate-in fade-in duration-300">
            <header>
              <h2 className="text-2xl font-bold text-gray-900">Clinic Settings</h2>
              <p className="text-sm text-gray-500">Public information and operational hours</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase ml-1">Clinic Name</label>
                <input type="text" defaultValue="PhysioHub Wellness Center" className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase ml-1">Tax ID / Business Reg</label>
                <input type="text" defaultValue="PH-99283-X" className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none" />
              </div>
            </div>

            <div className="p-6 bg-indigo-50/50 rounded-[2rem] border border-indigo-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-indigo-600 shadow-sm">
                  <Globe className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">Timezone & Locale</p>
                  <p className="text-xs text-gray-500">Currently set to (GMT-5) Eastern Time</p>
                </div>
              </div>
              <button className="text-xs font-bold text-indigo-600 hover:underline">Change</button>
            </div>
          </div>
        )}

        {/* Section: Admin Account */}
        {activeSection === 'admin' && (
          <div className="p-10 space-y-8 animate-in fade-in duration-300">
            <header>
              <h2 className="text-2xl font-bold text-gray-900">Admin Account</h2>
              <p className="text-sm text-gray-500">Manage your personal profile and login credentials</p>
            </header>

            <div className="flex items-center gap-8 pb-4">
              <div className="relative group">
                <div className="w-24 h-24 bg-indigo-100 rounded-[2rem] flex items-center justify-center text-indigo-600 overflow-hidden">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Avatar" className="w-full h-full object-cover" />
                </div>
                <button className="absolute -bottom-2 -right-2 p-2 bg-white rounded-xl shadow-lg border border-gray-100 text-gray-600 hover:text-indigo-600 transition-colors">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">Dr. Alex Thompson</h3>
                <p className="text-sm text-gray-500 font-medium">Head Administrator</p>
                <span className="inline-block mt-2 px-3 py-1 bg-indigo-100 text-indigo-600 text-[10px] font-black uppercase tracking-wider rounded-lg">Verified Account</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase ml-1">Full Name</label>
                <input type="text" defaultValue="Alex Thompson" className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="email" defaultValue="alex@physiohub.com" className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Section: Roles & Permissions */}
        {activeSection === 'roles' && (
          <div className="p-10 space-y-8 animate-in fade-in duration-300">
            <header className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Roles & Permissions</h2>
                <p className="text-sm text-gray-500">Define access levels for clinic staff</p>
              </div>
              <button className="px-4 py-2 bg-gray-900 text-white rounded-xl text-xs font-bold flex items-center gap-2">
                <Plus className="w-4 h-4" /> Create Role
              </button>
            </header>

            <div className="space-y-4">
              {[
                { name: 'Super Admin', users: 2, access: 'Full System Access', color: 'bg-indigo-600' },
                { name: 'Therapist', users: 12, access: 'Patients & Scheduling Only', color: 'bg-emerald-500' },
                { name: 'Receptionist', users: 3, access: 'Appointments & Billing Only', color: 'bg-amber-500' }
              ].map((role, i) => (
                <div key={i} className="flex items-center justify-between p-6 bg-gray-50 rounded-2xl group transition-all hover:bg-white hover:shadow-md border border-transparent hover:border-gray-100">
                  <div className="flex items-center gap-4">
                    <div className={`w-3 h-3 rounded-full ${role.color}`} />
                    <div>
                      <p className="font-bold text-gray-900">{role.name}</p>
                      <p className="text-xs text-gray-500">{role.access}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="text-xs font-bold text-gray-400">{role.users} Users</span>
                    <button className="p-2 text-gray-300 hover:text-gray-900 transition-colors">
                      <Settings className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section: Security */}
        {activeSection === 'security' && (
          <div className="p-10 space-y-8 animate-in fade-in duration-300">
            <header>
              <h2 className="text-2xl font-bold text-gray-900">Security & Privacy</h2>
              <p className="text-sm text-gray-500">Protect your account and monitor activity</p>
            </header>

            {/* 2FA Toggle */}
            <div className={`p-6 rounded-[2rem] border transition-all ${twoFactor ? 'bg-emerald-50/50 border-emerald-100' : 'bg-gray-50 border-gray-100'}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-sm ${twoFactor ? 'bg-white text-emerald-600' : 'bg-white text-gray-400'}`}>
                    <Smartphone className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-gray-900">Two-Factor Authentication</p>
                      {twoFactor && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                    </div>
                    <p className="text-xs text-gray-500">Add an extra layer of security to your login</p>
                  </div>
                </div>
                <button 
                  onClick={() => setTwoFactor(!twoFactor)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${twoFactor ? 'bg-emerald-500' : 'bg-gray-300'}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${twoFactor ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>
            </div>

            {/* Active Sessions */}
            <div className="space-y-4">
              <h3 className="text-xs font-black text-gray-400 uppercase ml-1">Active Sessions</h3>
              <div className="space-y-3">
                {[
                  { device: 'MacBook Pro', location: 'New York, USA', status: 'Current Session', icon: Monitor, active: true },
                  { device: 'iPhone 15 Pro', location: 'New York, USA', status: 'Active 2h ago', icon: Smartphone, active: false }
                ].map((session, i) => (
                  <div key={i} className="flex items-center justify-between p-5 bg-gray-50 rounded-2xl border border-gray-100">
                    <div className="flex items-center gap-4">
                      <session.icon className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-bold text-gray-900">{session.device}</p>
                        <p className="text-[10px] text-gray-500">{session.location} • {session.status}</p>
                      </div>
                    </div>
                    {!session.active && (
                      <button className="text-xs font-bold text-red-500 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors">
                        Revoke
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Danger Zone */}
            <div className="pt-6 border-t border-gray-100">
              <div className="p-6 bg-red-50/50 rounded-[2rem] border border-red-100 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-red-600 shadow-sm">
                    <AlertTriangle className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Delete Account</p>
                    <p className="text-xs text-gray-500">Permanently remove all clinic data and access</p>
                  </div>
                </div>
                <button className="px-5 py-2.5 bg-red-600 text-white rounded-xl text-xs font-bold hover:bg-red-700 transition-all shadow-md active:scale-95">
                  Deactivate
                </button>
              </div>
            </div>
          </div>
        )}

        {/* --- Global Footer Save Bar --- */}
        <div className="bg-gray-50 px-10 py-6 flex justify-end gap-4 border-t border-gray-100">
          <button className="px-6 py-3 font-bold text-gray-400 hover:text-gray-600 transition-all">Discard Changes</button>
          <button 
            onClick={() => toast.success('Settings updated successfully')}
            className="flex items-center gap-2 px-8 py-3 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95"
          >
            <Save className="w-4 h-4" /> Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

const Plus = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
  </svg>
);

export default SettingsManager;