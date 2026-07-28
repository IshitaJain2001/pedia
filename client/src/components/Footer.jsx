import { motion } from 'framer-motion';
import { FaHeartbeat, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { name: 'Why Choose Us', href: '#why-choose-us' },
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
              <FaHeartbeat className="text-3xl text-primary-green" />
              <div className="flex flex-col">
                <span className="text-xl font-poppins font-bold">Dr Syed's</span>
                <span className="text-lg font-poppins font-semibold text-primary-green">Al-Sageer Clinic</span>
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
                  className="w-10 h-10 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center hover:bg-primary-green hover:border-primary-green transition-colors duration-300"
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
                    className="text-gray-400 hover:text-primary-green transition-colors duration-300 relative group"
                    whileHover={{ x: 5 }}
                  >
                    {link.name}
                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-primary-green transition-all duration-300 group-hover:w-full"></span>
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
                    className="text-gray-400 hover:text-primary-green transition-colors duration-300 relative group"
                    whileHover={{ x: 5 }}
                  >
                    {service.name}
                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-primary-green transition-all duration-300 group-hover:w-full"></span>
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
                <FaMapMarkerAlt className="text-primary-green mt-1" />
                <span className="text-gray-400">123 Healthcare Avenue, Medical City, MC 12345</span>
              </li>
              <li className="flex items-center space-x-3">
                <FaPhone className="text-primary-green" />
                <span className="text-gray-400">+91 98765 43210</span>
              </li>
              <li className="flex items-center space-x-3">
                <FaEnvelope className="text-primary-green" />
                <span className="text-gray-400">info@alsyedclinic.com</span>
              </li>
            </ul>
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
