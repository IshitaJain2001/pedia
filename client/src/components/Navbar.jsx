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
    { name: 'Our Doctors', href: '#doctors' },
    { name: 'Services', href: '#services' },
    { name: 'General Query', href: '#general-query' },
    { name: 'Contact', href: '#contact' },
    { name: 'How To Reach Us', href: '#how-to-reach' },
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
      {/* Top Bar - Logo and Book Appointment */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white/95 backdrop-blur-md shadow-lg'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <motion.div
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => scrollToSection('#home')}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <FaHeartbeat className="text-2xl text-primary-orange" />
              <div className="flex flex-col">
                <span className="text-lg font-poppins font-bold text-gray-900 leading-tight">
                  Dr Syed's
                </span>
                <span className="text-sm font-poppins font-semibold text-primary-orange leading-tight">
                  Al-Sageer Clinic
                </span>
              </div>
            </motion.div>

            {/* Book Appointment Button */}
            <motion.button
              onClick={() => scrollToSection('#appointment')}
              className="bg-gradient-to-r from-primary-orange to-primary-amber text-white font-semibold px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Book Appointment
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-20 left-4 z-50 p-3 bg-white rounded-lg border border-gray-200 text-primary-orange hover:bg-orange-50 transition-colors duration-300"
      >
        {isOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
      </button>

      {/* Left Sidebar */}
      <AnimatePresence>
        <motion.aside
          initial={{ x: '-100%' }}
          animate={{ x: isOpen ? 0 : '-100%' }}
          exit={{ x: '-100%' }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-white border-r border-gray-200 z-40"
        >
          <div className="flex flex-col h-full">
            {/* Navigation Links */}
            <nav className="flex-1 overflow-y-auto py-6">
              <ul className="space-y-2 px-4">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="w-full text-left px-4 py-3 text-gray-700 hover:text-primary-orange hover:bg-orange-50 rounded-lg transition-all duration-300 font-medium"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Footer in Sidebar */}
            <div className="p-6 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                © {new Date().getFullYear()} Dr Syed's Al-Sageer Clinic
              </p>
            </div>
          </div>
        </motion.aside>
      </AnimatePresence>

      {/* Overlay for all screens */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 z-30"
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
