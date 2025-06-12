import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Heading from '@/components/atoms/Heading';
import Paragraph from '@/components/atoms/Paragraph';

const Modal = ({ isOpen, onClose, title, description, children, className, bodyClassName, ...rest }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        &lt;&gt;
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
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${className || ''}`.trim()}
            {...rest}
          >
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  {title &amp;&amp; &lt;Heading level={2} className="text-xl"&gt;{title}&lt;/Heading&gt;}
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <ApperIcon name="X" className="w-5 h-5" />
                  </button>
                </div>
                {description &amp;&amp; &lt;Paragraph className="mt-1"&gt;{description}&lt;/Paragraph&gt;}
              </div>
              <div className={`p-6 ${bodyClassName || ''}`.trim()}>
                {children}
              </div>
            </div>
          </motion.div>
        </&gt;
      )}
    </AnimatePresence>
  );
};

export default Modal;