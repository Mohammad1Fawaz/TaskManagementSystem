import config from '../../../config';

const ConstantsService = {
    getCountries : async () => {
        const apiBaseUrl = config.apiBaseUrl;

        const response = await fetch(`${apiBaseUrl}/constants/countries`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const responseData = await response.json();
        return responseData;
    },
    getPermissions: async () => {
        const apiBaseUrl = config.apiBaseUrl;

        const response = await fetch(`${apiBaseUrl}/constants/permissions`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const responseData = await response.json();
        return responseData;
    },
    
}

export default ConstantsService;