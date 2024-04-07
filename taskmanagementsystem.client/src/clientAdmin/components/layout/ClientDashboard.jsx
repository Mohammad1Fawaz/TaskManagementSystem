import React, { createContext } from 'react';
import Header from '../layout/Header';
import Sidebar from '../layout/Sidebar';
import MainContent from '../layout/MainContent';
import SettingsOffcanvas from '../layout/SettingsOffcanvas ';

import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import ClientAdminDashboardService from '../../services/ClientAdminDashboardService';

const ClientDashboardLayoutContext = createContext();
export const useClientDashboardLayoutContext = () => useContext(ClientDashboardLayoutContext);

const ClientDashboard = ({ userInfo }) => {
    const {
        open,
        setOpen,
        showLogo,
        setShowLogo,
        selectedItem,
        setSelectedItem,
        notifications,
        notificationsCount,
        show,
        setShow,
        darkTheme,
        setDarkTheme,
        customThemeColors,
        setCustomThemeColors,
        notificationsAnchorEl,
        setNotificationsAnchorEl,
        openNotifications,
        handleOpenNotifications,
        handleCloseNotifications,
        handleCloseSettings,
        handleSettings,
        handleLogout,
        handleDrawerOpen,
        handleDrawerClose,
        handleListItemClick,
        handleThemeToggle,
        handleColorChange,
        markNotificationsAsRead,
        openLogoutDropdown,
        handleLogoutDropdownOpen,
        handleLogoutDropdownClose,
        logoutAnchorEl,
        setLogoutAnchorEl,
    } = ClientAdminDashboardService();

    return (
        <ClientDashboardLayoutContext.Provider value={{ selectedItem, setSelectedItem }}>
            <Box className="flex justify-between">
                <CssBaseline />
                <Header
                    open={open}
                    darkTheme={darkTheme}
                    handleThemeToggle={handleThemeToggle}
                    handleOpenNotifications={handleOpenNotifications}
                    handleCloseNotifications={handleCloseNotifications}
                    notifications={notifications}
                    notificationsCount={notificationsCount}
                    handleSettings={handleSettings}
                    handleLogout={handleLogout}
                    showLogo={showLogo}
                    handleDrawerOpen={handleDrawerOpen}
                    openNotifications={openNotifications}
                    notificationsAnchorEl={notificationsAnchorEl}
                    openLogoutDropdown={openLogoutDropdown}
                    handleLogoutDropdownOpen={handleLogoutDropdownOpen}
                    handleLogoutDropdownClose={handleLogoutDropdownClose}
                    logoutAnchorEl={logoutAnchorEl}
                    setLogoutAnchorEl={setLogoutAnchorEl}
                    userInfo={userInfo}
                />
                <Sidebar
                    open={open}
                    selectedItem={selectedItem}
                    handleDrawerClose={handleDrawerClose}
                    handleListItemClick={handleListItemClick}
                />
                <MainContent selectedItem={selectedItem} />
                <SettingsOffcanvas
                    show={show}
                    handleCloseSettings={handleCloseSettings}
                    customThemeColors={customThemeColors}
                    handleColorChange={handleColorChange}
                />
            </Box>
        </ClientDashboardLayoutContext.Provider>
    );
}
export default ClientDashboard;



