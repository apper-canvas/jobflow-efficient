import { delay } from '../index';
import resumesData from '../mockData/resumes.json';

let resumes = [...resumesData];

const resumeService = {
  async getAll() {
    await delay(200);
    return [...resumes];
  },

  async getById(id) {
    await delay(200);
    const resume = resumes.find(r => r.id === id);
    if (!resume) {
      throw new Error('Resume not found');
    }
    return { ...resume };
  },

  async upload(file) {
    await delay(800);
    
    // Simulate file upload
    const newResume = {
      id: Date.now().toString(),
      filename: file.name,
      uploadDate: new Date().toISOString(),
      fileUrl: `/${file.name}`, // Mock URL
      isPrimary: resumes.length === 0,
      size: file.size
    };
    
    resumes.unshift(newResume);
    return { ...newResume };
  },

  async setPrimary(id) {
    await delay(300);
    
    // Set all resumes to non-primary
    resumes = resumes.map(resume => ({ ...resume, isPrimary: false }));
    
    // Set target resume as primary
    const index = resumes.findIndex(r => r.id === id);
    if (index === -1) {
      throw new Error('Resume not found');
    }
    
    resumes[index].isPrimary = true;
    return { ...resumes[index] };
  },

  async delete(id) {
    await delay(300);
    const index = resumes.findIndex(r => r.id === id);
    if (index === -1) {
      throw new Error('Resume not found');
    }
    
    const wassPrimary = resumes[index].isPrimary;
    resumes.splice(index, 1);
    
    // If deleted resume was primary, make first resume primary
    if (wassPrimary && resumes.length > 0) {
      resumes[0].isPrimary = true;
    }
    
    return { success: true };
  },

  async rename(id, newFilename) {
    await delay(300);
    const index = resumes.findIndex(r => r.id === id);
    if (index === -1) {
      throw new Error('Resume not found');
    }
    
    resumes[index].filename = newFilename;
    return { ...resumes[index] };
  }
};

export default resumeService;