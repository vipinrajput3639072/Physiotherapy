import { NavLink, useNavigate } from "react-router-dom";
import {
  LogOut, BarChart3, Users, Calendar, ClipboardList,
  DollarSign, TrendingUp, Bell, Settings, Activity,
  Stethoscope, Briefcase,
} from "lucide-react";
import useAuthStore from "../stores/authStore";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuthStore();

  const menuItems = [
    { icon: BarChart3, label: "Dashboard", to: "/admin" },
    { icon: Users, label: "Patients", to: "/admin/Patient-Management" },
    { icon: Briefcase, label: "Therapists", to: "/admin/Therapist-Management" },
    { icon: Calendar, label: "Appointments", to: "/admin/Appointment-Management" },
    { icon: ClipboardList, label: "Treatments", to: "/admin/Treatment-Management" },
    { icon: Activity, label: "Patient Progress", to: "/admin/Patient-Progress" },
    { icon: DollarSign, label: "Billing", to: "/admin/Billing-Management" },
    { icon: TrendingUp, label: "Analytics", to: "/admin/Analytics-Dashboard" },
    { icon: Bell, label: "Notifications", to: "/admin/Notifications-Hub" },
    { icon: Settings, label: "Settings", to: "/admin/Settings-Manager" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <aside className="fixed inset-y-0 left-0 flex flex-col h-screen w-64 bg-white border-r border-gray-100 z-50">
      <div className="p-8 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-100 text-white">
            <Stethoscope size={22} />
          </div>
          <h2 className="text-xl font-black tracking-tight text-gray-900">PhysioHub</h2>
        </div>
      </div>

      {user && (
        <div className="px-6 mb-6">
          <div className="flex items-center gap-3 p-2">
            <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-sm">
              {user.name?.charAt(0)}
            </div>
            <p className="font-bold text-gray-700 text-sm truncate">{user.name}</p>
          </div>
        </div>
      )}

      {/* --- Scrollbar Removed via Tailwind Arbitrary Properties --- */}
      <nav className="flex-1 overflow-y-auto px-4 space-y-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {menuItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-semibold ${
                isActive ? "bg-blue-600 text-white shadow-lg shadow-blue-100" : "text-gray-500 hover:bg-gray-50 hover:text-blue-600"
              }`
            }
          >
            <item.icon size={18} className="flex-shrink-0" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-50 mt-auto">
        <button onClick={handleLogout} className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition-all font-bold text-sm">
          <LogOut size={18} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;