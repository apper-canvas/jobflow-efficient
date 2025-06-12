import React from 'react';

const Paragraph = ({ children, className, ...rest }) => {
  return (
    <p className={`text-gray-600 ${className || ''}`.trim()} {...rest}>
      {children}
    </p>
  );
};

export default Paragraph;