import React from 'react';
import Heading from '@/components/atoms/Heading';
import Span from '@/components/atoms/Span';

const JobDetailsCard = ({ type, experience, salary, postedDate }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <Heading level={3} className="text-lg mb-4">
        Job Details
      </Heading>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Span className="text-gray-600">Job Type</Span>
          <Span className="font-medium capitalize">{type}</Span>
        </div>
        <div className="flex justify-between items-center">
          <Span className="text-gray-600">Experience</Span>
          <Span className="font-medium capitalize">{experience}</Span>
        </div>
        <div className="flex justify-between items-center">
          <Span className="text-gray-600">Salary Range</Span>
          <Span className="font-medium">{salary}</Span>
        </div>
        <div className="flex justify-between items-center">
          <Span className="text-gray-600">Posted</Span>
          <Span className="font-medium">
            {new Date(postedDate).toLocaleDateString()}
          </Span>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsCard;