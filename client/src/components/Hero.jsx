import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FaStar, FaBaby, FaHeart, FaStethoscope, FaAmbulance, FaWhatsapp } from 'react-icons/fa';
import Button from './Button';

const Hero = () => {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
  }, []);

  const scrollToSection = (id) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const trustMetrics = [
    { icon: FaBaby, value: '5000+', label: 'Happy Families' },
    { icon: FaHeart, value: '15+', label: 'Years Experience' },
    { icon: FaStethoscope, value: 'Expert', label: 'Pediatrician' },
    { icon: FaAmbulance, value: '24×7', label: 'Emergency' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <section 
      id="home" 
      className="min-h-screen flex items-center relative overflow-hidden pt-16"
      style={{
        background: 'linear-gradient(135deg, #F8FFF8 0%, #F1F8E9 50%, #E8F5E9 100%)',
      }}
    >
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary-green/5 rounded-full blur-3xl" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-primary-light/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-primary-emerald/5 rounded-full blur-3xl" />
        
        {/* Medical Cross Decorations */}
        <svg className="absolute top-32 right-32 w-8 h-8 text-primary-green/10" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.89 21 5 21H19C20.11 21 21 20.1 21 19V5C21 3.9 20.11 3 19 3ZM10 17H8V13H4V11H8V7H10V11H14V13H10V17Z" />
        </svg>
        <svg className="absolute bottom-40 left-20 w-6 h-6 text-primary-green/10" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.89 21 5 21H19C20.11 21 21 20.1 21 19V5C21 3.9 20.11 3 19 3ZM10 17H8V13H4V11H8V7H10V11H14V13H10V17Z" />
        </svg>
        
        {/* Subtle Dots Pattern */}
        <div className="absolute top-1/4 right-1/4 grid grid-cols-4 gap-2 opacity-20">
          {[...Array(16)].map((_, i) => (
            <div key={i} className="w-1 h-1 bg-primary-green rounded-full" />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 bg-primary-green/10 border border-primary-green/20 rounded-full px-4 py-2 mb-6"
            >
              <FaStar className="text-primary-green text-sm" />
              <span className="text-sm font-medium text-primary-green">Trusted Pediatric Care Since 2010</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl sm:text-6xl lg:text-7xl font-poppins font-bold leading-tight mb-4"
            >
              <span className="text-[#1C2333]">Dr. Syed's</span>
              <br />
              <span className="text-primary-green">Al-Sageer Clinic</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="text-xl sm:text-2xl font-poppins font-semibold text-[#5F6C7B] mb-6"
            >
              A Clinic of Pediatrics & Neonatology
            </motion.p>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-[#5F6C7B] mb-8 max-w-[550px] mx-auto lg:mx-0 leading-relaxed"
            >
              Providing compassionate pediatric and newborn care with over 15 years of experience. We help children grow healthy through expert consultations, vaccinations, developmental care, and neonatal services.
            </motion.p>

            {/* Trust Metrics */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8"
            >
              {trustMetrics.map((metric, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -4 }}
                  className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center"
                >
                  <metric.icon className="text-2xl text-primary-green mx-auto mb-2" />
                  <p className="text-lg font-bold text-[#1C2333]">{metric.value}</p>
                  <p className="text-xs text-[#5F6C7B]">{metric.label}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 sm:flex-none"
              >
                <Button
                  onClick={() => scrollToSection('#forms')}
                  className="w-full sm:w-auto bg-primary-green hover:bg-[#1B5E20] text-white font-semibold px-8 py-4 rounded-full shadow-lg shadow-primary-green/30 transition-all duration-300"
                >
                  Book Appointment
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 sm:flex-none"
              >
                <button
                  onClick={() => window.open('https://wa.me/919876543210', '_blank')}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-transparent border-2 border-primary-green text-primary-green font-semibold px-8 py-4 rounded-full hover:bg-primary-green hover:text-white transition-all duration-300"
                >
                  <FaWhatsapp className="text-xl" />
                  WhatsApp Consultation
                </button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Side - Doctor Showcase */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative mt-8 lg:mt-0"
          >
            <div className="relative w-full max-w-lg mx-auto">
              {/* Main Doctor Card */}
              <motion.div
                animate={!reducedMotion ? { y: [-6, 6, -6] } : {}}
                transition={!reducedMotion ? { duration: 3, repeat: Infinity, ease: "easeInOut" } : {}}
                className="relative"
              >
                <div className="bg-white rounded-3xl shadow-2xl p-6 border border-gray-100 overflow-hidden">
                  {/* Doctor Image Placeholder */}
                  <div className="w-full h-[450px] bg-gradient-to-br from-primary-green/10 to-primary-light/10 rounded-2xl flex items-center justify-center relative">
                    <div className="text-center">
                      <div className="w-32 h-32 mx-auto mb-4 bg-primary-green/20 rounded-full flex items-center justify-center">
                        <svg className="w-16 h-16 text-primary-green" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-lg font-semibold text-[#1C2333] mb-1">Professional Pediatrician Image</p>
                      <p className="text-sm text-[#5F6C7B]">Dr. Syed</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Floating Rating Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="absolute -bottom-4 -left-4 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-4 border border-white/50 max-w-[200px]"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="text-[#FF8F00] text-sm" />
                    ))}
                  </div>
                  <span className="font-bold text-[#1C2333]">4.9</span>
                </div>
                <p className="text-xs text-[#5F6C7B]">Trusted by 5000+ Families</p>
              </motion.div>

              {/* Available Today Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="absolute -top-4 -right-4 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-4 border border-white/50"
              >
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-primary-green rounded-full animate-pulse" />
                  <div>
                    <p className="text-sm font-semibold text-[#1C2333]">Available Today</p>
                    <p className="text-xs text-[#5F6C7B]">Mon, Tue, Thu, Fri</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
