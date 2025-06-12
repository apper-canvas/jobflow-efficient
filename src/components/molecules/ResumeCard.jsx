import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Heading from '@/components/atoms/Heading';
import Paragraph from '@/components/atoms/Paragraph';
import Pill from '@/components/atoms/Pill';
import Button from '@/components/atoms/Button';

const ResumeCard = ({ resume, onSetPrimary, onDelete, formatFileSize }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
            <ApperIcon name="FileText" className="w-6 h-6 text-red-600" />
          </div>
          
          <div>
            <div className="flex items-center space-x-2">
              <Heading level={3} className="text-lg">
                {resume.filename}
              </Heading>
              {resume.isPrimary &amp;&amp; (
                <Pill variant="primary">Primary</Pill>
              )}
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <Paragraph as="span">
                Uploaded {new Date(resume.uploadDate).toLocaleDateString()}
              </Paragraph>
              {resume.size &amp;&amp; (
                <Paragraph as="span">{formatFileSize(resume.size)}</Paragraph>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {!resume.isPrimary &amp;&amp; (
            <Button
              variant="outline"
              className="px-4 py-2 text-sm"
              onClick={() => onSetPrimary(resume.id)}
            >
              Set Primary
            </Button>
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
            onClick={() => onDelete(resume.id)}
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete"
          >
            <ApperIcon name="Trash2" className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ResumeCard;