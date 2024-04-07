import React from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { CircularProgress } from '@mui/material/index';
import { QueryClient, QueryClientProvider } from 'react-query';
import usePrivateRoute from '../src/common/hooks/usePrivateRoute';
import VerificationPage from './common/pages/VerificationPage';
import AccessDeniedPage from './common/pages/AccessDeniedPage';
import ClientAdminPage from './clientAdmin/pages/ClientAdminPage';
import LoginPage from './common/pages/LoginPage';
import ResetPasswordPage from './common/pages/ResetPasswordPage';
import SignupPage from './common/pages/SignupPage';
import ClientVerificationPage from '../src/clientAdmin/pages/ClientAdminPage';
import Developer from './developer/pages/DeveloperPage';
const queryClient = new QueryClient();
function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <ToastContainer autoClose={false} />
                <main className="w-full h-[100vh] overflow-x-hidden">
                    <Routes>
                        <Route path="/" element={<LoginPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<SignupPage />} />
                        <Route path="/VerificationPage" element={<VerificationPage />} />
                        <Route path="/ClientVerificationPage" element={<ClientVerificationPage />} />
                        <Route path="/AccessDenied" element={<AccessDeniedPage />} />
                        <Route path="/ResetPassword" element={<ResetPasswordPage />} />
                        <Route path="/ClientAdmin" element={<PrivateRoute element={<ClientAdminPage />} requiredRoles={['ClientAdmin']} />} />
                        <Route path="/Developer" element={<PrivateRoute element={<Developer />} requiredRoles={['User', 'ClientAdmin']} />} />
                    </Routes>
                </main>
            </Router>
        </QueryClientProvider>
    );
}

const PrivateRoute = ({ element, requiredRoles }) => {
    const { isLoading, isAuthenticated, isAuthorized , userInfo } = usePrivateRoute(requiredRoles);

    if (isLoading) {
        return <div className="flex flex-center h-full"><CircularProgress /></div>;
    }

    return isAuthenticated && isAuthorized ? (
        React.cloneElement(element, { userInfo })
    ) : (
        <Navigate to="/AccessDenied" replace />
    );

};

export default App;