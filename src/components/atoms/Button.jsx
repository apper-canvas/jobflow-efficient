import React from 'react';
import { motion } from 'framer-motion'; // Assuming motion is frequently used with buttons

const Button = ({ children, onClick, className, variant = 'primary', disabled, ...rest }) => {
  const baseClasses = "font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
  let variantClasses = "";

  switch (variant) {
    case 'primary':
      variantClasses = "bg-primary text-white hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed focus:ring-primary";
      break;
    case 'secondary':
      variantClasses = "bg-accent text-white hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed focus:ring-accent";
      break;
    case 'outline':
      variantClasses = "border border-primary text-primary hover:bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed focus:ring-primary";
      break;
    case 'ghost':
      variantClasses = "text-gray-700 hover:text-gray-900 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed focus:ring-gray-300";
      break;
    case 'danger':
      variantClasses = "bg-red-500 text-white hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed focus:ring-red-500";
      break;
    default:
      variantClasses = "bg-primary text-white hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed focus:ring-primary";
  }

  const combinedClassName = `${baseClasses} ${variantClasses} ${className || ''}`.trim();

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      onClick={onClick}
      className={combinedClassName}
      disabled={disabled}
      {...rest}
    >
      {children}
    </motion.button>
  );
};

export default Button;