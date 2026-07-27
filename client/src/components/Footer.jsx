import { motion } from 'framer-motion';
import { FaHeartbeat, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaMapMarkerAlt, FaPhone, FaEnvelope, FaCalendarAlt, FaCommentDots } from 'react-icons/fa';

const Footer = () => {
  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { name: 'Why Choose Us', href: '#why-choose-us' },
    { name: 'Our Doctors', href: '#doctors' },
  ];

  const services = [
    { name: 'Newborn Care', href: '#services' },
    { name: 'Vaccination', href: '#services' },
    { name: 'Emergency Care', href: '#services' },
    { name: 'Health Checkups', href: '#services' },
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 border-t border-gray-800 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* About */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <FaHeartbeat className="text-3xl text-primary-orange" />
              <div className="flex flex-col">
                <span className="text-xl font-poppins font-bold">Dr Syed's</span>
                <span className="text-lg font-poppins font-semibold text-primary-orange">Al-Sageer Clinic</span>
              </div>
            </div>
            <p className="text-gray-400 mb-6">
              A Clinic of Pediatrics & Neonatology. Providing compassionate pediatric care for newborns, infants, toddlers, children, and adolescents.
            </p>
            <div className="flex space-x-4">
              {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center hover:bg-primary-orange hover:border-primary-orange transition-colors duration-300"
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon className="text-gray-400 hover:text-white" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-poppins font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <motion.button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-400 hover:text-primary-orange transition-colors duration-300 relative group"
                    whileHover={{ x: 5 }}
                  >
                    {link.name}
                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-primary-orange transition-all duration-300 group-hover:w-full"></span>
                  </motion.button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-poppins font-semibold mb-4 text-white">Services</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <motion.button
                    onClick={() => scrollToSection(service.href)}
                    className="text-gray-400 hover:text-primary-orange transition-colors duration-300 relative group"
                    whileHover={{ x: 5 }}
                  >
                    {service.name}
                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-primary-orange transition-all duration-300 group-hover:w-full"></span>
                  </motion.button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-poppins font-semibold mb-4 text-white">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-primary-orange mt-1" />
                <span className="text-gray-400">123 Healthcare Avenue, Medical City, MC 12345</span>
              </li>
              <li className="flex items-center space-x-3">
                <FaPhone className="text-primary-orange" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <FaEnvelope className="text-primary-orange" />
                <span className="text-gray-400">info@alsyedclinic.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Appointment & Query Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gray-800 rounded-xl p-6 text-center border border-gray-700 hover:border-primary-orange transition-colors duration-300">
            <FaCalendarAlt className="text-4xl text-primary-orange mx-auto mb-3" />
            <h4 className="text-lg font-poppins font-semibold mb-2 text-white">Book Appointment</h4>
            <button
              onClick={() => scrollToSection('#appointment')}
              className="text-primary-orange hover:text-white transition-colors duration-300 font-medium"
            >
              Schedule a Visit →
            </button>
          </div>
          <div className="bg-gray-800 rounded-xl p-6 text-center border border-gray-700 hover:border-primary-orange transition-colors duration-300">
            <FaCommentDots className="text-4xl text-primary-amber mx-auto mb-3" />
            <h4 className="text-lg font-poppins font-semibold mb-2 text-white">General Query</h4>
            <button
              onClick={() => scrollToSection('#general-query')}
              className="text-primary-orange hover:text-white transition-colors duration-300 font-medium"
            >
              Ask a Question →
            </button>
          </div>
        </div>

        {/* Google Map */}
        <div className="mb-12">
          <div className="bg-gray-800 rounded-xl overflow-hidden h-64 border border-gray-700">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1422937950147!2d-73.98731968482413!3d40.75889497932681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1629794729767!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Clinic Location"
            />
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Dr Syed's Al-Sageer Clinic. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
