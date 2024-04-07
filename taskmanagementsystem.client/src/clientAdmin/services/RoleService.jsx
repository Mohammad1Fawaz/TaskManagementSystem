import config from '../../../config';
import Cookies from 'js-cookie';
import AuthService from "../../common/services/AuthService";

const apiBaseUrl = config.apiBaseUrl;
const RoleService = {
    AddRole: async (roleData) => {
        const token = AuthService.getToken();
        const response = await fetch(`${apiBaseUrl}/Role/add-role`, {
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
        const token = AuthService.getToken();
        const response = await fetch(`${apiBaseUrl}/Role/get-roles`, {
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
    getRolesPermissions: async (token) => {
        try {
            const response = await fetch(`${apiBaseUrl}/Role/get-role-permissions`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${Cookies.get("token")}`
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
            const token = AuthService.getToken();
            const response = await fetch(`${apiBaseUrl}/Role/delete-role/${roleId}`, {
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
    editRole: async (roleId, roleData) => {
        try {
            const token = AuthService.getToken();
            const response = await fetch(`${apiBaseUrl}/Role/edit-role/${roleId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(roleData),
            });

            const responseData = await response.json();
            return await responseData;
        } catch (error) {
            console.error('Error fetching user roles:', error);
            return [];
        }
    },
};
export default RoleService;