import { useEffect } from 'react';
import axios from "axios";
import config from '../../../config'
import AuthService from '../../common/services/AuthService';
import { useQuery, useMutation } from 'react-query';

//const queryOptions = {
//    enabled: true, // Whether the query should automatically execute. Defaults to true.
//    suspense: false, // Whether to use React Suspense for this query. Defaults to false.
//    retry: 3, // Number of times to retry the query upon failure. Defaults to 3.
//    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000), // Function that returns delay (in milliseconds) before retrying. Defaults to exponential backoff.
//    refetchOnWindowFocus: true, // Whether to automatically refetch the query when the window regains focus. Defaults to true.
//    refetchOnMount: true, // Whether to automatically refetch the query on component mount. Defaults to true.
//    refetchInterval: false, // Time (in milliseconds) to wait between automatic refetches. Set to 0 to disable automatic refetching. Defaults to false.
//    refetchIntervalInBackground: false, // Whether to automatically refetch the query at the specified interval even if the window is not focused. Defaults to false.
//    staleTime: 0, // Time (in milliseconds) after which data is considered stale and refetches are triggered in the background. Defaults to 0 (never stale).
//    cacheTime: Infinity, // Time (in milliseconds) after which the query cache will be invalidated and refetched from the server. Defaults to Infinity (never invalidate).
//    onError: error => { }, // Function to handle errors from the query. Defaults to a no-op function.
//    onSuccess: data => { }, // Function to handle successful data retrieval. Defaults to a no-op function.
//    onSettled: (data, error) => { }, // Function to handle both successful and failed query settlements. Defaults to a no-op function.
//    select: data => { }, // Function to select specific data from the query result. Defaults to returning the entire data object.
//    notifyOnChangeProps: ['data', 'error', 'isIdle', 'isLoading', 'isFetching', 'failureCount', 'isSuccess'], // Array of props that trigger notification when they change. Defaults to common query state properties.
//    suspense: false, // Whether to use React Suspense for this query. Defaults to false.
//    initialData: undefined, // Initial data to use for the query before the actual data is fetched.
//    structuralSharing: true, // Whether to use structural sharing to minimize memory usage when caching data. Defaults to true.
//};


const useFetch = (method, endPoint, requestData = {}, fetchDirectly = false, queryKey = "data-query", queryOptions = {}, needAuthentication = true) => {
    const token = needAuthentication ? AuthService.getToken() : "";
    const baseUrl = config.apiBaseUrl;
    const fetchData = async () => {
        try {
            let response;
            const headers = needAuthentication ? { Authorization: `Bearer ${token}` } : {};
            switch (method) {
                case "GET":
                    const dataIdToGet = endPoint.substring(endPoint.lastIndexOf('/') + 1);
                    response = await axios.get(`${baseUrl}/${endPoint}`, { headers, params: { id: dataIdToGet } });
                    break;
                case "POST":
                    response = await axios.post(`${baseUrl}/${endPoint}`, requestData, { headers });
                    break;
                case "PUT":
                    const dataIdToUpdate = endPoint.substring(endPoint.lastIndexOf('/') + 1);
                    response = await axios.put(`${baseUrl}/${endPoint}`, requestData, { headers, params: { id: dataIdToUpdate } });
                    break;
                case "DELETE":
                    const dataIdToDelete = endPoint.substring(endPoint.lastIndexOf('/') + 1);
                    response = await axios.delete(`${baseUrl}/${endPoint}`, { headers, data: requestData, params: { id: dataIdToDelete } });
                    break;
                default:
                    throw new Error(`Unsupported HTTP method: ${method}`);
            }
            return {
                data: response.data,
                isLoading: false,
                isSuccess: true,
                isError: false,
                error: ""
            };
        } catch (error) {
            console.log(error);
            return {
                data: null,
                isLoading: false,
                isSuccess: false,
                isError: true,
                error: error.response.data.message,
                errors: error.response.data.errors
            };
        } finally {
        }
            };

    useEffect(() => {
        if (fetchDirectly) {
            fetchData();
        }
    }, [fetchDirectly, fetchData]);

    
    const fetchQuery = useQuery(
        queryKey,
        async () => { },
        {
            enabled: fetchDirectly,
            ...queryOptions
        }
    );

    const mutateQuery = useMutation(fetchData, {
        onSuccess: (response) => {
            fetchQuery.refetch();
            return response;
        },
    });


    const handleRequest = async () => {
        try {
            const response = await mutateQuery.mutateAsync();
            return response;
        } catch (error) {
            throw error;
        }
    };

    return { fetchQuery, handleRequest };

    // Summary of fetchQuery uses:
    // 1. Data Access: Use fetchQuery.data to access fetched data.
    // 2. Loading State: Use fetchQuery.isLoading to check if the query is loading.
    // 3. Error Handling: Use fetchQuery.error to access error message and fetchQuery.isError to check if an error occurred.
    // 4. Refetching: Use fetchQuery.refetch() to manually trigger a refetch of the query.
    // 5. Caching: fetchQuery automatically handles caching of query results, reducing unnecessary network requests.
    // 6. Query State: Access other properties like fetchQuery.isIdle, fetchQuery.isSuccess, fetchQuery.isFetching, fetchQuery.failureCount, etc., for more customization.
};

export default useFetch;