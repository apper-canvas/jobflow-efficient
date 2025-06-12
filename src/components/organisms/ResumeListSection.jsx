import React from 'react';
import { AnimatePresence } from 'framer-motion';
import Heading from '@/components/atoms/Heading';
import ResumeCard from '@/components/molecules/ResumeCard';
import EmptyState from '@/components/organisms/EmptyState';

const ResumeListSection = ({ resumes, onSetPrimary, onDeleteResume, formatFileSize }) => {
  return (
    <div className="space-y-4">
      <Heading level={2} className="text-xl">
        Your Resumes ({resumes.length})
      </Heading>

      {resumes.length === 0 ? (
        <EmptyState
          iconName="FileText"
          title="No resumes uploaded yet"
          message="Upload your first resume to get started"
          className="bg-white rounded-lg border border-gray-200"
        />
      ) : (
        <div className="space-y-4">
          <AnimatePresence>
            {resumes.map((resume) => (
              <ResumeCard
                key={resume.id}
                resume={resume}
                onSetPrimary={onSetPrimary}
                onDelete={onDeleteResume}
                formatFileSize={formatFileSize}
              />
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default ResumeListSection;