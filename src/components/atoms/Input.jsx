import React from 'react';

const Input = ({ type = 'text', value, onChange, placeholder, className, ...rest }) => {
  const baseClasses = "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors";
  const combinedClassName = `${baseClasses} ${className || ''}`.trim();

  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={combinedClassName}
      {...rest}
    />
  );
};

export default Input;