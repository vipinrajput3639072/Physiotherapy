import React from "react";
import { Phone, Mail, Clock, ArrowRight, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const BookingSection = () => {
  return (
    <section
      id="contact-section"
      className="bg-[#E1EADD] py-24 px-6 md:px-16 lg:px-2 font-sans overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* HEADER & INFO */}

        {/* FEATURED IMAGE */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative rounded-[3rem] overflow-hidden h-[400px] md:h-[500px] lg:h-[550px] shadow-2xl border-8 border-white py-20 px-8"
        >
          <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-16">
            {/* LEFT TEXT */}
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-[2px] w-10 bg-teal-500" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#2a413f]">
                  Plan Your Visit
                </span>
              </div>

              <h2 className="text-5xl md:text-6xl font-serif text-[#2a413f] leading-tight mb-6">
                Ready to Start Your{" "}
                <span className="text-teal-500">Recovery Journey?</span>
              </h2>

              <p className="text-[#5f6f63] text-lg max-w-xl mb-8">
                We’re committed to offering more than just treatment. Our
                experts are here to guide you through every step of your
                physical wellness.
              </p>

              {/* QUICK ACTION BUTTON */}
              <button className="bg-[#2a413f] text-white px-8 py-4 rounded-full flex items-center gap-4 group hover:bg-teal-600 transition-all shadow-lg">
                <span className="uppercase tracking-widest text-sm font-semibold">
                  Contact Us Now
                </span>
                <div className="bg-white/20 p-2 rounded-full group-hover:bg-white group-hover:text-teal-600 transition">
                  <ArrowRight size={18} />
                </div>
              </button>
            </div>

            {/* CONTACT INFO CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full lg:w-auto ">
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
                value="9Am To 10Pm"
                subtitle="Monday to Saturday"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// CONTACT CARD COMPONENT
const ContactCard = ({ icon, label, value, subtitle }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-white p-6 rounded-[2rem] shadow-sm flex flex-col gap-3 min-w-[240px] border border-white/50"
  >
    <div className="bg-[#2a413f] text-white w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg shadow-teal-900/20">
      {icon}
    </div>
    <div>
      <span className="text-[10px] uppercase tracking-[0.2em] text-teal-600 font-bold block mb-1">
        {label}
      </span>
      <h3 className="text-[#2a413f] font-bold text-lg leading-tight">
        {value}
      </h3>
      <p className="text-gray-400 text-xs mt-1">{subtitle}</p>
    </div>
  </motion.div>
);

export default BookingSection;
