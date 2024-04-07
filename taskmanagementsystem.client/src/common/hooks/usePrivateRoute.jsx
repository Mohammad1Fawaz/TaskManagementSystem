import { useEffect, useState } from 'react';
import AuthService from '../services/AuthService';

const usePrivateRoute = (requiredRoles) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [userInfo, setUserInfo] = useState(false);

    useEffect(() => {
        const checkAuthorization = async () => {
            try {
                const token = AuthService.getToken();
                if (token) {
                    setIsAuthenticated(true);
                    const userInformation = await AuthService.getUserInfo(token);
                    setUserInfo(userInformation);
                    const authorized = requiredRoles.includes(userInformation.role);
                    setIsAuthorized(authorized);
                } else {
                    setIsAuthenticated(false);
                    setIsAuthorized(false);
                }
            } catch (error) {
                console.error('Error checking user roles:', error);
                setIsAuthenticated(false);
                setIsAuthorized(false);
            } finally {
                setIsLoading(false);
            }
        };

        checkAuthorization();
    }, [requiredRoles]);

    return { isLoading, isAuthenticated, isAuthorized, userInfo };
};

export default usePrivateRoute;
