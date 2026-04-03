import React from "react";
import { ArrowRight } from "lucide-react";

const servicesList = [
  {
    title: "Paralysis Treatment",
    description:
      "Specialized recovery programs for stroke and nerve damage. Focus on mobility.",
    image:
      "https://ccnbangla.com/wp-content/uploads/2024/10/unnamed-file-8.jpg",
  },
  {
    title: "Arthritis Treatment",
    description:
      "Pain management and joint mobility improvement using advanced techniques.",
    image:
      "https://arvhospital.com/wp-content/uploads/2021/03/Understanding-and-Treating-Arthritis-%E2%80%93-Symptoms-Facts-Treatment-much-more.jpg",
  },
  {
    title: "Cervical & Spine Care",
    description:
      "Care for Spondylitis, Slip Disc, and chronic Back Pain through targeted therapy.",
    image:
      "https://njbrainspine.com/wp-content/uploads/2025/05/Nonsurgical-Back-Pain-Treatment-New-Jersey-Brain-and-Spine.jpg",
  },
  {
    title: "Sciatica Pain Treatment",
    description:
      "Effective therapy to reduce nerve pain radiating from the lower back to legs.",
    image:
      "https://hssh.health/wp-content/uploads/2023/12/Masages-for-Sciatica.jpg",
  },
  {
    title: "Facial Palsy Treatment",
    description:
      "Special care for facial nerve recovery with targeted exercises and stimulation.",
    image:
      "https://sfc02.cdn.medel.com/images/librariesprovider4/s2/fes-therapy-for-facial-palsy.jpg?auto=format&sfvrsn=69cad045_20",
  },
  {
    title: "Frozen Shoulder Treatment",
    description:
      "Improve movement and reduce stiffness through guided mobilization sessions.",
    image:
      "https://img.saudigerman.com/wp-content/uploads/2023/10/19144457/Frozen-Shoulder-Treatments.webp",
  },
  {
    title: " Post-Fracture Rehabilitation",
    description:
      "Complete physiotherapy support after fractures to regain strength, flexibility, and movement.",
    image: "https://thephysiorelief.com/assets/post-fracture.jpeg",
  },
  {
    title: " Joint Pain Treatment",
    description:
      "Relief from knee, shoulder, and other joint pains through therapy and strengthening exercises.",
    image:
      "https://neelamhospital.com/wp-content/uploads/2025/07/Add-a-heading-2.jpg",
  },
  {
    title: " Migraine & Headache Therapy",
    description:
      "Non-medical physiotherapy solutions to manage migraine and chronic headaches.",
    image:
      "https://shardapsychiatricclinic.com/wp-content/uploads/2025/02/difference-between-headaches-and-migraines-1024x683-1.jpg",
  },
  {
    title: "Neurological Disorders Treatment",
    description: "Cerebral Palsy,Epilepsy Support Therapy,Numbness & Weakness",
    image: "https://drbhinderclinic.com/assets/Treatments/Neurological.jpg",
  },
  {
    title: "Acupressure & Therapy (Massage)",
    description:
      "Natural healing techniques to improve blood circulation, reduce stress, and relieve pain.",
    image:
      "https://static.vecteezy.com/system/resources/thumbnails/065/578/067/small/closeup-of-man-getting-acupressure-massage-at-spa-salon-top-view-female-masseuse-massaging-unrecognizable-man-shoulders-pain-relief-for-sportsmen-businessmen-and-office-workers-photo.jpg",
  },
  {
    title: "Vertigo Treatment",
    description:
      "Special exercises and therapy for balance improvement and dizziness control..",
    image:
      "https://www.vertigoclinic.in/wp-content/uploads/2021/12/Screenshot-2021-12-22-at-19-10-34-Vertigo_for_Physical_Therapy-jpeg-JPEG-Image-1024-%C3%97-683-pixels-%E2%80%94-Scaled-84.png",
  },
];

const ServicesListView = () => {
  return (
    <section className="bg-[#e2e8e1] py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-12">
          <span className="text-[#489e9e] font-bold text-xs uppercase tracking-[0.3em] mb-3 block">
            Our Expertise
          </span>
          <h2 className="text-[#1a2e2c] text-3xl md:text-4xl font-serif font-bold leading-tight">
            Healing <span className="text-[#489e9e]">Solutions</span>
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {servicesList.map((service, index) => (
            <div
              key={index}
              className="group relative h-[280px] rounded-[2rem] overflow-hidden shadow-md transition-all duration-500 cursor-pointer"
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/75 transition-all duration-500" />
              </div>

              {/* Content Overlay */}
              <div className="relative h-full flex flex-col justify-end p-6 text-white z-10">
                {/* Title */}
                <h3 className="text-xl font-serif font-bold mb-1 transform transition-transform duration-500 group-hover:-translate-y-1">
                  {service.title}
                </h3>

                {/* Description Reveal */}
                <div className="overflow-hidden max-h-0 opacity-0 transform translate-y-2 transition-all duration-500 group-hover:max-h-32 group-hover:opacity-100 group-hover:translate-y-0">
                  <p className="text-gray-300 leading-snug text-sm mb-2">
                    {service.description}
                  </p>
                </div>
              </div>

              {/* Animated Accent Bar */}
              <div className="absolute bottom-0 left-0 h-1.5 w-0 bg-[#489e9e] transition-all duration-700 group-hover:w-full z-20" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesListView;
