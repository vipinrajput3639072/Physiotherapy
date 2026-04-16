import { useState } from "react";
import {
  TrendingUp,
  Users,
  DollarSign,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Download,
  Filter,
  ChevronRight,
  BarChart3,
  PieChart,
  Target,
} from "lucide-react";
import toast from "react-hot-toast";

const AnalyticsDashboard = () => {
  const [timeRange, setTimeRange] = useState("Last 30 Days");

  // Mock Analytics Data
  const stats = [
    {
      label: "Monthly Revenue",
      value: "$12,450",
      growth: "+12.5%",
      isUp: true,
      icon: DollarSign,
      color: "bg-emerald-500",
    },
    {
      label: "New Patients",
      value: "48",
      growth: "+18.2%",
      isUp: true,
      icon: Users,
      color: "bg-blue-500",
    },
    {
      label: "Session Completion",
      value: "94%",
      growth: "-2.1%",
      isUp: false,
      icon: Activity,
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="flex-1 ml-72 overflow-y-auto space-y-8 animate-in fade-in duration-700 pb-12">
      {/* --- Top Action Bar --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            Clinic Insights
          </h1>
          <p className="text-gray-500 font-medium">
            Performance overview for {timeRange}
          </p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-100 rounded-xl font-bold text-gray-600 hover:bg-gray-50 transition-all shadow-sm">
            <Calendar className="w-4 h-4" />
            {timeRange}
          </button>
          <button
            onClick={() => toast.success("Report exported as PDF")}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition-all shadow-lg"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* --- KPI Cards --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex justify-between items-start mb-6">
              <div
                className={`${stat.color} p-3 rounded-2xl text-white shadow-lg`}
              >
                <stat.icon className="w-6 h-6" />
              </div>
              <div
                className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-black ${
                  stat.isUp
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-rose-50 text-rose-600"
                }`}
              >
                {stat.isUp ? (
                  <ArrowUpRight className="w-3 h-3" />
                ) : (
                  <ArrowDownRight className="w-3 h-3" />
                )}
                {stat.growth}
              </div>
            </div>
            <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest">
              {stat.label}
            </h3>
            <p className="text-3xl font-black text-gray-900 mt-2">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* --- Visual Reports Section --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue Growth Placeholder */}
        <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-10">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-500" />
              Revenue Growth
            </h3>
            <div className="flex gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-200"></span>
            </div>
          </div>
          <div className="h-64 bg-gray-50 rounded-[2rem] border-2 border-dashed border-gray-100 flex items-center justify-center text-gray-400 text-sm italic">
            [Chart Area: Revenue vs Expenses Line Graph]
          </div>
        </div>

        {/* Patient Acquisition Placeholder */}
        <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-10">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-500" />
              Patient Growth
            </h3>
            <button className="text-xs font-bold text-blue-600 hover:underline">
              View Details
            </button>
          </div>
          <div className="h-64 bg-gray-50 rounded-[2rem] border-2 border-dashed border-gray-100 flex items-center justify-center text-gray-400 text-sm italic">
            [Chart Area: Monthly New Registrations Bar Chart]
          </div>
        </div>
      </div>

      {/* --- Performance Stats (Therapist Leaderboard) --- */}
      <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
            <Target className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-gray-900">
            Therapist Performance Stats
          </h3>
        </div>

        <div className="space-y-6">
          {[
            { name: "Dr. Sarah Jenkins", rating: 4.9, sessions: 142, load: 85 },
            { name: "Dr. Michael Chen", rating: 4.7, sessions: 98, load: 62 },
            {
              name: "Dr. Elena Rodriguez",
              rating: 4.8,
              sessions: 110,
              load: 78,
            },
          ].map((therapist, i) => (
            <div
              key={i}
              className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-gray-50/50 rounded-2xl hover:bg-gray-50 transition-colors gap-4"
            >
              <div className="flex items-center gap-4 min-w-[200px]">
                <div className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center font-bold text-gray-600 text-xs">
                  {therapist.name.charAt(4)}
                </div>
                <div>
                  <p className="font-bold text-gray-900">{therapist.name}</p>
                  <p className="text-xs text-gray-500">
                    Rating: ⭐ {therapist.rating}
                  </p>
                </div>
              </div>

              <div className="flex-1 max-w-md mx-4">
                <div className="flex justify-between mb-2">
                  <span className="text-[10px] font-bold text-gray-400 uppercase">
                    Workload Capacity
                  </span>
                  <span className="text-xs font-bold text-gray-700">
                    {therapist.load}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-orange-500 h-full"
                    style={{ width: `${therapist.load}%` }}
                  />
                </div>
              </div>

              <div className="text-right">
                <p className="text-xs font-bold text-gray-400 uppercase">
                  Sessions
                </p>
                <p className="text-lg font-black text-gray-900">
                  {therapist.sessions}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
