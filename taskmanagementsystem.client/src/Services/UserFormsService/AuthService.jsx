import config from '../../.././config';
import { toast } from 'react-toastify';

export const registerUser = async (userData, setIsLoading) => {
    const apiBaseUrl = config.apiBaseUrl;

    try {
        const response = await fetch(`${apiBaseUrl}/User/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        const responseData = await response.json();
        setIsLoading(false);
        return await responseData;
    } catch (err) {
        setIsLoading(false);
        throw err;
    }
};


export const loginUser = async (userData, setIsLoading) => {
    const apiBaseUrl = config.apiBaseUrl;

    try {
        const response = await fetch(`${apiBaseUrl}/User/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        const responseData = await response.json();
        setIsLoading(false);
        return await responseData;
    } catch (err) {
        setIsLoading(false);
        throw err;
    }
};


export const verifyUser = async (token, setIsLoading) => {
    const apiBaseUrl = config.apiBaseUrl;

    try {
        const response = await fetch(`${apiBaseUrl}/User/verify-email`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(token),
        });

        const responseData = await response.json();

        return await responseData;
    } catch (err) {
        setIsLoading(false);
        throw err;
    }
};


export const successNotify = (message) => toast.success(message, { autoClose: false });
export const errorNotify = (message) => toast.error(message, { autoClose: false });
export const warningNotify = (message) => toast.warning(message, { autoClose: false });
