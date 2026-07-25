import { motion } from 'framer-motion';

const Card = ({ children, className = '', hover = true, ...props }) => {
  return (
    <motion.div
      whileHover={hover ? { y: -10, scale: 1.02 } : {}}
      transition={{ duration: 0.3 }}
      className={`bg-white rounded-3xl shadow-xl shadow-gray-200/50 p-6 ${hover ? 'hover:shadow-2xl' : ''} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;
