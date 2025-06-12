import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Heading from '@/components/atoms/Heading';
import Paragraph from '@/components/atoms/Paragraph';
import Button from '@/components/atoms/Button';

const ProfileExperienceSection = ({ profile, onEdit, onDelete }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white rounded-lg border border-gray-200 p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <Heading level={2} className="text-xl">Experience</Heading>
        <Button
          className="px-4 py-2"
          onClick={() => onEdit('experience', {})}
        >
          <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
          <span>Add Experience</span>
        </Button>
      </div>

      {profile?.experience?.length > 0 ? (
        <div className="space-y-6">
          {profile.experience.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border-l-4 border-primary pl-6 relative"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <Heading level={3} className="text-lg">
                    {exp.title}
                  </Heading>
                  <Paragraph className="text-primary font-medium mb-1">{exp.company}</Paragraph>
                  <Paragraph className="text-sm text-gray-600 mb-2">
                    {exp.location} • {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </Paragraph>
{exp.description && (
                    <Paragraph className="leading-relaxed">{exp.description}</Paragraph>
                  )}
                </div>
                <div className="flex space-x-2 ml-4">
                  <button
                    onClick={() => onEdit('experience', exp)}
                    className="p-2 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                  >
                    <ApperIcon name="Edit" className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(exp.id)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <ApperIcon name="Trash2" className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="absolute -left-2 top-0 w-4 h-4 bg-primary rounded-full"></div>
            </motion.div>
          ))}
        </div>
      ) : (
        <Paragraph className="italic">No experience added yet</Paragraph>
      )}
    </motion.div>
  );
};

export default ProfileExperienceSection;