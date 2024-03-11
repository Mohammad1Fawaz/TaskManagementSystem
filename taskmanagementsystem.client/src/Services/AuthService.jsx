import config from '../../config';
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
    AddRole: async (roleData) => {
        console.log(roleData);
        const token = AuthService.getToken();
        const response = await fetch(`${apiBaseUrl}/Auth/add-role`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(roleData),
        });

        const responseData = await response.json();
        return await responseData;
    },
    getRoles: async (roleData) => {
        console.log(roleData);
        const token = AuthService.getToken();
        const response = await fetch(`${apiBaseUrl}/Auth/get-roles`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(roleData),
        });

        const responseData = await response.json();
        return await responseData;
    },
    getUserRoles: async (token) => {
        try {
            console.log(`${apiBaseUrl}/Auth/get-roles`);
            const response = await fetch(`${apiBaseUrl}/Auth/get-role`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const rolesData = await response.json();
                return rolesData.role;
            } else {
                return [];
            }
        } catch (error) {
            console.error('Error fetching user roles:', error);
            return [];
        }
    },
    getRolesPermissions: async (token) => {
        try {
            
            const response = await fetch(`${apiBaseUrl}/Auth/get-role-permissions`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${Cookies.get("token") }`
                }
            });

            if (response.ok) {
                const responseData = await response.json();
                return await responseData;
            } else {
                return [];
            }
        } catch (error) {
            console.error('Error fetching user roles:', error);
            return [];
        }
    },
    DeleteRole: async (roleId) => {
        try {
            console.log("roleId", roleId);
            const token = AuthService.getToken();
            const response = await fetch(`${apiBaseUrl}/Auth/delete-role/${roleId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            const responseData = await response.json();
            return await responseData;
        } catch (error) {
            console.error('Error fetching user roles:', error);
            return [];
        }      
    },
    saveToken: (token) => {
        Cookies.set("token", token);
    },

    getToken: () => {
        return Cookies.get("token");
    }

};
export default AuthService;