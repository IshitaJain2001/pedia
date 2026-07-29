import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import { MdLocalHospital } from 'react-icons/md';

const NAV_LINKS = [
  { name: 'Home',             href: '#home' },
  { name: 'About Us',         href: '#about' },
  { name: 'Services',         href: '#services' },
  { name: 'Ask Your Doctor',  href: '#ask-doctor' },
  { name: 'How To Reach Us',  href: '#contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen]       = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('#home');

  const scrollToSection = (id) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveLink(id);
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-xl shadow-[0_1px_24px_-1px_rgba(0,0,0,0.08)] border-b border-neutral-100'
            : 'bg-white/80 backdrop-blur-md border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 sm:h-20">

            {/* ── Logo ── */}
            <button
              onClick={() => scrollToSection('#home')}
              className="flex items-center gap-3 group focus-visible:ring-2 focus-visible:ring-primary-green rounded-xl p-1"
              aria-label="Go to home"
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 bg-gradient-to-br from-blue-600 to-blue-500 rounded-xl flex items-center justify-center shadow-green flex-shrink-0 group-hover:shadow-green-lg transition-shadow duration-300">
                <MdLocalHospital className="text-white text-lg sm:text-xl" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-base sm:text-lg font-poppins font-bold text-neutral-900">Dr. S. Mashhood Abbas's</span>
                <span className="text-xs sm:text-sm font-poppins font-semibold" style={{ color: '#60A5FA' }}>Al-Sageer Clinic</span>
              </div>
            </button>

            {/* ── Desktop Nav ── */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-2" role="navigation" aria-label="Main navigation">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className={`relative px-3 lg:px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                    activeLink === link.href
                      ? 'text-primary-green bg-primary-50'
                      : 'text-neutral-600 hover:text-primary-green hover:bg-primary-50/60'
                  }`}
                >
                  {link.name}
                  {activeLink === link.href && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary-green rounded-full"
                    />
                  )}
                </button>
              ))}
            </nav>

            {/* ── Desktop CTA ── */}
            <div className="hidden md:flex items-center gap-3">
              <motion.button
                onClick={() => scrollToSection('#forms')}
                className="btn-primary text-sm px-5 py-2.5"
                whileHover={{ scale: 1.04, y: -1 }}
                whileTap={{ scale: 0.97 }}
              >
                Book Appointment
              </motion.button>
            </div>

            {/* ── Mobile Toggle ── */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-xl text-neutral-700 hover:bg-neutral-100 transition-colors duration-200"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isOpen ? (
                  <motion.span key="close" initial={{ rotate: -90 }} animate={{ rotate: 0 }} exit={{ rotate: 90 }} transition={{ duration: 0.18 }}>
                    <FaTimes className="text-xl" />
                  </motion.span>
                ) : (
                  <motion.span key="open" initial={{ rotate: 90 }} animate={{ rotate: 0 }} exit={{ rotate: -90 }} transition={{ duration: 0.18 }}>
                    <FaBars className="text-xl" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.header>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-xs z-[99] md:hidden"
            />

            {/* Drawer */}
            <motion.aside
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 right-0 h-full w-[300px] max-w-[85vw] bg-white z-[100] shadow-2xl flex flex-col md:hidden"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-neutral-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-blue-500 rounded-lg flex items-center justify-center">
                    <MdLocalHospital className="text-white text-base" />
                  </div>
                  <div>
                    <p className="text-sm font-poppins font-bold text-neutral-900 leading-none">Dr. S. Mashhood Abbas's</p>
                    <p className="text-xs font-poppins font-semibold" style={{ color: '#60A5FA' }}>Al-Sageer Clinic</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-500 hover:bg-neutral-200 transition-colors"
                  aria-label="Close menu"
                >
                  <FaTimes className="text-sm" />
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex-1 px-4 py-5 space-y-1 overflow-y-auto" role="navigation" aria-label="Mobile navigation">
                {NAV_LINKS.map((link, i) => (
                  <motion.button
                    key={link.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 + 0.1 }}
                    onClick={() => scrollToSection(link.href)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                      activeLink === link.href
                        ? 'bg-primary-50 text-primary-green font-semibold'
                        : 'text-neutral-700 hover:bg-neutral-50 hover:text-primary-green'
                    }`}
                  >
                    {link.name}
                  </motion.button>
                ))}
              </nav>

              {/* CTA */}
              <div className="px-4 pb-8 pt-4 border-t border-neutral-100">
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  onClick={() => scrollToSection('#forms')}
                  className="btn-primary w-full justify-center text-sm py-3"
                  whileTap={{ scale: 0.97 }}
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
