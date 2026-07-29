import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';

const contactInfo = [
  {
    icon: FaMapMarkerAlt,
    title: 'Address',
    content: '123 Healthcare Avenue, Medical City, MC 12345',
    sub: 'Find us on the map',
    gradient: 'from-blue-600 to-blue-400',
  },
  {
    icon: FaPhone,
    title: 'Phone',
    content: '+91 98765 43210',
    sub: 'Call us anytime',
    gradient: 'from-blue-700 to-blue-500',
  },
  {
    icon: FaEnvelope,
    title: 'Email',
    content: 'info@alsyedclinic.com',
    sub: 'We reply within 24 hours',
    gradient: 'from-blue-500 to-blue-300',
  },
  {
    icon: FaClock,
    title: 'Working Hours',
    content: 'Mon, Tue, Thu, Fri',
    sub: '6:30 PM – 7:30 PM | Emergency: 24/7',
    gradient: 'from-blue-800 to-blue-600',
  },
];

const Contact = () => {
  return (
    <section
      id="contact"
      className="py-12 lg:py-0 bg-white relative h-auto lg:h-screen lg:min-h-[600px] lg:max-h-[900px] flex items-center overflow-hidden"
    >
      {/* Decorative */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary-50 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-neutral-50 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="section-container relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 sm:mb-8"
        >
          <span className="section-tag mb-2">Get In Touch</span>
          <h2 className="section-heading mb-2 text-2xl sm:text-3xl lg:text-4xl">Contact Information</h2>
          <div className="section-divider mb-3" />
          <p className="section-subheading text-xs sm:text-sm max-w-2xl mx-auto">
            Reach out for appointments, general inquiries, or emergencies — we're here for you
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

          {/* ── Left: Info Cards ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3"
          >
            {contactInfo.map((info, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
              >
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.22 }}
                  className="card p-4 sm:p-4.5 group h-full"
                >
                  <div className={`icon-box-sm bg-gradient-to-br ${info.gradient} mb-3 shadow-soft`}>
                    <info.icon className="text-white text-sm" />
                  </div>
                  <h3 className="text-xs font-poppins font-semibold text-neutral-500 mb-1 uppercase tracking-wide">
                    {info.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-neutral-900 mb-0.5 group-hover:text-primary-green transition-colors duration-200">
                    {info.content}
                  </p>
                  <p className="text-[10px] sm:text-xs text-neutral-500">{info.sub}</p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* ── Right: Map ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="w-full h-[320px] lg:h-full"
          >
            <div className="rounded-3xl overflow-hidden shadow-card-lg border border-neutral-100 h-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.4282348574163!2d-73.98691368459379!3d40.75387497932759!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1625064500000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0, display: 'block', minHeight: '280px' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Dr. S. Mashhood Abbas's Al-Sageer Clinic Location"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
