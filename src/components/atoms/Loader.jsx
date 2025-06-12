import React from 'react';

const Loader = ({ className = '', size = 'md', color = 'primary', ...rest }) => {
  let sizeClasses = '';
  switch (size) {
    case 'sm':
      sizeClasses = 'w-4 h-4 border-2';
      break;
    case 'md':
      sizeClasses = 'w-8 h-8 border-4';
      break;
    case 'lg':
      sizeClasses = 'w-12 h-12 border-6';
      break;
    default:
      sizeClasses = 'w-8 h-8 border-4';
  }

  let colorClasses = '';
  switch (color) {
    case 'primary':
      colorClasses = 'border-primary border-t-transparent';
      break;
    case 'accent':
      colorClasses = 'border-accent border-t-transparent';
      break;
    case 'white':
      colorClasses = 'border-white border-t-transparent';
      break;
    case 'gray':
      colorClasses = 'border-gray-400 border-t-transparent';
      break;
    default:
      colorClasses = 'border-primary border-t-transparent';
  }

  return (
    <div
      className={`animate-spin rounded-full ${sizeClasses} ${colorClasses} ${className}`}
      role="status"
      {...rest}
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Loader;