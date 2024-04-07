import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import WorkIcon from '@mui/icons-material/Work';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import Brightness3Icon from '@mui/icons-material/Brightness3';
import Offcanvas from 'react-bootstrap/Offcanvas';
import MainLogo from '../../ui/images/MainLogo';
import Roles from './Roles';
import Users from './Users';
import HelpersService from '../../../Services/HelpersService';
import Swal from 'sweetalert2';
import AuthService from '../../../Services/AuthService';
import useFetch from '../../../hooks/useFetch';
const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));
const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});
const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export const ClientDashboardLayoutContext = React.createContext();

const ClientDashboardLayout = ({ children }) => {
    const [open, setOpen] = useState(true);
    const [showLogo, setShowLogo] = useState(false);
    const [selectedItem, setSelectedItem] = useState(0);
    const [show, setShow] = useState(false);
    const [darkTheme, setDarkTheme] = useState(false);
    const [customThemeColors, setCustomThemeColors] = useState(getSavedColors());
    const theme = useTheme();
    const navigate = useNavigate();
    const { mutate } = useFetch("logout-query", {}, true);
    useEffect(() => {
        applyCustomTheme();
        saveColors();
    }, [customThemeColors]);

    function getSavedColors() {
        const savedColors = localStorage.getItem('customThemeColors');
        return savedColors ? JSON.parse(savedColors) : getDefaultColors();
    }

    function getDefaultColors() {
        return {
            '--main-hover-primary-color': '#a4d1ff',
            '--main-hover-secondary-color': '#eff7ff',
            '--main-focus-primary-color': '#44e6a2',
            '--main-focus-secondary-color': '#44e6a2',
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

    return (
        <ClientDashboardLayoutContext.Provider value={{ selectedItem, setSelectedItem }}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="fixed" open={open}>
                    <Toolbar sx={{ bgcolor: 'var(--main-background-primary-color)' }}>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{
                                marginRight: '36px',
                                ...(open && { display: 'none' }),
                                bgcolor: 'var(--button-primary-color)',
                                '&:hover': {
                                    bgcolor: 'var(--button-hover-primary-color)',
                                },
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap component="div">
                            {showLogo && <MainLogo className="w-[115px]  m-auto" />}
                        </Typography>
                        <Typography component="div" sx={{ marginLeft: 'auto' }}>
                            <IconButton onClick={handleThemeToggle}>
                                {darkTheme ? <Brightness3Icon sx={{ color: 'var(--button-primary-color)' }} /> : <WbSunnyIcon sx={{ color: 'var(--button-primary-color)' }} />}
                            </IconButton>
                            <IconButton>
                                <NotificationsIcon sx={{ color: 'var(--button-primary-color)' }} />
                            </IconButton>
                            <IconButton onClick={handleSettings}>
                                <SettingsIcon sx={{ color: 'var(--button-primary-color)' }} />
                            </IconButton>
                            <IconButton onClick={handleLogout}>
                                <AccountBoxIcon sx={{ color: 'var(--button-primary-color)' }} />
                            </IconButton>
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open} sx={{ bgcolor: 'var(--main-background-primary-color)', minHeight: '100vh' }} >
                    <DrawerHeader>
                        <Typography variant="h6" noWrap component="div" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '65px', marginLeft: 'auto', marginRight: 'auto' }}>
                        </Typography>
                        <MainLogo className="w-[115px]  m-auto" />

                        <IconButton onClick={handleDrawerClose} sx={{ color: 'var(--button-primary-color)' }}>
                            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                        </IconButton>
                    </DrawerHeader>
                    <Divider />
                    <List
                        sx={{
                            bgcolor: 'var(--main-background-primary-color)',
                        }}
                    >
                        {['Users', 'Roles', 'Projects'].map((text, index) => (
                            <ListItem
                                key={text}
                                disablePadding sx={{ display: 'block' }}
                                onClick={() => handleListItemClick(index)}
                                selected={selectedItem === index}>
                                <ListItemButton
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                        bgcolor: index === selectedItem ? 'var(--button-primary-color)' : 'inherit',
                                        '&:hover': {
                                            bgcolor: 'var(--main-hover-secondary-color)',
                                        },
                                        color: 'var(--text-primary-color)'
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                            color: 'var(--text-primary-color)'
                                        }}
                                    >
                                        {index === 0 ? <PersonIcon /> : index === 1 ? <GroupIcon /> : <WorkIcon />}
                                    </ListItemIcon>
                                    <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                                </ListItemButton>
                                <Divider />
                            </ListItem>
                        ))}
                    </List>
                </Drawer>
                <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: 'var(--main-background-primary-color)', minHeight: '100vh' }}>
                    <DrawerHeader />
                    {selectedItem === 0 && (
                        <div className="bg-[var(--main-background-primary-color)] p-4">
                            <Users setSelectedItem={setSelectedItem} />
                        </div>
                    )}
                    {selectedItem === 1 && (
                        <div className="bg-[var(--main-background-primary-color)] p-4">
                            <Roles />
                        </div>
                    )}
                    {selectedItem === 2 && (
                        <div className="bg-[var(--main-background-primary-color)] p-4">
                            Projects page
                        </div>
                    )}
                </Box>
            </Box>
            <Offcanvas show={show} onHide={handleCloseSettings} placement='end' name='end' className="z-100 bg-[var(--main-background-primary-color)]">
                <Typography variant="h6">Customize Theme</Typography>
                <div className="color-picker-container h-full overflow-y-auto py-[50px] pl-[50px]">
                    <div className="color-picker-scroll">
                        {Object.entries(customThemeColors).map(([variable, defaultValue]) => (
                            <div key={variable} className="color-picker-wrapper flex">
                                <label htmlFor={variable}>{variable.slice(2)}:</label>
                                <div className="color-picker-circle">
                                    <input type="color" id={variable} value={customThemeColors[variable]} onChange={(e) => handleColorChange(variable, e.target.value)} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Offcanvas>

        </ClientDashboardLayoutContext.Provider>
    );
};

export default ClientDashboardLayout;
