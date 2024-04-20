import { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../../config';
import AuthService from '../services/AuthService';

const useAuthorization = (requiredClaims) => {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const token = AuthService.getToken();
    const baseUrl = config.apiBaseUrl;
    useEffect(() => {
        const checkAuthorization = async () => {
            try {
                const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };
                const response = await axios.post(
                    `${baseUrl}/Auth/authorize-element`,
                    JSON.stringify(requiredClaims),
                    { headers }
                );
                setIsAuthorized(response.data.isAuthorized);
                setIsLoading(false);
            } catch (error) {
                console.error('Error checking authorization:', error);
                setIsAuthorized(false);
                setIsLoading(false);
            }
        };

        checkAuthorization();
    }, []);

    return { isAuthorized, isLoading };
};

export default useAuthorization;
