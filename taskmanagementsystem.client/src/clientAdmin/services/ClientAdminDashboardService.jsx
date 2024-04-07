import { useState, useEffect } from 'react';
import { NotificationService, realTimeConnection } from '../../common/services/NotificationService';
import HelpersService from '../../common/services/HelpersService';
import Swal from 'sweetalert2';
import AuthService from '../../common/services/AuthService';
import { useNavigate } from 'react-router-dom'
import useFetch from "../../common/hooks/useFetch"
const ClientAdminDashboardService = () => {

    const [open, setOpen] = useState(true);
    const [showLogo, setShowLogo] = useState(false);
    const [selectedItem, setSelectedItem] = useState(0);
    const [notifications, setNotifications] = useState([]);
    const [notificationsCount, setNotificationsCount] = useState(0);
    const [show, setShow] = useState(false);
    const [darkTheme, setDarkTheme] = useState(false);
    const [customThemeColors, setCustomThemeColors] = useState(getSavedColors());
    const [notificationsAnchorEl, setNotificationsAnchorEl] = useState(null);
    const [logoutAnchorEl, setLogoutAnchorEl] = useState(null);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const openNotifications = Boolean(notificationsAnchorEl);
    const [openLogoutDropdown, setOpenLogoutDropdown] = useState(false);
    const { mutate } = useFetch("logout-query", {}, true);
    const navigate = useNavigate();

    useEffect(() => {
        applyCustomTheme();
        saveColors();
        realTimeConnection.on("receiveNotification", (notification) => {
            const newNotification = {
                id: notification.id,
                sender: notification.senderId,
                content: notification.content,
            };
            setNotifications((prevNotifications) => [...prevNotifications, newNotification]);
            setNotificationsCount((prevCount) => prevCount + 1);
            HelpersService.notify(`New: ${notification.content}`, "info");
        });
        GetNotifications();
        return () => {
            realTimeConnection.off("receiveNotification");
        };

        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };

    }, [customThemeColors]);

    useEffect(() => {
        if (screenWidth < 960) {
            setOpen(false);
        } else {
            setOpen(true);
        }
    }, [screenWidth]);


    const GetNotifications = async () => {
        try {
            const response = await NotificationService.getUnreadNotifications();
            setNotifications(response);
            setNotificationsCount(response.length);
        } catch (error) {
            console.error('Error fetching Notifications:', error);
        }
    };

    const handleOpenNotifications = (event) => {
        if (notifications.length === 0) {
            return;
        }
        setNotificationsAnchorEl(event.currentTarget);
        markNotificationsAsRead();
    };

    const handleCloseNotifications = () => {
        setNotificationsAnchorEl(null);
    };

    const handleLogoutDropdownOpen = (event) => {
        setLogoutAnchorEl(event.currentTarget);
        setOpenLogoutDropdown(true);
    };

    const handleLogoutDropdownClose = () => {
        setLogoutAnchorEl(null);
        setOpenLogoutDropdown(false);
    };

    function getSavedColors() {
        const savedColors = localStorage.getItem('customThemeColors');
        return savedColors ? JSON.parse(savedColors) : getDefaultColors();
    }

    function getDefaultColors() {
        return {
            '--main-hover-primary-color': '#a4d1ff',
            '--main-hover-secondary-color': '#eff7ff',
            '--main-focus-primary-color': '#626262',
            '--main-focus-secondary-color': '#626262',
            '--main-background-primary-color': '#f7f8f9',
            '--main-background-secondary-color': '#fff',
            '--text-primary-color': '#626262',
            '--text-secondary-color': '#626262',
            '--button-primary-color': '#66b2ff',
            '--button-secondary-color': '#5EBD96',
            '--button-hover-primary-color': '#90c8ff',
            '--button-hover-secondary-color': '#5EBD96',
            '--input-hover-primary-color': '#eff7ff',
            '--input-hover-secondary-color': '#a4d1ff',
            '--input-focus-primary-color': '#a4d1ff',
            '--input-focus-secondary-color': '#eff7ff',
        };
    }

    function saveColors() {
        localStorage.setItem('customThemeColors', JSON.stringify(customThemeColors));
    }

    const handleCloseSettings = () => setShow(false);

    const handleSettings = () => setShow(true);

    const handleLogout = async () => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'var(--button-primary-color)',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, continue!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const variables = {
                        endPoint: 'Auth/logout',
                        method: 'POST'
                    };
                    const response = await mutate.mutateAsync(variables);
                    const data = response.data;
                    if (data.success) {
                        AuthService.clearToken();
                        HelpersService.notify(data.message, "success");
                        navigate('/login');
                    } else {
                        if (data.error) {
                            HelpersService.notify(data.error, "error");
                        }
                    }
                } catch (error) {
                    HelpersService.notify('Error during Logout', "error");
                    console.error(error, "error");
                }
            }
        });
    };

    const handleDrawerOpen = () => {
        setOpen(true);
        setShowLogo(false);
    };

    const handleDrawerClose = () => {
        setOpen(false);
        setShowLogo(true);
    };

    const handleListItemClick = (index) => {
        setSelectedItem(index);
    };

    const applyCustomTheme = () => {
        const root = document.documentElement;

        for (const [variable, color] of Object.entries(customThemeColors)) {
            root.style.setProperty(variable, color);
        }
    };

    const handleThemeToggle = () => {
        setDarkTheme(!darkTheme);
        setCustomThemeColors(darkTheme ? getDefaultColors() : {
            '--main-hover-primary-color': '#2c5274',
            '--main-hover-secondary-color': '#293e51',
            '--main-focus-primary-color': '#44e6a2',
            '--main-focus-secondary-color': '#44e6a2',
            '--main-background-primary-color': '#2c2f3e',
            '--main-background-secondary-color': '#fff',
            '--text-primary-color': '#ffffffcc',
            '--text-secondary-color': '#626262',
            '--button-primary-color': '#66b2ff',
            '--button-secondary-color': '#66b2ff',
            '--button-hover-primary-color': '#014588',
            '--button-hover-secondary-color': '#014588',
            '--input-hover-primary-color': '#014588',
            '--input-hover-secondary-color': '#014588',
            '--input-focus-primary-color': '#014588',
            '--input-focus-secondary-color': '#44e6a2',
        });
    };

    const handleColorChange = (variable, color) => {
        document.documentElement.style.setProperty(variable, color);
        setCustomThemeColors((prevColors) => ({
            ...prevColors,
            [variable]: color,
        }));
    };

    const markNotificationsAsRead = async () => {
        try {
            await NotificationService.markNotificationsAsReaded();
            setNotificationsCount(0);
        } catch (error) {
            console.error('Error fetching Notifications:', error);
        }
    }


    return {
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
        
    };
};

export default ClientAdminDashboardService;
