import React, { useState } from "react";
import { 
  PlayCircle, Plus, Search, MoreVertical, 
  Trash2, Edit3, Film, Filter, X, 
  Calendar, User, Clock, ChevronRight
} from "lucide-react";

const VideoConsults = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [videos, setVideos] = useState([
    { id: 1, title: "Lower Back Stretching", category: "Lumbar", patient: "All Patients", duration: "05:20", date: "24 Apr 2026" },
    { id: 2, title: "Post-ACL Surgery Level 1", category: "Knee Rehab", patient: "Rahul Verma", duration: "12:45", date: "22 Apr 2026" },
    { id: 3, title: "Cervical Isometrics", category: "Neck", patient: "Anjali Gupta", duration: "08:10", date: "20 Apr 2026" },
  ]);

  const [newVideo, setNewVideo] = useState({ title: "", category: "Lumbar", patient: "", duration: "" });

  const handleAddVideo = (e) => {
    e.preventDefault();
    const videoToAdd = {
      ...newVideo,
      id: Date.now(),
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    };
    setVideos([videoToAdd, ...videos]);
    setIsModalOpen(false);
    setNewVideo({ title: "", category: "Lumbar", patient: "", duration: "" });
  };

  const deleteVideo = (id) => {
    setVideos(videos.filter(v => v.id !== id));
  };

  const filteredVideos = videos.filter(video => 
    video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    video.patient.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="md:ml-64 min-h-screen bg-[#fcfcfd] p-6 lg:p-10 animate-in fade-in duration-700">
      
      {/* --- PREMIUM HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm mb-2 uppercase tracking-widest">
            <div className="h-1 w-8 bg-indigo-600 rounded-full"></div>
            Management Portal
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Exercise Library</h1>
          <p className="text-slate-500 mt-2 font-medium">Create and manage therapeutic video content for patients.</p>
        </div>
        
        <button 
          onClick={() => setIsModalOpen(true)}
          className="group flex items-center gap-3 bg-slate-900 hover:bg-indigo-600 text-white px-8 py-4 rounded-2xl transition-all shadow-2xl shadow-indigo-100 font-bold active:scale-95"
        >
          <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
          <span>Upload Content</span>
        </button>
      </div>

      {/* --- STATS MINI BAR --- */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        {[
          { label: "Total Videos", val: videos.length, icon: <Film size={18}/> },
          { label: "Active Assignments", val: "128", icon: <User size={18}/> },
          { label: "Total Watchtime", val: "42h", icon: <Clock size={18}/> },
        ].map((stat, i) => (
          <div key={i} className="bg-white border border-slate-100 p-5 rounded-3xl flex items-center justify-between shadow-sm">
            <div>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">{stat.label}</p>
              <p className="text-2xl font-black text-slate-800">{stat.val}</p>
            </div>
            <div className="h-12 w-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400">
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      {/* --- MAIN CONTENT CARD --- */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden">
        
        {/* Search & Filter Toolbar */}
        <div className="p-8 border-b border-slate-50 flex flex-col lg:flex-row justify-between items-center gap-6 bg-white">
          <div className="relative w-full max-w-xl">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search exercises, body parts, or patients..."
              className="w-full pl-14 pr-6 py-4 bg-slate-50/50 border border-slate-100 rounded-2xl text-slate-700 focus:ring-4 focus:ring-indigo-500/5 focus:bg-white outline-none font-medium transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3 w-full lg:w-auto">
             <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-6 py-4 border border-slate-100 rounded-2xl text-slate-600 font-bold hover:bg-slate-50 transition-all">
                <Filter size={18} />
                <span>Filters</span>
             </button>
          </div>
        </div>

        {/* Custom Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-slate-400 text-[11px] uppercase tracking-[0.2em]">
                <th className="px-10 py-6 font-black text-slate-500">Resource Name</th>
                <th className="px-8 py-6 font-black">Clinical Category</th>
                <th className="px-8 py-6 font-black">Assigned Patient</th>
                <th className="px-8 py-6 font-black">Publish Date</th>
                <th className="px-10 py-6 font-black text-right">Settings</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredVideos.map((video) => (
                <tr key={video.id} className="hover:bg-indigo-50/30 transition-all group cursor-default">
                  <td className="px-10 py-7">
                    <div className="flex items-center gap-5">
                      <div className="relative h-16 w-28 rounded-2xl overflow-hidden bg-slate-900 group-hover:scale-105 transition-transform duration-500 shadow-lg shadow-slate-200">
                         <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900/60 to-transparent flex items-center justify-center">
                            <PlayCircle size={28} className="text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                         </div>
                         <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-[9px] text-white font-bold">
                            {video.duration}
                         </div>
                      </div>
                      <div>
                        <div className="font-bold text-slate-800 text-base group-hover:text-indigo-600 transition-colors">{video.title}</div>
                        <div className="flex items-center gap-2 text-slate-400 text-xs mt-1 font-medium">
                           <Clock size={12}/> HD Content
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-7">
                    <span className="px-4 py-1.5 bg-slate-100 text-slate-600 rounded-full text-[10px] font-black uppercase tracking-wider">
                      {video.category}
                    </span>
                  </td>
                  <td className="px-8 py-7">
                    <div className="flex items-center gap-2 text-slate-700 font-bold text-sm">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      {video.patient}
                    </div>
                  </td>
                  <td className="px-8 py-7">
                    <div className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase">
                       <Calendar size={14}/> {video.date}
                    </div>
                  </td>
                  <td className="px-10 py-7 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                      <button className="h-10 w-10 flex items-center justify-center bg-white border border-slate-100 text-slate-400 hover:text-indigo-600 hover:border-indigo-100 rounded-xl transition-all shadow-sm">
                        <Edit3 size={18} />
                      </button>
                      <button 
                        onClick={() => deleteVideo(video.id)}
                        className="h-10 w-10 flex items-center justify-center bg-white border border-slate-100 text-slate-400 hover:text-rose-600 hover:border-rose-100 rounded-xl transition-all shadow-sm"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- MODERN OVERLAY MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-6">
          <div className="bg-white rounded-[3rem] w-full max-w-lg overflow-hidden shadow-2xl animate-in zoom-in duration-300">
            <div className="relative p-10">
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="absolute top-8 right-8 h-10 w-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-all"
              >
                <X size={20} />
              </button>

              <div className="mb-10 text-center">
                <div className="h-16 w-16 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-4">
                   <Film size={32}/>
                </div>
                <h2 className="text-3xl font-black text-slate-900">New Exercise</h2>
                <p className="text-slate-500 font-medium">Add a new therapeutic video module.</p>
              </div>

              <form onSubmit={handleAddVideo} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-slate-400 tracking-widest ml-1">Video Headline</label>
                  <input 
                    required
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:bg-white focus:border-indigo-200 font-bold text-slate-700 transition-all"
                    placeholder="e.g. Deep Breathing Exercises"
                    value={newVideo.title}
                    onChange={(e) => setNewVideo({...newVideo, title: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase text-slate-400 tracking-widest ml-1">Category</label>
                    <select 
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none font-bold text-slate-700 transition-all appearance-none"
                      value={newVideo.category}
                      onChange={(e) => setNewVideo({...newVideo, category: e.target.value})}
                    >
                      <option>Lumbar</option>
                      <option>Knee Rehab</option>
                      <option>Neck</option>
                      <option>Shoulder</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase text-slate-400 tracking-widest ml-1">Duration</label>
                    <input 
                      required
                      placeholder="MM:SS"
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none font-bold text-slate-700 transition-all"
                      value={newVideo.duration}
                      onChange={(e) => setNewVideo({...newVideo, duration: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-slate-400 tracking-widest ml-1">Assign Patient</label>
                  <input 
                    required
                    placeholder="Search by name..."
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none font-bold text-slate-700 transition-all"
                    value={newVideo.patient}
                    onChange={(e) => setNewVideo({...newVideo, patient: e.target.value})}
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-5 rounded-2xl mt-6 transition-all shadow-xl shadow-indigo-200 flex items-center justify-center gap-3"
                >
                  <span>PUBLISH RESOURCE</span>
                  <ChevronRight size={20}/>
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoConsults;