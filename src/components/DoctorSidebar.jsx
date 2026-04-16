import { NavLink, useNavigate } from 'react-router-dom';
import {
  LogOut, Home, Users, Calendar, ClipboardList,
  FileText, Activity, MessageCircle, Bell, Settings
} from 'lucide-react';
import useAuthStore from '../stores/authStore';

const DoctorSidebar = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuthStore();

  const navItems = [
    { icon: Home, label: 'Dashboard', to: '/doctor' },
    { icon: Users, label: 'My Patients', to: '/doctor/Mypatients-Dashboard' },
    { icon: Calendar, label: 'Appointments', to: '/doctor/Appointment-Dashboard' },
    { icon: ClipboardList, label: 'Treatment Plans', to: '/doctor/treatments' },
    { icon: FileText, label: 'Session Notes', to: '/doctor/notes' },
    { icon: Activity, label: 'Exercises', to: '/doctor/exercises' },
    { icon: Activity, label: 'Progress Tracking', to: '/doctor/progress' },
    { icon: MessageCircle, label: 'Messages', to: '/doctor/messages' },
    { icon: Bell, label: 'Notifications', to: '/doctor/notifications' },
    { icon: Settings, label: 'Settings', to: '/doctor/settings' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <aside style={fixedSidebarStyle} className="hidden md:flex md:flex-col border-r border-gray-100 bg-gradient-to-b from-indigo-50 to-purple-50 shadow-lg backdrop-blur-md">
      
      {/* Header Section */}
      <div className="p-6 shrink-0">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 bg-clip-text text-transparent">
          PhysioHub
        </h2>

        {user && (
          <div className="mt-6 p-4 bg-white/60 rounded-2xl border border-indigo-100 shadow-sm">
            <p className="font-semibold text-gray-900 truncate">{user.name}</p>
            <p className="text-xs text-indigo-700 font-bold uppercase tracking-wider">Physiotherapist</p>
          </div>
        )}
      </div>

      {/* Scrollable Navigation (Scrollbar line removed) */}
      <nav className="flex-1 overflow-y-auto px-4 no-scrollbar">
        <ul className="space-y-2 pb-6">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-white/80 hover:shadow-sm hover:border-indigo-100 border border-transparent'
                  }`
                }
              >
                <item.icon className="w-5 h-5 shrink-0" />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout Footer */}
      <div className="p-4 border-t border-indigo-100/50 shrink-0 bg-white/20">
        {user && (
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl p-3 bg-rose-50 text-rose-700 border border-rose-100 hover:bg-rose-100 transition-all font-semibold"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        )}
      </div>

      {/* CSS to hide scrollbar line */}
      <style>{`
        /* Hide scrollbar for Chrome, Safari and Opera */
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }

        /* Hide scrollbar for IE, Edge and Firefox */
        .no-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}</style>
    </aside>
  );
};

const fixedSidebarStyle = {
  width: '260px',
  height: '100vh',
  position: 'sticky',
  top: 0,
  left: 0,
  zIndex: 40,
};

export default DoctorSidebar;