import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Facebook,
  Youtube,
  Send,
  Linkedin,
  ChevronUp,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";

const PhysioFooter = () => {
  const serviceLinks = [
    "Physiotherapy Tips",
    "Injury Recovery Guides",
    "Stretching Techniques",
    "Sports Injury Care",
    "Joint Health Tips",
  ];

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="w-full bg-[#0a1414] text-white pt-20 pb-10 px-6 md:px-16 lg:px-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Branding */}
          <div className="lg:col-span-2 space-y-6 lg:pr-12">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#3cb0b0] rounded-2xl flex items-center justify-center font-black text-2xl">
                P
              </div>
              <span className="text-3xl font-bold tracking-tight">
                PHY<span className="text-[#3cb0b0]">SEO</span>
              </span>
            </div>

            <p className="text-gray-400 text-base">
              We help restore strength and motion with care.
            </p>

            <div className="flex gap-3">
              {[Send, Instagram, Facebook, Youtube, Linkedin].map(
                (Icon, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -5, backgroundColor: "#3cb0b0" }}
                    className="bg-white/10 p-3 rounded-full cursor-pointer"
                  >
                    <Icon size={18} />
                  </motion.div>
                ),
              )}
            </div>
          </div>

          {/* Services */}
          <FooterCol title="Services">
            <ul className="space-y-4">
              {serviceLinks.map((link) => (
                <motion.li
                  key={link}
                  whileHover={{ x: 5 }}
                  className="text-gray-400 hover:text-[#3cb0b0] cursor-pointer text-sm flex items-center gap-2"
                >
                  <div className="w-1 h-1 bg-[#3cb0b0] rounded-full" />
                  {link}
                </motion.li>
              ))}
            </ul>
          </FooterCol>
          <FooterCol title="Contact Us">
            <ContactItem icon={MapPin} value="Agra, Uttar Pradesh" />
            <ContactItem icon={Phone} value="+000 -123456789" />
            <ContactItem icon={Mail} value="vr3639072@gmail.com" />
          </FooterCol>
        </div>

        {/* Bottom */}
        <div className="mt-20 pt-8 border-t border-white/10 flex justify-between items-center">
          <p className="text-gray-500 text-xs">
            © 2010 PHYSEO. All rights reserved.
          </p>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            className="bg-[#1a2525] p-4 rounded-full text-[#3cb0b0]"
          >
            <ChevronUp size={20} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

const FooterCol = ({ title, children }) => (
  <div className="space-y-6">
    <h4 className="text-xs font-bold uppercase">{title}</h4>
    {children}
  </div>
);

const ContactItem = ({ icon: Icon, value }) => (
  <div className="flex gap-3 text-gray-400 text-sm">
    <Icon size={16} />
    {value}
  </div>
);

export default PhysioFooter;
