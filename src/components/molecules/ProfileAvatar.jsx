import React from 'react';
import Span from '@/components/atoms/Span';

const ProfileAvatar = ({ initial, className, size = 'lg', ...rest }) => {
  let sizeClasses = '';
  let textSizeClasses = '';

  switch (size) {
    case 'sm':
      sizeClasses = 'w-10 h-10';
      textSizeClasses = 'text-base';
      break;
    case 'md':
      sizeClasses = 'w-16 h-16';
      textSizeClasses = 'text-xl';
      break;
    case 'lg':
      sizeClasses = 'w-24 h-24';
      textSizeClasses = 'text-3xl';
      break;
    default:
      sizeClasses = 'w-24 h-24';
      textSizeClasses = 'text-3xl';
  }

  return (
    <div
      className={`bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center ${sizeClasses} ${className || ''}`.trim()}
      {...rest}
    >
      <Span className={`font-bold text-white ${textSizeClasses}`.trim()}>
        {initial}
      </Span>
    </div>
  );
};

export default ProfileAvatar;