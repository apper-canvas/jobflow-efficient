import React from 'react';
import StatCard from '@/components/molecules/StatCard';

const DashboardStats = ({ savedJobsCount, applicationsCount, interviewsCount }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <StatCard
        iconName="Bookmark"
        iconBgColor="bg-primary/10"
        iconColor="text-primary"
        value={savedJobsCount}
        label="Saved Jobs"
      />
      <StatCard
        iconName="Send"
        iconBgColor="bg-accent/10"
        iconColor="text-accent"
        value={applicationsCount}
        label="Applications"
      />
      <StatCard
        iconName="Calendar"
        iconBgColor="bg-green-100"
        iconColor="text-green-600"
        value={interviewsCount}
        label="Interviews"
      />
    </div>
  );
};

export default DashboardStats;