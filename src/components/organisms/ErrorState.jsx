import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Heading from '@/components/atoms/Heading';
import Paragraph from '@/components/atoms/Paragraph';
import Button from '@/components/atoms/Button';

const ErrorState = ({ title = 'Something Went Wrong', message = 'An unexpected error occurred. Please try again.', onRetry, retryButtonText = 'Try Again' }) => {
  return (
    <div className="max-w-4xl mx-auto text-center py-12">
      <ApperIcon name="AlertCircle" className="w-16 h-16 text-red-300 mx-auto mb-4" />
      <Heading level={2} className="text-2xl mb-2">{title}</Heading>
      <Paragraph className="mb-8">{message}</Paragraph>
      {onRetry &amp;&amp; (
        <Button onClick={onRetry} className="px-6 py-3">
          {retryButtonText}
        </Button>
      )}
    </div>
  );
};

export default ErrorState;