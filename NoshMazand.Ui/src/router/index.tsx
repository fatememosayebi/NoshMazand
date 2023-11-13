import { Navigate, createBrowserRouter } from 'react-router-dom';
import BlankLayout from '../components/Layouts/BlankLayout';
import DefaultLayout from '../components/Layouts/DefaultLayout';
import { routes } from './routes';
const PrivateWrapper = ({children}:{children:Array<any>|any}) => {
    return localStorage.getItem('token') ? children : <Navigate to="/login" />;
  };
const finalRoutes = routes.map((route) => {
    return {
        ...route,
        element: route.layout === 'blank' ? 
            <BlankLayout>{route.element}</BlankLayout> 
            : <PrivateWrapper><DefaultLayout>{route.element}</DefaultLayout></PrivateWrapper>,
    };
});

const router = createBrowserRouter(finalRoutes);

export default router;
