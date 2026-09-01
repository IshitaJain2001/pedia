import { motion } from 'framer-motion';
import { FaStar, FaBaby, FaStethoscope, FaAmbulance, FaWhatsapp, FaCalendarCheck, FaVideo, FaArrowRight } from 'react-icons/fa';
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
  const scrollToSection = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOnlineConsultationClick = () => {
    window.dispatchEvent(new CustomEvent('set-query-type', { detail: 'Online Consultation' }));
    scrollToSection('#ask-doctor');
  };

  return (
    <section
      id="home"
      className="relative h-auto flex items-center overflow-hidden pt-8 pb-14 lg:pt-10 lg:pb-16 bg-gradient-to-br from-[#082011] via-[#14472A] to-[#05140A]"
      style={{ isolation: 'isolate' }}
    >
      {/* ── Background Pattern Overlay (Subtle noise/grid) ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.03,
          backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px), radial-gradient(#ffffff 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
          backgroundPosition: '0 0, 12px 12px',
          zIndex: 0,
        }}
      />


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
        <div className="flex flex-col items-center justify-center text-center max-w-7xl mx-auto">

          {/* ── Center Content ── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center max-w-3xl flex flex-col items-center"
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
              <span className="text-white drop-shadow-sm">Dr. Syed's</span>
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
              className="text-xs sm:text-sm text-white/70 mb-5 sm:mb-6 max-w-xl mx-auto leading-relaxed"
            >
              Providing compassionate pediatric and newborn care with over 15 years of experience. Expert consultations, vaccinations, developmental care, and neonatal services — all under one roof.
            </motion.p>

            {/* ── Online Consultation Banner Section ── */}
            <motion.div
              variants={itemVariants}
              className="w-full max-w-2xl mb-6 sm:mb-8 group cursor-pointer"
              onClick={handleOnlineConsultationClick}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative p-[2px] rounded-2xl bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500 shadow-[0_4px_30px_rgba(16,185,129,0.35)] transition-all duration-300">
                <div className="bg-[#0c2e1b]/90 backdrop-blur-md rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 border border-emerald-400/20 text-left">
                  <div className="flex items-start sm:items-center gap-3.5 w-full sm:w-auto">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center flex-shrink-0 text-emerald-300 text-xl shadow-inner">
                      <FaVideo className="animate-pulse" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        <span className="text-[11px] font-bold tracking-wider uppercase text-emerald-300">Online Consultation Available</span>
                      </div>
                      <h3 className="text-sm sm:text-base font-poppins font-bold text-white mt-0.5">
                        We do provide online consultation — Book for yourself
                      </h3>
                      <p className="text-xs text-emerald-100/75 mt-0.5">
                        Have queries or need doctor advice from home? Click here to submit your query.
                      </p>
                    </div>
                  </div>
                  <div className="flex-shrink-0 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOnlineConsultationClick();
                      }}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-emerald-400 to-teal-400 text-neutral-900 font-poppins font-bold text-xs sm:text-sm rounded-xl shadow-md group-hover:from-emerald-300 group-hover:to-teal-300 transition-all duration-200"
                    >
                      <span>Book Consultation</span>
                      <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform duration-200" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

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
