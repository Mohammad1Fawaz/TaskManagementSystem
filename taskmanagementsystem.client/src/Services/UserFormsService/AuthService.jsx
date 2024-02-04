import config from '../../.././config';
import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // to be removed and set in main.jsx



export const registerUser = async (userData) => {
    const apiBaseUrl = config.apiBaseUrl;

    const response = await fetch(`${apiBaseUrl}/User/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });

    return await response.json();
};


export const loginUser = async (userData) => {
    const apiBaseUrl = config.apiBaseUrl;

    const response = await fetch(`${apiBaseUrl}/User/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });

    return await response.json();
};


export const VerifiyUser = async (token) => {
    const apiBaseUrl = config.apiBaseUrl;

    const response = await fetch(`${apiBaseUrl}/User/verify-email`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(token),
    });
    console.log("response",response);
    return await response.json();
};


export const successNotify = (message) => toast.success(message, { autoClose: false });
export const errorNotify = (message) => toast.error(message, { autoClose: false });
export const warningNotify = (message) => toast.warning(message, { autoClose: false });
