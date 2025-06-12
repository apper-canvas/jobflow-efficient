import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Heading from '@/components/atoms/Heading';
import Paragraph from '@/components/atoms/Paragraph';
import Loader from '@/components/atoms/Loader';
import ErrorState from '@/components/organisms/ErrorState';
import DashboardStats from '@/components/organisms/DashboardStats';
import DashboardContentTabs from '@/components/organisms/DashboardContentTabs';
import DashboardJobListing from '@/components/organisms/DashboardJobListing';
import { savedJobService, applicationService, jobService } from '@/services';

const DashboardPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('saved');
  const [savedJobs, setSavedJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [jobDetails, setJobDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [savedJobsData, applicationsData] = await Promise.all([
        savedJobService.getAll(),
        applicationService.getAll()
      ]);

      setSavedJobs(savedJobsData);
      setApplications(applicationsData);

      const allJobIds = [
        ...savedJobsData.map(sj => sj.jobId),
        ...applicationsData.map(app => app.jobId)
      ];
      const uniqueJobIds = [...new Set(allJobIds)];
      
      const jobDetailsMap = {};
      await Promise.all(
        uniqueJobIds.map(async (jobId) => {
          try {
            const job = await jobService.getById(jobId);
            jobDetailsMap[jobId] = job;
          } catch (err) {
            console.warn(`Failed to load job ${jobId}:`, err);
          }
        })
      );
      setJobDetails(jobDetailsMap);
    } catch (err) {
      setError(err.message || 'Failed to load dashboard data');
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveSavedJob = async (savedJobId) => {
    try {
      await savedJobService.delete(savedJobId);
      setSavedJobs(prev => prev.filter(sj => sj.id !== savedJobId));
      toast.success('Job removed from saved list');
    } catch (err) {
      toast.error('Failed to remove saved job');
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          
          <div className="flex space-x-8 mb-8">
            <div className="h-10 bg-gray-200 rounded w-32"></div>
            <div className="h-10 bg-gray-200 rounded w-32"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="h-6 bg-gray-200 rounded w-2/3 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/3 mb-3"></div>
                    <div className="flex space-x-4">
                      <div className="h-4 bg-gray-200 rounded w-24"></div>
                      <div className="h-4 bg-gray-200 rounded w-24"></div>
                    </div>
                  </div>
                  <div className="h-6 bg-gray-200 rounded w-16"></div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                  <div className="h-8 bg-gray-200 rounded w-24"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <ErrorState 
        title="Failed to Load Dashboard" 
        message={error} 
        onRetry={loadData} 
      />
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <Heading level={1} className="text-3xl mb-2">Dashboard</Heading>
        <Paragraph>Track your saved jobs and application progress</Paragraph>
      </div>

      <DashboardStats
        savedJobsCount={savedJobs.length}
        applicationsCount={applications.length}
        interviewsCount={applications.filter(app => app.status === 'interview').length}
      />

      <DashboardContentTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        savedJobsCount={savedJobs.length}
        applicationsCount={applications.length}
      >
        {activeTab === 'saved' ? (
          <DashboardJobListing
            type="saved"
            data={savedJobs}
            jobDetails={jobDetails}
            onRemoveSavedJob={handleRemoveSavedJob}
          />
        ) : (
          <DashboardJobListing
            type="applications"
            data={applications}
            jobDetails={jobDetails}
          />
        )}
      </DashboardContentTabs>
    </div>
  );
};

export default DashboardPage;