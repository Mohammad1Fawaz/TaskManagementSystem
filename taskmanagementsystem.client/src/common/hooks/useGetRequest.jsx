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





//import axios from 'axios';
//import config from '../../../config';
//import AuthService from '../services/AuthService';
//import { useQuery, useMutation, useQueryClient } from 'react-query';
//import HelpersService from '../services/HelpersService';
//import { NotificationService } from '../services/NotificationService';
//const API_BASE_URL = config.apiBaseUrl;
//const axiosInstance = axios.create({
//    baseURL: API_BASE_URL,
//    headers: {
//        'Content-Type': 'application/json',
//    },
//});
//axiosInstance.interceptors.response.use(
//    (response) => response,
//    async (error) => {
//        const originalRequest = error.config;
//        if (error.response.status === 401) {
//            await AuthService.clearToken();
//            AuthService.clearToken();
//            await NotificationService.stopConnection();
//            HelpersService.notify("Token expired , Login first", "warning")
//            window.location.replace('/login');
//        }
//        return Promise.reject(error);
//    }
//);

//export const useGetRequest = (url, requestData = null, params = null, requiresAuth = true, options = {}) => {

//    const fetchData = async () => {
//        const accessToken = await AuthService.getToken();

//        let headers = {
//            'Content-Type': 'application/json',
//        };

//        if (requiresAuth) {
//            headers.Authorization = `Bearer ${accessToken}`;
//        }
//        if (params != null) {
//            url = `${url}?/${params}`;
//        }
//        const response = await axiosInstance({
//            method: 'GET',
//            url: url,
//            requestData,
//            headers,
//        });
//        return response.data;
//    };

//    const { data, isLoading, error, isFetching, refetch } = useQuery(url, fetchData, {
//        ...options,
//        onError: (error) => {
//            // Handle specific error cases
//            if (error.response.status === 401) {
//                // Redirect to access denied page or show a notification
//                HelpersService.notify('Token expired, please login again.', 'error');
//                // Example: Redirect to login page
//                // history.push('/login');
//            } else {
//                // Handle other types of errors if necessary
//                console.error('Error in useGetRequest:', error);
//            }
//        }
//    });

//    return { data, isLoading, error, isFetching, refetch };
//};

//export const usePostRequest = (url, requiresAuth = true, toBeValidatedQuery = [], options = {}) => {
//    const queryClient = useQueryClient();

//    const postData = async (requestData) => {
//        console.log("requestData", requestData);
//        const accessToken = await AuthService.getToken();

//        let headers = {
//            'Content-Type': 'application/json',
//        };

//        if (requiresAuth) {
//            headers.Authorization = `Bearer ${accessToken}`;
//        }

//        const response = await axiosInstance.post(url, requestData, { headers });
//        return response.data;
//    };

//    return useMutation(postData, {
//        ...options,
//        onError: (error) => {
//            // Handle specific error cases
//            if (error.response.status === 401) {
//                HelpersService.notify('Token expired, please login again.', 'error');
//                // Example: Redirect to login page
//                // history.push('/login');
//            } else {
//                // Handle other types of errors if necessary
//                console.error('Error in usePostRequest:', error);
//            }
//        },
//        onSuccess: (result) => {
//            // Handle success as needed
//            if (result.success) {
//                HelpersService.notify(result.message, "success");
//                if (toBeValidatedQuery.length > 0) {
//                    if (Array.isArray(toBeValidatedQuery)) {
//                        toBeValidatedQuery.forEach(queryKey => {
//                            queryClient.invalidateQueries(queryKey);
//                        });
//                    } else {
//                        queryClient.invalidateQueries([toBeValidatedQuery]);
//                    }
//                }
//            } else {
//                if (result.message) {
//                    HelpersService.notify(result.message, "error");
//                }
//            }
//        },
//    });
//};

//export const useDeleteRequest = (url, requiresAuth = true, toBeValidatedQuery = [], options = {}) => {
//    const queryClient = useQueryClient();

//    const deleteData = async (params) => {
//        const accessToken = await AuthService.getToken();

//        let headers = {
//            'Content-Type': 'application/json',
//        };

//        if (requiresAuth) {
//            headers.Authorization = `Bearer ${accessToken}`;
//        }

//        const response = await axiosInstance.delete(`${url}/${params}`, { headers });
//        return response.data;
//    };

//    return useMutation(deleteData, {
//        ...options,
//        onError: (error) => {
//            // Handle specific error cases
//            if (error.response.status === 401) {
//                HelpersService.notify('Token expired, please login again.', 'error');
//                // Example: Redirect to login page
//                // history.push('/login');
//            } else {
//                // Handle other types of errors if necessary
//                console.error('Error in useDeleteRequest:', error);
//            }
//        },
//        onSuccess: (result) => {
//            // Handle success as needed
//            if (result.success) {
//                HelpersService.notify(result.message, "success");
//                if (toBeValidatedQuery.length > 0) {
//                    if (Array.isArray(toBeValidatedQuery)) {
//                        toBeValidatedQuery.forEach(queryKey => {
//                            queryClient.invalidateQueries(queryKey);
//                        });
//                    } else {
//                        queryClient.invalidateQueries([toBeValidatedQuery]);
//                    }
//                }
//            } else {
//                if (result.message) {
//                    HelpersService.notify(result.message, "error");
//                }
//            }
//        },
//    });
//};

//export const useUpdateRequest = (url, requiresAuth = true, toBeValidatedQuery = [], options = {}) => {
//    const queryClient = useQueryClient();

//    const updateData = async (updateFormData) => {
//        const accessToken = await AuthService.getToken();

//        let headers = {
//            'Content-Type': 'application/json',
//        };

//        if (requiresAuth) {
//            headers.Authorization = `Bearer ${accessToken}`;
//        }

//        const response = await axiosInstance({
//            method: 'PUT',
//            url: `${url}/${updateFormData.id}`,
//            data: updateFormData.data,
//            headers,
//        });

//        return response.data;
//    };

//    return useMutation(updateData, {
//        ...options,
//        onError: (error) => {
//            // Handle specific error cases
//            if (error.response.status === 401) {
//                HelpersService.notify('Token expired, please login again.', 'error');
//                // Example: Redirect to login page
//                // history.push('/login');
//            } else {
//                // Handle other types of errors if necessary
//                console.error('Error in useUpdateRequest:', error);
//            }
//        },
//        onSuccess: (result) => {
//            // Handle success as needed
//            if (result.success) {
//                HelpersService.notify(result.message, "success");
//                if (toBeValidatedQuery.length > 0) {
//                    if (Array.isArray(toBeValidatedQuery)) {
//                        toBeValidatedQuery.forEach(queryKey => {
//                            queryClient.invalidateQueries(queryKey);
//                        });
//                    } else {
//                        queryClient.invalidateQueries([toBeValidatedQuery]);
//                    }
//                }
//            } else {
//                if (result.message) {
//                    HelpersService.notify(result.message, "error");
//                }
//            }
//        },
//    });
//};
