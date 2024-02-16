import config from '../../.././config';

export const registerUser = async (userData) => {
    const apiBaseUrl = config.apiBaseUrl;

    const response = await fetch(`${apiBaseUrl}/Client/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });

    const responseData = await response.json();
    return await responseData;
};


export const loginUser = async (userData) => {
    const apiBaseUrl = config.apiBaseUrl;
    const response = await fetch(`${apiBaseUrl}/Client/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });

    const responseData = await response.json();
    return await responseData;
};

export const resetPassword = async (userData) => {
    const apiBaseUrl = config.apiBaseUrl;
    const response = await fetch(`${apiBaseUrl}/Client/reset-password`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });

    const responseData = await response.json();
    return await responseData;
};


export const verifyUser = async (token) => {
    const apiBaseUrl = config.apiBaseUrl;

    const response = await fetch(`${apiBaseUrl}/Client/verify-email`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(token),
    });

    const responseData = await response.json();

    return await responseData;
};
