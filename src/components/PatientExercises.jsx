import React, { useState } from "react";
import {
  Play,
  CheckCircle2,
  Clock,
  Flame,
  ChevronRight,
  Dumbbell,
  Trophy,
  Info,
} from "lucide-react";

const PatientExercises = () => {
  const [filter, setFilter] = useState("All");

  const exercises = [
    {
      id: 1,
      title: "Quad Sets",
      duration: "5 mins",
      sets: "3 Sets of 10",
      difficulty: "Easy",
      category: "Strength",
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=400",
      completed: true,
    },
    {
      id: 2,
      title: "Straight Leg Raises",
      duration: "8 mins",
      sets: "3 Sets of 15",
      difficulty: "Medium",
      category: "Strength",
      image:
        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=400",
      completed: false,
    },
    {
      id: 3,
      title: "Heel Slides",
      duration: "10 mins",
      sets: "2 Sets of 20",
      difficulty: "Easy",
      category: "Mobility",
      image:
        "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?auto=format&fit=crop&q=80&w=400",
      completed: false,
    },
  ];

  const filteredExercises =
    filter === "All"
      ? exercises
      : exercises.filter((ex) => ex.category === filter);

  return (
    <div className="space-y-8 pb-10">
      {/* Header & Stats */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Exercise Program
          </h1>
          <p className="text-slate-500 mt-1">
            Personalized routines for your ACL recovery.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-emerald-50 p-2 rounded-2xl border border-emerald-100">
          <div className="px-4 py-2 text-center">
            <p className="text-[10px] font-black text-emerald-600 uppercase">
              Daily Streak
            </p>
            <p className="text-xl font-bold text-slate-900 flex items-center justify-center gap-1">
              <Flame className="w-5 h-5 text-orange-500 fill-orange-500" /> 5
              Days
            </p>
          </div>
          <div className="w-px h-10 bg-emerald-200" />
          <div className="px-4 py-2 text-center">
            <p className="text-[10px] font-black text-emerald-600 uppercase">
              Today's Goal
            </p>
            <p className="text-xl font-bold text-slate-900">1 / 3</p>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        {["All", "Strength", "Mobility", "Flexibility"].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
              filter === tab
                ? "bg-emerald-600 text-white shadow-lg shadow-emerald-200"
                : "bg-white text-slate-500 hover:bg-emerald-50 hover:text-emerald-600 border border-slate-100"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Exercise Grid */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredExercises.map((ex) => (
          <div
            key={ex.id}
            className="group bg-white rounded-[2rem] border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            {/* Image Thumbnail */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={ex.image}
                alt={ex.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
              <div className="absolute bottom-4 left-4 flex gap-2">
                <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full border border-white/30 uppercase">
                  {ex.category}
                </span>
                <span
                  className={`text-[10px] font-bold px-3 py-1 rounded-full border border-white/30 uppercase ${
                    ex.difficulty === "Easy"
                      ? "bg-emerald-500/80 text-white"
                      : "bg-amber-500/80 text-white"
                  }`}
                >
                  {ex.difficulty}
                </span>
              </div>
              {ex.completed && (
                <div className="absolute top-4 right-4 bg-emerald-500 text-white p-2 rounded-full shadow-lg">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4">
                {ex.title}
              </h3>

              <div className="grid grid-cols-2 gap-4 mb-6 text-sm font-medium text-slate-500">
                <div className="flex items-center gap-2 bg-slate-50 p-3 rounded-2xl">
                  <Clock className="w-4 h-4 text-emerald-500" />
                  {ex.duration}
                </div>
                <div className="flex items-center gap-2 bg-slate-50 p-3 rounded-2xl">
                  <Dumbbell className="w-4 h-4 text-emerald-500" />
                  {ex.sets}
                </div>
              </div>

              <button
                className={`w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold transition-all ${
                  ex.completed
                    ? "bg-slate-100 text-slate-400 cursor-default"
                    : "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-100 hover:shadow-emerald-200 active:scale-95"
                }`}
              >
                {ex.completed ? "Completed Today" : "Start Exercise"}
                {!ex.completed && <Play className="w-4 h-4 fill-white" />}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Reward Card */}
      <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
        <div className="shrink-0 p-4 bg-emerald-500/20 rounded-3xl border border-emerald-500/30">
          <Trophy className="w-12 h-12 text-emerald-400" />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl font-bold">Weekly Milestone</h2>
          <p className="text-slate-400 mt-1">
            Complete 2 more sessions to unlock your recovery badge.
          </p>
          <div className="mt-4 flex items-center justify-center md:justify-start gap-4">
            <div className="flex-1 h-2 bg-slate-800 rounded-full max-w-xs overflow-hidden">
              <div className="h-full bg-emerald-500 w-3/4 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
            </div>
            <span className="text-sm font-bold text-emerald-400">75%</span>
          </div>
        </div>
        <button className="px-8 py-3 bg-white text-slate-900 rounded-2xl font-bold hover:bg-emerald-50 transition-colors">
          View Rewards
        </button>
      </div>
    </div>
  );
};

export default PatientExercises;
