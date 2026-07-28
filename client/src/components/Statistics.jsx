import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { FaHeartbeat, FaUserMd, FaCalendarAlt, FaClock } from 'react-icons/fa';

const StatCounter = ({ end, duration = 2, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let startTime;
      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        
        // Easing function
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(easeOutQuart * end));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const Statistics = () => {
  const stats = [
    {
      icon: FaHeartbeat,
      value: 5000,
      suffix: '+',
      label: 'Happy Families',
      color: 'from-primary-green to-primary-light',
    },
    {
      icon: FaUserMd,
      value: 25,
      suffix: '+',
      label: 'Expert Doctors',
      color: 'from-primary-light to-primary-lime',
    },
    {
      icon: FaCalendarAlt,
      value: 15,
      suffix: '+',
      label: 'Years Experience',
      color: 'from-primary-lime to-primary-emerald',
    },
    {
      icon: FaClock,
      value: 24,
      suffix: 'x7',
      label: 'Emergency Care',
      color: 'from-primary-emerald to-accent-mint',
    },
  ];


  return (
    <section className="py-20 bg-gradient-to-br from-primary-green/10 to-primary-light/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-poppins font-bold text-gray-900 mb-4">
            Our Impact
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Numbers that reflect our commitment to pediatric healthcare excellence
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 p-8 text-center hover:shadow-2xl transition-all duration-300">
                <div className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <stat.icon className="text-white text-2xl" />
                </div>
                <div className="text-4xl sm:text-5xl font-poppins font-bold text-gradient mb-2">
                  <StatCounter end={stat.value} duration={2} suffix={stat.suffix} />
                </div>
                <p className="text-gray-600 font-medium">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Statistics;
