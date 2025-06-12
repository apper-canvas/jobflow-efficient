import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '../components/ApperIcon';
import { resumeService } from '../services';

const Resumes = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    loadResumes();
  }, []);

  const loadResumes = async () => {
    setLoading(true);
    setError(null);
    try {
      const resumeList = await resumeService.getAll();
      setResumes(resumeList);
    } catch (err) {
      setError(err.message || 'Failed to load resumes');
      toast.error('Failed to load resumes');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (files) => {
    const file = files[0];
    if (!file) return;

    // Validate file type
    if (file.type !== 'application/pdf') {
      toast.error('Please upload PDF files only');
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB');
      return;
    }

    setUploading(true);
    try {
      const newResume = await resumeService.upload(file);
      setResumes(prev => [newResume, ...prev]);
      toast.success('Resume uploaded successfully!');
    } catch (err) {
      toast.error('Failed to upload resume');
    } finally {
      setUploading(false);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files);
    }
  };

  const handleSetPrimary = async (resumeId) => {
    try {
      const updatedResume = await resumeService.setPrimary(resumeId);
      setResumes(prev => prev.map(resume => ({
        ...resume,
        isPrimary: resume.id === resumeId
      })));
      toast.success('Primary resume updated');
    } catch (err) {
      toast.error('Failed to set primary resume');
    }
  };

  const handleDeleteResume = async (resumeId) => {
    try {
      await resumeService.delete(resumeId);
      setResumes(prev => prev.filter(resume => resume.id !== resumeId));
      toast.success('Resume deleted');
    } catch (err) {
      toast.error('Failed to delete resume');
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          
          <div className="bg-white border border-gray-200 rounded-lg p-8">
            <div className="h-32 bg-gray-200 rounded-lg mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
          </div>

          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-48"></div>
                      <div className="h-3 bg-gray-200 rounded w-32"></div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <div className="w-20 h-8 bg-gray-200 rounded"></div>
                    <div className="w-8 h-8 bg-gray-200 rounded"></div>
                  </div>
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
      <div className="max-w-4xl mx-auto text-center py-12">
        <ApperIcon name="AlertCircle" className="w-16 h-16 text-red-300 mx-auto mb-4" />
        <h1 className="text-2xl font-display font-bold text-gray-900 mb-2">Failed to Load Resumes</h1>
        <p className="text-gray-600 mb-8">{error}</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={loadResumes}
          className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
        >
          Try Again
        </motion.button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display font-bold text-3xl text-gray-900 mb-2">Resume Management</h1>
        <p className="text-gray-600">Upload and manage your resumes for job applications</p>
      </div>

      {/* Upload Area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`bg-white border-2 border-dashed rounded-lg p-8 text-center transition-all ${
          dragActive 
            ? 'border-primary bg-primary/5 scale-105' 
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          onChange={(e) => handleFileUpload(e.target.files)}
          className="hidden"
        />
        
        {uploading ? (
          <div className="space-y-4">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-gray-600">Uploading resume...</p>
          </div>
        ) : (
          <div className="space-y-4">
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <ApperIcon name="Upload" className="w-16 h-16 text-gray-400 mx-auto" />
            </motion.div>
            <div>
              <p className="text-lg font-medium text-gray-900 mb-2">
                Drag and drop your resume here
              </p>
              <p className="text-gray-600 mb-4">or</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => fileInputRef.current?.click()}
                className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Browse Files
              </motion.button>
            </div>
            <p className="text-sm text-gray-500">
              PDF files only, max 5MB
            </p>
          </div>
        )}
      </motion.div>

      {/* Resume List */}
      <div className="space-y-4">
        <h2 className="font-display font-semibold text-xl text-gray-900">
          Your Resumes ({resumes.length})
        </h2>

        {resumes.length === 0 ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center py-12 bg-white rounded-lg border border-gray-200"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
            >
              <ApperIcon name="FileText" className="w-16 h-16 text-gray-300 mx-auto" />
            </motion.div>
            <h3 className="mt-4 text-lg font-medium">No resumes uploaded yet</h3>
            <p className="mt-2 text-gray-500">Upload your first resume to get started</p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence>
              {resumes.map((resume, index) => (
                <motion.div
                  key={resume.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                        <ApperIcon name="FileText" className="w-6 h-6 text-red-600" />
                      </div>
                      
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-display font-semibold text-lg text-gray-900">
                            {resume.filename}
                          </h3>
                          {resume.isPrimary && (
                            <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                              Primary
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>
                            Uploaded {new Date(resume.uploadDate).toLocaleDateString()}
                          </span>
                          {resume.size && (
                            <span>{formatFileSize(resume.size)}</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      {!resume.isPrimary && (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleSetPrimary(resume.id)}
                          className="px-4 py-2 text-primary border border-primary rounded-lg hover:bg-primary/10 transition-colors text-sm font-medium"
                        >
                          Set Primary
                        </motion.button>
                      )}
                      
                      <button
                        onClick={() => window.open(resume.fileUrl, '_blank')}
                        className="p-2 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                        title="Preview"
                      >
                        <ApperIcon name="Eye" className="w-5 h-5" />
                      </button>
                      
                      <button
                        onClick={() => {
                          const link = document.createElement('a');
                          link.href = resume.fileUrl;
                          link.download = resume.filename;
                          link.click();
                        }}
                        className="p-2 text-gray-400 hover:text-accent hover:bg-accent/10 rounded-lg transition-colors"
                        title="Download"
                      >
                        <ApperIcon name="Download" className="w-5 h-5" />
                      </button>
                      
                      <button
                        onClick={() => handleDeleteResume(resume.id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <ApperIcon name="Trash2" className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Tips Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-blue-50 border border-blue-200 rounded-lg p-6"
      >
        <div className="flex items-start space-x-3">
          <ApperIcon name="Lightbulb" className="w-6 h-6 text-blue-600 mt-0.5" />
          <div>
            <h3 className="font-display font-semibold text-blue-900 mb-2">Resume Tips</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Keep your resume updated with your latest experience and skills</li>
              <li>• Tailor different versions for different types of jobs</li>
              <li>• Use your primary resume for quick applications</li>
              <li>• Ensure your PDF is readable and properly formatted</li>
              <li>• Keep file names professional (e.g., "John_Doe_Resume_2024.pdf")</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Resumes;