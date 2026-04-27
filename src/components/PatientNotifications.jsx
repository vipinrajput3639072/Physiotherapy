import React, { useState } from 'react';
import { 
  Bell, Calendar, Dumbbell, MessageSquare, 
  CreditCard, CheckCircle2, Clock, MoreHorizontal, Trash2 
} from 'lucide-react';

const PatientNotifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'appointment',
      title: 'Appointment Confirmed',
      message: 'Your session with Dr. Sarah Wilson is scheduled for tomorrow at 10:00 AM.',
      time: '2 hours ago',
      isRead: false,
      icon: Calendar,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      id: 2,
      type: 'exercise',
      title: 'Daily Exercise Reminder',
      message: 'Time for your "Knee Strengthening Level 1" routine. Consistency is key!',
      time: '5 hours ago',
      isRead: false,
      icon: Dumbbell,
      color: 'bg-emerald-100 text-emerald-600'
    },
    {
      id: 3,
      type: 'payment',
      title: 'Payment Successful',
      message: 'Receipt #PHY-9928 for your last session has been processed.',
      time: '1 day ago',
      isRead: true,
      icon: CreditCard,
      color: 'bg-purple-100 text-purple-600'
    },
    {
      id: 4,
      type: 'message',
      title: 'New Message',
      message: 'Dr. Sarah Wilson sent you a new message regarding your recovery plan.',
      time: '2 days ago',
      isRead: true,
      icon: MessageSquare,
      color: 'bg-amber-100 text-amber-600'
    }
  ]);

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
            Notifications
            <span className="text-xs bg-emerald-500 text-white px-2 py-1 rounded-full">
              {notifications.filter(n => !n.isRead).length} New
            </span>
          </h1>
          <p className="text-slate-500 mt-1">Stay updated with your latest health activity.</p>
        </div>
        <button 
          onClick={markAllAsRead}
          className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
        >
          Mark all as read
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {notifications.length > 0 ? (
          notifications.map((n) => (
            <div 
              key={n.id}
              className={`group relative p-5 rounded-3xl border transition-all duration-300 ${
                n.isRead 
                ? 'bg-white/40 border-slate-100 grayscale-[0.5]' 
                : 'bg-white border-emerald-100 shadow-md shadow-emerald-500/5'
              }`}
            >
              <div className="flex gap-4">
                {/* Icon Circle */}
                <div className={`shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center ${n.color}`}>
                  <n.icon className="w-6 h-6" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className={`font-bold truncate ${n.isRead ? 'text-slate-700' : 'text-slate-900'}`}>
                      {n.title}
                    </h3>
                    <span className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {n.time}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed italic">
                    "{n.message}"
                  </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => deleteNotification(n.id)}
                    className="p-2 hover:bg-rose-50 text-slate-400 hover:text-rose-500 rounded-xl transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Unread Indicator Dot */}
              {!n.isRead && (
                <div className="absolute top-6 right-2 w-2 h-2 bg-emerald-500 rounded-full" />
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-20 bg-white/50 rounded-3xl border border-dashed border-slate-200">
            <Bell className="w-12 h-12 text-slate-200 mx-auto mb-4" />
            <p className="text-slate-400 font-medium">No notifications yet</p>
          </div>
        )}
      </div>

      {/* Settings Shortcut */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-xl shadow-emerald-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <CheckCircle2 className="w-8 h-8 text-emerald-100" />
            <div>
              <p className="font-bold">Notification Preferences</p>
              <p className="text-xs text-emerald-50">Manage how you receive alerts via Email or SMS.</p>
            </div>
          </div>
          <button className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-xl text-xs font-bold transition-all border border-white/20">
            Configure
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientNotifications;