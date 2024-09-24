import Route from './Route';
import MainLayout from "../Layout";
import Comparator from "../pages/Comparator";
import DefaultPage from '../pages/Default';

const routes = [
    {
        path: '/',
        element: <Route component={MainLayout} />,
        children: [
            {
                path: '/',
                element: <DefaultPage />
            },
            {
                path: '/comparator',
                element: <Comparator />
            },
            {
                path: '/globe',
                element: <DefaultPage />
            },
            {
                path: '/china',
                element: <DefaultPage />
            },
            {
                path: '/germany',
                element: <DefaultPage />
            },
            {
                path: '/india',
                element: <DefaultPage />
            },
            {
                path: '/japan',
                element: <DefaultPage />
            },
            {
                path: '/south-korea',
                element: <DefaultPage />
            },
            {
                path: '/united-kingdom',
                element: <DefaultPage />
            },
            {
                path: '/united-states',
                element: <DefaultPage />
            },
            {
                path: '/about-gtb',
                element: <DefaultPage />
            },
        ]
    },
    {
        path: '*',
        element: <div>Page not found: 404</div>
    }
];

export default routes;