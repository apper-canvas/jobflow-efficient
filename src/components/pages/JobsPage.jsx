import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import JobSearchForm from '@/components/organisms/JobSearchForm';
import JobListings from '@/components/organisms/JobListings';
import ErrorState from '@/components/organisms/ErrorState';
import Loader from '@/components/atoms/Loader';
import { jobService } from '@/services';

const JobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({});
  const [pagination, setPagination] = useState({});

  const loadJobs = async (searchFilters = {}) => {
    setLoading(true);
    setError(null);
    try {
      const result = await jobService.getAll(searchFilters);
      setJobs(result.jobs);
      setPagination({
        total: result.total,
        page: result.page,
        totalPages: result.totalPages
      });
    } catch (err) {
      setError(err.message || 'Failed to load jobs');
      toast.error('Failed to load jobs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  const handleSearch = (searchFilters) => {
    setFilters(searchFilters);
    loadJobs(searchFilters);
  };

  const handleSaveJob = async (jobId) => {
    try {
      // Mock save functionality
      toast.success('Job saved successfully!');
    } catch (err) {
      toast.error('Failed to save job');
    }
  };

  const handleApplyJob = async (job) => {
    try {
      // Mock apply functionality
      toast.success(`Applied to ${job.title} at ${job.company}!`);
    } catch (err) {
      toast.error('Failed to apply to job');
    }
  };

  if (loading &amp;&amp; jobs.length === 0) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse">
            <div className="h-6 bg-gray-200 rounded mb-4"></div>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-3">
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="h-6 bg-gray-200 rounded w-2/3 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                  </div>
                  <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                </div>
                <div className="h-12 bg-gray-200 rounded mb-4"></div>
                <div className="flex justify-between items-center">
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-8 bg-gray-200 rounded w-24"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <ErrorState 
        title="Failed to Load Jobs" 
        message={error} 
        onRetry={() => loadJobs(filters)} 
      />
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="lg:col-span-1">
        <JobSearchForm
          filters={filters}
          onFiltersChange={setFilters}
          onSearch={handleSearch}
        />
      </div>

      <div className="lg:col-span-3">
        <JobListings
          jobs={jobs}
          pagination={pagination}
          loading={loading}
          filters={filters}
          onSaveJob={handleSaveJob}
          onApplyJob={handleApplyJob}
          onSearch={handleSearch}
        />
      </div>
    </div>
  );
};

export default JobsPage;