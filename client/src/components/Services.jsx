import { motion } from 'framer-motion';
import { useRef, useEffect } from 'react';
import {
  FaBabyCarriage, FaSyringe, FaAppleAlt, FaChild,
  FaStethoscope, FaAmbulance, FaChartLine, FaHeartbeat,
} from 'react-icons/fa';

const services = [
  {
    icon: FaBabyCarriage,
    title: 'Newborn Care',
    shortDesc: 'Wellness checkups & feeding guidance.',
  },
  {
    icon: FaSyringe,
    title: 'Vaccination',
    shortDesc: 'WHO-approved safe immunizations.',
  },
  {
    icon: FaAppleAlt,
    title: 'Nutrition Guidance',
    shortDesc: 'Expert diets & healthy eating.',
  },
  {
    icon: FaChild,
    title: 'Child Development',
    shortDesc: 'Milestone support & monitoring.',
  },
  {
    icon: FaStethoscope,
    title: 'General Consultation',
    shortDesc: 'Routine care & common illnesses.',
  },
  {
    icon: FaAmbulance,
    title: 'Emergency Pediatrics',
    shortDesc: 'Rapid care for urgent needs.',
  },
  {
    icon: FaChartLine,
    title: 'Growth Monitoring',
    shortDesc: 'Height & weight assessments.',
  },
  {
    icon: FaHeartbeat,
    title: 'Health Checkups',
    shortDesc: 'Preventive screening & wellness.',
  },
];

const containerVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const itemVariants = {
  hidden:  { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};

const Services = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.volume = 0;
    video.play().catch(() => {});
  }, []);

  return (
    <section
      id="services"
      className="py-12 lg:py-0 bg-white relative h-auto lg:h-screen lg:min-h-[600px] lg:max-h-[900px] flex items-center overflow-hidden"
    >

      {/* ── Video Background Layer ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          overflow: 'hidden',
        }}
      >
        <video
          ref={videoRef}
          src="https://res.cloudinary.com/dxqn9ka7p/video/upload/v1785326757/ek_chhoti_si_sec_ki_video_b_uubsrg.mp4"
          autoPlay
          loop
          playsInline
          muted
          preload="auto"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
          }}
        />
        {/* Left-to-right white gradient overlay — solid white on left for text contrast, completely transparent on right for full video clarity */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to right, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.9) 30%, rgba(255, 255, 255, 0.4) 50%, rgba(255, 255, 255, 0) 70%)',
            zIndex: 1,
          }}
        />
      </div>

      {/* Decorative */}
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-primary-50/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="section-container relative z-10 w-full">
        <div className="max-w-xl lg:max-w-xl xl:max-w-2xl text-left mr-auto flex flex-col items-start">
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-left mb-6 sm:mb-8"
          >
            <span className="section-tag mb-2">What We Offer</span>
            <h2 className="section-heading mb-2 text-2xl sm:text-3xl lg:text-4xl">Our Services</h2>
            <div className="section-divider mb-3 ml-0" style={{ marginInlineStart: 0 }} />
            <p className="text-xs sm:text-sm text-neutral-700 font-medium max-w-xl leading-relaxed">
              Comprehensive pediatric healthcare services designed for your child's complete well-being
            </p>
          </motion.div>

          {/* Points Layout in Left Column */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 w-full"
          >
            {services.map((service, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="flex items-start gap-2.5 group hover:translate-x-1 transition-transform duration-200"
              >
                {/* Icon Point */}
                <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0 text-primary-green group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="text-sm" />
                </div>
                
                {/* Content */}
                <div>
                  <h3 className="text-xs sm:text-sm font-poppins font-semibold text-neutral-900 group-hover:text-primary-green transition-colors duration-200">
                    {service.title}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-neutral-600 leading-normal mt-0.5 font-medium">
                    {service.shortDesc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Services;
