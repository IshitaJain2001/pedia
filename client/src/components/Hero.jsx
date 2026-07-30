import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { FaStar, FaBaby, FaStethoscope, FaAmbulance, FaWhatsapp, FaCalendarCheck } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';
import { MdLocalHospital } from 'react-icons/md';

const trustMetrics = [
  { icon: FaBaby,        value: '5000+',  label: 'Happy Families' },
  { icon: MdLocalHospital, value: '15+',  label: 'Years Experience' },
  { icon: FaStethoscope, value: 'Expert', label: 'Pediatrician' },
  { icon: FaAmbulance,   value: '24×7',   label: 'Emergency' },
];

const containerVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
const Hero = () => {
  const videoRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.volume = 0;

    const tryPlay = () => {
      video.play().catch(() => {});
    };

    if (video.readyState >= 2) {
      setVideoLoaded(true);
      tryPlay();
    } else {
      video.addEventListener('loadeddata', () => {
        setVideoLoaded(true);
        tryPlay();
      });
    }
  }, []);

  const scrollToSection = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative h-auto lg:h-screen lg:min-h-[600px] lg:max-h-[900px] flex items-center overflow-hidden pt-4 pb-12 lg:pt-0 lg:pb-0"
      style={{ isolation: 'isolate' }}
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
          src="https://res.cloudinary.com/dxqn9ka7p/video/upload/v1785429226/pediatric_clinic_h_jshji1.mp4"
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
            opacity: videoLoaded ? 1 : 0,
            transition: 'opacity 1.6s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        />

        {/* Left-to-right gradient overlay — keeps left side text readable while keeping right side video clear */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to right, rgba(8,35,20,0.88) 0%, rgba(8,35,20,0.65) 45%, rgba(8,35,20,0.15) 100%)',
            zIndex: 1,
          }}
        />

        {/* Soft 2px blur layer — reduces video sharpness for readability */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backdropFilter: 'blur(1px)',
            WebkitBackdropFilter: 'blur(1px)',
            zIndex: 2,
          }}
        />
      </div>

      {/* ── Decorative Orbs — sit above video, below content ── */}
      <div
        style={{ position: 'absolute', top: '-80px', right: '-80px', width: '480px', height: '480px',
          background: 'rgba(26,92,56,0.08)', borderRadius: '50%', filter: 'blur(60px)',
          pointerEvents: 'none', zIndex: 1 }}
      />
      <div
        style={{ position: 'absolute', bottom: 0, left: '-80px', width: '360px', height: '360px',
          background: 'rgba(110,231,183,0.07)', borderRadius: '50%', filter: 'blur(60px)',
          pointerEvents: 'none', zIndex: 1 }}
      />

      {/* Medical cross — decorative */}
      <svg style={{ position: 'absolute', top: '96px', right: '64px', width: '24px', height: '24px',
        color: 'rgba(26,92,56,0.15)', display: 'none', zIndex: 2 }}
        className="hidden lg:block" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM10 17H8V13H4V11H8V7H10V11H14V13H10V17Z"/>
      </svg>

      {/* ── All Content — z-index 10, sits above everything ── */}
      <div className="section-container w-full" style={{ position: 'relative', zIndex: 10 }}>
        <div className="flex flex-col items-center lg:items-start justify-center lg:justify-start text-center lg:text-left max-w-7xl mx-auto">

          {/* ── Left: Content ── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left max-w-2xl lg:max-w-xl flex flex-col items-center lg:items-start"
          >
            {/* Badge */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 mb-3 sm:mb-4">
              <span className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-white bg-white/15 backdrop-blur-sm border border-white/30 rounded-full pl-3 pr-4 py-1.5">
                <HiSparkles className="text-accent-amber text-sm" />
                Trusted Pediatric Care Since 2010
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-poppins font-bold leading-[1.1] mb-2 sm:mb-3"
            >
              <span className="text-white drop-shadow-sm">Dr. S. Mashhood Abbas's</span>
              <br />
              <span style={{ background: 'linear-gradient(135deg, #6EE7B7 0%, #34D399 50%, #10B981 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Al-Sageer Clinic</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="text-sm sm:text-base md:text-lg font-poppins font-semibold text-white/80 mb-2 sm:mb-3"
            >
              A Clinic of Pediatrics &amp; Neonatology
            </motion.p>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-xs sm:text-sm text-white/70 mb-4 sm:mb-5 max-w-lg mx-auto lg:mx-0 leading-relaxed"
            >
              Providing compassionate pediatric and newborn care with over 15 years of experience. Expert consultations, vaccinations, developmental care, and neonatal services — all under one roof.
            </motion.p>

            {/* Trust Metrics */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-4 sm:mb-5 w-full"
            >
              {trustMetrics.map((metric, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -4, boxShadow: '0 8px 24px -4px rgba(26,92,56,0.12)' }}
                  className="bg-white rounded-xl sm:rounded-2xl px-2 py-2.5 text-center border border-neutral-100 shadow-card cursor-default"
                >
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-primary-50 rounded-xl flex items-center justify-center mx-auto mb-1.5">
                    <metric.icon className="text-primary-green text-xs sm:text-sm" />
                  </div>
                  <p className="text-base sm:text-lg font-poppins font-bold text-neutral-900">{metric.value}</p>
                  <p className="text-[9px] sm:text-xs text-neutral-500 mt-0.5">{metric.label}</p>
                </motion.div>
              ))}
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
