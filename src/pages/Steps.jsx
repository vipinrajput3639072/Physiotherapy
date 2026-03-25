import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MedicalProcess = () => {
  const [activeStep, setActiveStep] = useState(5); // Step 6 is index 5

  const steps = [
    { id: 1, title: "Book Your Visit", desc: "Easy online scheduling to get you started on your recovery journey immediately." },
    { id: 2, title: "Initial Medical Consultation", desc: "A thorough assessment by our specialists to understand your specific needs." },
    { id: 3, title: "Whole Body Checkup", desc: "Deep dive into imaging and physical tests to pinpoint the root cause." },
    { id: 4, title: "Personalized Care Plan", desc: "Creating a roadmap tailored to your lifestyle and recovery goals." },
    { id: 5, title: "Skilled Hands Therapy", desc: "Hands-on manual therapy techniques to improve mobility and reduce pain." },
    { id: 6, title: "Improvement & Recovery", desc: "Get a tailored program focused on boosting progress, restoring function, and rebuilding strength." },
  ];

  const getPosition = (index, total) => {
    const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
    const radius = 340;
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
    };
  };

  return (
    // Changed to flex-col and added py-20 to allow space for the top header
    <div className="relative w-full min-h-screen bg-[#e1eadd] flex flex-col items-center justify-start overflow-hidden font-sans py-20 px-10">
      
      {/* TOP HEADER SECTION */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16 relative z-30"
      >
        {/* Secure Care Badge */}
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="h-[1.5px] w-24 bg-[#3cb0b0]"></div>
          <div className="w-3 h-3 rounded-full bg-[#3cb0b0]"></div>
          <span className="text-[#2a413f] text-sm font-bold tracking-[0.2em] uppercase">
            Secure Care
          </span>
        </div>

        {/* Main Title */}
        <h2 className="text-[#2a413f] text-5xl md:text-6xl font-serif leading-tight">
          The Steps <span className="text-[#3cb0b0]">To Begin Your</span> <br />
          Recovery
        </h2>
      </motion.div>

      {/* Central Interactive Area */}
      <div className="relative w-[600px] h-[630px] flex items-center justify-center mt-10">
        
        {/* Concentric Background Rings */}
        <svg className="absolute inset-0 w-full h-full -rotate-90">
          {[0.6, 0.8, 1].map((scale, i) => (
            <motion.circle
              key={i}
              cx="300"
              cy="300"
              r={280 * scale}
              fill="none"
              stroke="white"
              strokeWidth="40"
              strokeOpacity={0.3 - i * 0.1}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: i * 0.3 }}
            />
          ))}
        </svg>

        {/* Center Image Container */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative z-10 w-[450px] h-[450px] rounded-full border-[15px] border-[#a9ceca] overflow-hidden shadow-2xl"
        >
          <img 
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfAR9ghXe_3Rj0iieTeP_rxPpni-o-27BIiA&s" 
            alt="Medical Exam" 
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-20 right-20 w-32 h-32 bg-red-500/40 blur-[40px] rounded-full animate-pulse" />
        </motion.div>

        {/* Steps Mapping */}
        {steps.map((step, i) => {
          const { x, y } = getPosition(i, steps.length);
          const isActive = activeStep === i;

          return (
            <div
              key={step.id}
              className="absolute z-20"
              style={{
                transform: `translate(${x}px, ${y}px)`,
              }}
            >
              <div className="relative group flex flex-col items-center">
                <span className="block text-[#4a5548] font-medium mb-2 text-lg">
                  Step:{step.id}
                </span>

                <motion.button
                  onClick={() => setActiveStep(i)}
                  whileHover={{ scale: 1.05 }}
                  className={`px-8 py-3 rounded-full text-white font-medium transition-all duration-500 shadow-lg whitespace-nowrap ${
                    isActive ? 'bg-[#3cb0b0] scale-110' : 'bg-[#2a413f]'
                  }`}
                >
                  {step.title}
                </motion.button>

                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 20, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="absolute top-full mt-4 w-64 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl z-30"
                    >
                      <p className="text-[#5a6b5a] leading-relaxed">
                        {step.desc}
                      </p>
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white/90 rotate-45" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MedicalProcess;