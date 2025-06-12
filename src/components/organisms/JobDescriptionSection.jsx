import React from 'react';
import Heading from '@/components/atoms/Heading';
import Paragraph from '@/components/atoms/Paragraph';

const JobDescriptionSection = ({ description }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <Heading level={2} className="text-xl mb-4">
        Job Description
      </Heading>
      <div className="prose prose-gray max-w-none">
        <Paragraph className="leading-relaxed">{description}</Paragraph>
      </div>
    </div>
  );
};

export default JobDescriptionSection;