import { NavLink, useNavigate } from 'react-router-dom';
import {
  LogOut,
  Home,
  Users,
  Calendar,
  ClipboardList,
  FileText,
  Activity,
  MessageCircle,
  Bell,
  Settings
} from 'lucide-react';
import useAuthStore from '../stores/authStore';

const DoctorSidebar = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuthStore();

  const navItems = [
    { icon: Home, label: 'Dashboard', to: '/doctor' },
    { icon: Users, label: 'My Patients', to: '/doctor/patients' },
    { icon: Calendar, label: 'Appointments', to: '/doctor/appointments' },
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
    <aside className="w-full border-b border-gray-100 bg-gradient-to-b from-indigo-50 to-purple-50 shadow-lg backdrop-blur-md md:w-64 md:border-b-0 md:border-r">
      
      {/* Logo / Title */}
      <div className="p-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 bg-clip-text text-transparent">
          PhysioHub Doctor
        </h2>

        {user && (
          <div className="mt-6 p-4 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-2xl border border-indigo-200">
            <p className="font-semibold text-gray-900">{user.name}</p>
            <p className="text-sm text-indigo-700 font-medium">Doctor</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-white/50 hover:shadow-md hover:border hover:border-indigo-200'
                  }`
                }
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout */}
      {user && (
        <button
          onClick={handleLogout}
          className="mx-4 mb-6 flex w-[calc(100%-2rem)] items-center gap-3 rounded-xl p-3 bg-gradient-to-r from-rose-50 to-pink-50 text-rose-700 border border-rose-200 hover:bg-rose-100 transition-all font-medium"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      )}
    </aside>
  );
};

export default DoctorSidebar;