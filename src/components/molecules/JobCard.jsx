import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Heading from '@/components/atoms/Heading';
import Paragraph from '@/components/atoms/Paragraph';
import Pill from '@/components/atoms/Pill';
import Button from '@/components/atoms/Button';
import InfoItem from '@/components/molecules/InfoItem';

const JobCard = ({ job, onView, onSave, onApply, isSaved, hasApplied }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSave = async (e) => {
    e.stopPropagation();
    setIsAnimating(true);
    await onSave(job.id);
    setTimeout(() => setIsAnimating(false), 600);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white rounded-lg border border-gray-200 p-6 cursor-pointer hover:shadow-md transition-all duration-200"
      onClick={() => onView(job)}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <Heading level={3} className="text-lg mb-1">
            {job.title}
          </Heading>
          <Paragraph className="text-primary font-medium mb-2">{job.company}</Paragraph>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={isAnimating ? { scale: [1, 1.3, 1], rotate: [0, 360, 0] } : {}}
          onClick={handleSave}
          className={`p-2 rounded-full transition-colors ${
            isSaved 
              ? 'text-accent bg-accent/10 hover:bg-accent/20' 
              : 'text-gray-400 hover:text-accent hover:bg-accent/10'
          }`}
        >
          <ApperIcon name="Heart" className="w-5 h-5" fill={isSaved ? "currentColor" : "none"} />
        </motion.button>
      </div>

      <div className="space-y-2 mb-4">
        <InfoItem iconName="MapPin" className="text-sm text-gray-600">
          {job.location}
        </InfoItem>
        <InfoItem iconName="DollarSign" className="text-sm text-gray-600">
          {job.salary}
        </InfoItem>
        <div className="flex items-center space-x-4">
          <Pill variant="primary">{job.type}</Pill>
          <Pill variant="gray">{job.experience}</Pill>
        </div>
      </div>

      <Paragraph className="text-sm line-clamp-2 mb-4">
        {job.description}
      </Paragraph>

      <div className="flex items-center justify-between">
        <Paragraph className="text-sm text-gray-500">
          Posted {new Date(job.postedDate).toLocaleDateString()}
        </Paragraph>
        
        {hasApplied ? (
          <Pill variant="green" className="flex items-center">
            <ApperIcon name="Check" className="w-3 h-3 mr-1" />
            Applied
          </Pill>
        ) : (
          <Button
            variant="secondary"
            className="px-4 py-2 text-sm"
            onClick={(e) => {
              e.stopPropagation();
              onApply(job);
            }}
          >
            Quick Apply
          </Button>
        )}
      </div>
    </motion.div>
  );
};

export default JobCard;