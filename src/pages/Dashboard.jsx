import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import ApperIcon from '../components/ApperIcon';
import { savedJobService, applicationService, jobService } from '../services';

const Dashboard = () => {
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

      // Load job details for all jobs
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

  const handleViewJob = (jobId) => {
    navigate(`/jobs/${jobId}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'applied':
        return 'bg-blue-100 text-blue-800';
      case 'viewed':
        return 'bg-yellow-100 text-yellow-800';
      case 'interview':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const SavedJobCard = ({ savedJob, job }) => (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all duration-200"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="font-display font-semibold text-lg text-gray-900 mb-1">
            {job?.title || 'Loading...'}
          </h3>
          <p className="text-primary font-medium mb-2">{job?.company}</p>
          {job && (
            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
              <div className="flex items-center">
                <ApperIcon name="MapPin" className="w-4 h-4 mr-1" />
                {job.location}
              </div>
              <div className="flex items-center">
                <ApperIcon name="DollarSign" className="w-4 h-4 mr-1" />
                {job.salary}
              </div>
            </div>
          )}
        </div>
        
        <button
          onClick={() => handleRemoveSavedJob(savedJob.id)}
          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
        >
          <ApperIcon name="X" className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">
          Saved {new Date(savedJob.savedDate).toLocaleDateString()}
        </span>
        
        <div className="flex space-x-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleViewJob(savedJob.jobId)}
            className="px-4 py-2 text-primary border border-primary rounded-lg hover:bg-primary/10 transition-colors text-sm font-medium"
          >
            View Details
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleViewJob(savedJob.jobId)}
            className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors text-sm font-medium"
          >
            Apply Now
          </motion.button>
        </div>
      </div>
    </motion.div>
  );

  const ApplicationCard = ({ application, job }) => (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all duration-200"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="font-display font-semibold text-lg text-gray-900 mb-1">
            {job?.title || 'Loading...'}
          </h3>
          <p className="text-primary font-medium mb-2">{job?.company}</p>
          {job && (
            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
              <div className="flex items-center">
                <ApperIcon name="MapPin" className="w-4 h-4 mr-1" />
                {job.location}
              </div>
              <div className="flex items-center">
                <ApperIcon name="DollarSign" className="w-4 h-4 mr-1" />
                {job.salary}
              </div>
            </div>
          )}
        </div>
        
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
          {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
        </span>
      </div>

      {application.coverLetter && (
        <div className="mb-4">
          <p className="text-sm text-gray-600 line-clamp-2">
            {application.coverLetter}
          </p>
        </div>
      )}

      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">
          Applied {new Date(application.appliedDate).toLocaleDateString()}
        </span>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleViewJob(application.jobId)}
          className="px-4 py-2 text-primary border border-primary rounded-lg hover:bg-primary/10 transition-colors text-sm font-medium"
        >
          View Job
        </motion.button>
      </div>
    </motion.div>
  );

  const EmptyState = ({ type }) => (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="text-center py-12"
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 3 }}
      >
        <ApperIcon 
          name={type === 'saved' ? "Bookmark" : "Send"} 
          className="w-16 h-16 text-gray-300 mx-auto" 
        />
      </motion.div>
      <h3 className="mt-4 text-lg font-medium">
        {type === 'saved' ? 'No saved jobs yet' : 'No applications yet'}
      </h3>
      <p className="mt-2 text-gray-500 max-w-md mx-auto">
        {type === 'saved' 
          ? 'Save jobs you\'re interested in to easily find them later'
          : 'Start applying to jobs to track your application status here'
        }
      </p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate('/jobs')}
        className="mt-4 px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
      >
        Browse Jobs
      </motion.button>
    </motion.div>
  );

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
      <div className="max-w-6xl mx-auto text-center py-12">
        <ApperIcon name="AlertCircle" className="w-16 h-16 text-red-300 mx-auto mb-4" />
        <h1 className="text-2xl font-display font-bold text-gray-900 mb-2">Failed to Load Dashboard</h1>
        <p className="text-gray-600 mb-8">{error}</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={loadData}
          className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
        >
          Try Again
        </motion.button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display font-bold text-3xl text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Track your saved jobs and application progress</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white border border-gray-200 rounded-lg p-6"
        >
          <div className="flex items-center">
            <div className="p-3 bg-primary/10 rounded-lg">
              <ApperIcon name="Bookmark" className="w-6 h-6 text-primary" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{savedJobs.length}</p>
              <p className="text-gray-600">Saved Jobs</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white border border-gray-200 rounded-lg p-6"
        >
          <div className="flex items-center">
            <div className="p-3 bg-accent/10 rounded-lg">
              <ApperIcon name="Send" className="w-6 h-6 text-accent" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{applications.length}</p>
              <p className="text-gray-600">Applications</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white border border-gray-200 rounded-lg p-6"
        >
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <ApperIcon name="Calendar" className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">
                {applications.filter(app => app.status === 'interview').length}
              </p>
              <p className="text-gray-600">Interviews</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 mb-8">
        {[
          { id: 'saved', label: 'Saved Jobs', count: savedJobs.length },
          { id: 'applications', label: 'Applications', count: applications.length }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 text-sm font-medium rounded-lg transition-colors ${
              activeTab === tab.id
                ? 'bg-primary text-white'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'saved' ? (
          savedJobs.length === 0 ? (
            <EmptyState type="saved" />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {savedJobs.map((savedJob, index) => (
                <motion.div
                  key={savedJob.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <SavedJobCard 
                    savedJob={savedJob} 
                    job={jobDetails[savedJob.jobId]} 
                  />
                </motion.div>
              ))}
            </div>
          )
        ) : (
          applications.length === 0 ? (
            <EmptyState type="applications" />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {applications.map((application, index) => (
                <motion.div
                  key={application.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ApplicationCard 
                    application={application} 
                    job={jobDetails[application.jobId]} 
                  />
                </motion.div>
              ))}
            </div>
          )
        )}
      </motion.div>
    </div>
  );
};

export default Dashboard;