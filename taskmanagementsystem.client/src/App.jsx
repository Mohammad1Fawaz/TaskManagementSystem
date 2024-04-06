import React, { useEffect, useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { CircularProgress } from '@mui/material/index';
import { QueryClient, QueryClientProvider } from 'react-query';

import VerificationPage from './common/pages/VerificationPage';
import AccessDeniedPage from './common/pages/AccessDeniedPage';
import ClientAdminPage from './clientAdmin/pages/ClientAdminPage';
import LoginPage from './common/pages/LoginPage';
import ResetPasswordPage from './common/pages/ResetPasswordPage';
import SignupPage from './common/pages/SignupPage';
import AuthService from './common/Services/AuthService';
import RoleService from './clientAdmin/Services/RoleService';
import ClientVerificationPage from '../src/clientAdmin/pages/ClientAdminPage';
import Developer from './developer/pages/DeveloperPage';


const queryClient = new QueryClient();

function App() {
    const PrivateRoute = ({ element, requiredRoles }) => {
        const [isLoading, setIsLoading] = useState(true);
        const [isAuthenticated, setIsAuthenticated] = useState(false);
        const [isAuthorized, setIsAuthorized] = useState(false);

        useEffect(() => {
            const checkAuthorization = async () => {
                try {
                    const token = AuthService.getToken();
                    console.log("token", token);
                    if (token) {
                        setIsAuthenticated(true);
                        const userRole = await RoleService.getUserRoles(token);
                        const authorized = requiredRoles == userRole;
                        setIsAuthorized(authorized);
                    } else {
                        setIsAuthenticated(false);
                        setIsAuthorized(false);
                    }
                    console.error(isAuthenticated,isAuthorized);

                } catch (error) {
                    console.error('Error checking user roles:', error);
                    setIsAuthenticated(false);
                    setIsAuthorized(false);
                } finally {
                    setIsLoading(false);
                }
            };

            checkAuthorization();
        }, [requiredRoles]);

        if (isLoading) {
            return <div className="flex flex-center h-full"><CircularProgress /></div>;
        }

        return (isAuthenticated && isAuthorized) ?  element : <Navigate to="/AccessDenied" replace /> ;
    };

    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <ToastContainer autoClose={false} />
                <main className="w-full h-full overflow-x-hidden">
                    <Routes>
                        <Route path="/" element={<LoginPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<SignupPage />} />
                        <Route path="/VerificationPage" element={<VerificationPage />} />
                        <Route path="/ClientVerificationPage" element={<ClientVerificationPage />} />
                        <Route path="/AccessDenied" element={<AccessDeniedPage />} />
                        <Route path="/ResetPassword" element={<ResetPasswordPage />} />
                        <Route path="/ClientAdmin" element={<PrivateRoute element={<ClientAdminPage />} requiredRoles={['ClientAdmin']} />} />
                        <Route path="/Developer" element={<PrivateRoute element={<Developer />} requiredRoles={['User']} />} />
                    </Routes>
                </main>
            </Router>
        </QueryClientProvider>
    );
}

export default App;