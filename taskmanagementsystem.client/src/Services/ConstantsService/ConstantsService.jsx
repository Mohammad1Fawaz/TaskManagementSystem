import config from '../../.././config';

export const getCountries = async () => {
    const apiBaseUrl = config.apiBaseUrl;

    const response = await fetch(`${apiBaseUrl}/constants/countries`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const responseData = await response.json();
    return  responseData;
};
