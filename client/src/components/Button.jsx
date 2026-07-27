import { motion } from 'framer-motion';

const Button = ({ children, variant = 'primary', className = '', isLoading = false, ...props }) => {
  const baseStyles = 'font-semibold px-8 py-3 rounded-full transition-all duration-300 relative overflow-hidden';
  
  const variants = {
    primary: 'bg-gradient-to-r from-primary-orange to-primary-amber text-white hover:shadow-lg',
    secondary: 'bg-white text-primary-orange border-2 border-primary-orange hover:bg-primary-orange hover:text-white',
    outline: 'bg-transparent text-primary-orange border-2 border-primary-orange hover:bg-primary-orange hover:text-white',
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
