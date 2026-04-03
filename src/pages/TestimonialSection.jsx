import React, { useState } from 'react';
import { Star, ArrowLeft, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    patientName: 'Kai Gerold',
    patientRole: 'Knee-Surgery',
    testimonial: 'When I started treatment, walking was painful and uncertain. The customized program and patient guidance changed everything. Today, I enjoy long walks without worry.',
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: 2,
    patientName: 'Sarah Jenkins',
    patientRole: 'Spinal Therapy',
    testimonial: 'I had chronic back pain for years. After just six weeks of specialized care here, I feel like a new person. The staff is incredibly patient and knowledgeable.',
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/44.jpg"
  }
];

const TestimonialSection = () => {
  const [index, setIndex] = useState(0);

  const nextTestimonial = () => {
    setIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[index];

  const StarRating = ({ rating }) => (
    <div className="flex gap-1 mb-6">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={20}
          fill={i < rating ? "#f9a826" : "none"}
          stroke={i < rating ? "#f9a826" : "#cbd5e1"}
        />
      ))}
    </div>
  );

  return (
    <section className="bg-gradient-to-r from-[#0b2c2f] to-[#0f3d40] min-h-screen flex items-center justify-center p-6 md:p-16 lg:p-24 overflow-hidden">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* LEFT: Image Composition */}
        <div className="relative group">
          <motion.div 
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative rounded-[3rem] overflow-hidden aspect-[4/5] shadow-2xl border-8 border-white/5"
          >
            <img 
              src="https://img.freepik.com/premium-photo/nurse-doctor-senior-care-exercise-physical-therapy-exercising-help-assistence-happy-strong-physiotherapy-strech-band-clinic-therapist-elderly-man_565246-3191.jpg?w=740" 
              alt="Therapy session" 
              className="w-full h-full object-cover"
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f2a28]/60 to-transparent" />
          </motion.div>
          
          {/* Floating Badge */}
          <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-teal-500 rounded-full flex items-center justify-center shadow-xl border-8 border-[#0f2a28] z-10">
            <span className="text-white text-3xl font-bold">H+</span>
          </div>
        </div>

        {/* RIGHT: Content */}
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-[2px] w-12 bg-teal-500" />
            <span className="text-teal-400 text-xs font-bold uppercase tracking-[0.3em]">
              Client Feedback
            </span>
          </div>

          <h2 className="text-white text-4xl md:text-6xl font-medium leading-tight mb-8">
            Hear Our <span className="text-teal-400">Clients Share</span> True <br />
            Stories Of Health
          </h2>

          <div className="relative min-h-[200px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
              >
                <p className="text-slate-300 text-xl leading-relaxed italic mb-10">
                  "{current.testimonial}"
                </p>

                <StarRating rating={current.rating} />

                
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex gap-4 mt-12">
            <button 
              onClick={prevTestimonial}
              className="p-4 rounded-full border border-white/20 text-white hover:bg-teal-500 hover:border-teal-500 transition-all group"
            >
              <ArrowLeft size={24} className="group-active:-translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={nextTestimonial}
              className="p-4 rounded-full bg-white text-[#0f2a28] hover:bg-teal-500 hover:text-white transition-all group"
            >
              <ArrowRight size={24} className="group-active:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default TestimonialSection;