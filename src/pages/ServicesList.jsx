import React from "react";
import {
  ArrowRight,
  Activity,
  Zap,
  ShieldAlert,
  HeartPulse,
  Bone,
  Home,
  PhoneCall,
} from "lucide-react";

const servicesList = [
  {
    title: "Manual Therapy",
    description:
      "Hands-on physiotherapy designed to alleviate muscle tension and restore natural movement patterns.",
    icon: <Activity size={28} />,
  },
  {
    title: "Strength Recovery",
    description:
      "Specialized rehabilitation designed to restore strength and flexibility after injury or surgery.",
    icon: <Zap size={28} />,
  },
  {
    title: "Back Pain Relief",
    description:
      "Focuses on reducing pain and improving spinal alignment for long-term comfort and mobility.",
    icon: <ShieldAlert size={28} />,
  },
  {
    title: "Sports Injuries",
    description:
      "Helping athletes recover faster and return to peak performance with targeted exercise plans.",
    icon: <HeartPulse size={28} />,
  },
  {
    title: "Joint Care",
    description:
      "Specialized care for arthritis and joint stiffness to improve your daily range of motion.",
    icon: <Bone size={28} />,
  },
  // ✅ 6th EXTRA OPTION: HOME VISITS
  {
    title: "Home Physiotherapy",
    description:
      "Get professional treatment in the comfort of your home. Perfect for post-op or elderly care.",
    icon: <Home size={28} />,
  },
];

const ServicesListView = () => {
  return (
    <section className="bg-[#e2e8e1] py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="text-left">
            <span className="text-[#489e9e] font-bold text-xs uppercase tracking-[0.3em] mb-4 block">
              Our Expertise
            </span>
            <h2 className="text-[#1a2e2c] text-4xl md:text-6xl font-serif font-bold leading-tight">
              Healing <span className="text-[#489e9e]">Solutions</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {servicesList.map((service, index) => (
            <div
              key={index}
              className="group relative bg-white p-10 rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all duration-500 border border-transparent hover:border-[#489e9e]/20 flex flex-col h-full overflow-hidden"
            >
              {/* Icon Style */}
              <div className="mb-8 w-16 h-16 bg-[#f0f4f0] text-[#1a2e2c] rounded-2xl flex items-center justify-center group-hover:bg-[#489e9e] group-hover:text-white transition-all duration-500 transform group-hover:-rotate-12 shadow-inner">
                {service.icon}
              </div>

              {/* Content */}
              <div className="flex-grow">
                <h3 className="text-[#1a2e2c] text-2xl font-serif font-bold mb-4 tracking-tight group-hover:text-[#489e9e] transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-500 leading-relaxed mb-8 text-sm md:text-base opacity-80 group-hover:opacity-100">
                  {service.description}
                </p>
              </div>

              {/* Action */}
              <div className="flex items-center text-[#1a2e2c] font-black text-[10px] uppercase tracking-[0.2em] group-hover:text-[#489e9e] transition-colors cursor-pointer border-t pt-6 border-gray-100">
                <span>View Details</span>
                <ArrowRight className="ml-auto w-5 h-5 transform group-hover:translate-x-2 transition-transform" />
              </div>

              {/* Animated Accent Bar */}
              <div className="absolute bottom-0 left-0 h-2 w-0 bg-gradient-to-r from-[#489e9e] to-[#1a2e2c] transition-all duration-700 group-hover:w-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesListView;
