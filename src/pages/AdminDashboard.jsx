import { useEffect, useState } from "react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import DashboardCard from "../components/DashboardCard";
import AdminSidebar from "../components/AdminSidebar"; // Make sure path is correct
import { fakeData } from "../utils/fakeData";
import {
  Users, UserCheck, DollarSign, Activity,
  Plus, Search, ArrowUpRight, Clock, Calendar
} from "lucide-react";
import toast from "react-hot-toast";

const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    toast.success("System synchronization complete");
  }, []);

  const stats = [
    { title: "Total Patients", value: "1,284", change: "+12%", icon: Users, color: "from-blue-500 to-indigo-600" },
    { title: "Total Therapists", value: "24", change: "Active", icon: UserCheck, color: "from-emerald-500 to-teal-600" },
    { title: "Revenue", value: "$42,500", change: "+8.4%", icon: DollarSign, color: "from-orange-500 to-red-600" },
    { title: "Utilization", value: "88%", change: "High", icon: Activity, color: "from-purple-500 to-pink-600" },
  ];

  return (
    <div className="flex h-screen w-full bg-gray-50 overflow-hidden">
      {/* 1. Sidebar - Fixed Position handled inside component */}
      <AdminSidebar />

      {/* 2. Main Content - Scrollable & Offset by sidebar width */}
      <main className="flex-1 ml-72 h-full overflow-y-auto p-6 md:p-10 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        <div className="max-w-[1600px] mx-auto space-y-8 animate-in fade-in duration-500">
          
          {/* 🚀 Top Action Bar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <h1 className="text-4xl font-black text-gray-900 tracking-tight">Clinic Executive Suite</h1>
              <p className="text-gray-500 mt-1 text-lg">Global clinic performance management.</p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search everything..."
                  className="pl-12 pr-6 py-3 bg-white border border-gray-200 rounded-2xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none w-72 shadow-sm transition-all"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all active:scale-95 shadow-lg shadow-emerald-100">
                <Plus className="w-5 h-5" /> Add Patient
              </button>
            </div>
          </div>

          {/* 📈 Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <DashboardCard key={stat.title} {...stat} trend={stat.change} />
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 md:p-10 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Patient Growth</h2>
                  <p className="text-sm text-gray-400">Monthly acquisition data</p>
                </div>
                <span className="flex items-center gap-1 text-sm font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-xl">
                  <ArrowUpRight className="w-4 h-4" /> 14.2%
                </span>
              </div>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={fakeData.admin.chartData}>
                    <defs>
                      <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#9ca3af", fontSize: 12 }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: "#9ca3af", fontSize: 12 }} />
                    <Tooltip contentStyle={{ borderRadius: "20px", border: "none", boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)" }} />
                    <Area type="monotone" dataKey="patients" stroke="#10b981" strokeWidth={4} fillOpacity={1} fill="url(#colorVal)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-gray-900 rounded-[2.5rem] p-8 md:p-10 text-white shadow-xl flex flex-col">
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <Clock className="w-6 h-6 text-emerald-400" /> Live Updates
              </h2>
              <div className="space-y-8 flex-1">
                {[
                  { user: "Dr. Sarah", action: "completed session", time: "2m ago" },
                  { user: "Admin", action: "updated records", time: "15m ago" },
                  { user: "System", action: "target met", time: "1h ago" },
                  { user: "Clinic B", action: "new registration", time: "3h ago" },
                ].map((item, i) => (
                  <div key={i} className="flex gap-5 items-start border-l-2 border-gray-800 pl-6 relative">
                    <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-emerald-500 border-4 border-gray-900" />
                    <div>
                      <p className="text-base font-medium">
                        <span className="text-emerald-400 font-bold">{item.user}</span> {item.action}
                      </p>
                      <span className="text-xs text-gray-500 font-mono mt-1 block">{item.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-white">
              <h2 className="text-2xl font-bold text-gray-900">Recent Activity</h2>
              <div className="flex gap-2">
                <button className="px-5 py-2 text-sm font-bold text-gray-500 hover:bg-gray-50 rounded-xl transition-colors">View All</button>
                <button className="px-5 py-2 text-sm font-bold text-emerald-600 bg-emerald-50 rounded-xl hover:bg-emerald-100 transition-colors">Export CSV</button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50/50">
                    <th className="px-10 py-5 text-left text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Patient Name</th>
                    <th className="px-10 py-5 text-left text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Status</th>
                    <th className="px-10 py-5 text-right text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Quick Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {fakeData.admin.patients.map((patient) => (
                    <tr key={patient.id} className="hover:bg-emerald-50/20 transition-all group">
                      <td className="px-10 py-6">
                        <div className="flex items-center gap-3">
                           <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 text-xs font-bold">
                             {patient.name.charAt(0)}
                           </div>
                           <span className="font-bold text-gray-900">{patient.name}</span>
                        </div>
                      </td>
                      <td className="px-10 py-6">
                        <span className={`px-4 py-1.5 rounded-full text-xs font-black ${patient.status === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                          {patient.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-10 py-6 text-right">
                        <button className="p-2.5 text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
                          <Calendar className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;