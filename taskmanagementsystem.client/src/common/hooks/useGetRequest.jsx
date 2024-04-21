import axios from 'axios';
import config from '../../../config';
import AuthService from '../services/AuthService';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import HelpersService from '../services/HelpersService';

const API_BASE_URL = config.apiBaseUrl;
const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const useGetRequest = (url, requestData = null, params = null, requiresAuth = true, options = {}) => {

    const fetchData = async () => {
        const accessToken = await AuthService.getToken();

        let headers = {
            'Content-Type': 'application/json',
        };

        if (requiresAuth) {
            headers.Authorization = `Bearer ${accessToken}`;
        }

        const response = await axiosInstance({
            method: 'GET',
            url: `${url}?/${params}`,
            requestData,
            headers,
        });
        return response.data;
    };

    const { data, isLoading, error ,isFetching , refetch } = useQuery(url, fetchData, options);

    return { data, isLoading, error, isFetching , refetch };
};

export const usePostRequest = (url, requiresAuth = true, toBeValidatedQuery = [], options = {}) => {
    const queryClient = useQueryClient();

    const postData = async (requestData) => {
        const accessToken = await AuthService.getToken();

        let headers = {
            'Content-Type': 'application/json',
        };

        if (requiresAuth) {
            headers.Authorization = `Bearer ${accessToken}`;
        }

        const response = await axiosInstance.post(url, requestData, { headers });
        return response.data;
    };
    return useMutation(postData, {
        ...options,
        onSuccess: (result) => {
            if (result.success) {
                HelpersService.notify(result.message, "success");
                if (toBeValidatedQuery.length > 0) {
                    if (Array.isArray(toBeValidatedQuery)) {
                        toBeValidatedQuery.forEach(queryKey => {
                            queryClient.invalidateQueries(queryKey);
                        });
                    } else {
                        queryClient.invalidateQueries([toBeValidatedQuery]);
                    }
                }
            } else {
                if (result.message) {
                    HelpersService.notify(result.message, "error");
                }
            }
        },
    });
};


export const useDeleteRequest = (url, requiresAuth = true, toBeValidatedQuery = [], options = {}) => {
    const queryClient = useQueryClient();

    const deleteData = async (params) => {
        const accessToken = await AuthService.getToken();

        let headers = {
            'Content-Type': 'application/json',
        };

        if (requiresAuth) {
            headers.Authorization = `Bearer ${accessToken}`;
        }

        const response = await axiosInstance.delete(`${url}/${params}`, { headers });
        return response.data;
    };

    return useMutation(deleteData, {
        ...options,
        onSuccess: (result) => {
            if (result.success) {
                HelpersService.notify(result.message, "success");
                if (toBeValidatedQuery.length > 0) {
                    if (Array.isArray(toBeValidatedQuery)) {
                        toBeValidatedQuery.forEach(queryKey => {
                            queryClient.invalidateQueries(queryKey);
                        });
                    } else {
                        queryClient.invalidateQueries([toBeValidatedQuery]);
                    }
                }
            } else {
                if (result.message) {
                    HelpersService.notify(result.message, "error");
                }
            }
        },
    });
};

export const useUpdateRequest = (url, requiresAuth = true, toBeValidatedQuery = [], options = {}) => {
    const queryClient = useQueryClient();

    const updateData = async (updateFormData) => {
        const accessToken = await AuthService.getToken();

        let headers = {
            'Content-Type': 'application/json',
        };

        if (requiresAuth) {
            headers.Authorization = `Bearer ${accessToken}`;
        }
        const response = await axiosInstance({
            method: 'PUT',
            url: `${url}/${updateFormData.id}`,
            data: updateFormData.data,
            headers,
        });

        return response.data;
    };

    return useMutation(updateData, {
        ...options,
        onSuccess: (result) => {
            if (result.success) {
                HelpersService.notify(result.message, "success");
                if (toBeValidatedQuery.length > 0) {
                    if (Array.isArray(toBeValidatedQuery)) {
                        toBeValidatedQuery.forEach(queryKey => {
                            queryClient.invalidateQueries(queryKey);
                        });
                    } else {
                        queryClient.invalidateQueries([toBeValidatedQuery]);
                    }
                }
            } else {
                if (result.message) {
                    HelpersService.notify(result.message, "error");
                }
            }
        },
    });
};

