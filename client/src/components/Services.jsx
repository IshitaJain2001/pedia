import { motion } from 'framer-motion';
import {
  FaBabyCarriage, FaSyringe, FaAppleAlt, FaChild,
  FaStethoscope, FaAmbulance, FaChartLine, FaHeartbeat,
} from 'react-icons/fa';
import { FiArrowRight } from 'react-icons/fi';

const services = [
  {
    icon: FaBabyCarriage,
    title: 'Newborn Care',
    description: 'Comprehensive care for newborns including checkups, feeding guidance, and developmental monitoring.',
    gradient: 'from-blue-600 to-blue-400',
    accent: 'border-t-blue-600',
  },
  {
    icon: FaSyringe,
    title: 'Vaccination',
    description: 'Complete immunization schedule with safe and effective vaccines for all age groups.',
    gradient: 'from-blue-700 to-blue-500',
    accent: 'border-t-blue-500',
  },
  {
    icon: FaAppleAlt,
    title: 'Nutrition Guidance',
    description: 'Expert advice on child nutrition, diet plans, and healthy eating habits for every stage.',
    gradient: 'from-blue-500 to-blue-300',
    accent: 'border-t-blue-400',
  },
  {
    icon: FaChild,
    title: 'Child Development',
    description: 'Monitoring and support for physical, cognitive, and emotional development milestones.',
    gradient: 'from-blue-800 to-blue-600',
    accent: 'border-t-blue-700',
  },
  {
    icon: FaStethoscope,
    title: 'General Consultation',
    description: 'Routine health checkups and consultations for common childhood illnesses and concerns.',
    gradient: 'from-blue-600 to-blue-400',
    accent: 'border-t-blue-500',
  },
  {
    icon: FaAmbulance,
    title: 'Emergency Pediatrics',
    description: '24/7 emergency care for urgent medical situations with a rapid-response clinical team.',
    gradient: 'from-blue-700 to-blue-500',
    accent: 'border-t-blue-600',
  },
  {
    icon: FaChartLine,
    title: 'Growth Monitoring',
    description: 'Regular tracking of height, weight, and growth parameters with percentile-based assessments.',
    gradient: 'from-blue-500 to-blue-300',
    accent: 'border-t-blue-400',
  },
  {
    icon: FaHeartbeat,
    title: 'Health Checkups',
    description: 'Comprehensive health screenings, preventive care programs, and wellness evaluations.',
    gradient: 'from-blue-600 to-blue-500',
    accent: 'border-t-blue-500',
  },
];

const containerVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
};

const itemVariants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const Services = () => {
  return (
    <section id="services" className="py-20 sm:py-24 bg-white relative overflow-hidden">

      {/* Decorative */}
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-primary-50 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="section-container relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="section-tag">What We Offer</span>
          <h2 className="section-heading">Our Services</h2>
          <div className="section-divider" />
          <p className="section-subheading">
            Comprehensive pediatric healthcare services designed for your child's complete well-being
          </p>
        </motion.div>

        {/* Points Layout instead of Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6 sm:gap-y-8 max-w-6xl mx-auto"
        >
          {services.map((service, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="flex items-start gap-4 p-2 group hover:translate-x-1 transition-transform duration-200"
            >
              {/* Icon Point */}
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0 text-blue-600 group-hover:scale-110 transition-transform duration-300">
                <service.icon className="text-lg" />
              </div>
              
              {/* Content */}
              <div>
                <h3 className="text-base sm:text-lg font-poppins font-semibold text-neutral-900 group-hover:text-blue-600 transition-colors duration-200">
                  {service.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed mt-1">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
