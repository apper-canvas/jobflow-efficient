import { delay } from '../index';
import savedJobsData from '../mockData/savedJobs.json';

let savedJobs = [...savedJobsData];

const savedJobService = {
  async getAll() {
    await delay(200);
    return [...savedJobs];
  },

  async getById(id) {
    await delay(200);
    const savedJob = savedJobs.find(s => s.id === id);
    if (!savedJob) {
      throw new Error('Saved job not found');
    }
    return { ...savedJob };
  },

  async create(jobId) {
    await delay(300);
    
    // Check if already saved
    const existing = savedJobs.find(s => s.jobId === jobId);
    if (existing) {
      throw new Error('Job already saved');
    }
    
    const newSavedJob = {
      id: Date.now().toString(),
      jobId,
      savedDate: new Date().toISOString()
    };
    
    savedJobs.unshift(newSavedJob);
    return { ...newSavedJob };
  },

  async delete(id) {
    await delay(300);
    const index = savedJobs.findIndex(s => s.id === id);
    if (index === -1) {
      throw new Error('Saved job not found');
    }
    savedJobs.splice(index, 1);
    return { success: true };
  },

  async deleteByJobId(jobId) {
    await delay(300);
    const index = savedJobs.findIndex(s => s.jobId === jobId);
    if (index === -1) {
      throw new Error('Saved job not found');
    }
    savedJobs.splice(index, 1);
    return { success: true };
  },

  async isJobSaved(jobId) {
    await delay(100);
    return savedJobs.some(s => s.jobId === jobId);
  }
};

export default savedJobService;