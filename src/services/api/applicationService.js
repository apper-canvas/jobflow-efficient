import { delay } from '../index';
import applicationsData from '../mockData/applications.json';

let applications = [...applicationsData];

const applicationService = {
  async getAll() {
    await delay(300);
    return [...applications];
  },

  async getById(id) {
    await delay(200);
    const application = applications.find(a => a.id === id);
    if (!application) {
      throw new Error('Application not found');
    }
    return { ...application };
  },

  async create(applicationData) {
    await delay(500);
    const newApplication = {
      ...applicationData,
      id: Date.now().toString(),
      appliedDate: new Date().toISOString(),
      status: 'applied'
    };
    applications.unshift(newApplication);
    return { ...newApplication };
  },

  async updateStatus(id, status) {
    await delay(300);
    const index = applications.findIndex(a => a.id === id);
    if (index === -1) {
      throw new Error('Application not found');
    }
    applications[index].status = status;
    return { ...applications[index] };
  },

  async delete(id) {
    await delay(300);
    const index = applications.findIndex(a => a.id === id);
    if (index === -1) {
      throw new Error('Application not found');
    }
    applications.splice(index, 1);
    return { success: true };
  },

  async getByJobId(jobId) {
    await delay(200);
    return applications.find(a => a.jobId === jobId) || null;
  }
};

export default applicationService;