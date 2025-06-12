import React from 'react';
import ApperIcon from '@/components/ApperIcon';
import Span from '@/components/atoms/Span';

const InfoItem = ({ iconName, children, className, iconClassName, textClassName, ...rest }) => {
  return (
    <div className={`flex items-center ${className || ''}`.trim()} {...rest}>
      <ApperIcon name={iconName} className={`mr-2 ${iconClassName || ''}`.trim()} />
      <Span className={`${textClassName || ''}`.trim()}>{children}</Span>
    </div>
  );
};

export default InfoItem;