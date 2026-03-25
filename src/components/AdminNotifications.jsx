import { useState } from "react";
import {
  Bell,
  Calendar,
  AlertTriangle,
  Info,
  CheckCircle2,
  Clock,
  Mail,
  MessageSquare,
  Settings,
  X,
  Trash2,
  ShieldAlert,
} from "lucide-react";
import toast from "react-hot-toast";

const NotificationsHub = () => {
  const [filter, setFilter] = useState("all");

  // Mock Notification Data
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "appointment",
      priority: "high",
      title: "Reminder Sent: John Cooper",
      desc: "SMS and Email sent for tomorrow's 10:00 AM session.",
      time: "2 mins ago",
      status: "sent",
    },
    {
      id: 2,
      type: "system",
      priority: "critical",
      title: "Server Maintenance",
      desc: "System will be offline for 15 mins at 02:00 AM for database optimization.",
      time: "1 hour ago",
      status: "unread",
    },
    {
      id: 3,
      type: "update",
      priority: "info",
      title: "New Feature: Progress Charts",
      desc: "The Patient Progress module now supports multi-line trend tracking.",
      time: "3 hours ago",
      status: "read",
    },
    {
      id: 4,
      type: "alert",
      priority: "medium",
      title: "Payment Overdue",
      desc: "Invoice #INV-8823 for Robert Fox is now 5 days overdue.",
      time: "5 hours ago",
      status: "unread",
    },
  ]);

  const getPriorityStyles = (priority) => {
    switch (priority) {
      case "critical":
        return "bg-rose-50 text-rose-600 border-rose-100";
      case "high":
        return "bg-orange-50 text-orange-600 border-orange-100";
      case "medium":
        return "bg-amber-50 text-amber-600 border-amber-100";
      default:
        return "bg-blue-50 text-blue-600 border-blue-100";
    }
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter((n) => n.id !== id));
    toast.success("Notification cleared");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      {/* --- Header Section --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Bell className="w-8 h-8 text-gray-900" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 border-2 border-white rounded-full"></span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Communication Hub
            </h1>
            <p className="text-sm text-gray-500 font-medium">
              Manage reminders, alerts, and platform updates
            </p>
          </div>
        </div>

        <div className="flex gap-2 p-1.5 bg-gray-50 rounded-2xl">
          {["all", "unread", "system"].map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                filter === t
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* --- Notification List --- */}
      <div className="space-y-4">
        {notifications.map((note) => (
          <div
            key={note.id}
            className={`group bg-white p-6 rounded-[2rem] border transition-all hover:shadow-md flex gap-5 items-start ${
              note.status === "unread"
                ? "border-indigo-100 shadow-sm shadow-indigo-50"
                : "border-gray-50"
            }`}
          >
            {/* Icon Mapping */}
            <div
              className={`p-4 rounded-2xl border ${getPriorityStyles(note.priority)}`}
            >
              {note.type === "appointment" && <Calendar className="w-6 h-6" />}
              {note.type === "system" && <ShieldAlert className="w-6 h-6" />}
              {note.type === "update" && <Info className="w-6 h-6" />}
              {note.type === "alert" && <AlertTriangle className="w-6 h-6" />}
            </div>

            <div className="flex-1">
              <div className="flex justify-between items-start mb-1">
                <h3
                  className={`font-bold ${note.status === "unread" ? "text-gray-900" : "text-gray-600"}`}
                >
                  {note.title}
                </h3>
                <span className="text-[10px] font-bold text-gray-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {note.time}
                </span>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed mb-4">
                {note.desc}
              </p>

              <div className="flex items-center gap-4">
                {note.type === "appointment" && (
                  <div className="flex gap-2">
                    <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-black uppercase">
                      <Mail className="w-3 h-3" /> Email Sent
                    </span>
                    <span className="flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-black uppercase">
                      <MessageSquare className="w-3 h-3" /> SMS Sent
                    </span>
                  </div>
                )}
                <button className="text-[10px] font-bold text-indigo-600 hover:underline">
                  View Details
                </button>
              </div>
            </div>

            <button
              onClick={() => deleteNotification(note.id)}
              className="p-2 text-gray-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all opacity-0 group-hover:opacity-100"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>

      {/* --- Automation Settings Card --- */}
      <div className="bg-indigo-900 p-8 rounded-[3rem] text-white shadow-xl shadow-indigo-100 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-5">
          <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-md">
            <Settings className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Automation Rules</h2>
            <p className="text-indigo-200 text-sm">
              Reminders are sent 24 hours before sessions.
            </p>
          </div>
        </div>
        <button className="px-8 py-3 bg-white text-indigo-900 font-bold rounded-2xl hover:bg-indigo-50 transition-all">
          Configure Rules
        </button>
      </div>
    </div>
  );
};

export default NotificationsHub;
