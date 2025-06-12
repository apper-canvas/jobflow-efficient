import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import Heading from '@/components/atoms/Heading';
import Paragraph from '@/components/atoms/Paragraph';
import ResumeUploadSection from '@/components/organisms/ResumeUploadSection';
import ResumeListSection from '@/components/organisms/ResumeListSection';
import ResumeTipsCard from '@/components/organisms/ResumeTipsCard';
import Loader from '@/components/atoms/Loader';
import ErrorState from '@/components/organisms/ErrorState';
import { resumeService } from '@/services';

const ResumesPage = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);

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

    if (file.type !== 'application/pdf') {
      toast.error('Please upload PDF files only');
      return;
    }

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
      <ErrorState 
        title="Failed to Load Resumes" 
        message={error} 
        onRetry={loadResumes} 
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <Heading level={1} className="text-3xl mb-2">Resume Management</Heading>
        <Paragraph>Upload and manage your resumes for job applications</Paragraph>
      </div>

      <ResumeUploadSection onFileUpload={handleFileUpload} uploading={uploading} />
      
      <ResumeListSection
        resumes={resumes}
        onSetPrimary={handleSetPrimary}
        onDeleteResume={handleDeleteResume}
        formatFileSize={formatFileSize}
      />

      <ResumeTipsCard />
    </div>
  );
};

export default ResumesPage;