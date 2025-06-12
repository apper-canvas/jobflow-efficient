import React from 'react';

const Pill = ({ children, className, variant = 'primary', ...rest }) => {
  let variantClasses = "";
  switch (variant) {
    case 'primary':
      variantClasses = "bg-primary/10 text-primary";
      break;
    case 'gray':
      variantClasses = "bg-gray-100 text-gray-800";
      break;
    case 'green':
      variantClasses = "bg-green-100 text-green-800";
      break;
    case 'blue':
      variantClasses = "bg-blue-100 text-blue-800";
      break;
    case 'yellow':
      variantClasses = "bg-yellow-100 text-yellow-800";
      break;
    case 'red':
      variantClasses = "bg-red-100 text-red-800";
      break;
    case 'accent':
      variantClasses = "bg-accent/10 text-accent";
      break;
    default:
      variantClasses = "bg-gray-100 text-gray-800";
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variantClasses} ${className || ''}`.trim()} {...rest}>
      {children}
    </span>
  );
};

export default Pill;