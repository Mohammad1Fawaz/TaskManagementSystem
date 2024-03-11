import React, { useEffect, useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import VerificationPage from '../src/pages/VerificationPage';
import './App.css';
import Home from './Components/layout/Home/IntroSection';
import AccessDeniedPage from './pages/AccessDeniedPage';
import ClientAdminPage from './pages/ClientAdminPage';
import LoginPage from './pages/LoginPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import SignupPage from './pages/SignupPage';
import AuthService from './Services/AuthService';
import ClientVerificationPage from './pages/ClientVerificationPage';
import Developer from './pages/DeveloperPage';


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
                        const userRole = await AuthService.getUserRoles(token);
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
            return <div>Loading...</div>;
        }

        return (isAuthenticated && isAuthorized) ?  element : <Navigate to="/AccessDenied" replace /> ;
    };

    return (
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
    );
}

export default App;