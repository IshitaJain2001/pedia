import { motion } from 'framer-motion';
import { FaBabyCarriage, FaSyringe, FaAppleAlt, FaChild, FaStethoscope, FaAmbulance, FaChartLine, FaHeartbeat } from 'react-icons/fa';
import Card from './Card';

const Services = () => {
  const services = [
    {
      icon: FaBabyCarriage,
      title: 'Newborn Care',
      description: 'Comprehensive care for newborns including checkups, feeding guidance, and developmental monitoring.',
      color: 'from-primary-orange to-primary-amber',
    },
    {
      icon: FaSyringe,
      title: 'Vaccination',
      description: 'Complete immunization schedule with safe and effective vaccines for all age groups.',
      color: 'from-primary-amber to-primary-olive',
    },
    {
      icon: FaAppleAlt,
      title: 'Nutrition Guidance',
      description: 'Expert advice on child nutrition, diet plans, and healthy eating habits.',
      color: 'from-primary-olive to-primary-warm',
    },
    {
      icon: FaChild,
      title: 'Child Development',
      description: 'Monitoring and support for physical, cognitive, and emotional development milestones.',
      color: 'from-primary-warm to-accent-coral',
    },
    {
      icon: FaStethoscope,
      title: 'General Consultation',
      description: 'Routine health checkups and consultations for common childhood illnesses.',
      color: 'from-accent-coral to-primary-orange',
    },
    {
      icon: FaAmbulance,
      title: 'Emergency Pediatrics',
      description: '24/7 emergency care for urgent medical situations with rapid response team.',
      color: 'from-primary-orange to-primary-amber',
    },
    {
      icon: FaChartLine,
      title: 'Growth Monitoring',
      description: 'Regular tracking of growth parameters with percentile-based assessments.',
      color: 'from-primary-amber to-primary-olive',
    },
    {
      icon: FaHeartbeat,
      title: 'Health Checkups',
      description: 'Comprehensive health screenings and preventive care programs.',
      color: 'from-primary-olive to-primary-warm',
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
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-poppins font-bold text-gray-900 mb-4">
            Our Services
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive pediatric healthcare services designed for your child's well-being
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={itemVariants}>
              <motion.div
                whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl shadow-lg p-6 h-full border border-gray-200 hover:border-primary-orange transition-all duration-300"
              >
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3, repeat: 1 }}
                  className={`w-14 h-14 bg-gradient-to-br ${service.color} rounded-lg flex items-center justify-center mb-4 shadow-md`}
                >
                  <service.icon className="text-white text-xl" />
                </motion.div>
                <h3 className="text-lg font-poppins font-semibold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
