import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import Modal from '@/components/molecules/Modal';
import FormField from '@/components/molecules/FormField';
import Button from '@/components/atoms/Button';
import Loader from '@/components/atoms/Loader';
import { resumeService } from '@/services';
import { useNavigate } from 'react-router-dom';

const ApplicationFormModal = ({ job, isOpen, onClose, onSubmit }) => {
  const navigate = useNavigate();
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
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Apply to ${job?.title}`}
      description={job?.company}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Select Resume *
          </label>
          {resumes.length === 0 ? (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <ApperIcon name="FileText" className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">No resumes uploaded</p>
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  onClose();
                  navigate('/resumes');
                }}
              >
                Upload Resume
              </Button>
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
                      {resume.isPrimary &amp;&amp; (
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

        <FormField
          label="Cover Letter (Optional)"
          type="textarea"
          rows={6}
          value={coverLetter}
          onChange={(e) => setCoverLetter(e.target.value)}
          placeholder="Tell the employer why you're interested in this position and what makes you a great fit..."
        >
          <p className="text-sm text-gray-500 mt-1">
            {coverLetter.length}/1000 characters
          </p>
        </FormField>

        <div className="flex items-center justify-end space-x-4 pt-4 border-t border-gray-200">
          <Button
            type="button"
            variant="ghost"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="secondary"
            disabled={loading || !selectedResumeId}
            className="px-6 py-2"
          >
            {loading ? (
              <div className="flex items-center">
                <Loader size="sm" color="white" className="mr-2" />
                Submitting...
              </div>
            ) : (
              'Submit Application'
            )}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ApplicationFormModal;