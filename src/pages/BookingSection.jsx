import React from "react";
import {
  Phone,
  Mail,
  Clock,
  Calendar,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";

const BookingSection = () => {
  return (
    <section className="bg-[#E1EADD] py-24 px-6 md:px-16 lg:px-2 font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
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
              Book{" "}
              <span className="text-teal-500">Your Appointment</span> Today
            </h2>

            <p className="text-[#5f6f63] text-lg">
              We’re Committed To Offering More Than Treatment
            </p>
          </div>

          {/* CONTACT INFO */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full lg:w-auto">
            <ContactItem icon={<Phone size={18} />} label="Talk With Us" value="+ 914567892546" />
            <ContactItem icon={<Mail size={18} />} label="Email Address" value="info@example.com" />
            <ContactItem icon={<Clock size={18} />} label="Working Hours ( Mon To Sat )" value="9Am To 10Pm" />
          </div>
        </div>

        {/* MAIN SECTION */}
        <div className="relative">

          {/* IMAGE */}
          <div className="rounded-[2.5rem] overflow-hidden h-[520px] lg:h-[600px] shadow-xl">
            <img
              src="https://img.freepik.com/premium-photo/women-senior-physiotherapy-help-with-dumbbell-wellness-clinic-healthcare-center-nursing-home-living-room-smile-happy-physiotherapist-nurse-elderly-patient-weight-rehabilitation_590464-130096.jpg"
              alt="therapy"
              className="w-full h-full object-cover"
            />
          </div>

          {/* FLOATING FORM */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="absolute right-0 top-[-80px] lg:top-10 w-full max-w-xl bg-white rounded-[2.5rem] p-8 md:p-10 shadow-2xl"
          >
            <form className="space-y-6">

              {/* Name + Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <FormInput placeholder="Name*" />
                <FormInput placeholder="E-mail Address*" type="email" />
              </div>

              {/* Service + Date */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {/* Service Dropdown */}
                <select className="w-full p-4 bg-[#f3f7f2] rounded-full outline-none focus:ring-2 focus:ring-teal-500 text-gray-500">
                  <option value="">Select Service*</option>
                  <option>Physiotherapy</option>
                  <option>Sports Injury</option>
                  <option>Rehabilitation</option>
                  <option>Post Surgery Care</option>
                </select>

                {/* Date Time Picker ✅ */}
                <div className="relative">
                  <input
                    type="datetime-local"
                    className="w-full p-4 pr-12 bg-[#f3f7f2] rounded-full outline-none focus:ring-2 focus:ring-teal-500 text-gray-500"
                  />
                  <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                </div>

              </div>

              {/* Message */}
              <textarea
                placeholder="Enter Your Message Here"
                className="w-full h-36 p-5 bg-[#f3f7f2] rounded-[2rem] outline-none focus:ring-2 focus:ring-teal-500"
              />

              {/* Button */}
              <button className="w-full bg-teal-500 text-white py-4 pl-8 pr-2 rounded-full flex items-center justify-between group hover:bg-[#2a413f] transition-all">
                <span className="uppercase tracking-widest text-sm font-semibold">
                  Schedule Your Visit
                </span>

                <div className="bg-[#2a413f] p-3 rounded-full group-hover:bg-white group-hover:text-teal-500 transition">
                  <ArrowRight size={18} />
                </div>
              </button>

            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};


// CONTACT ITEM
const ContactItem = ({ icon, label, value }) => (
  <div className="flex flex-col gap-2">
    <span className="text-xs uppercase tracking-wider text-[#5f6f63] font-bold">
      {label}
    </span>

    <div className="flex items-center gap-3">
      <div className="bg-[#2a413f] text-white p-2.5 rounded-full">
        {icon}
      </div>
      <span className="text-[#2a413f] font-semibold">{value}</span>
    </div>
  </div>
);


// INPUT
const FormInput = ({ placeholder, type = "text" }) => (
  <input
    type={type}
    placeholder={placeholder}
    className="w-full p-4 bg-[#f3f7f2] rounded-full outline-none focus:ring-2 focus:ring-teal-500 placeholder:text-gray-400"
  />
);

export default BookingSection;