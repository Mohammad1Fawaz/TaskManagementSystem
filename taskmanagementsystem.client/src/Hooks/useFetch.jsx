import { useQuery } from 'react-query';
import Cookies from 'js-cookie';
import config from '../../config';

export const useFetch = (method, endpoint, requestData) => {
    const token = Cookies.get("token");
    const apiBaseUrl = config.apiBaseUrl;

    const fetchData = async () => {
        const response = await fetch(`${apiBaseUrl}${endpoint}`, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(requestData),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return response.json();
    };

    return useQuery([endpoint, method, requestData], fetchData);
};