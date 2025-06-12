import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Heading from '@/components/atoms/Heading';
import Paragraph from '@/components/atoms/Paragraph';
import Button from '@/components/atoms/Button';

const ProfileEducationSection = ({ profile, onEdit, onDelete }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white rounded-lg border border-gray-200 p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <Heading level={2} className="text-xl">Education</Heading>
        <Button
          className="px-4 py-2"
          onClick={() => onEdit('education', {})}
        >
          <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
          <span>Add Education</span>
        </Button>
      </div>

      {profile?.education?.length > 0 ? (
        <div className="space-y-6">
          {profile.education.map((edu, index) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border-l-4 border-secondary pl-6 relative"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <Heading level={3} className="text-lg">
                    {edu.degree} in {edu.field}
                  </Heading>
                  <Paragraph className="text-secondary font-medium mb-1">{edu.institution}</Paragraph>
                  <Paragraph className="text-sm text-gray-600">
                    {edu.startDate} - {edu.endDate}
                    {edu.gpa &amp;&amp; ` • GPA: ${edu.gpa}`}
                  </Paragraph>
                </div>
                <div className="flex space-x-2 ml-4">
                  <button
                    onClick={() => onEdit('education', edu)}
                    className="p-2 text-gray-400 hover:text-secondary hover:bg-secondary/10 rounded-lg transition-colors"
                  >
                    <ApperIcon name="Edit" className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(edu.id)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <ApperIcon name="Trash2" className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="absolute -left-2 top-0 w-4 h-4 bg-secondary rounded-full"></div>
            </motion.div>
          ))}
        </div>
      ) : (
        <Paragraph className="italic">No education added yet</Paragraph>
      )}
    </motion.div>
  );
};

export default ProfileEducationSection;