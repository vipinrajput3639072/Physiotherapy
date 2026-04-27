import React, { useState } from "react";
import { 
  PlayCircle, Plus, Search, MoreVertical, 
  Trash2, Edit3, Film, Filter 
} from "lucide-react";

const VideoConsults = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const videos = [
    { id: 1, title: "Lower Back Stretching", category: "Lumbar", patient: "All Patients", duration: "05:20", date: "24 Apr 2026" },
    { id: 2, title: "Post-ACL Surgery Level 1", category: "Knee Rehab", patient: "Rahul Verma", duration: "12:45", date: "22 Apr 2026" },
    { id: 3, title: "Cervical Isometrics", category: "Neck", patient: "Anjali Gupta", duration: "08:10", date: "20 Apr 2026" },
  ];

  return (
    <div className="w-full animate-in fade-in duration-700 p-8">
      {/* Header Section */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-gray-900">Exercise Videos</h1>
          <p className="text-gray-500 font-medium italic">Assign recovery visuals to your patients</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition-all shadow-lg shadow-blue-100 font-bold active:scale-95">
          <Plus size={20} />
          <span>Add New Video</span>
        </button>
      </div>

      {/* Main Container */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="p-6 border-b border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4 bg-gray-50/20">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search by title or patient name..."
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200/50 rounded-2xl text-sm focus:ring-4 focus:ring-blue-500/5 outline-none font-medium transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-3 w-full md:w-auto">
             <div className="flex items-center gap-2 bg-white border border-gray-100 px-4 py-2 rounded-xl text-xs font-black text-gray-400 uppercase tracking-widest cursor-pointer hover:bg-gray-50">
                <Filter size={14} />
                <span>Filter</span>
             </div>
             <select className="bg-white border border-gray-100 px-4 py-2 rounded-xl text-xs font-black text-blue-600 outline-none uppercase tracking-widest">
                <option>All Categories</option>
                <option>Knee Rehab</option>
                <option>Lumbar</option>
                <option>Neck</option>
             </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-400 text-[10px] uppercase tracking-[0.2em] border-b border-gray-50 bg-gray-50/30">
                <th className="px-8 py-5 font-black">Video Preview</th>
                <th className="px-8 py-5 font-black">Category</th>
                <th className="px-8 py-5 font-black">Assigned To</th>
                <th className="px-8 py-5 font-black">Date</th>
                <th className="px-8 py-5 font-black text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {videos.map((video) => (
                <tr key={video.id} className="hover:bg-blue-50/20 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-24 h-14 bg-gray-900 rounded-xl flex items-center justify-center relative shadow-md group-hover:scale-105 transition-transform cursor-pointer overflow-hidden">
                         <Film size={20} className="text-gray-700" />
                         <div className="absolute inset-0 bg-blue-600/10 flex items-center justify-center">
                            <PlayCircle size={24} className="text-white drop-shadow-md" />
                         </div>
                      </div>
                      <div>
                        <div className="font-bold text-gray-900 text-sm leading-tight">{video.title}</div>
                        <div className="text-[10px] text-blue-500 font-black mt-1 uppercase">{video.duration} MINS</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-[10px] font-black uppercase tracking-wider">
                      {video.category}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-gray-700 font-bold text-sm">
                    {video.patient}
                  </td>
                  <td className="px-8 py-6 text-gray-400 font-bold text-[11px]">
                    {video.date}
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end gap-1">
                      <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
                        <Edit3 size={18} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Area */}
        <div className="px-8 py-5 bg-gray-50/50 flex justify-between items-center">
          <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest">
            Showing {videos.length} exercise modules
          </span>
          <div className="flex gap-2">
             <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:bg-white transition-all"><MoreVertical size={14}/></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoConsults;