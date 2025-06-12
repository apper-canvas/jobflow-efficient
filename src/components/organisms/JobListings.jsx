import React from 'react';
import { motion } from 'framer-motion';
import Heading from '@/components/atoms/Heading';
import Paragraph from '@/components/atoms/Paragraph';
import JobCard from '@/components/molecules/JobCard';
import Loader from '@/components/atoms/Loader';
import EmptyState from '@/components/organisms/EmptyState';
import { useNavigate } from 'react-router-dom';

const JobListings = ({ jobs, pagination, loading, filters, onSaveJob, onApplyJob, onSearch }) => {
  const navigate = useNavigate();

  if (jobs.length === 0 &amp;&amp; !loading) {
    return (
      <EmptyState
        iconName="Search"
        title="No jobs found"
        message="Try adjusting your search filters to find more opportunities"
        onAction={() => onSearch({})}
        actionButtonText="Clear Filters"
      />
    );
  }

  return (
    &lt;&gt;
      <div className="flex items-center justify-between mb-6">
        <div>
          <Heading level={2} className="text-2xl">
            Job Opportunities
          </Heading>
          <Paragraph className="mt-1">
            {pagination.total} jobs found
          </Paragraph>
        </div>
      </div>

      <div className="space-y-4">
        {jobs.map((job, index) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <JobCard
              job={job}
              onView={(j) => navigate(`/jobs/${j.id}`)}
              onSave={onSaveJob}
              onApply={onApplyJob}
              isSaved={false} // This would come from saved jobs service
              hasApplied={false} // This would come from applications service
            />
          </motion.div>
        ))}
      </div>

      {loading &amp;&amp; jobs.length > 0 &amp;&amp; (
        <div className="flex justify-center py-8">
          <Loader size="md" color="primary" />
        </div>
      )}
    </&gt;
  );
};

export default JobListings;