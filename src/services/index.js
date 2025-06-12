export { default as jobService } from './api/jobService';
export { default as userProfileService } from './api/userProfileService';
export { default as resumeService } from './api/resumeService';
export { default as applicationService } from './api/applicationService';
export { default as savedJobService } from './api/savedJobService';

// Utility function for simulating API delays
export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));