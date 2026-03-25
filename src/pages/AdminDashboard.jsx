import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import DashboardCard from "../components/DashboardCard";
import { fakeData } from "../utils/fakeData";
import {
  Users,
  UserCheck,
  DollarSign,
  Activity,
  TrendingUp,
  Calendar,
  Settings,
  Plus,
  Search,
  Filter,
  ArrowUpRight,
  Clock,
  CheckCircle,
} from "lucide-react";
import toast from "react-hot-toast";

const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    toast.success("System synchronization complete");
  }, []);

  const COLORS = ["#10b981", "#f59e0b", "#3b82f6", "#ef4444"];

  const stats = [
    {
      title: "Total Patients",
      value: "1,284",
      change: "+12%",
      icon: Users,
      color: "from-blue-500 to-indigo-600",
    },
    {
      title: "Total Therapists",
      value: "24",
      change: "Active",
      icon: UserCheck,
      color: "from-emerald-500 to-teal-600",
    },
    {
      title: "Revenue",
      value: "$42,500",
      change: "+8.4%",
      icon: DollarSign,
      color: "from-orange-500 to-red-600",
    },
    {
      title: "Utilization",
      value: "88%",
      change: "High",
      icon: Activity,
      color: "from-purple-500 to-pink-600",
    },
  ];

  return (
    <div className="space-y-8 pb-8 animate-in fade-in duration-500">
      {/* 🚀 Top Action Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Clinic Executive Suite
          </h1>
          <p className="text-gray-500 mt-1">
            Global clinic performance and therapist management.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-emerald-500 transition-colors" />
            <input
              type="text"
              placeholder="Search everything..."
              className="pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-2xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none w-64 shadow-sm"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white rounded-2xl font-semibold hover:bg-emerald-700 hover:shadow-lg transition-all active:scale-95">
            <Plus className="w-4 h-4" />
            Add Patient
          </button>
        </div>
      </div>

      {/* 📈 Smart Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <DashboardCard key={stat.title} {...stat} trend={stat.change} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 📊 Main Revenue/Growth Chart (2/3 width) */}
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-gray-900">
              Patient Growth Analytics
            </h2>
            <div className="flex gap-2">
              <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
                <ArrowUpRight className="w-3 h-3" /> 14.2%
              </span>
            </div>
          </div>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={fakeData.admin.chartData}>
                <defs>
                  <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f0f0f0"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9ca3af", fontSize: 12 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9ca3af", fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "20px",
                    border: "none",
                    boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="patients"
                  stroke="#10b981"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorVal)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ⚡ Live Clinic Feed (1/3 width) */}
        <div className="bg-gray-900 rounded-[2.5rem] p-8 text-white shadow-xl">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Clock className="w-5 h-5 text-emerald-400" /> Live Feed
          </h2>
          <div className="space-y-6">
            {[
              {
                user: "Dr. Sarah",
                action: "completed session with John",
                time: "2m ago",
              },
              {
                user: "Admin",
                action: "updated exercise plan #442",
                time: "15m ago",
              },
              {
                user: "System",
                action: "Monthly revenue target met",
                time: "1h ago",
                icon: CheckCircle,
              },
              {
                user: "Patient Mike",
                action: "booked new appointment",
                time: "2h ago",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex gap-4 items-start border-l-2 border-gray-800 pl-4 relative"
              >
                <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-emerald-500 border-4 border-gray-900" />
                <div>
                  <p className="text-sm font-medium">
                    <span className="text-emerald-400">{item.user}</span>{" "}
                    {item.action}
                  </p>
                  <span className="text-xs text-gray-500">{item.time}</span>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-3 bg-white/10 hover:bg-white/20 rounded-2xl text-sm font-semibold transition-colors">
            View All Logs
          </button>
        </div>
      </div>

      {/* 📁 Detailed Data Table */}
      <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-8 border-b border-gray-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
            <p className="text-sm text-gray-500">
              Managing {fakeData.admin.patients.length} active records
            </p>
          </div>
          <div className="flex gap-2">
            <button className="p-2.5 text-gray-500 hover:bg-gray-50 rounded-xl transition-colors">
              <Filter className="w-5 h-5" />
            </button>
            <button className="px-4 py-2 text-sm font-semibold text-emerald-600 bg-emerald-50 rounded-xl">
              Export CSV
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-8 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">
                  Patient
                </th>
                <th className="px-8 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">
                  Status
                </th>
                <th className="px-8 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">
                  Last Check-in
                </th>
                <th className="px-8 py-4 text-right text-xs font-bold text-gray-400 uppercase tracking-widest">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {fakeData.admin.patients.map((patient) => (
                <tr
                  key={patient.id}
                  className="hover:bg-emerald-50/30 transition-all group"
                >
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-100 text-emerald-700 flex items-center justify-center font-bold shadow-inner">
                        {patient.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">
                          {patient.name}
                        </p>
                        <p className="text-xs text-gray-400">
                          ID: #PHY-{patient.id}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        patient.status === "Active"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${patient.status === "Active" ? "bg-emerald-500 animate-pulse" : "bg-amber-500"}`}
                      />
                      {patient.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-sm text-gray-600 font-medium">
                    {patient.lastVisit}
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 bg-white shadow-sm border border-gray-100 rounded-lg text-blue-600 hover:scale-110 transition-transform">
                        <Calendar className="w-4 h-4" />
                      </button>
                      <button className="p-2 bg-white shadow-sm border border-gray-100 rounded-lg text-gray-600 hover:scale-110 transition-transform">
                        <Settings className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
