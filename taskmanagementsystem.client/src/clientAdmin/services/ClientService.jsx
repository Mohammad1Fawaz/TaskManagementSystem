import config from '../../../config';
const apiBaseUrl = config.apiBaseUrl;

const ClientService  = {
    registerClient : async (userData) => {

        const response = await fetch(`${apiBaseUrl}/Client/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        const responseData = await response.json();
        return await responseData;
    },

    loginClient : async (userData) => {
        const response = await fetch(`${apiBaseUrl}/Client/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        const responseData = await response.json();
        return await responseData;
    },

    resetPasswordClient : async (userData) => {
        const response = await fetch(`${apiBaseUrl}/Client/reset-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        const responseData = await response.json();
        return await responseData;
    },

    verifyClient : async (token,email) => {
        const initialFormData = {
            token: token,
            email: email,
        };
        const response = await fetch(`${apiBaseUrl}/Client/verify-email`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(initialFormData),
        });

        const responseData = await response.json();

        return await responseData;
    }

}

export default ClientService;