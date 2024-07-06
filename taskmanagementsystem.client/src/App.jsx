import React from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { CircularProgress } from '@mui/material/index';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import usePrivateRoute from '../src/common/hooks/usePrivateRoute';
import VerificationPage from './common/pages/VerificationPage';
import AccessDeniedPage from './common/pages/AccessDeniedPage';
import ClientAdminPage from './clientAdmin/pages/ClientAdminPage';
import LoginPage from './common/pages/LoginPage';
import ResetPasswordPage from './common/pages/ResetPasswordPage';
import SignupPage from './common/pages/SignupPage';
import ClientVerificationPage from '../src/clientAdmin/pages/ClientVerificationPage';
import Developer from './developer/pages/DeveloperPage';
import ClientDashboardLayout from './clientAdmin/components/layout/ClientDashboard';
import Roles from '../src/clientAdmin/pages/Roles'
import Users from '../src/clientAdmin/pages/Users'
import Projects from '../src/clientAdmin/pages/Projects'
import DeveloperPage from '../src/developer/pages/DeveloperPage'
import Board from './developer/pages/Board';
import Backlogs from './developer/pages/Backlogs';
import DeveloperDashboard from './developer/components/layout/DeveloperDashboard';
const queryClient = new QueryClient();

const PrivateRoute = ({ element, requiredRoles }) => {
    const { isLoading, isAuthenticated, isAuthorized, userInfo } = usePrivateRoute(requiredRoles);

    if (isLoading) {
        return <div className="flex flex-center h-[100vh]"><CircularProgress /></div>;
    }

    return isAuthenticated && isAuthorized ? (
        React.cloneElement(element, { userInfo })
    ) : (
        <Navigate to="/AccessDenied" replace />
    );

};
function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <ToastContainer autoClose={5000} />
                <Routes>
                    <Route path="/" element={
                        <LoginPage />
                    } />
                    <Route path="/login" element={
                        <LoginPage />
                    } />
                    <Route path="/register" element={
                        <SignupPage />
                    } />
                    <Route path="/AccessDenied" element={
                        <AccessDeniedPage />
                    } />
                    <Route path="/Users" element={
                        <PrivateRoute element={
                            <ClientDashboardLayout breadCrumbs="ClientAdmin/Users">
                                <Users />
                            </ClientDashboardLayout>
                        } requiredRoles={['ClientAdmin']} />
                    } />
                    <Route path="/Roles" element={
                          <PrivateRoute element={
                            <ClientDashboardLayout breadCrumbs="ClientAdmin/Roles">
                                <Roles />
                            </ClientDashboardLayout>
                        } requiredRoles={['ClientAdmin']} />
                    } />
                    <Route path="/Projects" element={
                        <PrivateRoute element={
                            <ClientDashboardLayout breadCrumbs="ClientAdmin/Projects">
                                <Projects />
                            </ClientDashboardLayout>
                        } requiredRoles={['ClientAdmin']} />
                    } />
                    <Route path="/board" element={
                        <PrivateRoute element={
                            <DeveloperDashboard breadCrumbs= "Developer/Board">
                                <Board />
                            </DeveloperDashboard>
                        } requiredRoles={['User', 'ClientAdmin']} />
                    } />
                    <Route path="/backlogs" element={
                        <PrivateRoute element={
                            <DeveloperDashboard breadCrumbs="Developer/Backlogs">
                                <Backlogs />
                            </DeveloperDashboard>
                        } requiredRoles={['User', 'ClientAdmin']} />
                    } />
                </Routes>
            </Router>
            <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
        </QueryClientProvider>
    );
}

export default App;

