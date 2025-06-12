import { delay } from '../index';
import profileData from '../mockData/userProfile.json';

let userProfile = { ...profileData };

const userProfileService = {
  async get() {
    await delay(200);
    return { ...userProfile };
  },

  async update(profileData) {
    await delay(400);
    userProfile = { ...userProfile, ...profileData };
    return { ...userProfile };
  },

  async updateSection(section, data) {
    await delay(300);
    userProfile[section] = data;
    return { ...userProfile };
  },

  async addExperience(experience) {
    await delay(300);
    const newExperience = {
      ...experience,
      id: Date.now().toString()
    };
    userProfile.experience = userProfile.experience || [];
    userProfile.experience.unshift(newExperience);
    return { ...userProfile };
  },

  async updateExperience(id, experienceData) {
    await delay(300);
    const index = userProfile.experience.findIndex(exp => exp.id === id);
    if (index === -1) {
      throw new Error('Experience not found');
    }
    userProfile.experience[index] = { ...userProfile.experience[index], ...experienceData };
    return { ...userProfile };
  },

  async deleteExperience(id) {
    await delay(300);
    userProfile.experience = userProfile.experience.filter(exp => exp.id !== id);
    return { ...userProfile };
  },

  async addEducation(education) {
    await delay(300);
    const newEducation = {
      ...education,
      id: Date.now().toString()
    };
    userProfile.education = userProfile.education || [];
    userProfile.education.unshift(newEducation);
    return { ...userProfile };
  },

  async updateEducation(id, educationData) {
    await delay(300);
    const index = userProfile.education.findIndex(edu => edu.id === id);
    if (index === -1) {
      throw new Error('Education not found');
    }
    userProfile.education[index] = { ...userProfile.education[index], ...educationData };
    return { ...userProfile };
  },

  async deleteEducation(id) {
    await delay(300);
    userProfile.education = userProfile.education.filter(edu => edu.id !== id);
    return { ...userProfile };
  }
};

export default userProfileService;