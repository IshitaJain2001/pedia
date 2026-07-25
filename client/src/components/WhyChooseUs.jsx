import { motion } from 'framer-motion';
import { FaUserMd, FaHeartbeat, FaAmbulance, FaSyringe, FaStethoscope, FaBaby } from 'react-icons/fa';
import Card from './Card';

const WhyChooseUs = () => {
  const features = [
    {
      icon: FaUserMd,
      title: 'Experienced Pediatricians',
      description: 'Our team of board-certified pediatricians has years of experience in child healthcare.',
      color: 'bg-primary-sky',
    },
    {
      icon: FaHeartbeat,
      title: 'Child Friendly Environment',
      description: 'Colorful, welcoming spaces designed to make children feel comfortable and safe.',
      color: 'bg-primary-mint',
    },
    {
      icon: FaAmbulance,
      title: 'Emergency Care',
      description: '24/7 emergency services with rapid response for urgent medical situations.',
      color: 'bg-accent-coral',
    },
    {
      icon: FaSyringe,
      title: 'Vaccination Services',
      description: 'Comprehensive immunization programs following WHO guidelines.',
      color: 'bg-primary-yellow',
    },
    {
      icon: FaStethoscope,
      title: 'Modern Equipment',
      description: 'State-of-the-art medical technology for accurate diagnosis and treatment.',
      color: 'bg-accent-lavender',
    },
    {
      icon: FaBaby,
      title: 'Personalized Care',
      description: 'Individualized treatment plans tailored to each child\'s unique needs.',
      color: 'bg-primary-peach',
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
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-poppins font-bold text-gray-800 mb-4">
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
              <Card className="h-full">
                <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mb-4`}>
                  <feature.icon className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-poppins font-semibold text-gray-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
