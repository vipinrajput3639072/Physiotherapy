import React, { useState, useEffect } from "react";
import {
  Activity,
  ArrowRight,
  HeartPulse,
  ShieldCheck,
  MapPin,
  Phone,
  Instagram,
  Linkedin,
  Clock,
  Facebook,
  Youtube,
  Twitter,
  Waves,
  MoveUpRight,
} from "lucide-react";
import LoginModal from "../components/LoginModal";
import Slider from "./Slider";
import ServicesListView from "./ServicesList";
import TestimonialSection from "./TestimonialSection";
import BookingSection from "./BookingSection";
import PhysioFooter from "./Footer";
import InstaSlider from "./InstaSlider";
import Header from "./Header";

const sliderImages = [
  "https://www.casamed.in/_next/static/media/assessment-step-indian.e63e2586.jpg",
  "https://media.istockphoto.com/id/518013549/photo/this-is-all-you-now.jpg?s=612x612&w=0&k=20&c=dY-78JB6FMdmJmumDYjXOQZrBburG7LdPgL7_6QYDVs=",
  "https://physeo.wpengine.com/wp-content/uploads/2025/07/home1-slider-01.jpg",
];

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === sliderImages.length - 1 ? 0 : prev + 1,
      );
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 selection:bg-teal-100 scroll-smooth overflow-x-hidden">
      <style>{`
        html { scroll-behavior: smooth; }
        @keyframes kenburns {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
        .animate-kenburns { animation: kenburns 10s ease-out forwards; }
      `}</style>

      <div className="bg-[#1a2e2c] text-white py-3 px-4 md:px-10 flex flex-col md:flex-row justify-between items-center text-[12px] md:text-sm gap-3 relative z-30 text-center md:text-left">
        <div className="flex flex-col md:flex-row gap-2 md:gap-6 items-center font-medium">
          <div className="flex items-center gap-2">
            <MapPin size={14} className="text-[#4fd1c5] shrink-0" />
            <span>Sanjay Place, Civil Lines, Agra, UP 282002</span>
          </div>
          <div className="flex items-center gap-2 md:border-l md:border-gray-600 md:pl-6">
            <Clock size={14} className="text-[#4fd1c5] shrink-0" />
            <span>Mon - Sat: 09:00 am - 06:00 pm</span>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <Twitter size={14} className="hover:text-teal-400 cursor-pointer" />
          <Instagram size={14} className="hover:text-teal-400 cursor-pointer" />
          <Facebook size={14} className="hover:text-teal-400 cursor-pointer" />
          <Linkedin size={14} className="hover:text-teal-400 cursor-pointer" />
        </div>
      </div>

      <Header/>

      <section className="relative h-[100svh] min-h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {sliderImages.map((img, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? "opacity-100" : "opacity-0"}`}
            >
              <img
                src={img}
                alt="Hero"
                className={`w-full h-full object-cover ${index === currentSlide ? "animate-kenburns" : ""}`}
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-[#1a2e2c]/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto px-6 md:px-10">
          <div className="max-w-3xl text-white">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-[2px] w-12 bg-teal-400"></div>
              <span className="uppercase tracking-[0.3em] text-[10px] font-black text-teal-300">
                Helping Hands
              </span>
            </div>
            <h1 className="text-4xl md:text-7xl font-bold leading-[1.2] md:leading-[1.1] mb-6 drop-shadow-lg">
              Stretch Your <span className="text-teal-400">Hands To</span>{" "}
              <br className="hidden md:block" /> Reduce Daily Pain
            </h1>
            <p className="text-gray-200 text-sm md:text-xl mb-10 max-w-lg leading-relaxed font-medium">
              Daily tasks can place constant stress on your hands. We help you
              recover mobility and strength.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="tel:+19048467532"
                className="flex items-center bg-[#38b2ac] rounded-full p-1.5 pr-6 cursor-pointer group shadow-xl w-fit"
              >
                <div className="bg-[#1a2e2c] p-2.5 rounded-full mr-3 group-hover:rotate-12 transition-transform">
                  <Phone size={16} className="text-white" />
                </div>
                <div className="text-white font-bold text-xs md:text-sm">
                  +1 (904) 846-7532
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section
        id="about-section"
        className="py-16 md:py-24 bg-[#eef4f1] scroll-mt-24"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
            <div className="grid grid-cols-12 gap-3 relative order-2 lg:order-1">
              <div className="col-span-7">
                <img
                  src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=500"
                  alt="Doctor"
                  className="rounded-2xl shadow-2xl h-[300px] md:h-[500px] object-cover w-full"
                />
              </div>
              <div className="col-span-5 space-y-3">
                <img
                  src="https://static9.depositphotos.com/1003098/1153/i/450/depositphotos_11536478-stock-photo-physical-therapist-helping-a-patient.jpg"
                  alt="Physical therapist"
                  className="rounded-2xl shadow-xl h-[145px] md:h-[240px] object-cover w-full"
                />
                <img
                  src="https://png.pngtree.com/thumb_back/fh260/background/20221029/pngtree-male-physician-assisting-elderly-man-in-wheelchair-with-physiotherapy-strength-training-photo-image_39847658.jpg"
                  alt="Physiotherapy"
                  className="rounded-2xl shadow-xl h-[145px] md:h-[240px] object-cover w-full"
                />
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#1a2e2c] text-white w-20 h-20 md:w-32 md:h-32 rounded-full border-4 md:border-8 border-[#eef4f1] flex flex-col items-center justify-center text-center shadow-2xl">
                <span className="text-xl md:text-3xl font-bold">18+</span>
                <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest">
                  Expertise
                </span>
              </div>
            </div>

            <div className="space-y-6 md:space-y-8 order-1 lg:order-2">
              <div className="space-y-2 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-3">
                  <div className="h-[2px] w-8 md:w-12 bg-teal-500"></div>
                  <span className="uppercase tracking-widest text-[10px] font-bold text-teal-600">
                    Our Trusted Support
                  </span>
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-[#1a2e2c] leading-tight">
                  Expert Care & <span className="text-teal-500">Support</span>
                </h2>
              </div>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed text-center md:text-left">
                Relieving pain and changing lives beyond treatment. Behind every
                successful recovery is our passion for care.
              </p>
              <blockquote className="border-l-4 border-teal-500 pl-4 md:pl-6 italic text-slate-800 font-semibold text-base md:text-lg">
                "True Healing Comes From Trust, Patience, and Compassion."
              </blockquote>
              <div className="flex justify-center md:justify-start">
                <button className="bg-[#48b2a3] text-white px-8 py-3.5 rounded-full flex items-center gap-3 font-bold shadow-xl transition-all">
                  Learn More <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Slider />

      <section
        id="services-section"
        className="bg-[#e2e8e1] px-6 py-16 md:py-24"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                <div className="h-[1px] w-12 bg-[#489e9e]"></div>
                <span className="text-gray-600 text-[10px] font-bold uppercase tracking-[0.2em]">
                  Quality Rehab
                </span>
              </div>
              <h2 className="text-[#1a2e2c] text-3xl md:text-5xl lg:text-6xl font-semibold">
                Steps Toward <span className="text-[#489e9e]">Wellness</span>
              </h2>
            </div>
            <button className="mx-auto md:mx-0 flex items-center gap-4 pl-6 pr-2 py-2 border border-[#1a2e2c]/20 rounded-full bg-white/50 hover:bg-white transition-colors">
              <span className="text-[#1a2e2c] text-xs font-semibold uppercase">
                View All
              </span>
              <div className="bg-[#489e9e] p-2 rounded-full text-white">
                <ArrowRight size={16} />
              </div>
            </button>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 mb-12">
            <div className="flex items-center gap-4 text-center md:text-left">
              <div className="w-16 h-16 bg-[#489e9e] rounded-full flex items-center justify-center text-white shrink-0 mx-auto">
                <Waves size={28} />
              </div>
              <h3 className="text-[#489e9e] text-xl md:text-2xl font-medium">
                Advanced Physiotherapy
              </h3>
            </div>
            <p className="text-gray-600 text-sm md:text-base max-w-md text-center md:text-left">
              Our treatments are designed to relieve pain and enhance mobility
              using cutting-edge technology.
            </p>
            <div className="hidden md:flex ml-auto w-12 h-12 bg-[#489e9e] rounded-full items-center justify-center text-white cursor-pointer hover:scale-110 transition-transform">
              <MoveUpRight size={20} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="w-full h-[250px] md:h-[500px] overflow-hidden rounded-[30px] md:rounded-[40px] shadow-xl">
              <img
                src="https://thumbs.dreamstime.com/b/physical-therapist-working-patient-aged-caucasian-man-smiling-doing-exercises-recovery-center-young-caring-asian-408525303.jpg"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                alt="Rehabilitation 1"
              />
            </div>

            <div className="w-full h-[250px] md:h-[500px] overflow-hidden rounded-[30px] md:rounded-[40px] shadow-xl">
              <img
                src="https://thumbs.dreamstime.com/b/physical-therapist-working-patient-aged-caucasian-man-smiling-doing-exercises-recovery-center-young-caring-asian-408525303.jpg"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                alt="Rehabilitation 2"
              />
            </div>

            <div className="w-full h-[250px] md:h-[500px] overflow-hidden rounded-[30px] md:rounded-[40px] shadow-xl">
              <img
                src="https://thumbs.dreamstime.com/b/physical-therapist-working-patient-aged-caucasian-man-smiling-doing-exercises-recovery-center-young-caring-asian-408525303.jpg"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                alt="Modern Clinic Interior"
              />
            </div>
          </div>
        </div>
      </section>

      <ServicesListView />

      <section className="bg-gradient-to-r from-[#0b2c2f] to-[#0f3d40] text-white py-16 md:py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="flex gap-4 h-[300px] md:h-[500px]">
            <img
              src="https://www.kolkatapainrelief.com/wp-content/uploads/bfi_thumb/Causes-of-Lower-Back-Pain-3nkmejcuy38250k44lnbpc.webp"
              className="w-1/2 rounded-2xl object-cover"
              alt="Clinic"
            />
            <img
              src="https://images.pexels.com/photos/4506105/pexels-photo-4506105.jpeg"
              className="w-1/2 rounded-2xl object-cover mt-8"
              alt="Therapy"
            />
          </div>

          <div className="space-y-6">
            <p className="text-teal-400 uppercase text-xs tracking-widest text-center md:text-left">
              Excellence in Care
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-center md:text-left">
              Why Our Clinic <span className="text-teal-400">Stands Out</span>
            </h2>

            <div className="space-y-6">
              {[
                { label: "Care & Patience", value: 93 },
                { label: "Honest Conversation", value: 95 },
                { label: "Specialized Experience", value: 96 },
              ].map((item, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{item.label}</span>
                    <span>{item.value}%</span>
                  </div>
                  <div className="w-full bg-gray-700 h-1.5 rounded-full">
                    <div
                      className="bg-teal-400 h-1.5 rounded-full transition-all duration-1000"
                      style={{ width: `${item.value}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center md:justify-start pt-4">
              <button className="border border-teal-400 text-teal-400 px-8 py-3 rounded-full hover:bg-teal-400 hover:text-white transition-all text-sm font-bold">
                Book This Service →
              </button>
            </div>
          </div>
        </div>
      </section>

      <InstaSlider />
      <TestimonialSection />
      <BookingSection />
      <PhysioFooter />
    </div>
  );
};

export default Home;