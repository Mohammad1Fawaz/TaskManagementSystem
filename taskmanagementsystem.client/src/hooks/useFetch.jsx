import { useState, useEffect } from 'react';
import config from '/config.js';
import Cookies from 'js-cookie';

const apiBaseUrl = config.apiBaseUrl;
const token = Cookies.get("token");
const useFetch = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    const fetchData = async (endpoint, requestData = {}, method = 'GET') => {
        setLoading(true);
        setMessage(null);
        console.log(requestData);
        try {
            const requestOptions = {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: method === 'GET' ? null : JSON.stringify(requestData)
            };

            const response = await fetch(`${apiBaseUrl}/${endpoint}`, requestOptions);
            const responseData = await response.json();

            setData(responseData);

            setLoading(false);
            return { data: responseData, loading: false, message: responseData.message };
        } catch (error) {
            console.error("error", error);
            setMessage(error.message);
            setLoading(false);
            return { data: null, loading: false, message: error.message };
        }
    };

    return {fetchData};
};

export default useFetch;