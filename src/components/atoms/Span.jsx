import React from 'react';

const Span = ({ children, className, ...rest }) => {
  return (
    <span className={`${className || ''}`.trim()} {...rest}>
      {children}
    </span>
  );
};

export default Span;