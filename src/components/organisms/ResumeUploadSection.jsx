import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Heading from '@/components/atoms/Heading';
import Paragraph from '@/components/atoms/Paragraph';
import Button from '@/components/atoms/Button';
import Loader from '@/components/atoms/Loader';

const ResumeUploadSection = ({ onFileUpload, uploading }) => {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

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
      onFileUpload(e.dataTransfer.files);
    }
  };

  return (
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
        onChange={(e) => onFileUpload(e.target.files)}
        className="hidden"
      />
      
      {uploading ? (
        <div className="space-y-4">
          <Loader size="lg" color="primary" className="mx-auto" />
          <Paragraph>Uploading resume...</Paragraph>
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
            <Heading level={2} className="text-lg font-medium mb-2">
              Drag and drop your resume here
            </Heading>
            <Paragraph className="mb-4">or</Paragraph>
            <Button
              className="px-6 py-3"
              onClick={() => fileInputRef.current?.click()}
            >
              Browse Files
            </Button>
          </div>
          <Paragraph className="text-sm text-gray-500">
            PDF files only, max 5MB
          </Paragraph>
        </div>
      )}
    </motion.div>
  );
};

export default ResumeUploadSection;