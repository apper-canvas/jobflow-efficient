import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Heading from '@/components/atoms/Heading';
import FormField from '@/components/molecules/FormField';
import Button from '@/components/atoms/Button';

const JobSearchForm = ({ filters, onFiltersChange, onSearch }) => {
  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    onFiltersChange(newFilters);
  };

  const jobTypeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'full-time', label: 'Full Time' },
    { value: 'part-time', label: 'Part Time' },
    { value: 'contract', label: 'Contract' },
    { value: 'remote', label: 'Remote' },
  ];

  const experienceLevelOptions = [
    { value: 'all', label: 'All Levels' },
    { value: 'entry', label: 'Entry Level' },
    { value: 'mid-level', label: 'Mid Level' },
    { value: 'senior', label: 'Senior Level' },
    { value: 'executive', label: 'Executive' },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <Heading level={3} className="text-lg mb-4">Filters</Heading>
      
      <div className="space-y-4">
        <FormField
          label="Keywords"
          type="text"
          placeholder="Job title, company, skills..."
          value={filters.keyword || ''}
          onChange={(e) => handleFilterChange('keyword', e.target.value)}
          icon={<ApperIcon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />}
        />
        <FormField
          label="Location"
          type="text"
          placeholder="City, state, or remote"
          value={filters.location || ''}
          onChange={(e) => handleFilterChange('location', e.target.value)}
          icon={<ApperIcon name="MapPin" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />}
        />
        <FormField
          label="Job Type"
          type="select"
          options={jobTypeOptions}
          value={filters.type || 'all'}
          onChange={(e) => handleFilterChange('type', e.target.value)}
        />
        <FormField
          label="Experience Level"
          type="select"
          options={experienceLevelOptions}
          value={filters.experience || 'all'}
          onChange={(e) => handleFilterChange('experience', e.target.value)}
        />
        <FormField
          label="Minimum Salary"
          type="number"
          placeholder="50000"
          value={filters.minSalary || ''}
          onChange={(e) => handleFilterChange('minSalary', e.target.value)}
        />

        <Button
          className="w-full py-2 px-4"
          onClick={() => onSearch(filters)}
        >
          Search Jobs
        </Button>
      </div>
    </div>
  );
};

export default JobSearchForm;