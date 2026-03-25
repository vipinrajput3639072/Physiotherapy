import { NavLink, useNavigate } from "react-router-dom";
import {
  LogOut,
  BarChart3,
  Users,
  Calendar,
  ClipboardList,
  DollarSign,
  TrendingUp,
  Bell,
  Settings,
  Activity,
  Stethoscope,
  Briefcase,
} from "lucide-react";
import useAuthStore from "../stores/authStore";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuthStore();

  const menuGroups = [
    {
      group: "General",
      items: [{ icon: BarChart3, label: "Dashboard", to: "/admin" }],
    },
    {
      group: "Management",
      items: [
        { icon: Users, label: "Patients", to: "/admin/Patient-Management" },
        {
          icon: Briefcase,
          label: "Therapists",
          to: "/admin/Therapist-Management",
        },
        {
          icon: Calendar,
          label: "Appointments",
          to: "/admin/Appointment-Management",
        },
      ],
    },
    {
      group: "Clinical",
      items: [
        {
          icon: ClipboardList,
          label: "Treatments",
          to: "/admin/Treatment-Management",
        },
        {
          icon: Activity,
          label: "Patient Progress",
          to: "/admin/Patient-Progress",
        },
      ],
    },
    {
      group: "Financial & Data",
      items: [
        {
          icon: DollarSign,
          label: "Billing & Payments",
          to: "/admin/Billing-Management",
        },
        {
          icon: TrendingUp,
          label: "Reports & Analytics",
          to: "/admin/Analytics-Dashboard",
        },
      ],
    },
    {
      group: "System",
      items: [
        { icon: Bell, label: "Notifications", to: "/admin/Notifications-Hub" },
        { icon: Settings, label: "Settings", to: "/admin/Settings-Manager" },
      ],
    },
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <aside className="flex flex-col h-screen w-full border-b border-gray-100 bg-white shadow-xl md:w-72 md:border-b-0 md:border-r sticky top-0">
      {/* --- Logo Area --- */}
      <div className="p-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-100">
            <Stethoscope className="text-white w-6 h-6" />
          </div>
          <h2 className="text-xl font-black tracking-tight text-gray-900">
            Physio<span className="text-blue-600">Hub</span>
          </h2>
        </div>

        {user && (
          <div className="mt-6 flex items-center gap-3 p-3 bg-gray-50 rounded-2xl border border-gray-100">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
              {user.name?.charAt(0)}
            </div>
            <div className="overflow-hidden">
              <p className="font-bold text-gray-900 truncate text-sm">
                {user.name}
              </p>
              <p className="text-[10px] text-blue-600 font-black uppercase tracking-widest">
                Administrator
              </p>
            </div>
          </div>
        )}
      </div>

      {/* --- Navigation Area --- */}
      <nav className="flex-1 overflow-y-auto px-4 custom-scrollbar">
        {menuGroups.map((group, idx) => (
          <div key={idx} className="mb-6">
            <h3 className="px-4 mb-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">
              {group.group}
            </h3>
            <ul className="space-y-1">
              {group.items.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-semibold text-sm ${
                        isActive
                          ? "bg-blue-600 text-white shadow-md shadow-blue-100 translate-x-1"
                          : "text-gray-500 hover:bg-blue-50 hover:text-blue-600"
                      }`
                    }
                  >
                    <item.icon
                      className={`w-5 h-5 ${({ isActive }) => (isActive ? "text-white" : "opacity-70")}`}
                    />
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {/* --- Logout Bottom --- */}
      <div className="p-4 border-t border-gray-50">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition-all font-bold text-sm"
        >
          <LogOut className="w-5 h-5" />
          Sign Out
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
