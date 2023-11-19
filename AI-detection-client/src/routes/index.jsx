import Home from '~Pages/Home';
import Chart from '~/Pages/Chart';

// Public routes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/chart', component: Chart },
];

// Private routes
const privateRoutes = [];

export { publicRoutes, privateRoutes };
