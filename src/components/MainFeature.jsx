import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from './ApperIcon';
import { jobService } from '../services';

const JobCard = ({ job, onView, onSave, onApply, isSaved, hasApplied }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSave = async (e) => {
    e.stopPropagation();
    setIsAnimating(true);
    await onSave(job.id);
    setTimeout(() => setIsAnimating(false), 600);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white rounded-lg border border-gray-200 p-6 cursor-pointer hover:shadow-md transition-all duration-200"
      onClick={() => onView(job)}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="font-display font-semibold text-lg text-gray-900 mb-1">
            {job.title}
          </h3>
          <p className="text-primary font-medium mb-2">{job.company}</p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={isAnimating ? { scale: [1, 1.3, 1], rotate: [0, 360, 0] } : {}}
          onClick={handleSave}
          className={`p-2 rounded-full transition-colors ${
            isSaved 
              ? 'text-accent bg-accent/10 hover:bg-accent/20' 
              : 'text-gray-400 hover:text-accent hover:bg-accent/10'
          }`}
        >
          <ApperIcon name={isSaved ? "Heart" : "Heart"} className="w-5 h-5" fill={isSaved ? "currentColor" : "none"} />
        </motion.button>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <ApperIcon name="MapPin" className="w-4 h-4 mr-2" />
          {job.location}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <ApperIcon name="DollarSign" className="w-4 h-4 mr-2" />
          {job.salary}
        </div>
        <div className="flex items-center space-x-4">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
            {job.type}
          </span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {job.experience}
          </span>
        </div>
      </div>

      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
        {job.description}
      </p>

      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">
          Posted {new Date(job.postedDate).toLocaleDateString()}
        </span>
        
        {hasApplied ? (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <ApperIcon name="Check" className="w-3 h-3 mr-1" />
            Applied
          </span>
        ) : (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              onApply(job);
            }}
            className="px-4 py-2 bg-accent text-white text-sm font-medium rounded-lg hover:bg-accent/90 transition-colors"
          >
            Quick Apply
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

const SearchFilters = ({ filters, onFiltersChange, onSearch }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleFilterChange = (key, value) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="font-display font-semibold text-lg text-gray-900 mb-4">Filters</h3>
      
      <div className="space-y-4">
        {/* Keyword Search */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Keywords
          </label>
          <div className="relative">
            <ApperIcon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Job title, company, skills..."
              value={localFilters.keyword || ''}
              onChange={(e) => handleFilterChange('keyword', e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <div className="relative">
            <ApperIcon name="MapPin" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="City, state, or remote"
              value={localFilters.location || ''}
              onChange={(e) => handleFilterChange('location', e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>

        {/* Job Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Job Type
          </label>
          <select
            value={localFilters.type || 'all'}
            onChange={(e) => handleFilterChange('type', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="all">All Types</option>
            <option value="full-time">Full Time</option>
            <option value="part-time">Part Time</option>
            <option value="contract">Contract</option>
            <option value="remote">Remote</option>
          </select>
        </div>

        {/* Experience Level */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Experience Level
          </label>
          <select
            value={localFilters.experience || 'all'}
            onChange={(e) => handleFilterChange('experience', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="all">All Levels</option>
            <option value="entry">Entry Level</option>
            <option value="mid-level">Mid Level</option>
            <option value="senior">Senior Level</option>
            <option value="executive">Executive</option>
          </select>
        </div>

        {/* Min Salary */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Minimum Salary
          </label>
          <input
            type="number"
            placeholder="50000"
            value={localFilters.minSalary || ''}
            onChange={(e) => handleFilterChange('minSalary', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSearch(localFilters)}
          className="w-full bg-primary text-white py-2 px-4 rounded-lg font-medium hover:bg-primary/90 transition-colors"
        >
          Search Jobs
        </motion.button>
      </div>
    </div>
  );
};

const MainFeature = () => {
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

  const handleViewJob = (job) => {
    // This would navigate to job detail page
    console.log('View job:', job);
  };

  if (loading && jobs.length === 0) {
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
      <div className="text-center py-12">
        <ApperIcon name="AlertCircle" className="w-16 h-16 text-red-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Failed to load jobs</h3>
        <p className="text-gray-500 mb-4">{error}</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => loadJobs(filters)}
          className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
        >
          Try Again
        </motion.button>
      </div>
    );
  }

  if (jobs.length === 0 && !loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <SearchFilters
            filters={filters}
            onFiltersChange={setFilters}
            onSearch={handleSearch}
          />
        </div>
        
        <div className="lg:col-span-3">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center py-12"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
            >
              <ApperIcon name="Search" className="w-16 h-16 text-gray-300 mx-auto" />
            </motion.div>
            <h3 className="mt-4 text-lg font-medium">No jobs found</h3>
            <p className="mt-2 text-gray-500">Try adjusting your search filters to find more opportunities</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSearch({})}
              className="mt-4 px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Clear Filters
            </motion.button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Filters Sidebar */}
      <div className="lg:col-span-1">
        <SearchFilters
          filters={filters}
          onFiltersChange={setFilters}
          onSearch={handleSearch}
        />
      </div>

      {/* Job Listings */}
      <div className="lg:col-span-3">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-display font-bold text-2xl text-gray-900">
              Job Opportunities
            </h2>
            <p className="text-gray-600 mt-1">
              {pagination.total} jobs found
            </p>
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
                onView={handleViewJob}
                onSave={handleSaveJob}
                onApply={handleApplyJob}
                isSaved={false} // This would come from saved jobs service
                hasApplied={false} // This would come from applications service
              />
            </motion.div>
          ))}
        </div>

        {loading && jobs.length > 0 && (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainFeature;