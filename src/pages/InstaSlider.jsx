import React, { useState } from "react";
import { Volume2, VolumeX, Activity } from "lucide-react";
import { motion } from "framer-motion";

const InstaSlider = () => {
  const [unmutedId, setUnmutedId] = useState(null);

  const instaVideos = [
    { id: 1, url: "https://www.youtube.com/embed/LOth2cr8aTw", title: "Knee Rehab" },
    { id: 2, url: "https://www.youtube.com/embed/9h_bF5c57Ng", title: "Spine Care" },
    { id: 3, url: "https://assets.mixkit.co/videos/preview/mixkit-doctor-checking-a-patients-shoulder-41010-large.mp4", title: "Shoulder Check" },
    { id: 4, url: "https://assets.mixkit.co/videos/preview/mixkit-physiotherapist-assisting-a-patient-with-a-walker-41005-large.mp4", title: "Mobility Aid" },
    { id: 5, url: "https://assets.mixkit.co/videos/preview/mixkit-professional-physiotherapist-working-on-a-patient-41001-large.mp4", title: "Manual Therapy" },
    { id: 6, url: "https://assets.mixkit.co/videos/preview/mixkit-woman-doing-stretching-exercises-with-a-physiotherapist-41003-large.mp4", title: "Stretching" },
  ];

  const duplicatedVideos = [...instaVideos, ...instaVideos];

  const getYoutubeId = (url) => {
    if (!url.includes("youtube")) return null;
    const parts = url.split("/");
    return parts[parts.length - 1].split("?")[0];
  };

  const handleCardClick = (uniqueId) => {
    setUnmutedId(unmutedId === uniqueId ? null : uniqueId);
  };

  return (
    <section className="py-24 bg-[#f8fafc] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-50 border border-teal-100 mb-4"
        >
          <Activity size={16} className="text-teal-600" />
          <span className="text-teal-700 text-xs font-bold uppercase tracking-[0.2em]">Our Expertise</span>
        </motion.div>
        
        <h2 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight">
          Healing in <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-500">Motion</span>
        </h2>
        
        <p className="text-slate-500 mt-4 max-w-2xl mx-auto text-lg leading-relaxed">
          Experience our advanced physiotherapy techniques through our live session reels. 
          <span className="block font-medium text-slate-700">Tap any video to unmute.</span>
        </p>
      </div>

      <div className="relative flex overflow-hidden">
        <motion.div
          className="flex gap-6 px-4"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 45, repeat: Infinity }}
        >
          {duplicatedVideos.map((item, idx) => {
            const uniqueId = `${item.id}-${idx}`;
            const isUnmuted = unmutedId === uniqueId;
            const ytId = getYoutubeId(item.url);

            return (
              <div
                key={uniqueId}
                onClick={() => handleCardClick(uniqueId)}
                className={`relative flex-shrink-0 w-72 h-[500px] md:w-80 md:h-[550px] rounded-[3rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] bg-slate-900 cursor-pointer transition-all duration-700 ${
                  isUnmuted ? "ring-[6px] ring-teal-500/30 scale-[1.03] z-10" : "scale-100 hover:scale-[1.01]"
                }`}
              >
                {!item.url.includes("youtube") ? (
                  <video
                    src={item.url}
                    autoPlay
                    loop
                    muted={!isUnmuted}
                    playsInline
                    className="w-full h-full object-cover opacity-90 transition-opacity duration-500"
                  />
                ) : (
                  <iframe
                    src={`${item.url}?autoplay=1&mute=${isUnmuted ? "0" : "1"}&controls=0&modestbranding=1&loop=1&playlist=${ytId}&rel=0`}
                    className="w-full h-full pointer-events-none border-none scale-[1.6]" 
                    allow="autoplay; encrypted-media"
                  />
                )}

               
                <div className="absolute top-8 right-8 z-30">
                  <div className={`p-3 rounded-full backdrop-blur-xl border border-white/20 transition-all duration-300 ${isUnmuted ? "bg-teal-500 text-white" : "bg-black/20 text-white/70"}`}>
                    {isUnmuted ? <Volume2 size={20} className="animate-pulse" /> : <VolumeX size={20} />}
                  </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent pointer-events-none" />
                
                <div className="absolute bottom-10 left-8 z-10">
                  <div className="flex items-center gap-2 mb-2">
                  </div>
                  <h3 className="text-white text-2xl font-bold tracking-tight mb-1">{item.title}</h3>
                  <p className="text-teal-400 text-sm font-medium">Expert Physiotherapy</p>
                </div>

                <div className="absolute top-8 left-8 z-10">
                   <div className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full">
                      <span className="text-white text-[10px] font-black uppercase tracking-widest">Reel</span>
                   </div>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>

      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-teal-200/20 blur-[120px] rounded-full -z-10" />
      <div className="absolute top-1/4 right-0 w-72 h-72 bg-emerald-200/20 blur-[100px] rounded-full -z-10" />
    </section>
  );
};

export default InstaSlider;