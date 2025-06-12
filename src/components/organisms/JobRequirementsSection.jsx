import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Heading from '@/components/atoms/Heading';
import Paragraph from '@/components/atoms/Paragraph';

const JobRequirementsSection = ({ requirements }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <Heading level={2} className="text-xl mb-4">
        Requirements
      </Heading>
      <ul className="space-y-3">
        {requirements.map((requirement, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start"
          >
            <ApperIcon name="Check" className="w-5 h-5 text-accent mr-3 mt-0.5 flex-shrink-0" />
            <Paragraph as="span" className="text-gray-700">{requirement}</Paragraph>
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

export default JobRequirementsSection;