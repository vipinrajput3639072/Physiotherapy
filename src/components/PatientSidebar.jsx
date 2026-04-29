import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LogOut, Home, Calendar, User, ClipboardList, 
  Dumbbell, LineChart, CreditCard, MessageSquare, 
  Bell, Settings 
} from 'lucide-react';
import useAuthStore from '../stores/authStore';

const PatientSidebar = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuthStore();
  
  const navigationGroups = [
    {
      group: "Core",
      items: [
        { icon: Home, label: 'Dashboard', to: '/patient' },
        { icon: Calendar, label: 'Appointments', to: '/patient/appointments' },
        { icon: MessageSquare, label: 'Messages', to: '/patient/messages' },
        { icon: Bell, label: 'Notifications', to: '/patient/notifications' },
      ]
    },
    {
      group: "Health & Recovery",
      items: [
        { icon: ClipboardList, label: 'Treatment Plan', to: '/patient/treatment-plan' },
        { icon: Dumbbell, label: 'Exercises', to: '/patient/exercises' },
        { icon: LineChart, label: 'Progress Tracking', to: '/patient/progress' },
      ]
    },
    {
      group: "Account",
      items: [
        { icon: CreditCard, label: 'Payments', to: '/patient/payments' },
        { icon: User, label: 'Profile', to: '/patient/profile' },
        { icon: Settings, label: 'Settings', to: '/patient/settings' },
      ]
    }
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <aside className="flex flex-col h-full w-full border-r border-emerald-100 bg-gradient-to-b from-emerald-50 to-teal-50 shadow-lg">
      {/* Header & User Info */}
      <div className="p-6 flex-shrink-0">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
          PhysioHub
        </h2>
        {user && (
          <div className="mt-4 p-3 bg-white/60 rounded-2xl border border-emerald-100 shadow-sm">
            <p className="font-semibold text-gray-900 truncate">{user.name}</p>
            <p className="text-xs text-emerald-700 font-medium uppercase tracking-wider">Patient</p>
          </div>
        )}
      </div>

      {/* Navigation - Scrollbar line removed using 'no-scrollbar' */}
      <nav className="flex-1 overflow-y-auto px-4 py-2 no-scrollbar">
        {navigationGroups.map((group, idx) => (
          <div key={idx} className="mb-6">
            <p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-widest text-emerald-600/60">
              {group.group}
            </p>
            <ul className="space-y-1">
              {group.items.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === '/patient'}
                    className={({ isActive }) =>
                      `flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
                        isActive
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md'
                          : 'text-gray-600 hover:bg-white/80 hover:text-emerald-700'
                      }`
                    }
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer / Logout */}
      
    </aside>
  );
};

export default PatientSidebar;