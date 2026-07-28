import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaHeartbeat } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { name: 'Why Choose Us', href: '#why-choose-us' },
    { name: 'Services', href: '#services' },
    { name: 'Book Appointment', href: '#forms' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (id) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Premium Navbar */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-lg shadow-md border-b border-gray-100' 
            : 'bg-white/80 backdrop-blur-md border-b border-gray-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <motion.div
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => scrollToSection('#home')}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-primary-green to-primary-light rounded-xl flex items-center justify-center shadow-lg shadow-primary-green/20">
                <FaHeartbeat className="text-white text-xl" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-poppins font-bold text-[#1C2333] leading-tight">
                  Dr. Syed's
                </span>
                <span className="text-sm font-poppins font-semibold text-primary-green leading-tight">
                  Al-Sageer Clinic
                </span>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <motion.button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="text-sm font-medium text-gray-600 hover:text-primary-green transition-colors duration-200 relative group"
                  whileHover={{ y: -1 }}
                >
                  {link.name}
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-primary-green transition-all duration-300 group-hover:w-full" />
                </motion.button>
              ))}
              <motion.button
                onClick={() => scrollToSection('#forms')}
                className="bg-gradient-to-r from-primary-green to-primary-light text-white font-semibold px-6 py-2.5 rounded-full shadow-lg shadow-primary-green/30 hover:shadow-xl hover:shadow-primary-green/40 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                Book Appointment
              </motion.button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              {isOpen ? <FaTimes className="text-xl text-gray-700" /> : <FaBars className="text-xl text-gray-700" />}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="fixed top-0 left-0 h-full w-72 bg-white z-50 shadow-2xl pt-24 px-6"
            >
              <nav className="space-y-2">
                {navLinks.map((link) => (
                  <motion.button
                    key={link.name}
                    onClick={() => scrollToSection(link.href)}
                    className="w-full text-left px-4 py-3 text-gray-700 hover:text-primary-green hover:bg-green-50 rounded-xl transition-all duration-200 font-medium"
                    whileHover={{ x: 4 }}
                  >
                    {link.name}
                  </motion.button>
                ))}
              </nav>
              <div className="mt-8 pt-6 border-t border-gray-100">
                <motion.button
                  onClick={() => scrollToSection('#forms')}
                  className="w-full bg-gradient-to-r from-primary-green to-primary-light text-white font-semibold px-6 py-3 rounded-xl shadow-lg"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Book Appointment
                </motion.button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
