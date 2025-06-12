import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Paragraph from '@/components/atoms/Paragraph';
import Heading from '@/components/atoms/Heading';

const StatCard = ({ iconName, iconBgColor, iconColor, value, label }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white border border-gray-200 rounded-lg p-6"
    >
      <div className="flex items-center">
        <div className={`p-3 rounded-lg ${iconBgColor}`}>
          <ApperIcon name={iconName} className={`w-6 h-6 ${iconColor}`} />
        </div>
        <div className="ml-4">
          <Heading level={3} className="text-2xl font-bold text-gray-900">
            {value}
          </Heading>
          <Paragraph>{label}</Paragraph>
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;