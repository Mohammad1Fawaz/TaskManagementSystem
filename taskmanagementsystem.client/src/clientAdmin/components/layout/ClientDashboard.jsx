import { Box, CssBaseline } from '@mui/material';
import Header from '../layout/Header';
import SideBar from '../layout/Sidebar';
import MainContent from '../layout/MainContent';
import { useState } from 'react';
import ClientAdminDashboardService from '../../services/ClientAdminDashboardService';
import { useDispatch, useSelector } from 'react-redux';
import { setActivePage } from '../../../common/redux/actions';
import Sidebar from '../layout/Sidebar';
import { useEffect } from 'react';
const DashboardLayout = ({ children, breadCrumbs }) => {
   const {
       open,
       setOpen,
       showLogo,
       setShowLogo,
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
       OnlineUsersCount
    } = ClientAdminDashboardService();
    const loggedInUser = useSelector((state) => state.loggedInUser);
    const selectedItem = useSelector((state) => state.activePage);
    useEffect(() => {
        const body = document.querySelector('body');
        if (body) {
            body.style.overflowY = 'auto';
        }
    }, []);

    return (
        <Box sx={{ display: 'flex', p: 0}}>
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
             />
             <Sidebar
                open={open}
                darkTheme={darkTheme}
                selectedItem={selectedItem}
                handleDrawerClose={handleDrawerClose}
                handleListItemClick={handleListItemClick}
             />
             {/*<SettingsOffcanvas*/}
             {/*    show={show}*/}
             {/*    handleCloseSettings={handleCloseSettings}*/}
             {/*    customThemeColors={customThemeColors}*/}
             {/*    handleColorChange={handleColorChange}*/}
             {/*/>*/}
            <MainContent element={children} breadCrumbs={breadCrumbs} />
        </Box>
    );
};

export default DashboardLayout;


