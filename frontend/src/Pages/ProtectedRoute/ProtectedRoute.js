import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom'

const ProtectedRoute = () => {
    const { loading, isAuthenticated, user } = useSelector((state) => state.user);

    return(
        isAuthenticated ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default ProtectedRoute