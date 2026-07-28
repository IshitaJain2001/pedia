import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';

const Contact = () => {
  const contactInfo = [
    {
      icon: FaMapMarkerAlt,
      title: 'Address',
      content: '123 Healthcare Avenue, Medical City, MC 12345',
      color: 'bg-primary-green',
    },
    {
      icon: FaPhone,
      title: 'Phone',
      content: '+91 98765 43210',
      color: 'bg-primary-light',
    },
    {
      icon: FaEnvelope,
      title: 'Email',
      content: 'info@littlehearts.com',
      color: 'bg-primary-lime',
    },
    {
      icon: FaClock,
      title: 'Working Hours',
      content: 'Mon, Tue, Thu, Fri: 6:30 PM - 7:30 PM\nEmergency: 24/7',
      color: 'bg-primary-emerald',
    },
  ];

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-poppins font-bold text-gray-800 mb-4">
            Contact Information
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get in touch with us for appointments, inquiries, or emergencies
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg p-6 flex items-start space-x-4 hover:shadow-xl transition-shadow duration-300"
              >
                <div className={`w-14 h-14 ${info.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <info.icon className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-poppins font-semibold text-gray-800 mb-1">
                    {info.title}
                  </h3>
                  <p className="text-gray-600 whitespace-pre-line">
                    {info.content}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Google Map Embed */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="h-full"
          >
            <div className="bg-gray-100 rounded-3xl overflow-hidden shadow-lg h-full min-h-[400px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1!2d-73.98!3d40.75!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM40sNzUnMDAuMCJOIDczwrA1OCczMC4wIlc!5e0!3m2!1sen!2sus!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '400px' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Little Hearts Pediatric Hospital Location"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
