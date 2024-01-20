import { useUserContext } from '@/context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

const AuthLayout = () => {
    const { isAuthenticated } = useUserContext();
    return (
        <>
            {isAuthenticated ? (
                <Navigate to='/' />
            ): (
                <>
                    <Outlet />
                </>
            )}
        </>
    )
}

export default AuthLayout