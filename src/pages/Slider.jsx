import { ArrowLeft, ArrowRight } from "lucide-react";
import React, { useState, useEffect } from "react";

const therapyServices = [
  {
    title: "Hand Therapy",
    img: "https://images.unsplash.com/photo-1597452485669-2c7bb5fef90d?q=80&w=2069",
    subtitle: "Effective Rehabilitation",
  },
  {
    title: "Shoulder Therapy",
    img: "https://thumbs.dreamstime.com/b/physical-therapist-working-patient-aged-caucasian-man-smiling-doing-exercises-recovery-center-young-caring-asian-408525303.jpg",
    subtitle: "Focused Recovery",
  },
  {
    title: "Pain Relief",
    img: "https://media.istockphoto.com/id/1470931385/photo/let-me-examine-your-back.jpg?s=612x612&w=0&k=20&c=txh5j35jsxHohUxBrZ2HmriX7vu2GhaozdGSjknTYEE=",
    subtitle: "Personalized Comfort",
  },
  {
    title: "Neck Wellness",
    img: "https://physeo.wpengine.com/wp-content/uploads/2025/07/home-1-Categories-img-3.jpg",
    subtitle: "Skilled Care",
  },
  {
    title: "Nerve Relief",
    img: "https://physeo.wpengine.com/wp-content/uploads/2025/07/home-1-Categories-img-2.jpg",
    subtitle: "Holistic Healing",
  },
  {
    title: "Strength Rebuild",
    img: "https://physeo.wpengine.com/wp-content/uploads/2025/07/home-1-Categories-img-1.jpg",
    subtitle: "Endurance Restore",
  },
];

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(4);

  // Update visible cards based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setVisibleCards(1);      // Mobile
      else if (window.innerWidth < 1024) setVisibleCards(2); // Tablet
      else setVisibleCards(4);                              // Desktop
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = therapyServices.length - visibleCards;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  return (
    <section className="py-16 md:py-24 bg-[#0a1a19] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* --- HEADER TEXT SECTION --- */}
        <div className="text-center mb-10 md:mb-16">
          <div className="flex items-center justify-center gap-3 mb-4 md:mb-6">
            <div className="h-[1px] w-8 md:w-12 bg-[#2da3a3]"></div>
            <div className="w-2 h-2 rounded-full bg-[#2da3a3]"></div>
            <span className="text-[#2da3a3] text-[10px] md:text-xs font-bold uppercase tracking-[0.2em]">
              Physical Therapy
            </span>
          </div>

          <h2 className="text-white text-3xl md:text-5xl font-light leading-tight px-2">
            Complete Physiotherapy{" "}
            <span className="text-[#489e9e]">Care For</span> <br className="hidden md:block" />
            <span className="text-[#489e9e]">Effective Pain</span> Relief
          </h2>
        </div>

        <div className="relative group">
          {/* Main Slider Viewport */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] gap-4 md:gap-6"
              style={{
                transform: `translateX(-${currentIndex * (100 / visibleCards)}%)`,
              }}
            >
              {therapyServices.map((item, idx) => (
                <div
                  key={idx}
                  style={{ 
                    // Calculate width dynamically based on gap and visible cards
                    flex: `0 0 calc(${100 / visibleCards}% - ${(visibleCards - 1) * (window.innerWidth < 768 ? 16 : 24) / visibleCards}px)` 
                  }}
                  className="h-[450px] md:h-[550px] relative cursor-pointer overflow-hidden rounded-[30px_30px_20px_20px] md:rounded-[40px_40px_30px_30px]"
                >
                  <img
                    src={item.img}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                    alt={item.title}
                  />

                  {/* Notch Arrow */}
                  <div className="absolute top-0 right-0 w-16 h-16 md:w-20 md:h-20 bg-[#0a1a19] rounded-bl-[30px] md:rounded-bl-[40px] flex items-center justify-center z-20">
                    <div
                      className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-colors shadow-lg 
                      ${idx === 2 ? "bg-[#2da3a3]" : "bg-white"}`}
                    >
                      <ArrowRight
                        size={14}
                        className={`${idx === 2 ? "text-white" : "text-[#2da3a3]"} -rotate-45`}
                      />
                    </div>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent pointer-events-none" />

                  <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full text-center z-10">
                    <h3 className="text-white text-xl md:text-2xl font-medium mb-2 md:mb-3">
                      {item.title}
                    </h3>
                    <div className="h-[1px] w-3/4 mx-auto bg-white/20 mb-3"></div>
                    <p className="text-gray-400 text-[10px] md:text-xs italic tracking-wider">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows - Visible as dots/buttons on mobile, larger on desktop */}
          <div className="flex md:block justify-center gap-4 mt-8 md:mt-0">
             <button
                onClick={prevSlide}
                className="static md:absolute -left-6 top-1/2 md:-translate-y-1/2 bg-white/10 hover:bg-[#2da3a3] text-white p-3 rounded-full backdrop-blur-sm transition-all md:opacity-0 md:group-hover:opacity-100"
              >
                <ArrowLeft size={20} className="md:w-6 md:h-6" />
              </button>

              <button
                onClick={nextSlide}
                className="static md:absolute -right-6 top-1/2 md:-translate-y-1/2 bg-white/10 hover:bg-[#2da3a3] text-white p-3 rounded-full backdrop-blur-sm transition-all md:opacity-0 md:group-hover:opacity-100"
              >
                <ArrowRight size={20} className="md:w-6 md:h-6" />
              </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-8 md:mt-12 flex justify-center items-center gap-4">
          <div className="h-[2px] w-32 md:w-48 bg-white/10 relative rounded-full overflow-hidden">
            <div
              className="absolute h-full bg-[#2da3a3] transition-all duration-500"
              style={{
                width: `${(100 / therapyServices.length) * (currentIndex + visibleCards)}%`,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Slider;