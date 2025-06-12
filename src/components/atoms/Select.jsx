import React from 'react';

const Select = ({ value, onChange, options, className, ...rest }) => {
  const baseClasses = "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors";
  const combinedClassName = `${baseClasses} ${className || ''}`.trim();

  return (
    <select
      value={value}
      onChange={onChange}
      className={combinedClassName}
      {...rest}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;