import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LogOut, Home, Users, Calendar, BarChart3, 
  Settings, ClipboardList, Activity, Bell, 
  DollarSign, Briefcase, Menu, X 
} from 'lucide-react';
import useAuthStore from '../stores/authStore';

const Sidebar = ({ user }) => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false); // Mobile toggle state

  const navItems = {
    admin: [
      { type: 'label', label: 'Main' },
      { icon: BarChart3, label: "Dashboard", to: "/admin" },
      { type: 'label', label: 'Management' },
      { icon: Users, label: "Patients", to: "/admin/Patient-Management" },
      { icon: Briefcase, label: "Therapists", to: "/admin/Therapist-Management" },
      { icon: Calendar, label: "Appointments", to: "/admin/Appointment-Management" },
      { type: 'label', label: 'Clinical' },
      { icon: ClipboardList, label: "Treatments", to: "/admin/Treatment-Management" },
      { icon: Activity, label: "Progress Logs", to: "/admin/Patient-Progress" },
      { type: 'label', label: 'Finance' },
      { icon: DollarSign, label: "Billing", to: "/admin/Billing-Management" },
      { type: 'label', label: 'System' },
      { icon: Bell, label: "Notifications", to: "/admin/Notifications-Hub" },
      { icon: Settings, label: "Settings", to: "/admin/Settings-Manager" },
    ],
    therapist: [
      { icon: Home, label: "Overview", to: "/therapist" },
      { icon: Calendar, label: "My Schedule", to: "/therapist/schedule" },
      { icon: Users, label: "My Patients", to: "/therapist/patients" },
      { icon: Activity, label: "Progress Logs", to: "/therapist/progress" },
    ],
    patient: [
      { icon: Home, label: "My Health", to: "/patient" },
      { icon: Calendar, label: "Book Session", to: "/patient/appointments" },
      { icon: Activity, label: "My Progress", to: "/patient/progress" },
      { icon: DollarSign, label: "Invoices", to: "/patient/billing" },
    ]
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleSidebar = () => setIsOpen(!isOpen);

  // Determine current role items, fallback to empty array if user or role missing
  const currentNav = user?.role ? navItems[user.role] : [];

  return (
    <>
      {/* --- Mobile Header --- */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white border-b sticky top-0 z-50">
        <h2 className="text-xl font-black bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
          PhysioHub
        </h2>
        <button onClick={toggleSidebar} className="p-2 bg-gray-50 rounded-lg">
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* --- Sidebar Container --- */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-white border-r transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        flex flex-col h-screen shadow-xl md:shadow-none
      `}>
        
        {/* --- Brand Logo --- */}
        <div className="p-8 hidden md:block">
          <h2 className="text-2xl font-black bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent tracking-tight">
            PhysioHub
          </h2>
          
          {user && (
            <div className="mt-6 p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl border border-orange-100/50">
              <p className="font-bold text-gray-900 truncate">{user.name}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                <p className="text-[10px] text-orange-700 font-black uppercase tracking-widest">{user.role}</p>
              </div>
            </div>
          )}
        </div>

        {/* --- Dynamic Navigation --- */}
        <nav className="flex-1 overflow-y-auto px-4 py-4 md:py-0 custom-scrollbar">
          <ul className="space-y-1">
            {currentNav.map((item, idx) => (
              item.type === 'label' ? (
                <li key={`label-${idx}`} className="pt-4 pb-1 px-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  {item.label}
                </li>
              ) : (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    onClick={() => setIsOpen(false)} // Close sidebar on mobile click
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 font-bold text-sm ${
                        isActive
                          ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md shadow-orange-100'
                          : 'text-gray-500 hover:bg-orange-50 hover:text-orange-600'
                      }`
                    }
                  >
                    <item.icon className="w-5 h-5 shrink-0" />
                    <span>{item.label}</span>
                  </NavLink>
                </li>
              )
            ))}
          </ul>
        </nav>

        {/* --- Bottom Actions --- */}
        <div className="p-4 border-t border-gray-50 bg-gray-50/30">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-gray-400 hover:text-red-600 hover:bg-red-100 transition-all font-bold text-sm"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* --- Overlay for Mobile --- */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default Sidebar;