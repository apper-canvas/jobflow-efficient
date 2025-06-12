import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Heading from '@/components/atoms/Heading';
import Paragraph from '@/components/atoms/Paragraph';
import Button from '@/components/atoms/Button';

const EmptyState = ({ iconName, title, message, onAction, actionButtonText }) => {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="text-center py-12 bg-white rounded-lg border border-gray-200"
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 3 }}
      >
        <ApperIcon name={iconName} className="w-16 h-16 text-gray-300 mx-auto" />
      </motion.div>
      <Heading level={3} className="mt-4 text-lg font-medium">{title}</Heading>
      <Paragraph className="mt-2 text-gray-500 max-w-md mx-auto">{message}</Paragraph>
      {onAction &amp;&amp; (
        <Button onClick={onAction} className="mt-4 px-6 py-2">
          {actionButtonText}
        </Button>
      )}
    </motion.div>
  );
};

export default EmptyState;