import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { FaHeartbeat, FaUserMd, FaCalendarAlt, FaClock } from 'react-icons/fa';

const StatCounter = ({ end, duration = 2, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let startTime;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const ease = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(ease * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const stats = [
  { icon: FaHeartbeat,   value: 5000, suffix: '+', label: 'Happy Families',   desc: 'Trusted by families across the region' },
  { icon: FaUserMd,      value: 25,   suffix: '+', label: 'Expert Doctors',    desc: 'Specialist & experienced clinical team' },
  { icon: FaCalendarAlt, value: 15,   suffix: '+', label: 'Years Experience',  desc: 'Delivering quality pediatric care' },
  { icon: FaClock,       value: 24,   suffix: '/7', label: 'Emergency Care',   desc: 'Round-the-clock availability' },
];

const Statistics = () => {
  return (
    <section className="py-20 sm:py-24 bg-mesh-dark relative overflow-hidden">

      {/* Decorative orbs */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-primary-green/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary-light/15 rounded-full blur-3xl pointer-events-none" />

      <div className="section-container relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-accent-mint bg-white/10 border border-white/15 rounded-full px-4 py-1.5 mb-4">
            By The Numbers
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-poppins font-bold text-white leading-tight mb-4">
            Our Impact
          </h2>
          <div className="w-16 h-0.5 bg-accent-mint rounded-full mx-auto mb-4" />
          <p className="text-neutral-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Numbers that reflect our unwavering commitment to pediatric healthcare excellence
          </p>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
            >
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ duration: 0.25 }}
                className="glass-dark rounded-2xl p-7 text-center group cursor-default h-full"
              >
                {/* Icon */}
                <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-green group-hover:shadow-green-lg transition-shadow duration-300">
                  <stat.icon className="text-white text-2xl" />
                </div>

                {/* Counter */}
                <div className="text-4xl sm:text-5xl font-poppins font-bold text-white mb-2">
                  <StatCounter end={stat.value} duration={2} suffix={stat.suffix} />
                </div>

                {/* Label */}
                <p className="text-accent-mint font-semibold text-sm mb-1.5">{stat.label}</p>
                <p className="text-neutral-500 text-xs leading-relaxed">{stat.desc}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
