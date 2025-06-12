import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Heading from '@/components/atoms/Heading';
import Paragraph from '@/components/atoms/Paragraph';
import Button from '@/components/atoms/Button';
import InfoItem from '@/components/molecules/InfoItem';

const JobDetailHeader = ({ job, isSaved, hasApplied, onSaveJob, onApplyClick, actionLoading }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-8 mb-8">
      <div className="flex items-start justify-between mb-6">
        <div className="flex-1">
          <Heading level={1} className="text-3xl mb-2">
            {job.title}
          </Heading>
          <Paragraph className="text-xl text-primary font-semibold mb-4">{job.company}</Paragraph>
          <div className="flex flex-wrap items-center gap-4 text-gray-600">
            <InfoItem iconName="MapPin" iconClassName="w-4 h-4">{job.location}</InfoItem>
            <InfoItem iconName="DollarSign" iconClassName="w-4 h-4">{job.salary}</InfoItem>
            <InfoItem iconName="Clock" iconClassName="w-4 h-4">{job.type}</InfoItem>
            <InfoItem iconName="User" iconClassName="w-4 h-4">{job.experience}</InfoItem>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Button
            variant={isSaved ? "accent" : "outline"}
            className={`px-4 py-2 ${isSaved ? 'bg-accent/10' : 'border-gray-300'}`}
            onClick={onSaveJob}
            disabled={actionLoading.save}
          >
            {actionLoading.save ? (
              <Loader size="sm" color={isSaved ? "accent" : "primary"} />
            ) : (
              <ApperIcon 
                name="Heart" 
                className="w-4 h-4" 
                fill={isSaved ? "currentColor" : "none"} 
              />
            )}
            <span>{isSaved ? 'Saved' : 'Save Job'}</span>
          </Button>

          {hasApplied ? (
            <div className="flex items-center space-x-2 px-4 py-2 bg-green-100 text-green-800 rounded-lg">
              <ApperIcon name="Check" className="w-4 h-4" />
              <Span className="font-medium">Applied</Span>
            </div>
          ) : (
            <Button
              variant="secondary"
              className="px-6 py-2"
              onClick={onApplyClick}
            >
              <ApperIcon name="Send" className="w-4 h-4 mr-2" />
              <span>Apply Now</span>
            </Button>
          )}
        </div>
      </div>

      <InfoItem iconName="Calendar" className="text-sm text-gray-500" iconClassName="w-4 h-4">
        Posted {new Date(job.postedDate).toLocaleDateString()}
      </InfoItem>
    </div>
  );
};

export default JobDetailHeader;