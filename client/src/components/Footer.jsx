import { motion } from 'framer-motion';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import { MdLocalHospital } from 'react-icons/md';

const quickLinks = [
  { name: 'Home',         href: '#home' },
  { name: 'About Us',    href: '#about' },
  { name: 'Why Us',      href: '#why-choose-us' },
  { name: 'Services',    href: '#services' },
  { name: 'Contact',     href: '#contact' },
];

const services = [
  { name: 'Newborn Care',       href: '#services' },
  { name: 'Vaccination',        href: '#services' },
  { name: 'Emergency Care',     href: '#services' },
  { name: 'Growth Monitoring',  href: '#services' },
  { name: 'Health Checkups',    href: '#services' },
];

const socials = [
  { Icon: FaFacebook,  href: '#', label: 'Facebook' },
  { Icon: FaTwitter,   href: '#', label: 'Twitter' },
  { Icon: FaInstagram, href: '#', label: 'Instagram' },
  { Icon: FaLinkedin,  href: '#', label: 'LinkedIn' },
];

const scroll = (href) => {
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

const Footer = () => {
  return (
    <footer className="bg-background-dark text-white relative overflow-hidden">

      {/* Decorative orbs */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-primary-green/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary-light/8 rounded-full blur-3xl pointer-events-none" />

      <div className="section-container relative z-10 pt-16 sm:pt-20 pb-8">

        {/* Top Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 mb-12 sm:mb-16">

          {/* ── Brand Column ── */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-500 rounded-xl flex items-center justify-center shadow-green">
                <MdLocalHospital className="text-white text-lg" />
              </div>
              <div>
                <p className="text-base font-poppins font-bold text-white leading-none">Dr. S. Mashhood Abbas's</p>
                <p className="text-sm font-poppins font-semibold mt-0.5" style={{ color: '#60A5FA' }}>Al-Sageer Clinic</p>
              </div>
            </div>
            <p className="text-neutral-400 text-sm leading-relaxed mb-6 max-w-xs">
              A Clinic of Pediatrics &amp; Neonatology. Providing compassionate pediatric care for newborns, infants, toddlers, children, and adolescents.
            </p>
            {/* Socials */}
            <div className="flex gap-3">
              {socials.map(({ Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-xl bg-white/6 border border-white/10 flex items-center justify-center text-neutral-400 hover:bg-primary-green hover:text-white hover:border-primary-green transition-all duration-200"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon className="text-sm" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* ── Quick Links ── */}
          <div>
            <h3 className="text-sm font-poppins font-semibold text-white mb-5 uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scroll(link.href)}
                    className="text-sm text-neutral-400 hover:text-primary-400 transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-0 h-px bg-primary-green group-hover:w-3 transition-all duration-200 flex-shrink-0" />
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Services ── */}
          <div>
            <h3 className="text-sm font-poppins font-semibold text-white mb-5 uppercase tracking-wider">Services</h3>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s.name}>
                  <button
                    onClick={() => scroll(s.href)}
                    className="text-sm text-neutral-400 hover:text-primary-400 transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-0 h-px bg-primary-green group-hover:w-3 transition-all duration-200 flex-shrink-0" />
                    {s.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Contact Info ── */}
          <div>
            <h3 className="text-sm font-poppins font-semibold text-white mb-5 uppercase tracking-wider">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/6 border border-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <FaMapMarkerAlt className="text-primary-400 text-xs" />
                </div>
                <span className="text-sm text-neutral-400 leading-relaxed">123 Healthcare Avenue, Medical City, MC 12345</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/6 border border-white/10 flex items-center justify-center flex-shrink-0">
                  <FaPhone className="text-primary-400 text-xs" />
                </div>
                <span className="text-sm text-neutral-400">+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/6 border border-white/10 flex items-center justify-center flex-shrink-0">
                  <FaEnvelope className="text-primary-400 text-xs" />
                </div>
                <span className="text-sm text-neutral-400">info@alsyedclinic.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-neutral-500 text-center sm:text-left">
            © {new Date().getFullYear()} Dr. S. Mashhood Abbas's Al-Sageer Clinic. All rights reserved.
          </p>
          <p className="text-xs text-neutral-600 text-center sm:text-right">
            Made with ❤️ for the health of every child
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
