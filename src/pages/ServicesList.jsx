import React from "react";
import { ArrowRight, Activity, Zap, ShieldAlert } from "lucide-react";

const servicesList = [
  {
    title: "Manual Therapy",
    description:
      "Hands-on physiotherapy designed to alleviate muscle tension, reduce joint stiffness, and restore natural movement patterns.",
    icon: <Activity size={28} />,
  },
  {
    title: "Strength Recovery",
    description:
      "Specialized rehabilitation designed to restore strength, flexibility, and range of motion after injury or surgery.",
    icon: <Zap size={28} />,
  },
  {
    title: "Back Pain Management",
    description:
      "Focuses on reducing pain, improving spinal alignment, and strengthening core muscles for long-term relief.",
    icon: <ShieldAlert size={28} />,
  },
];

const ServicesListView = () => {
  return (
    <section className="bg-[#e2e8e1] py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesList.map((service, index) => (
            <div
              key={index}
              className="group relative bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 border border-transparent hover:border-[#489e9e]/20 flex flex-col h-full"
            >
              {/* Icon - Floating Style */}
              <div className="mb-6 w-14 h-14 bg-[#e2e8e1] text-[#1a2e2c] rounded-xl flex items-center justify-center group-hover:bg-[#489e9e] group-hover:text-white transition-colors duration-300">
                {service.icon}
              </div>

              {/* Content */}
              <div className="flex-grow">
                <h3 className="text-[#1a2e2c] text-2xl font-serif font-semibold mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-500 leading-relaxed mb-8">
                  {service.description}
                </p>
              </div>

              {/* Action Link */}
              <div className="flex items-center text-[#1a2e2c] font-semibold group-hover:text-[#489e9e] transition-colors cursor-pointer">
                <span>Learn More</span>
                <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-2 transition-transform" />
              </div>
              
              {/* Subtle accent border on hover */}
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-[#489e9e] transition-all duration-500 group-hover:w-full rounded-b-2xl" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesListView;