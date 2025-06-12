import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import JobDetailHeader from '@/components/organisms/JobDetailHeader';
import JobDescriptionSection from '@/components/organisms/JobDescriptionSection';
import JobRequirementsSection from '@/components/organisms/JobRequirementsSection';
import CompanyInfoCard from '@/components/organisms/CompanyInfoCard';
import JobDetailsCard from '@/components/organisms/JobDetailsCard';
import SimilarJobsCard from '@/components/organisms/SimilarJobsCard';
import ApplicationFormModal from '@/components/organisms/ApplicationFormModal';
import Loader from '@/components/atoms/Loader';
import ErrorState from '@/components/organisms/ErrorState';
import { jobService, resumeService, applicationService, savedJobService } from '@/services';
import Button from '@/components/atoms/Button';

const JobDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [actionLoading, setActionLoading] = useState({});

  useEffect(() => {
    loadJobDetail();
    checkJobStatus();
  }, [id]);

  const loadJobDetail = async () => {
    setLoading(true);
    setError(null);
    try {
      const jobData = await jobService.getById(id);
      setJob(jobData);
    } catch (err) {
      setError(err.message || 'Failed to load job details');
    } finally {
      setLoading(false);
    }
  };

  const checkJobStatus = async () => {
    try {
      const [savedStatus, applicationStatus] = await Promise.all([
        savedJobService.isJobSaved(id),
        applicationService.getByJobId(id)
      ]);
      setIsSaved(savedStatus);
      setHasApplied(!!applicationStatus);
    } catch (err) {
      // Silent fail for status checks
    }
  };

  const handleSaveJob = async () => {
    setActionLoading(prev => ({ ...prev, save: true }));
    try {
      if (isSaved) {
        await savedJobService.deleteByJobId(id);
        setIsSaved(false);
        toast.success('Job removed from saved list');
      } else {
        await savedJobService.create(id);
        setIsSaved(true);
        toast.success('Job saved successfully!');
      }
    } catch (err) {
      toast.error(err.message || 'Failed to save job');
    } finally {
      setActionLoading(prev => ({ ...prev, save: false }));
    }
  };

  const handleApplyJob = async (applicationData) => {
    try {
      await applicationService.create(applicationData);
      setHasApplied(true);
      toast.success(`Applied to ${job.title} successfully!`);
    } catch (err) {
      toast.error('Failed to submit application');
      throw err;
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="animate-pulse">
          {/* Header skeleton */}
          <div className="bg-white rounded-lg border border-gray-200 p-8 mb-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <div className="h-8 bg-gray-200 rounded w-2/3 mb-3"></div>
                <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                </div>
              </div>
              <div className="flex space-x-3">
                <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
                <div className="w-24 h-10 bg-gray-200 rounded-lg"></div>
              </div>
            </div>
          </div>

          {/* Content skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
                <div className="space-y-3">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-4 bg-gray-200 rounded"></div>
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="space-y-3">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-4 bg-gray-200 rounded"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <ErrorState 
        title="Job Not Found" 
        message={error} 
        onRetry={() => navigate('/jobs')} 
        retryButtonText="Back to Jobs" 
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      <Button
        variant="ghost"
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6 px-0"
        onClick={() => navigate('/jobs')}
      >
        <ApperIcon name="ArrowLeft" className="w-4 h-4 mr-2" />
        Back to Jobs
      </Button>

      <JobDetailHeader
        job={job}
        isSaved={isSaved}
        hasApplied={hasApplied}
        onSaveJob={handleSaveJob}
        onApplyClick={() => setShowApplicationModal(true)}
        actionLoading={actionLoading}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <JobDescriptionSection description={job.description} />
          <JobRequirementsSection requirements={job.requirements} />
        </div>

        <div className="space-y-6">
          <CompanyInfoCard companyName={job.company} location={job.location} />
          <JobDetailsCard
            type={job.type}
            experience={job.experience}
            salary={job.salary}
            postedDate={job.postedDate}
          />
          <SimilarJobsCard />
        </div>
      </div>

      <ApplicationFormModal
        job={job}
        isOpen={showApplicationModal}
        onClose={() => setShowApplicationModal(false)}
        onSubmit={handleApplyJob}
      />
    </motion.div>
  );
};

export default JobDetailPage;