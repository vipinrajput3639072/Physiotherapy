import React, { useState, useRef } from "react";
import { Instagram, Play, X, Maximize2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const InstaSlider = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const videoRef = useRef(null);

  // Updated with Physiotherapy-themed video placeholders
  const instaVideos = [
    { id: 1, url: "https://assets.mixkit.co/videos/preview/mixkit-physiotherapist-handling-the-leg-of-a-patient-41002-large.mp4" },
    { id: 2, url: "https://assets.mixkit.co/videos/preview/mixkit-patient-doing-leg-exercises-with-a-physiotherapist-41007-large.mp4" },
    { id: 3, url: "https://assets.mixkit.co/videos/preview/mixkit-doctor-checking-a-patients-shoulder-41010-large.mp4" },
    { id: 4, url: "https://assets.mixkit.co/videos/preview/mixkit-physiotherapist-assisting-a-patient-with-a-walker-41005-large.mp4" },
    { id: 5, url: "https://assets.mixkit.co/videos/preview/mixkit-professional-physiotherapist-working-on-a-patient-41001-large.mp4" },
  ];

  const duplicatedVideos = [...instaVideos, ...instaVideos];

  // Logic to handle 10-second limit in the popup
  const handleTimeUpdate = (e) => {
    if (e.target.currentTime >= 10) {
      e.target.currentTime = 0; // Loops back to start after 10 seconds
      // OR use e.target.pause() if you want it to stop completely
    }
  };

  return (
    <section className="bg-[#E1EADD] py-8 md:py-12 overflow-hidden relative">
      <div className="flex">
        <motion.div
          className="flex gap-4 px-2"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            ease: "linear",
            duration: 35,
            repeat: Infinity,
          }}
          whileHover={{ transition: { duration: 60 } }} 
        >
          {duplicatedVideos.map((item, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedVideo(item.url)}
              className="relative flex-shrink-0 
                         w-48 h-64 md:w-80 md:h-96 
                         rounded-[2rem] md:rounded-[2.5rem] 
                         overflow-hidden shadow-lg group cursor-pointer bg-black"
            >
              <video
                src={item.url}
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all"
                autoPlay
                loop
                muted
                playsInline
              />
              
              <div className="absolute inset-0 bg-[#3cb0b0]/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center z-10">
                <div className="bg-white/20 backdrop-blur-md p-4 rounded-full mb-2">
                   <Maximize2 className="text-white" size={28} />
                </div>
                <span className="text-white text-[10px] font-bold uppercase tracking-widest">10s Preview</span>
              </div>

              <div className="absolute bottom-6 right-6 text-white/70">
                <Play size={20} fill="currentColor" />
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedVideo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 md:p-10 backdrop-blur-sm"
          >
            <button 
              onClick={() => setSelectedVideo(null)}
              className="absolute top-6 right-6 text-white hover:bg-white/10 p-2 rounded-full transition-all z-[110]"
            >
              <X size={32} />
            </button>

            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg aspect-[9/16] md:max-w-md rounded-[3rem] overflow-hidden shadow-2xl bg-black border-8 border-white/5"
            >
              <video
                ref={videoRef}
                src={selectedVideo}
                className="w-full h-full object-cover"
                autoPlay
                onTimeUpdate={handleTimeUpdate}
                playsInline
              />
              {/* Progress bar visual for 10 seconds */}
              <div className="absolute bottom-0 left-0 h-1 bg-teal-500 w-full origin-left animate-progress"></div>
            </motion.div>

            <div className="absolute inset-0 -z-10" onClick={() => setSelectedVideo(null)} />
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes progress {
          0% { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }
        .animate-progress {
          animation: progress 10s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default InstaSlider;