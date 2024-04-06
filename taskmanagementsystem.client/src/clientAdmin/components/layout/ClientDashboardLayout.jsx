// ClientDashboardLayout.js
import React, { createContext} from 'react';
import Header from '../layout/Header';
import Sidebar from '../layout/Sidebar';
import MainContent from '../layout/MainContent';
import SettingsOffcanvas from '../layout/SettingsOffcanvas ';

import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import ClientAdminDashboardService from '../../services/ClientAdminDashboardService';

const ClientDashboardLayoutContext = createContext();
export const useClientDashboardLayoutContext = () => useContext(ClientDashboardLayoutContext);

const ClientDashboardLayout = () => {
    
};

export default ClientDashboardLayout;
