import { Navigate, useLocation } from 'react-router-dom';
import { getAccessToken } from '@/utils/auth';

interface PrivateRouteProps {
    children: React.ReactNode;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const location = useLocation();
    const accessToken = getAccessToken();

    if (!accessToken) {
        // 현재 경로를 state로 전달하여 로그인 후 원래 페이지로 돌아올 수 있게 함
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <>{children}</>;
};
