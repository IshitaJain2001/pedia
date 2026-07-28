import { motion } from 'framer-motion';

const Button = ({ children, variant = 'primary', className = '', isLoading = false, ...props }) => {
  const baseStyles = 'font-semibold px-8 py-3 rounded-full transition-all duration-300 relative overflow-hidden';
  
  const variants = {
    primary: 'bg-gradient-to-r from-primary-green to-primary-light text-white hover:shadow-lg',
    secondary: 'bg-white text-primary-green border-2 border-primary-green hover:bg-primary-green hover:text-white',
    outline: 'bg-transparent text-primary-green border-2 border-primary-green hover:bg-primary-green hover:text-white',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(255, 140, 0, 0.4)" }}
      whileTap={{ scale: 0.95 }}
      disabled={isLoading}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <motion.span
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="inline-block"
        >
          ⏳
        </motion.span>
      ) : (
        children
      )}
    </motion.button>
  );
};

export default Button;
