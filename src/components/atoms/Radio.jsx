import React from 'react';

const Radio = ({ id, name, value, checked, onChange, label, className, ...rest }) => {
  const baseClasses = "h-4 w-4 text-primary border-gray-300 focus:ring-primary transition-colors";
  const combinedInputClassName = `${baseClasses} ${className || ''}`.trim();

  return (
    <div className="flex items-center">
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className={combinedInputClassName}
        {...rest}
      />
      {label && (
        <label htmlFor={id} className="ml-2 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
    </div>
  );
};

export default Radio;