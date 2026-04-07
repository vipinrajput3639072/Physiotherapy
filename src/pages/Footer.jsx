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
            <ContactItem
              icon={MapPin}
              value="Mulla ki pyau, Kalyanpur, airforce gate, near closed, Airport
              Area, Idgah Colony, Agra, Uttar Pradesh 283102"
            />
            <ContactItem icon={Phone} value="9917752033" />
            <ContactItem icon={Phone} value="7520460198" />
          </FooterCol>
          <div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113614.17967458472!2d77.79909789562222!3d27.1423450176545!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39747753683f2551%3A0xfa60783e22861996!2sPurushottam%20Singh%20Physiotherapy%20Center!5e0!3m2!1sen!2sin!4v1775194308840!5m2!1sen!2sin"
              width="250px"
              height="200px"
            ></iframe>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-20 pt-8 border-t border-white/10 flex justify-between items-center">
          <p className="text-gray-500 text-xs">
            © 2003 PHYSEO. All rights reserved.
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
