import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { FaStar, FaBaby, FaHeart, FaStethoscope, FaAmbulance, FaWhatsapp, FaCalendarCheck } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';

const trustMetrics = [
  { icon: FaBaby,        value: '5000+',  label: 'Happy Families' },
  { icon: FaHeart,       value: '15+',    label: 'Years Experience' },
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

    // Fix React's muted prop bug — must set via DOM directly
    video.muted = true;
    video.volume = 0;

    const tryPlay = () => {
      video.play().catch(() => {
        // Autoplay blocked — handled gracefully, video stays paused
      });
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

    return () => {
      video.removeEventListener('loadeddata', tryPlay);
    };
  }, []);

  const scrollToSection = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden pt-18 pb-12 sm:pt-20 sm:pb-16"
      style={{ isolation: 'isolate' }}
    >
      {/* ── Video Background Layer ── */}
      {/* z-0: sits at base of section's own stacking context */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          overflow: 'hidden',
        }}
      >
        {/* Plain <video> — NOT motion.video (avoids React muted prop bug + Framer forwarding issues) */}
        <video
          ref={videoRef}
          src="/videos/pediatric_clinic_h.mp4"
          autoPlay
          loop
          playsInline
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
            transform: 'scale(1)',
          }}
        />

        {/* Dark blue gradient overlay — 45% opacity — keeps text crisp */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(135deg, rgba(10,25,50,0.52) 0%, rgba(10,30,60,0.44) 50%, rgba(5,20,40,0.50) 100%)',
            zIndex: 1,
          }}
        />

        {/* Soft 2px blur layer — reduces video sharpness for readability */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backdropFilter: 'blur(2px)',
            WebkitBackdropFilter: 'blur(2px)',
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
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* ── Left: Content ── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left order-2 lg:order-1"
          >
            {/* Badge */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 mb-5 sm:mb-6">
              <span className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-white bg-white/15 backdrop-blur-sm border border-white/30 rounded-full pl-3 pr-4 py-1.5">
                <HiSparkles className="text-accent-amber text-sm" />
                Trusted Pediatric Care Since 2010
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-poppins font-bold leading-[1.1] mb-3 sm:mb-4"
            >
              <span className="text-white drop-shadow-sm">Dr. Syed's</span>
              <br />
              <span style={{ background: 'linear-gradient(135deg, #6EE7B7 0%, #34D399 50%, #10B981 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Al-Sageer Clinic</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg md:text-xl font-poppins font-semibold text-white/80 mb-4 sm:mb-5"
            >
              A Clinic of Pediatrics &amp; Neonatology
            </motion.p>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-sm sm:text-base text-white/70 mb-7 sm:mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed"
            >
              Providing compassionate pediatric and newborn care with over 15 years of experience. Expert consultations, vaccinations, developmental care, and neonatal services — all under one roof.
            </motion.p>

            {/* Trust Metrics */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8 sm:mb-9"
            >
              {trustMetrics.map((metric, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -4, boxShadow: '0 8px 24px -4px rgba(26,92,56,0.12)' }}
                  className="bg-white rounded-xl sm:rounded-2xl px-3 py-4 text-center border border-neutral-100 shadow-card cursor-default"
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-primary-50 rounded-xl flex items-center justify-center mx-auto mb-2">
                    <metric.icon className="text-primary-green text-base sm:text-lg" />
                  </div>
                  <p className="text-lg sm:text-xl font-poppins font-bold text-neutral-900">{metric.value}</p>
                  <p className="text-[10px] sm:text-xs text-neutral-500 mt-0.5">{metric.label}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start"
            >
              <motion.button
                onClick={() => scrollToSection('#forms')}
                className="btn-primary text-sm sm:text-base px-6 sm:px-8 py-3.5 sm:py-4 flex items-center justify-center gap-2 w-full sm:w-auto"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                <FaCalendarCheck className="text-sm" />
                Book Appointment
              </motion.button>

              <motion.button
                onClick={() => window.open('https://wa.me/919876543210', '_blank')}
                className="text-sm sm:text-base px-6 sm:px-8 py-3.5 sm:py-4 flex items-center justify-center gap-2 w-full sm:w-auto rounded-full font-semibold border-2 border-white/70 text-white hover:bg-white hover:text-primary-green transition-all duration-300"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                <FaWhatsapp className="text-lg" />
                WhatsApp Us
              </motion.button>
            </motion.div>
          </motion.div>

          {/* ── Right: Doctor Card ── */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative order-1 lg:order-2 flex justify-center"
          >
            <div className="relative w-full max-w-[380px] sm:max-w-[420px] lg:max-w-none lg:w-full">

              {/* Main floating card */}
              <motion.div
                animate={{ y: [-6, 6, -6] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="relative"
              >
                <div className="bg-white rounded-3xl shadow-card-lg p-5 sm:p-6 border border-neutral-100">

                  {/* Doctor image placeholder */}
                  <div className="w-full h-[280px] sm:h-[340px] lg:h-[390px] bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl flex flex-col items-center justify-center gap-4 relative overflow-hidden">
                    {/* Decorative circles */}
                    <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-primary-green/10 rounded-full" />
                    <div className="absolute -top-6 -left-6 w-24 h-24 bg-accent-mint/15 rounded-full" />

                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-2xl shadow-card flex items-center justify-center">
                      <svg className="w-10 h-10 sm:w-12 sm:h-12 text-primary-green" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="text-center px-4 relative">
                      <p className="text-base font-poppins font-semibold text-neutral-700">Dr. Syed</p>
                      <p className="text-xs text-neutral-500 mt-0.5">Pediatrician &amp; Neonatologist</p>
                    </div>
                  </div>

                  {/* Bottom doctor name strip */}
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-poppins font-semibold text-neutral-900">Dr. Syed's Al-Sageer Clinic</p>
                      <p className="text-xs text-neutral-500 mt-0.5">Mon, Tue, Thu, Fri • 6:30 – 7:30 PM</p>
                    </div>
                    <div className="flex items-center gap-1 bg-primary-50 rounded-lg px-2.5 py-1.5">
                      <FaStar className="text-accent-amber text-xs" />
                      <span className="text-xs font-bold text-neutral-800">4.9</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Floating badge — Available */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.4 }}
                className="absolute -top-3 -left-4 sm:-top-4 sm:-left-5 glass rounded-2xl shadow-card px-3 sm:px-4 py-2 sm:py-3 border border-white/80"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-primary-green rounded-full animate-pulse flex-shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-neutral-800 leading-none">Available Today</p>
                    <p className="text-[10px] text-neutral-500 mt-0.5">Evening Clinic Open</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating badge — Reviews */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.95, duration: 0.4 }}
                className="absolute -bottom-3 -right-4 sm:-bottom-4 sm:-right-5 glass rounded-2xl shadow-card px-3 sm:px-4 py-2 sm:py-3 border border-white/80"
              >
                <div className="flex items-center gap-1.5 mb-1">
                  {[...Array(5)].map((_, i) => <FaStar key={i} className="text-accent-amber text-xs" />)}
                  <span className="text-xs font-bold text-neutral-800 ml-1">4.9</span>
                </div>
                <p className="text-[10px] text-neutral-500">Trusted by 5000+ Families</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
