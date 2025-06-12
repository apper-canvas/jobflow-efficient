import Home from '../pages/Home';
import Jobs from '../pages/Jobs';
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import Resumes from '../pages/Resumes';
import JobDetail from '../pages/JobDetail';
import NotFound from '../pages/NotFound';

export const routes = {
  home: {
    id: 'home',
    label: 'Home',
    path: '/',
    icon: 'Home',
    component: Home
  },
  jobs: {
    id: 'jobs',
    label: 'Jobs',
    path: '/jobs',
    icon: 'Briefcase',
    component: Jobs
  },
  dashboard: {
    id: 'dashboard', 
    label: 'Dashboard',
    path: '/dashboard',
    icon: 'LayoutDashboard',
    component: Dashboard
  },
  profile: {
    id: 'profile',
    label: 'Profile', 
    path: '/profile',
    icon: 'User',
    component: Profile
  },
  resumes: {
    id: 'resumes',
    label: 'Resumes',
    path: '/resumes',
    icon: 'FileText',
    component: Resumes
  },
  jobDetail: {
    id: 'jobDetail',
    label: 'Job Detail',
    path: '/jobs/:id',
    component: JobDetail,
    hidden: true
  },
  notFound: {
    id: 'notFound',
    label: '404',
    path: '*',
    component: NotFound,
    hidden: true
  }
};

export const routeArray = Object.values(routes);
export const navRoutes = routeArray.filter(route => !route.hidden);