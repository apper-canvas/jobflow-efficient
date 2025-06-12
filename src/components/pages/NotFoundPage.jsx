import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ApperIcon from '@/components/ApperIcon';
import Heading from '@/components/atoms/Heading';
import Paragraph from '@/components/atoms/Paragraph';
import Button from '@/components/atoms/Button';

const NotFoundPage = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="mb-8"
        >
          <ApperIcon name="SearchX" className="w-24 h-24 text-gray-300 mx-auto" />
        </motion.div>
        
        <Heading level={1} className="text-4xl mb-4">Page Not Found</Heading>
        <Paragraph className="text-lg mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </Paragraph>
        
        <Button as={Link} to="/jobs" className="inline-flex items-center space-x-2 px-6 py-3">
          <ApperIcon name="ArrowLeft" className="w-4 h-4" />
          <span>Back to Jobs</span>
        </Button>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;