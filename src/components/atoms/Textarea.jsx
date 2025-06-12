import React from 'react';

const Textarea = ({ value, onChange, placeholder, rows = 3, className, ...rest }) => {
  const baseClasses = "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none transition-colors";
  const combinedClassName = `${baseClasses} ${className || ''}`.trim();

  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className={combinedClassName}
      {...rest}
    />
  );
};

export default Textarea;