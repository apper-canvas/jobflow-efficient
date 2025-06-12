import React from 'react';
import Heading from '@/components/atoms/Heading';
import Paragraph from '@/components/atoms/Paragraph';

const SimilarJobsCard = () => {
  // Mock data for similar jobs
  const mockSimilarJobs = [
    { title: 'Frontend Developer', company: 'TechCorp', salary: '$90k-$120k' },
    { title: 'React Developer', company: 'Innovate Solutions', salary: '$100k-$130k' },
    { title: 'Full Stack Developer', company: 'Global Apps', salary: '$110k-$140k' },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <Heading level={3} className="text-lg mb-4">
        Similar Jobs
      </Heading>
      <div className="space-y-3">
        {mockSimilarJobs.map((job, index) => (
          <div key={index} className="text-sm">
            <Paragraph as="p" className="font-medium text-gray-900 hover:text-primary cursor-pointer">
              {job.title}
            </Paragraph>
            <Paragraph className="text-gray-500">{job.company} • {job.salary}</Paragraph>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimilarJobsCard;