import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Heading from '@/components/atoms/Heading';
import Paragraph from '@/components/atoms/Paragraph';
import Pill from '@/components/atoms/Pill';
import Button from '@/components/atoms/Button';
import InfoItem from '@/components/molecules/InfoItem';

const ApplicationCard = ({ application, job, onViewJob, getStatusColor }) => {
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
        
        <Pill variant={getStatusColor(application.status)} className="capitalize">
          {application.status}
        </Pill>
      </div>

      {application.coverLetter &amp;&amp; (
        <div className="mb-4">
          <Paragraph className="text-sm line-clamp-2">
            {application.coverLetter}
          </Paragraph>
        </div>
      )}

      <div className="flex items-center justify-between">
        <Paragraph className="text-sm text-gray-500">
          Applied {new Date(application.appliedDate).toLocaleDateString()}
        </Paragraph>
        
        <Button
          variant="outline"
          className="px-4 py-2 text-sm"
          onClick={() => onViewJob(application.jobId)}
        >
          View Job
        </Button>
      </div>
    </motion.div>
  );
};

export default ApplicationCard;