import React from 'react';

const Checkbox = ({ id, checked, onChange, label, className, ...rest }) => {
  const baseClasses = "rounded border-gray-300 text-primary focus:ring-primary transition-colors";
  const combinedInputClassName = `${baseClasses} ${className || ''}`.trim();

  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        id={id}
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

export default Checkbox;