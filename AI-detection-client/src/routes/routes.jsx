import config from '~/config';

// Pages
import Home from '~Pages/Home';
import Chart from '~/Pages/Chart';

// Public routes
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.filter, component: Home },
    { path: config.routes.chart, component: Chart },
];

// Private routes
const privateRoutes = [];

export { publicRoutes, privateRoutes };
