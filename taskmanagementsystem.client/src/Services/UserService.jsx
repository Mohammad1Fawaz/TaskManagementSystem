import config from '../../config';
import AuthService from './AuthService';

const apiBaseUrl = config.apiBaseUrl;

const UserService = {
    registerUser: async (userData) => {
        try {
            console.log(userData);
            const token = AuthService.getToken();
            const response = await fetch(`${apiBaseUrl}/User/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(userData),
            });
            return await response.json();
        } catch (error) {
            console.error('Error registering user:', error);
            throw error; // Rethrow the error so it can be caught elsewhere
        }
    },

    getUsers: async () => {
        try {
            const token = AuthService.getToken();
            const response = await fetch(`${apiBaseUrl}/User/get-users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            return await response.json();
        } catch (error) {
            console.error('Error registering user:', error);
            throw error; // Rethrow the error so it can be caught elsewhere
        }
    },

    verifyUser: async (userData) => {
        try {
            const response = await fetch(`${apiBaseUrl}/User/verify-user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            return await response.json();
        } catch (error) {
            console.error('Error registering user:', error);
            throw error;
        }
    },
    deleteUser: async (userId) => {
        try {
            const token = AuthService.getToken();
            const response = await fetch(`${apiBaseUrl}/User/delete-user/${userId}`, {
                method: 'DELETE',
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
    editUser: async (userId, userData) => {
        try {
            const token = AuthService.getToken();
            const response = await fetch(`${apiBaseUrl}/User/edit-user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(userData),
            });

            return await response.json();
        } catch (error) {
            console.error('Error registering user:', error);
            throw error;
        }
    },
};

export default UserService;
