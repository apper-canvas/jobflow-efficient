import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import ProfileBasicInfoSection from '@/components/organisms/ProfileBasicInfoSection';
import ProfileSkillsSection from '@/components/organisms/ProfileSkillsSection';
import ProfileExperienceSection from '@/components/organisms/ProfileExperienceSection';
import ProfileEducationSection from '@/components/organisms/ProfileEducationSection';
import ProfileEditModal from '@/components/organisms/ProfileEditModal';
import Loader from '@/components/atoms/Loader';
import ErrorState from '@/components/organisms/ErrorState';
import { userProfileService } from '@/services';

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(null); // 'basic', 'skills', 'experience', 'education'
  const [formData, setFormData] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    setLoading(true);
    setError(null);
    try {
      const profileData = await userProfileService.get();
      setProfile(profileData);
    } catch (err) {
      setError(err.message || 'Failed to load profile');
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (section, data = {}) => {
    setEditMode(section);
    setFormData(data);
  };

  const handleSave = async (section) => {
    setSaving(true);
    try {
      let updatedProfile;
      
      if (section === 'basic') {
        updatedProfile = await userProfileService.update({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          location: formData.location,
          summary: formData.summary
        });
      } else if (section === 'skills') {
        updatedProfile = await userProfileService.updateSection('skills', formData.skills);
      } else if (section === 'experience') {
        if (formData.id) {
          updatedProfile = await userProfileService.updateExperience(formData.id, formData);
        } else {
          updatedProfile = await userProfileService.addExperience(formData);
        }
      } else if (section === 'education') {
        if (formData.id) {
          updatedProfile = await userProfileService.updateEducation(formData.id, formData);
        } else {
          updatedProfile = await userProfileService.addEducation(formData);
        }
      }
      
      setProfile(updatedProfile);
      setEditMode(null);
      setFormData({});
      toast.success('Profile updated successfully!');
    } catch (err) {
      toast.error('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteExperience = async (id) => {
    try {
      const updatedProfile = await userProfileService.deleteExperience(id);
      setProfile(updatedProfile);
      toast.success('Experience deleted');
    } catch (err) {
      toast.error('Failed to delete experience');
    }
  };

  const handleDeleteEducation = async (id) => {
    try {
      const updatedProfile = await userProfileService.deleteEducation(id);
      setProfile(updatedProfile);
      toast.success('Education deleted');
    } catch (err) {
      toast.error('Failed to delete education');
    }
  };

  const getEditModalTitle = (section) => {
    switch (section) {
      case 'basic': return 'Edit Basic Information';
      case 'skills': return 'Edit Skills';
      case 'experience': return formData.id ? 'Edit Experience' : 'Add Experience';
      case 'education': return formData.id ? 'Edit Education' : 'Add Education';
      default: return 'Edit Profile';
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="animate-pulse space-y-8">
          {/* Header skeleton */}
          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <div className="flex items-start space-x-6">
              <div className="w-24 h-24 bg-gray-200 rounded-full"></div>
              <div className="flex-1">
                <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          </div>

          {/* Content skeletons */}
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <ErrorState 
        title="Failed to Load Profile" 
        message={error} 
        onRetry={loadProfile} 
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <ProfileBasicInfoSection profile={profile} onEdit={handleEdit} />
      <ProfileSkillsSection profile={profile} onEdit={handleEdit} />
      <ProfileExperienceSection profile={profile} onEdit={handleEdit} onDelete={handleDeleteExperience} />
      <ProfileEducationSection profile={profile} onEdit={handleEdit} onDelete={handleDeleteEducation} />

      <ProfileEditModal
        isOpen={!!editMode}
        onClose={() => setEditMode(null)}
        title={getEditModalTitle(editMode)}
        type={editMode}
        formData={formData}
        setFormData={setFormData}
        saving={saving}
        onSave={handleSave}
      />
    </div>
  );
};

export default ProfilePage;