import React from 'react';
import { motion } from 'framer-motion';
import TabButton from '@/components/molecules/TabButton';

const DashboardContentTabs = ({ activeTab, onTabChange, savedJobsCount, applicationsCount, children }) => {
  const tabs = [
    { id: 'saved', label: 'Saved Jobs', count: savedJobsCount },
    { id: 'applications', label: 'Applications', count: applicationsCount }
  ];
return (
    <>
      <div className="flex space-x-1 mb-8">
        {tabs.map((tab) => (
          <TabButton
            key={tab.id}
            id={tab.id}
            label={tab.label}
            count={tab.count}
            activeTab={activeTab}
            onClick={onTabChange}
          />
        ))}
      </div>

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </>
  );
};

export default DashboardContentTabs;