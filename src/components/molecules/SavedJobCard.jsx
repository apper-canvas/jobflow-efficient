import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Heading from '@/components/atoms/Heading';
import Paragraph from '@/components/atoms/Paragraph';
import Button from '@/components/atoms/Button';
import InfoItem from '@/components/molecules/InfoItem';

const SavedJobCard = ({ savedJob, job, onRemove, onViewJob }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all duration-200"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <Heading level={3} className="text-lg mb-1">
            {job?.title || 'Loading...'}
          </Heading>
          <Paragraph className="text-primary font-medium mb-2">{job?.company}</Paragraph>
          {job &amp;&amp; (
            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
              <InfoItem iconName="MapPin" iconClassName="w-4 h-4" textClassName="text-sm">
                {job.location}
              </InfoItem>
              <InfoItem iconName="DollarSign" iconClassName="w-4 h-4" textClassName="text-sm">
                {job.salary}
              </InfoItem>
            </div>
          )}
        </div>
        
        <button
          onClick={() => onRemove(savedJob.id)}
          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
        >
          <ApperIcon name="X" className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center justify-between">
        <Paragraph className="text-sm text-gray-500">
          Saved {new Date(savedJob.savedDate).toLocaleDateString()}
        </Paragraph>
        
        <div className="flex space-x-2">
          <Button
            variant="outline"
            className="px-4 py-2 text-sm"
            onClick={() => onViewJob(savedJob.jobId)}
          >
            View Details
          </Button>
          <Button
            variant="secondary"
            className="px-4 py-2 text-sm"
            onClick={() => onViewJob(savedJob.jobId)}
          >
            Apply Now
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default SavedJobCard;