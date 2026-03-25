import React, { useState } from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PricingCard = ({ title, subTitle, price, duration, description, features, isFeatured }) => {
  return (
    <motion.div 
      layout
      whileHover={{ y: -10 }}
      className={`relative p-8 rounded-[2.5rem] flex flex-col h-full transition-all duration-500 overflow-hidden ${
        isFeatured 
        ? 'bg-gradient-to-br from-[#1b4b4b] to-[#266363] text-white shadow-2xl scale-105 z-10' 
        : 'bg-[#1a2b2b] text-white border border-white/5'
      }`}
    >
      {isFeatured && (
        <div className="absolute top-[-20%] right-[-20%] w-64 h-64 bg-teal-400/20 blur-[80px] rounded-full" />
      )}

      <div className="mb-8">
        <h3 className="text-3xl font-medium mb-3">{title}</h3>
        <p className="text-teal-400 text-sm font-semibold tracking-wide uppercase mb-6 leading-relaxed">
          {subTitle}
        </p>
        <div className="flex items-baseline gap-1">
          <span className="text-5xl font-bold">${price}</span>
          <span className="text-gray-400 text-xl">/{duration}</span>
        </div>
      </div>

      <div className="h-[1px] w-full bg-white/10 mb-8" />

      <p className="text-gray-300 text-sm leading-relaxed mb-8 min-h-[60px]">
        {description}
      </p>

      <ul className="space-y-5 mb-12 flex-grow">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-center justify-between group">
            <div className="flex items-center gap-3">
              <div className="bg-teal-500/20 p-1 rounded-full text-teal-400">
                <Check size={14} />
              </div>
              <span className="text-sm font-medium text-gray-200">{feature.name}</span>
            </div>
            <span className="text-gray-400 text-xs">— {feature.time}</span>
          </li>
        ))}
      </ul>

      <button className={`w-full group flex items-center justify-between py-3 px-6 rounded-full border transition-all duration-300 ${
        isFeatured 
        ? 'bg-[#0f2a28] border-transparent text-white hover:bg-white hover:text-[#0f2a28]' 
        : 'border-white/20 text-white hover:border-teal-400'
      }`}>
        <span className="font-semibold text-sm uppercase tracking-widest">Book Now</span>
        <div className={`p-2 rounded-full ${isFeatured ? 'bg-teal-500 text-white' : 'bg-teal-500/20 text-teal-400'}`}>
          <ArrowRight size={16} />
        </div>
      </button>
    </motion.div>
  );
};

const ServicePricing = () => {
  const [isMonthly, setIsMonthly] = useState(false);

  const plans = [
    {
      title: "Comfort Therapy",
      subTitle: "Start Using Flixi — No Cost, No Worries!",
      price: isMonthly ? "120" : "1100", // Example dynamic pricing
      duration: isMonthly ? "week" : "year",
      description: "Designed for small enterprises and startups eager to enhance competitive business growth potential.",
      features: [
        { name: "Spinal Therapy", time: "35 Mins" },
        { name: "Gentle Neck Care", time: "25 Mins" },
        { name: "Joint Therapy", time: "40 Mins" },
        { name: "Headache Relief", time: "30 Mins" },
      ]
    },
    {
      title: "Injury Relief",
      subTitle: "Begin Injury Relief — Simple, Fast, and Free!",
      price: isMonthly ? "500" : "4800",
      duration: isMonthly ? "Month" : "year",
      isFeatured: true,
      description: "Specialized Rehab Plans to Heal Injuries Quickly & Safely. Personalized Exercises That Accelerate Recovery.",
      features: [
        { name: "Sports Recovery Therapy", time: "40 Mins" },
        { name: "Fracture Recovery", time: "35 Mins" },
        { name: "Sprain & Strain Therapy", time: "30 Mins" },
        { name: "Ligament Rehab", time: "45 Mins" },
      ]
    },
    {
      title: "Flexibility Boost",
      subTitle: "Begin Your Stretching — No Charge",
      price: isMonthly ? "800" : "1000",
      duration: isMonthly ? "month" : "yearly",
      description: "Boost flexibility, movement, and balance with customized therapies designed to strengthen muscles.",
      features: [
        { name: "Walking Therapy", time: "30 Mins" },
        { name: "Balance Training", time: "35 Mins" },
        { name: "Stroke Care", time: "40 Mins" },
        { name: "Senior Mobility Support", time: "45 Mins" },
      ]
    }
  ];

  return (
    <div className="bg-[#e1eadd] min-h-screen py-20 px-6">
      
      {/* TOP HEADER SECTION */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="h-[1.5px] w-16 bg-[#3cb0b0]"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-[#3cb0b0]"></div>
          <span className="text-[#2a413f] text-xs font-bold tracking-[0.2em] uppercase">
            Value Plans
          </span>
        </div>

        <h2 className="text-[#2a413f] text-5xl md:text-6xl font-serif mb-10">
          Affordable <span className="text-[#3cb0b0]">Pricing Packages</span>
        </h2>

        {/* Toggle Switch */}
        <div className="flex items-center justify-center gap-6">
          <span className={`text-sm font-bold transition-colors ${!isMonthly ? 'text-[#3cb0b0]' : 'text-gray-400'}`}>Yearly</span>
          <button 
            onClick={() => setIsMonthly(!isMonthly)}
            className="w-16 h-8 bg-white rounded-full p-1 relative shadow-inner border border-gray-200"
          >
            <motion.div 
              animate={{ x: isMonthly ? 32 : 0 }}
              className="w-6 h-6 bg-[#2a413f] rounded-full shadow-md"
            />
          </button>
          <span className={`text-sm font-bold transition-colors ${isMonthly ? 'text-[#3cb0b0]' : 'text-gray-400'}`}>Monthly</span>
        </div>
      </motion.div>

      {/* Grid Container - Matches the darker card theme */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {plans.map((plan, index) => (
          <PricingCard key={index} {...plan} />
        ))}
      </div>
    </div>
  );
};

export default ServicePricing;