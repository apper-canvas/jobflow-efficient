import React from 'react';
import { motion } from 'framer-motion';
import SavedJobCard from '@/components/molecules/SavedJobCard';
import ApplicationCard from '@/components/molecules/ApplicationCard';
import EmptyState from '@/components/organisms/EmptyState';
import { useNavigate } from 'react-router-dom';

const DashboardJobListing = ({ type, data, jobDetails, onRemoveSavedJob }) => {
  const navigate = useNavigate();

  const getStatusColor = (status) => {
    switch (status) {
      case 'applied':
        return 'blue';
      case 'viewed':
        return 'yellow';
      case 'interview':
        return 'green';
      case 'rejected':
        return 'red';
      default:
        return 'gray';
    }
  };

  const handleViewJob = (jobId) => {
    navigate(`/jobs/${jobId}`);
  };

  if (data.length === 0) {
    return (
      <EmptyState
        iconName={type === 'saved' ? "Bookmark" : "Send"} 
        title={type === 'saved' ? 'No saved jobs yet' : 'No applications yet'}
        message={
          type === 'saved' 
            ? 'Save jobs you\'re interested in to easily find them later'
            : 'Start applying to jobs to track your application status here'
        }
        onAction={() => navigate('/jobs')}
        actionButtonText="Browse Jobs"
        className="bg-white rounded-lg border border-gray-200"
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {type === 'saved' ? (
        data.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <SavedJobCard 
              savedJob={item} 
              job={jobDetails[item.jobId]} 
              onRemove={onRemoveSavedJob}
              onViewJob={handleViewJob}
            />
          </motion.div>
        ))
      ) : (
        data.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <ApplicationCard 
              application={item} 
              job={jobDetails[item.jobId]} 
              onViewJob={handleViewJob}
              getStatusColor={getStatusColor}
            />
          </motion.div>
        ))
      )}
    </div>
  );
};

export default DashboardJobListing;