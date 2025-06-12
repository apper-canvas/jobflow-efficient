import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Heading from '@/components/atoms/Heading';
import Paragraph from '@/components/atoms/Paragraph';

const ResumeTipsCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-blue-50 border border-blue-200 rounded-lg p-6"
    >
      <div className="flex items-start space-x-3">
        <ApperIcon name="Lightbulb" className="w-6 h-6 text-blue-600 mt-0.5" />
        <div>
          <Heading level={3} className="text-blue-900 mb-2">Resume Tips</Heading>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Keep your resume updated with your latest experience and skills</li>
            <li>• Tailor different versions for different types of jobs</li>
            <li>• Use your primary resume for quick applications</li>
            <li>• Ensure your PDF is readable and properly formatted</li>
            <li>• Keep file names professional (e.g., "John_Doe_Resume_2024.pdf")</li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default ResumeTipsCard;