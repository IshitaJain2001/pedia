import { motion } from 'framer-motion';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyles = 'font-semibold px-8 py-3 rounded-full transition-all duration-300';
  
  const variants = {
    primary: 'bg-gradient-to-r from-primary-sky to-primary-mint text-gray-800 hover:shadow hover:scale-105',
    secondary: 'bg-white text-primary-sky border-2 border-primary-sky hover:bg-primary-sky hover:text-white',
    outline: 'bg-transparent text-primary-sky border-2 border-primary-sky hover:bg-primary-sky hover:text-white',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
