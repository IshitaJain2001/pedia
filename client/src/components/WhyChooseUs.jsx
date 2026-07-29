import { motion } from 'framer-motion';
import { FaUserMd, FaHeartbeat, FaAmbulance, FaSyringe, FaStethoscope, FaBaby } from 'react-icons/fa';

const features = [
  {
    icon: FaUserMd,
    title: 'Experienced Pediatrician',
    description: 'Board-certified pediatricians with years of experience delivering exceptional child healthcare.',
    gradient: 'from-blue-600 to-blue-400',
    bg: 'bg-blue-50',
  },
  {
    icon: FaSyringe,
    title: 'Vaccination Services',
    description: 'Comprehensive immunization programs following the latest WHO guidelines for all age groups.',
    gradient: 'from-blue-700 to-blue-500',
    bg: 'bg-blue-50',
  },
  {
    icon: FaBaby,
    title: 'Neonatal Care',
    description: 'Specialized care for newborns and premature babies with round-the-clock expert monitoring.',
    gradient: 'from-blue-500 to-blue-300',
    bg: 'bg-blue-50',
  },
  {
    icon: FaAmbulance,
    title: 'Emergency Care',
    description: '24/7 emergency pediatric services with rapid-response protocols and dedicated teams.',
    gradient: 'from-blue-800 to-blue-600',
    bg: 'bg-blue-50',
  },
  {
    icon: FaStethoscope,
    title: 'Growth Monitoring',
    description: 'Regular checkups and percentile-based growth tracking to ensure healthy development.',
    gradient: 'from-blue-500 to-blue-400',
    bg: 'bg-blue-50',
  },
  {
    icon: FaHeartbeat,
    title: 'Child-Friendly Environment',
    description: 'A welcoming, colorful space designed to make children feel comfortable, calm, and safe.',
    gradient: 'from-blue-600 to-blue-500',
    bg: 'bg-blue-50',
  },
];


const containerVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const WhyChooseUs = () => {
  return (
    <section id="why-choose-us" className="py-20 sm:py-24 bg-neutral-50 relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary-50 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="section-container relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="section-tag">Our Strengths</span>
          <h2 className="section-heading">Why Choose Us</h2>
          <div className="section-divider" />
          <p className="section-subheading">
            We provide exceptional pediatric care with a focus on your child's comfort and well-being
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
        >
          {features.map((feature, i) => (
            <motion.div key={i} variants={itemVariants}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25 }}
                className="card card-hover h-full p-6 sm:p-7 group"
              >
                {/* Icon */}
                <div className={`icon-box bg-gradient-to-br ${feature.gradient} mb-5 shadow-soft group-hover:shadow-green transition-shadow duration-300`}>
                  <feature.icon className="text-white text-xl" />
                </div>

                <h3 className="text-lg font-poppins font-semibold text-neutral-900 mb-2 group-hover:text-primary-green transition-colors duration-200">
                  {feature.title}
                </h3>
                <p className="text-sm text-neutral-500 leading-relaxed">
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
