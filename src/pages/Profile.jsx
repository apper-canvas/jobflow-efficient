import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '../components/ApperIcon';
import { userProfileService } from '../services';

const EditModal = ({ isOpen, onClose, title, children }) => (
  <AnimatePresence>
    {isOpen && (
      <>
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
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="font-display font-bold text-xl text-gray-900">
                  {title}
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ApperIcon name="X" className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="p-6">
              {children}
            </div>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(null);
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

  const renderBasicInfoForm = () => (
    <form onSubmit={(e) => { e.preventDefault(); handleSave('basic'); }} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            value={formData.name || ''}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email *
          </label>
          <input
            type="email"
            value={formData.email || ''}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone
          </label>
          <input
            type="tel"
            value={formData.phone || ''}
            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <input
            type="text"
            value={formData.location || ''}
            onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Professional Summary
        </label>
        <textarea
          value={formData.summary || ''}
          onChange={(e) => setFormData(prev => ({ ...prev, summary: e.target.value }))}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
          placeholder="Brief description of your professional background and goals..."
        />
      </div>

      <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
        <button
          type="button"
          onClick={() => setEditMode(null)}
          className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors"
        >
          Cancel
        </button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={saving}
          className="px-6 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-colors"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </motion.button>
      </div>
    </form>
  );

  const renderSkillsForm = () => (
    <form onSubmit={(e) => { e.preventDefault(); handleSave('skills'); }} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Skills (comma separated)
        </label>
        <textarea
          value={formData.skills ? formData.skills.join(', ') : ''}
          onChange={(e) => setFormData(prev => ({ 
            ...prev, 
            skills: e.target.value.split(',').map(s => s.trim()).filter(s => s) 
          }))}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
          placeholder="React, JavaScript, Node.js, Python, AWS..."
        />
      </div>

      <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
        <button
          type="button"
          onClick={() => setEditMode(null)}
          className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors"
        >
          Cancel
        </button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={saving}
          className="px-6 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-colors"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </motion.button>
      </div>
    </form>
  );

  const renderExperienceForm = () => (
    <form onSubmit={(e) => { e.preventDefault(); handleSave('experience'); }} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Job Title *
          </label>
          <input
            type="text"
            value={formData.title || ''}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company *
          </label>
          <input
            type="text"
            value={formData.company || ''}
            onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <input
            type="text"
            value={formData.location || ''}
            onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.current || false}
              onChange={(e) => setFormData(prev => ({ ...prev, current: e.target.checked }))}
              className="rounded border-gray-300 text-primary focus:ring-primary"
            />
            <span className="text-sm font-medium text-gray-700">Current Position</span>
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Start Date *
          </label>
          <input
            type="month"
            value={formData.startDate || ''}
            onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            required
          />
        </div>
        {!formData.current && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              End Date
            </label>
            <input
              type="month"
              value={formData.endDate || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
        <textarea
          value={formData.description || ''}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
          placeholder="Describe your responsibilities and achievements..."
        />
      </div>

      <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
        <button
          type="button"
          onClick={() => setEditMode(null)}
          className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors"
        >
          Cancel
        </button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={saving}
          className="px-6 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-colors"
        >
          {saving ? 'Saving...' : 'Save Experience'}
        </motion.button>
      </div>
    </form>
  );

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
      <div className="max-w-4xl mx-auto text-center py-12">
        <ApperIcon name="AlertCircle" className="w-16 h-16 text-red-300 mx-auto mb-4" />
        <h1 className="text-2xl font-display font-bold text-gray-900 mb-2">Failed to Load Profile</h1>
        <p className="text-gray-600 mb-8">{error}</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={loadProfile}
          className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
        >
          Try Again
        </motion.button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg border border-gray-200 p-8"
      >
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-start space-x-6">
            <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
              <span className="text-3xl font-bold text-white">
                {profile?.name?.charAt(0) || 'U'}
              </span>
            </div>
            <div>
              <h1 className="font-display font-bold text-3xl text-gray-900 mb-2">
                {profile?.name || 'User Name'}
              </h1>
              <div className="space-y-1 text-gray-600">
                <div className="flex items-center">
                  <ApperIcon name="Mail" className="w-4 h-4 mr-2" />
                  {profile?.email || 'No email provided'}
                </div>
                {profile?.phone && (
                  <div className="flex items-center">
                    <ApperIcon name="Phone" className="w-4 h-4 mr-2" />
                    {profile.phone}
                  </div>
                )}
                {profile?.location && (
                  <div className="flex items-center">
                    <ApperIcon name="MapPin" className="w-4 h-4 mr-2" />
                    {profile.location}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleEdit('basic', profile)}
            className="flex items-center space-x-2 px-4 py-2 text-primary border border-primary rounded-lg hover:bg-primary/10 transition-colors"
          >
            <ApperIcon name="Edit" className="w-4 h-4" />
            <span>Edit</span>
          </motion.button>
        </div>

        {profile?.summary && (
          <div>
            <h3 className="font-display font-semibold text-lg text-gray-900 mb-2">
              Professional Summary
            </h3>
            <p className="text-gray-700 leading-relaxed">{profile.summary}</p>
          </div>
        )}
      </motion.div>

      {/* Skills Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-lg border border-gray-200 p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-semibold text-xl text-gray-900">Skills</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleEdit('skills', { skills: profile?.skills || [] })}
            className="flex items-center space-x-2 px-3 py-1 text-primary hover:bg-primary/10 rounded-lg transition-colors"
          >
            <ApperIcon name="Edit" className="w-4 h-4" />
            <span className="text-sm">Edit</span>
          </motion.button>
        </div>

        {profile?.skills?.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {profile.skills.map((skill, index) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic">No skills added yet</p>
        )}
      </motion.div>

      {/* Experience Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-lg border border-gray-200 p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display font-semibold text-xl text-gray-900">Experience</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleEdit('experience', {})}
            className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            <ApperIcon name="Plus" className="w-4 h-4" />
            <span>Add Experience</span>
          </motion.button>
        </div>

        {profile?.experience?.length > 0 ? (
          <div className="space-y-6">
            {profile.experience.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border-l-4 border-primary pl-6 relative"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-display font-semibold text-lg text-gray-900">
                      {exp.title}
                    </h3>
                    <p className="text-primary font-medium mb-1">{exp.company}</p>
                    <p className="text-sm text-gray-600 mb-2">
                      {exp.location} • {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </p>
                    {exp.description && (
                      <p className="text-gray-700 leading-relaxed">{exp.description}</p>
                    )}
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <button
                      onClick={() => handleEdit('experience', exp)}
                      className="p-2 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                    >
                      <ApperIcon name="Edit" className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteExperience(exp.id)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <ApperIcon name="Trash2" className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="absolute -left-2 top-0 w-4 h-4 bg-primary rounded-full"></div>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic">No experience added yet</p>
        )}
      </motion.div>

      {/* Education Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-lg border border-gray-200 p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display font-semibold text-xl text-gray-900">Education</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleEdit('education', {})}
            className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            <ApperIcon name="Plus" className="w-4 h-4" />
            <span>Add Education</span>
          </motion.button>
        </div>

        {profile?.education?.length > 0 ? (
          <div className="space-y-6">
            {profile.education.map((edu, index) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border-l-4 border-secondary pl-6 relative"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-display font-semibold text-lg text-gray-900">
                      {edu.degree} in {edu.field}
                    </h3>
                    <p className="text-secondary font-medium mb-1">{edu.institution}</p>
                    <p className="text-sm text-gray-600">
                      {edu.startDate} - {edu.endDate}
                      {edu.gpa && ` • GPA: ${edu.gpa}`}
                    </p>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <button
                      onClick={() => handleEdit('education', edu)}
                      className="p-2 text-gray-400 hover:text-secondary hover:bg-secondary/10 rounded-lg transition-colors"
                    >
                      <ApperIcon name="Edit" className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteEducation(edu.id)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <ApperIcon name="Trash2" className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="absolute -left-2 top-0 w-4 h-4 bg-secondary rounded-full"></div>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic">No education added yet</p>
        )}
      </motion.div>

      {/* Edit Modals */}
      <EditModal
        isOpen={editMode === 'basic'}
        onClose={() => setEditMode(null)}
        title="Edit Basic Information"
      >
        {renderBasicInfoForm()}
      </EditModal>

      <EditModal
        isOpen={editMode === 'skills'}
        onClose={() => setEditMode(null)}
        title="Edit Skills"
      >
        {renderSkillsForm()}
      </EditModal>

      <EditModal
        isOpen={editMode === 'experience'}
        onClose={() => setEditMode(null)}
        title={formData.id ? 'Edit Experience' : 'Add Experience'}
      >
        {renderExperienceForm()}
      </EditModal>

      <EditModal
        isOpen={editMode === 'education'}
        onClose={() => setEditMode(null)}
        title={formData.id ? 'Edit Education' : 'Add Education'}
      >
        {/* Education form would be similar to experience form */}
      </EditModal>
    </div>
  );
};

export default Profile;