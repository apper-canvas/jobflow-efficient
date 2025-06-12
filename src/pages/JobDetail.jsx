import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '../components/ApperIcon';
import { jobService, resumeService, applicationService, savedJobService } from '../services';

const ApplicationModal = ({ job, isOpen, onClose, onSubmit }) => {
  const [resumes, setResumes] = useState([]);
  const [selectedResumeId, setSelectedResumeId] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadResumes();
    }
  }, [isOpen]);

  const loadResumes = async () => {
    try {
      const resumeList = await resumeService.getAll();
      setResumes(resumeList);
      // Auto-select primary resume
      const primaryResume = resumeList.find(r => r.isPrimary);
      if (primaryResume) {
        setSelectedResumeId(primaryResume.id);
      }
    } catch (err) {
      toast.error('Failed to load resumes');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedResumeId) {
      toast.error('Please select a resume');
      return;
    }

    setLoading(true);
    try {
      await onSubmit({
        jobId: job.id,
        resumeId: selectedResumeId,
        coverLetter
      });
      onClose();
    } catch (err) {
      // Error handled by parent
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="font-display font-bold text-xl text-gray-900">
                    Apply to {job?.title}
                  </h2>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <ApperIcon name="X" className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-gray-600 mt-1">{job?.company}</p>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Resume Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Select Resume *
                  </label>
                  {resumes.length === 0 ? (
                    <div className="text-center py-8 bg-gray-50 rounded-lg">
                      <ApperIcon name="FileText" className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-600 mb-4">No resumes uploaded</p>
                      <button
                        type="button"
                        className="text-primary hover:text-primary/80 font-medium"
                        onClick={() => {
                          onClose();
                          // Navigate to resumes page
                        }}
                      >
                        Upload Resume
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {resumes.map((resume) => (
                        <label
                          key={resume.id}
                          className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                            selectedResumeId === resume.id
                              ? 'border-primary bg-primary/5'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <input
                            type="radio"
                            name="resume"
                            value={resume.id}
                            checked={selectedResumeId === resume.id}
                            onChange={(e) => setSelectedResumeId(e.target.value)}
                            className="mr-3"
                          />
                          <div className="flex-1">
                            <div className="flex items-center">
                              <ApperIcon name="FileText" className="w-5 h-5 text-gray-400 mr-2" />
                              <span className="font-medium text-gray-900">
                                {resume.filename}
                              </span>
                              {resume.isPrimary && (
                                <span className="ml-2 px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                                  Primary
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-500 mt-1">
                              Uploaded {new Date(resume.uploadDate).toLocaleDateString()}
                            </p>
                          </div>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* Cover Letter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cover Letter (Optional)
                  </label>
                  <textarea
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                    placeholder="Tell the employer why you're interested in this position and what makes you a great fit..."
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    {coverLetter.length}/1000 characters
                  </p>
                </div>

                {/* Submit Button */}
                <div className="flex items-center justify-end space-x-4 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={loading || !selectedResumeId}
                    className="px-6 py-2 bg-accent text-white font-medium rounded-lg hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {loading ? (
                      <div className="flex items-center">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Submitting...
                      </div>
                    ) : (
                      'Submit Application'
                    )}
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const JobDetail = () => {
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
      <div className="max-w-4xl mx-auto text-center py-12">
        <ApperIcon name="AlertCircle" className="w-16 h-16 text-red-300 mx-auto mb-4" />
        <h1 className="text-2xl font-display font-bold text-gray-900 mb-2">Job Not Found</h1>
        <p className="text-gray-600 mb-8">{error}</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/jobs')}
          className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
        >
          Back to Jobs
        </motion.button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      {/* Back Button */}
      <button
        onClick={() => navigate('/jobs')}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
      >
        <ApperIcon name="ArrowLeft" className="w-4 h-4 mr-2" />
        Back to Jobs
      </button>

      {/* Job Header */}
      <div className="bg-white rounded-lg border border-gray-200 p-8 mb-8">
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <h1 className="font-display font-bold text-3xl text-gray-900 mb-2">
              {job.title}
            </h1>
            <p className="text-xl text-primary font-semibold mb-4">{job.company}</p>
            <div className="flex flex-wrap items-center gap-4 text-gray-600">
              <div className="flex items-center">
                <ApperIcon name="MapPin" className="w-4 h-4 mr-2" />
                {job.location}
              </div>
              <div className="flex items-center">
                <ApperIcon name="DollarSign" className="w-4 h-4 mr-2" />
                {job.salary}
              </div>
              <div className="flex items-center">
                <ApperIcon name="Clock" className="w-4 h-4 mr-2" />
                {job.type}
              </div>
              <div className="flex items-center">
                <ApperIcon name="User" className="w-4 h-4 mr-2" />
                {job.experience}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSaveJob}
              disabled={actionLoading.save}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg border font-medium transition-all ${
                isSaved
                  ? 'border-accent text-accent bg-accent/10 hover:bg-accent/20'
                  : 'border-gray-300 text-gray-700 hover:border-gray-400'
              }`}
            >
              {actionLoading.save ? (
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <ApperIcon 
                  name="Heart" 
                  className="w-4 h-4" 
                  fill={isSaved ? "currentColor" : "none"} 
                />
              )}
              <span>{isSaved ? 'Saved' : 'Save Job'}</span>
            </motion.button>

            {hasApplied ? (
              <div className="flex items-center space-x-2 px-4 py-2 bg-green-100 text-green-800 rounded-lg">
                <ApperIcon name="Check" className="w-4 h-4" />
                <span className="font-medium">Applied</span>
              </div>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowApplicationModal(true)}
                className="flex items-center space-x-2 px-6 py-2 bg-accent text-white rounded-lg font-medium hover:bg-accent/90 transition-colors"
              >
                <ApperIcon name="Send" className="w-4 h-4" />
                <span>Apply Now</span>
              </motion.button>
            )}
          </div>
        </div>

        <div className="flex items-center text-sm text-gray-500">
          <ApperIcon name="Calendar" className="w-4 h-4 mr-2" />
          Posted {new Date(job.postedDate).toLocaleDateString()}
        </div>
      </div>

      {/* Job Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Job Description */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="font-display font-semibold text-xl text-gray-900 mb-4">
              Job Description
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed">{job.description}</p>
            </div>
          </div>

          {/* Requirements */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="font-display font-semibold text-xl text-gray-900 mb-4">
              Requirements
            </h2>
            <ul className="space-y-3">
              {job.requirements.map((requirement, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start"
                >
                  <ApperIcon name="Check" className="w-5 h-5 text-accent mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{requirement}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Company Info */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="font-display font-semibold text-lg text-gray-900 mb-4">
              About {job.company}
            </h3>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-center">
                <ApperIcon name="Building2" className="w-4 h-4 mr-3 text-gray-400" />
                Technology Company
              </div>
              <div className="flex items-center">
                <ApperIcon name="Users" className="w-4 h-4 mr-3 text-gray-400" />
                500-1000 employees
              </div>
              <div className="flex items-center">
                <ApperIcon name="MapPin" className="w-4 h-4 mr-3 text-gray-400" />
                {job.location}
              </div>
              <div className="flex items-center">
                <ApperIcon name="Globe" className="w-4 h-4 mr-3 text-gray-400" />
                www.{job.company.toLowerCase().replace(/\s+/g, '')}.com
              </div>
            </div>
          </div>

          {/* Job Stats */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="font-display font-semibold text-lg text-gray-900 mb-4">
              Job Details
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Job Type</span>
                <span className="font-medium capitalize">{job.type}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Experience</span>
                <span className="font-medium capitalize">{job.experience}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Salary Range</span>
                <span className="font-medium">{job.salary}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Posted</span>
                <span className="font-medium">
                  {new Date(job.postedDate).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          {/* Similar Jobs */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="font-display font-semibold text-lg text-gray-900 mb-4">
              Similar Jobs
            </h3>
            <div className="space-y-3">
              {/* Mock similar jobs */}
              {['Frontend Developer', 'React Developer', 'Full Stack Developer'].map((title, index) => (
                <div key={index} className="text-sm">
                  <p className="font-medium text-gray-900 hover:text-primary cursor-pointer">
                    {title}
                  </p>
                  <p className="text-gray-500">TechCorp • $90k-$120k</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Application Modal */}
      <ApplicationModal
        job={job}
        isOpen={showApplicationModal}
        onClose={() => setShowApplicationModal(false)}
        onSubmit={handleApplyJob}
      />
    </motion.div>
  );
};

export default JobDetail;