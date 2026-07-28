import { motion } from 'framer-motion';

const Button = ({ children, variant = 'primary', className = '', isLoading = false, ...props }) => {
  const variantClass = {
    primary:   'btn-primary',
    secondary: 'btn-outline',
    outline:   'btn-outline',
  }[variant] || 'btn-primary';

  return (
    <motion.button
      whileHover={!isLoading ? { scale: 1.03, y: -2 } : {}}
      whileTap={!isLoading ? { scale: 0.97 } : {}}
      disabled={isLoading}
      className={`${variantClass} disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
          Loading…
        </span>
      ) : (
        children
      )}
    </motion.button>
  );
};

export default Button;
