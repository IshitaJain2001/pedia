import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp, FaPhoneAlt } from 'react-icons/fa';
import { useState } from 'react';

const FloatingButtons = () => {
  const [hoveredWa, setHoveredWa]     = useState(false);
  const [hoveredCall, setHoveredCall] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-3">

      {/* WhatsApp */}
      <div className="relative flex items-center gap-2">
        {/* Tooltip */}
        <AnimatePresence>
          {hoveredWa && (
            <motion.span
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              transition={{ duration: 0.18 }}
              className="bg-neutral-900 text-white text-xs font-medium rounded-lg px-3 py-1.5 shadow-lg whitespace-nowrap"
            >
              Chat on WhatsApp
            </motion.span>
          )}
        </AnimatePresence>

        <motion.a
          href="https://wa.me/919876543210"
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setHoveredWa(true)}
          onMouseLeave={() => setHoveredWa(false)}
          className="relative w-13 h-13 sm:w-14 sm:h-14 bg-[#25D366] text-white rounded-full shadow-lg flex items-center justify-center"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.93 }}
          aria-label="Chat on WhatsApp"
          style={{ width: '52px', height: '52px' }}
        >
          <FaWhatsapp size={24} />
          {/* Pulse ring */}
          <span className="absolute inset-0 rounded-full pulse-ring pointer-events-none" />
        </motion.a>
      </div>

      {/* Phone */}
      <div className="relative flex items-center gap-2">
        <AnimatePresence>
          {hoveredCall && (
            <motion.span
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              transition={{ duration: 0.18 }}
              className="bg-neutral-900 text-white text-xs font-medium rounded-lg px-3 py-1.5 shadow-lg whitespace-nowrap"
            >
              Call Us
            </motion.span>
          )}
        </AnimatePresence>

        <motion.a
          href="tel:+919876543210"
          onMouseEnter={() => setHoveredCall(true)}
          onMouseLeave={() => setHoveredCall(false)}
          className="w-12 h-12 sm:w-13 sm:h-13 bg-blue-600 text-white rounded-full shadow-green flex items-center justify-center"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.93 }}
          aria-label="Call us"
          style={{ width: '48px', height: '48px' }}
        >
          <FaPhoneAlt size={18} />
        </motion.a>
      </div>
    </div>
  );
};

export default FloatingButtons;
