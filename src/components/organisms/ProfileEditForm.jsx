import React from 'react';
import Button from '@/components/atoms/Button';
import FormField from '@/components/molecules/FormField';
import { motion } from 'framer-motion';

const ProfileEditForm = ({ type, formData, setFormData, saving, onCancel, onSave }) => {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSave(type);
  };

  const commonSubmitSection = (
    <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
      <Button
        type="button"
        variant="ghost"
        onClick={onCancel}
      >
        Cancel
      </Button>
      <Button
        type="submit"
        disabled={saving}
        className="px-6 py-2"
      >
        {saving ? 'Saving...' : 'Save Changes'}
      </Button>
    </div>
  );

  switch (type) {
    case 'basic':
      return (
        <form onSubmit={handleFormSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              label="Full Name *"
              type="text"
              value={formData.name || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              required
            />
            <FormField
              label="Email *"
              type="email"
              value={formData.email || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              required
            />
            <FormField
              label="Phone"
              type="tel"
              value={formData.phone || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
            />
            <FormField
              label="Location"
              type="text"
              value={formData.location || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
            />
          </div>
          
          <FormField
            label="Professional Summary"
            type="textarea"
            rows={4}
            value={formData.summary || ''}
            onChange={(e) => setFormData(prev => ({ ...prev, summary: e.target.value }))}
            placeholder="Brief description of your professional background and goals..."
          />
          {commonSubmitSection}
        </form>
      );
    case 'skills':
      return (
        <form onSubmit={handleFormSubmit} className="space-y-6">
          <FormField
            label="Skills (comma separated)"
            type="textarea"
            rows={4}
            value={formData.skills ? formData.skills.join(', ') : ''}
            onChange={(e) => setFormData(prev => ({ 
              ...prev, 
              skills: e.target.value.split(',').map(s => s.trim()).filter(s => s) 
            }))}
            placeholder="React, JavaScript, Node.js, Python, AWS..."
          />
          {commonSubmitSection}
        </form>
      );
    case 'experience':
      return (
        <form onSubmit={handleFormSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              label="Job Title *"
              type="text"
              value={formData.title || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              required
            />
            <FormField
              label="Company *"
              type="text"
              value={formData.company || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
              required
            />
            <FormField
              label="Location"
              type="text"
              value={formData.location || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
            />
            <FormField
              id="current-position"
              label="Current Position"
              type="checkbox"
              checked={formData.current || false}
              onChange={(e) => setFormData(prev => ({ ...prev, current: e.target.checked }))}
            />
            <FormField
              label="Start Date *"
              type="month"
              value={formData.startDate || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
              required
            />
            {!formData.current &amp;&amp; (
              <FormField
                label="End Date"
                type="month"
                value={formData.endDate || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
              />
            )}
          </div>
          <FormField
            label="Description"
            type="textarea"
            rows={4}
            value={formData.description || ''}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Describe your responsibilities and achievements..."
          />
          {commonSubmitSection}
        </form>
      );
    case 'education':
      return (
        <form onSubmit={handleFormSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              label="Degree *"
              type="text"
              value={formData.degree || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, degree: e.target.value }))}
              required
            />
            <FormField
              label="Field of Study *"
              type="text"
              value={formData.field || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, field: e.target.value }))}
              required
            />
            <FormField
              label="Institution *"
              type="text"
              value={formData.institution || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, institution: e.target.value }))}
              required
            />
            <FormField
              label="GPA (Optional)"
              type="text"
              value={formData.gpa || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, gpa: e.target.value }))}
            />
            <FormField
              label="Start Date *"
              type="month"
              value={formData.startDate || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
              required
            />
            <FormField
              label="End Date *"
              type="month"
              value={formData.endDate || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
              required
            />
          </div>
          {commonSubmitSection}
        </form>
      );
    default:
      return &lt;p&gt;No form selected.&lt;/p&gt;;
  }
};

export default ProfileEditForm;