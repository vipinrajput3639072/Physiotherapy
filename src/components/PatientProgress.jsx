import React, { useState, useMemo } from "react";
import {
  TrendingUp,
  Activity,
  Ruler,
  Heart,
  ArrowUpRight,
  Target,
  Download,
} from "lucide-react";

const PatientProgress = () => {
  // 1. Manage Active Filters
  const [activeRange, setActiveRange] = useState("W"); // 'W' | 'M' | '6M'
  const [activeMetric, setActiveMetric] = useState("Flexion");

  // 2. Data Configuration for different metrics
  const dataConfig = {
    Flexion: {
      label: "Knee Flexion",
      unit: "°",
      color: "bg-emerald-500",
      shadow: "shadow-emerald-500/40",
      data: {
        W: [40, 55, 45, 70, 65, 85, 95],
        M: [30, 45, 60, 55, 75, 85, 90, 95],
        "6M": [20, 40, 65, 80, 95, 110, 115],
      },
    },
    Pain: {
      label: "Pain Level",
      unit: "/10",
      color: "bg-rose-500",
      shadow: "shadow-rose-500/40",
      data: {
        W: [8, 7, 6, 5, 4, 3, 2],
        M: [9, 8, 8, 7, 6, 4, 3, 2],
        "6M": [10, 8, 6, 5, 4, 3, 2],
      },
    },
    Strength: {
      label: "Muscle Strength",
      unit: "%",
      color: "bg-blue-500",
      shadow: "shadow-blue-500/40",
      data: {
        W: [60, 62, 65, 70, 75, 80, 85],
        M: [50, 55, 65, 70, 75, 78, 82, 85],
        "6M": [30, 45, 55, 65, 75, 80, 85],
      },
    },
  };

  // 3. Derived Data for the Chart
  const currentChartData = useMemo(() => {
    return dataConfig[activeMetric].data[activeRange];
  }, [activeMetric, activeRange]);

  const stats = [
    {
      id: 1,
      label: "Knee Flexion",
      key: "Flexion",
      value: "115°",
      trend: "+12°",
      icon: Ruler,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      id: 2,
      label: "Pain Level",
      key: "Pain",
      value: "2/10",
      trend: "-20%",
      icon: Activity,
      color: "text-rose-600",
      bg: "bg-rose-50",
    },
    {
      id: 3,
      label: "Muscle Strength",
      key: "Strength",
      value: "85%",
      trend: "+5%",
      icon: Heart,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
  ];

  const milestones = [
    {
      id: 1,
      title: "Walk without crutches",
      date: "April 10, 2026",
      status: "Achieved",
    },
    {
      id: 2,
      title: "Full Weight Bearing",
      date: "April 22, 2026",
      status: "Achieved",
    },
    { id: 3, title: "Light Jogging", date: "May 15, 2026", status: "Upcoming" },
  ];

  return (
    /* Full Screen Wrapper */
    <div className="min-h-screen w-full bg-slate-50 p-6 md:p-12">
      <div className="max-w-[1600px] mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">
              Recovery Analytics
            </h1>
            <p className="text-slate-500 font-medium italic mt-1">
              "Progress is progress, no matter how small."
            </p>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-sm active:scale-95">
            <Download className="w-4 h-4" /> Export PDF
          </button>
        </div>

        {/* Interactive Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat) => (
            <button
              key={stat.id}
              onClick={() => setActiveMetric(stat.key)}
              className={`text-left p-8 rounded-[2.5rem] border transition-all duration-300 ${
                activeMetric === stat.key
                  ? "bg-white border-emerald-500 shadow-2xl shadow-emerald-500/10 ring-8 ring-emerald-500/5 scale-[1.02]"
                  : "bg-white border-slate-100 hover:border-slate-300 shadow-sm"
              }`}
            >
              <div className="flex items-start justify-between mb-6">
                <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color}`}>
                  <stat.icon className="w-7 h-7" />
                </div>
                <span
                  className={`text-[11px] font-black px-3 py-1.5 rounded-lg uppercase tracking-wider ${
                    stat.trend.startsWith("+")
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-rose-100 text-rose-700"
                  }`}
                >
                  {stat.trend}
                </span>
              </div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">
                {stat.label}
              </p>
              <h3 className="text-4xl font-black text-slate-900 mt-2">
                {stat.value}
              </h3>
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Dynamic Chart Area */}
          <div className="lg:col-span-2 bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-16 gap-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  {dataConfig[activeMetric].label} History
                </h2>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-2">
                  Visualizing improvement over{" "}
                  {activeRange === "W"
                    ? "7 days"
                    : activeRange === "M"
                      ? "30 days"
                      : "6 months"}
                </p>
              </div>
              <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
                {["W", "M", "6M"].map((range) => (
                  <button
                    key={range}
                    onClick={() => setActiveRange(range)}
                    className={`px-6 py-2.5 text-xs font-black rounded-xl transition-all ${
                      activeRange === range
                        ? "bg-white shadow-md text-emerald-600"
                        : "text-slate-400 hover:text-slate-600"
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>

            {/* Responsive Bar Chart */}
            <div className="h-80 flex items-end justify-between gap-4 px-2">
              {currentChartData.map((val, i) => (
                <div
                  key={i}
                  className="flex-1 flex flex-col items-center gap-4 group h-full justify-end"
                >
                  <div
                    className={`w-full rounded-t-2xl transition-all duration-700 cursor-help relative group-hover:brightness-110 ${
                      i === currentChartData.length - 1
                        ? `${dataConfig[activeMetric].color} ${dataConfig[activeMetric].shadow}`
                        : "bg-slate-100"
                    }`}
                    style={{
                      height: `${(val / (activeMetric === "Flexion" ? 120 : 100)) * 100}%`,
                    }}
                  >
                    <div className="absolute -top-14 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs font-black px-4 py-2 rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
                      {val}
                      {dataConfig[activeMetric].unit}
                    </div>
                  </div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter shrink-0">
                    {activeRange === "W"
                      ? `Day ${i + 1}`
                      : activeRange === "M"
                        ? `Wk ${i + 1}`
                        : `M ${i + 1}`}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Milestones & Advice */}
          <div className="space-y-8">
            <div className="bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl">
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
                  <Target className="w-6 h-6 text-emerald-400" /> Goals &
                  Milestones
                </h3>
                <div className="space-y-8">
                  {milestones.map((m) => (
                    <div key={m.id} className="group cursor-default">
                      <div className="flex items-center gap-5">
                        <div
                          className={`w-3.5 h-3.5 rounded-full transition-transform group-hover:scale-150 ${m.status === "Achieved" ? "bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.6)]" : "bg-slate-700"}`}
                        />
                        <div className="flex-1">
                          <p
                            className={`text-base font-bold ${m.status === "Achieved" ? "text-white" : "text-slate-500"}`}
                          >
                            {m.title}
                          </p>
                          <p className="text-[11px] text-slate-500 font-bold uppercase mt-1 tracking-widest">
                            {m.date}
                          </p>
                        </div>
                        {m.status === "Achieved" && (
                          <ArrowUpRight className="w-5 h-5 text-emerald-400" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl" />
            </div>

            <div className="bg-emerald-600 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-emerald-200/50">
              <div className="flex items-start gap-5">
                <div className="p-3 bg-white/20 rounded-2xl">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-bold text-lg">You're On Track!</p>
                  <p className="text-sm text-emerald-50 mt-2 leading-relaxed opacity-90">
                    You've hit your activity goal 4 days in a row. You're
                    recovering faster than 80% of patients with similar
                    injuries!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientProgress;
