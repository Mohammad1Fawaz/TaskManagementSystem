import React, { createContext } from 'react';
import Header from '../layout/Header';
import Sidebar from '../layout/Sidebar';
import MainContent from '../layout/MainContent';
import SettingsOffcanvas from '../layout/SettingsOffcanvas ';

import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import DeveloperDashboardService from '../../services/DeveloperDashboardService';

const DeveloperDashboardLayoutContext = createContext();
export const useDeveloperDashboardLayoutContext = () => useContext(DeveloperDashboardLayoutContext);

const DeveloperDashboard = ({ userInfo }) => {
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
        GetOnlineUsers,
        onlineUsers,
    } = DeveloperDashboardService();

    return (
        <DeveloperDashboardLayoutContext.Provider value={{ selectedItem, setSelectedItem }}>
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
                <MainContent selectedItem={selectedItem} onlineUsers={onlineUsers} />
                <SettingsOffcanvas
                    show={show}
                    handleCloseSettings={handleCloseSettings}
                    customThemeColors={customThemeColors}
                    handleColorChange={handleColorChange}
                />
            </Box>
        </DeveloperDashboardLayoutContext.Provider>
    );
}
export default DeveloperDashboard;



