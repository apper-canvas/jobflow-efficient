import React from 'react';

const Heading = ({ level, children, className, ...rest }) => {
const Tag = `h${level >= 1 && level <= 6 ? level : 1}`;
  return (
    <Tag className={`font-display font-bold text-gray-900 ${className || ''}`.trim()} {...rest}>
      {children}
    </Tag>
  );
};

export default Heading;