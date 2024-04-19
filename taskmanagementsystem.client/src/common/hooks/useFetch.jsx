import axios from "axios";
import config from "../../../config";
import AuthService from "../services/AuthService";
import { useQuery, useMutation } from "react-query";
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

const useFetch = (queryKey = [], queryOptions = {}, needAuthentication = true) => {
    const token = needAuthentication ? AuthService.getToken() : "";
    const baseUrl = config.apiBaseUrl;
    const headers = needAuthentication
        ? { Authorization: `Bearer ${token}` }
        : {};

    const getData = async (endPoint, requestParam = "") => {
        try {
            let url = `${baseUrl}/${endPoint}`;
            if (requestParam !== "") {
                url = `${baseUrl}/${endPoint}/${requestParam}`;
            }
            const response = await axios.get(
                url,
                { headers }
            );
            return response.data;
        } catch (error) {
            console.log(error.response);
            return error.response;
        }
    };
    const fetchedData = useQuery(queryKey, ({queryKey} ) => getData(queryKey[1]), {
        ...queryOptions,
        enabled: false
    });

    const mutateData = async (endPoint, method, requestData = {}, requestParam = '') => {
        try {
            let url = `${baseUrl}/${endPoint}`;
            if (requestParam !== "") {
                url = `${baseUrl}/${endPoint}/${requestParam}`;
            }
            switch (method) {
                case 'POST': {
                    const response = await axios.post(url, requestData, { headers });
                    return response;
                }
                case 'PUT': {
                    const response = await axios.put(url, requestData, { headers });
                    return response;
                }
                case 'DELETE': {
                    const response = await axios.delete(url, { headers });
                    return response;
                }
                default:
                    break;
            }
        } catch (error) {
            return error.response;
        }
    };
    const mutate = useMutation(
        async ({ endPoint, method, requestData = {}, requestParam = '' }) => {
            return await mutateData(endPoint, method, requestData, requestParam);
        },
        {
            ...queryOptions,
            onSuccess: (response) => {
                console.log('Mutation succeeded:', response);
                return response;
            },
            onError: (error) => {
                console.error('Mutation failed:', error);
            }
        }
    );

    return { fetchedData, mutate };

    // Summary of fetchQuery uses:
    // 1. Data Access: Use fetchQuery.data to access fetched data.
    // 2. Loading State: Use fetchQuery.isLoading to check if the query is loading.
    // 3. Error Handling: Use fetchQuery.error to access error message and fetchQuery.isError to check if an error occurred.
    // 4. Refetching: Use fetchQuery.refetch() to manually trigger a refetch of the query.
    // 5. Caching: fetchQuery automatically handles caching of query results, reducing unnecessary network requests.
    // 6. Query State: Access other properties like fetchQuery.isIdle, fetchQuery.isSuccess, fetchQuery.isFetching, fetchQuery.failureCount, etc., for more customization.
};

export default useFetch;