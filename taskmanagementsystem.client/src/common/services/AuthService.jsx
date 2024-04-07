import config from '../../../config';
import Cookies from 'js-cookie';

const apiBaseUrl = config.apiBaseUrl;
const AuthService = {

    login: async (userData) => {
        const response = await fetch(`${apiBaseUrl}/Auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        const responseData = await response.json();
        return await responseData;
    },
    logout: async () => {
        try {
            const token = AuthService.getToken();
            const response = await fetch(`${apiBaseUrl}/Auth/logout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            return await response.json();
        } catch (error) {
            console.error('Error registering user:', error);
            throw error;
        }
    },
    getUserInfo: async (token) => {
        try {
            const response = await fetch(`${apiBaseUrl}/Auth/get-user-info`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const res = await response.json();
                return res.userInfo;
            } else {
                return [];
            }
        } catch (error) {
            console.error('Error fetching user roles:', error);
            return [];
        }
    },
    clearToken: (token) => {
        Cookies.remove("token");
    },
    saveToken: (token) => {
        Cookies.set("token", token);
    },

    getToken: () => {
        return Cookies.get("token");
    }

};
export default AuthService;