import { motion } from 'framer-motion';
import logo from '../assets/logo.png';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-mesh-green overflow-hidden">

      {/* Background orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-green/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-accent-mint/10 rounded-full blur-3xl pointer-events-none" />

      {/* Logo block */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center text-center"
      >
        {/* Icon ring */}
        <div className="relative mb-7">
          <motion.div
            animate={{ scale: [1, 1.12, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-20 h-20 bg-white border border-neutral-100 rounded-3xl flex items-center justify-center shadow-md overflow-hidden p-1"
          >
            <img src={logo} alt="Al-Sageer Clinic Logo" className="w-full h-full object-contain rounded-2xl" />
          </motion.div>
          {/* Pulse ring */}
          <span className="absolute inset-0 rounded-3xl pulse-ring pointer-events-none" />
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="text-3xl sm:text-4xl font-poppins font-bold text-neutral-900 leading-tight"
        >
          Dr. S. Mashhood Abbas's
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.38, duration: 0.5 }}
          className="text-2xl sm:text-3xl font-poppins font-semibold mt-1" style={{ color: '#2E7D52' }}
        >
          Al-Sageer Clinic
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.52, duration: 0.5 }}
          className="text-sm text-neutral-500 mt-3 font-inter tracking-wide"
        >
          A Clinic of Pediatrics &amp; Neonatology
        </motion.p>
      </motion.div>

      {/* Progress bar */}
      <motion.div
        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary-green via-primary-light to-accent-mint"
        initial={{ width: '0%' }}
        animate={{ width: '100%' }}
        transition={{ duration: 2.3, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
};

export default LoadingScreen;
