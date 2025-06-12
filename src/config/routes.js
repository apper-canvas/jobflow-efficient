import HomePage from '@/components/pages/HomePage';
import JobsPage from '@/components/pages/JobsPage';
import DashboardPage from '@/components/pages/DashboardPage';
import ProfilePage from '@/components/pages/ProfilePage';
import ResumesPage from '@/components/pages/ResumesPage';
import JobDetailPage from '@/components/pages/JobDetailPage';
import NotFoundPage from '@/components/pages/NotFoundPage';

export const routes = {
  home: {
    id: 'home',
    label: 'Home',
    path: '/',
    icon: 'Home',
    component: HomePage
  },
  jobs: {
    id: 'jobs',
    label: 'Jobs',
    path: '/jobs',
    icon: 'Briefcase',
    component: JobsPage
  },
  dashboard: {
    id: 'dashboard', 
    label: 'Dashboard',
    path: '/dashboard',
    icon: 'LayoutDashboard',
    component: DashboardPage
  },
  profile: {
    id: 'profile',
    label: 'Profile', 
    path: '/profile',
    icon: 'User',
    component: ProfilePage
  },
  resumes: {
    id: 'resumes',
    label: 'Resumes',
    path: '/resumes',
    icon: 'FileText',
    component: ResumesPage
  },
  jobDetail: {
    id: 'jobDetail',
    label: 'Job Detail',
    path: '/jobs/:id',
    component: JobDetailPage,
    hidden: true
  },
  notFound: {
    id: 'notFound',
    label: '404',
    path: '*',
    component: NotFoundPage,
    hidden: true
  }
};

export const routeArray = Object.values(routes);
export const navRoutes = routeArray.filter(route => !route.hidden);