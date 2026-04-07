import React from "react";
import { Phone, Clock, ArrowRight, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const BookingSection = () => {
  return (
    <section
      id="contact-section"
      className="bg-[#E1EADD] py-12 md:py-24 px-4 sm:px-6 md:px-12 lg:px-16 font-sans overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* MAIN CONTAINER */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          /* Key Responsive Fixes:
             1. Removed fixed 'h-' heights to allow content to flow.
             2. Used 'min-h-fit' for structural integrity.
             3. Adjusted padding dynamically (py-12 on mobile vs py-20 on desktop).
          */
          className="relative rounded-[2.5rem] md:rounded-[3rem] bg-[#E1EADD] min-h-fit shadow-2xl border-4 md:border-8 border-white py-12 px-6 md:py-20 md:px-12"
        >
          <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-12">
            
            {/* LEFT CONTENT BLOCK */}
            <div className="w-full lg:max-w-2xl text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
                <div className="hidden sm:block h-[2px] w-10 bg-teal-500" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#2a413f]">
                  Plan Your Visit
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-[#2a413f] leading-tight mb-6">
                Ready to Start Your{" "}
                <span className="text-teal-500">Recovery Journey?</span>
              </h2>

              <p className="text-[#5f6f63] text-base md:text-lg max-w-xl mx-auto lg:mx-0 mb-8">
                We’re committed to offering more than just treatment. Our
                experts are here to guide you through every step of your
                physical wellness.
              </p>

              {/* ACTION BUTTON */}
              <div className="flex justify-center lg:justify-start">
                <button className="bg-[#2a413f] text-white px-8 py-4 rounded-full flex items-center gap-4 group hover:bg-teal-600 transition-all shadow-lg active:scale-95">
                  <span className="uppercase tracking-widest text-sm font-semibold">
                    Contact Us Now
                  </span>
                  <div className="bg-white/20 p-2 rounded-full group-hover:bg-white group-hover:text-teal-600 transition">
                    <ArrowRight size={18} />
                  </div>
                </button>
              </div>
            </div>

            {/* CONTACT CARDS GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 w-full lg:w-auto">
              <ContactCard
                icon={<Phone size={22} />}
                label="Talk With Us"
                value="+91 9917752033"
                subtitle="Call for instant booking"
              />
              <ContactCard
                icon={<Phone size={22} />}
                label="Talk With Us"
                value="+91 7520460198"
                subtitle="Call for instant booking"
              />
              <ContactCard
                icon={<MessageCircle size={22} />}
                label="WhatsApp"
                value="Chat with Experts"
                subtitle="Quick response time"
              />
              <ContactCard
                icon={<Clock size={22} />}
                label="Working Hours"
                value="7Am To 8Pm"
                subtitle="Monday to Saturday"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// REUSABLE CONTACT CARD
const ContactCard = ({ icon, label, value, subtitle }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-white p-5 md:p-6 rounded-[1.5rem] md:rounded-[2rem] shadow-sm flex flex-col gap-3 w-full lg:min-w-[220px] xl:min-w-[20px] border border-white/50"
  >
    <div className="bg-[#2a413f] text-white w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg shadow-teal-900/20">
      {icon}
    </div>
    <div>
      <span className="text-[10px] uppercase tracking-[0.2em] text-teal-600 font-bold block mb-1">
        {label}
      </span>
      <h3 className="text-[#2a413f] font-bold text-base md:text-lg leading-tight">
        {value}
      </h3>
      <p className="text-gray-400 text-[10px] md:text-xs mt-1">{subtitle}</p>
    </div>
  </motion.div>
);

export default BookingSection;