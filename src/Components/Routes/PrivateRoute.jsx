
import useAuth from '../../Shared/Hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();
    if (loading) {
        return <span className="loading loading-ring loading-lg flex justify-center items-center h-screen mx-auto"></span>
    }
    if (user) {
        return children;
    }
    return <Navigate state={{ from: location }} to="/signin" replace></Navigate>;
};

export default PrivateRoute;