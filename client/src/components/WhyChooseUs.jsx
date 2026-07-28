import { motion } from 'framer-motion';
import { FaUserMd, FaHeartbeat, FaAmbulance, FaSyringe, FaStethoscope, FaBaby } from 'react-icons/fa';
import Card from './Card';

const WhyChooseUs = () => {
  const features = [
    {
      icon: FaUserMd,
      title: 'Experienced Pediatrician',
      description: 'Our team of board-certified pediatricians has years of experience in child healthcare.',
      color: 'from-primary-green to-primary-light',
    },
    {
      icon: FaSyringe,
      title: 'Vaccination Services',
      description: 'Comprehensive immunization programs following WHO guidelines.',
      color: 'from-primary-light to-primary-lime',
    },
    {
      icon: FaBaby,
      title: 'Neonatal Care',
      description: 'Specialized care for newborns and premature babies with expert monitoring.',
      color: 'from-primary-lime to-primary-emerald',
    },
    {
      icon: FaAmbulance,
      title: 'Emergency Care',
      description: '24/7 emergency services with rapid response for urgent medical situations.',
      color: 'from-primary-emerald to-accent-mint',
    },
    {
      icon: FaStethoscope,
      title: 'Growth Monitoring',
      description: 'Regular checkups and growth tracking to ensure healthy development.',
      color: 'from-accent-mint to-accent-teal',
    },
    {
      icon: FaHeartbeat,
      title: 'Child Friendly Environment',
      description: 'Professional, welcoming spaces designed to make children feel comfortable and safe.',
      color: 'from-accent-teal to-primary-green',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="why-choose-us" className="py-20 bg-background-green">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-poppins font-bold text-gray-900 mb-4">
            Why Choose Us
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We provide exceptional pediatric care with a focus on your child's comfort and well-being
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <motion.div
                whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl shadow-lg p-8 h-full border border-gray-200 hover:border-primary-green transition-all duration-300"
              >
                <motion.div
                  whileHover={{ rotate: 15 }}
                  transition={{ duration: 0.3 }}
                  className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-6 shadow-md`}
                >
                  <feature.icon className="text-white text-2xl" />
                </motion.div>
                <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
