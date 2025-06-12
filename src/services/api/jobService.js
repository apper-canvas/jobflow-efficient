import { delay } from '../index';
import jobsData from '../mockData/jobs.json';

let jobs = [...jobsData];

const jobService = {
  async getAll(filters = {}) {
    await delay(300);
    
    let filteredJobs = [...jobs];
    
    // Apply filters
    if (filters.keyword) {
      const keyword = filters.keyword.toLowerCase();
      filteredJobs = filteredJobs.filter(job => 
        job.title.toLowerCase().includes(keyword) ||
        job.company.toLowerCase().includes(keyword) ||
        job.description.toLowerCase().includes(keyword)
      );
    }
    
    if (filters.location) {
      filteredJobs = filteredJobs.filter(job => 
        job.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }
    
    if (filters.type && filters.type !== 'all') {
      filteredJobs = filteredJobs.filter(job => job.type === filters.type);
    }
    
    if (filters.experience && filters.experience !== 'all') {
      filteredJobs = filteredJobs.filter(job => job.experience === filters.experience);
    }
    
    if (filters.minSalary) {
      filteredJobs = filteredJobs.filter(job => {
        const salary = parseInt(job.salary.replace(/[^0-9]/g, ''));
        return salary >= parseInt(filters.minSalary);
      });
    }
    
    // Pagination
    const page = filters.page || 1;
    const limit = filters.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    
    return {
      jobs: filteredJobs.slice(startIndex, endIndex),
      total: filteredJobs.length,
      page,
      totalPages: Math.ceil(filteredJobs.length / limit)
    };
  },

  async getById(id) {
    await delay(200);
    const job = jobs.find(j => j.id === id);
    if (!job) {
      throw new Error('Job not found');
    }
    return { ...job };
  },

  async create(jobData) {
    await delay(400);
    const newJob = {
      ...jobData,
      id: Date.now().toString(),
      postedDate: new Date().toISOString()
    };
    jobs.unshift(newJob);
    return { ...newJob };
  },

  async update(id, jobData) {
    await delay(400);
    const index = jobs.findIndex(j => j.id === id);
    if (index === -1) {
      throw new Error('Job not found');
    }
    jobs[index] = { ...jobs[index], ...jobData };
    return { ...jobs[index] };
  },

  async delete(id) {
    await delay(300);
    const index = jobs.findIndex(j => j.id === id);
    if (index === -1) {
      throw new Error('Job not found');
    }
    jobs.splice(index, 1);
    return { success: true };
  },

  async search(query, filters = {}) {
    return this.getAll({ ...filters, keyword: query });
  }
};

export default jobService;