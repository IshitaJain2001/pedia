import { motion } from 'framer-motion';
import { FaCalendarCheck } from 'react-icons/fa';
import Card from './Card';
import Button from './Button';

const Doctors = () => {
  const doctors = [
    {
      name: 'Dr. Sarah Johnson',
      specialization: 'Pediatrician',
      experience: '15+ years',
      image: '👩‍⚕️',
      color: 'bg-primary-sky',
    },
    {
      name: 'Dr. Michael Chen',
      specialization: 'Neonatologist',
      experience: '12+ years',
      image: '👨‍⚕️',
      color: 'bg-primary-mint',
    },
    {
      name: 'Dr. Emily Williams',
      specialization: 'Pediatric Cardiologist',
      experience: '18+ years',
      image: '👩‍⚕️',
      color: 'bg-accent-lavender',
    },
    {
      name: 'Dr. James Anderson',
      specialization: 'Pediatric Surgeon',
      experience: '20+ years',
      image: '👨‍⚕️',
      color: 'bg-primary-peach',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const scrollToSection = (id) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="doctors" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-poppins font-bold text-gray-800 mb-4">
            Meet Our Pediatricians
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our team of experienced and caring pediatricians dedicated to your child's health
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {doctors.map((doctor, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full text-center">
                <div className={`w-24 h-24 ${doctor.color} rounded-full flex items-center justify-center mx-auto mb-4 text-5xl`}>
                  {doctor.image}
                </div>
                <h3 className="text-xl font-poppins font-semibold text-gray-800 mb-2">
                  {doctor.name}
                </h3>
                <p className="text-primary-sky font-medium mb-1">
                  {doctor.specialization}
                </p>
                <p className="text-gray-500 text-sm mb-4">
                  {doctor.experience}
                </p>
                <Button
                  variant="outline"
                  className="w-full text-sm"
                  onClick={() => scrollToSection('#appointment')}
                >
                  <FaCalendarCheck className="mr-2" />
                  Book Appointment
                </Button>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Doctors;
