// Header.js
import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Brightness3Icon from '@mui/icons-material/Brightness3';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Badge from '@mui/material/Badge';
import MainLogo from '../../../common/components/ui/images/MainLogo';
import MenuIcon from '@mui/icons-material/Menu';
import { styled} from '@mui/material/styles';
import NotificationBox from '../layout/NotificationBox';
import Popover from '@mui/material/Popover';
import Avatar from '../../../common/components/ui/other/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import LogoutIcon from '@mui/icons-material/Logout';
import DeveloperBoardIcon from '@mui/icons-material/DeveloperBoard';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useDispatch, useSelector } from 'react-redux';
import ManageSearchOutlinedIcon from '@mui/icons-material/ManageSearchOutlined';
import TextInput from '../../../common/components/ui/inputs/TextInput';
import PopoverDropdown from '../../../common/components/ui/inputs/PopoverDropdown';
const drawerWidth = 240;

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
    boxShadow: 'none',
}));

const Header = ({
    open,
    darkTheme,
    openNotifications,
    openLogoutDropdown,
    handleCloseNotifications,
    handleOpenNotifications,
    handleLogoutDropdownOpen,
    handleLogoutDropdownClose,
    notifications,
    notificationsCount,
    handleThemeToggle,
    showLogo,
    handleDrawerOpen,
    handleSettings,
    handleLogout,
    notificationsAnchorEl,
    logoutAnchorEl,
}) => {
    const navigate = useNavigate();
    const loggedInUser = useSelector((state) => state.loggedInUser);
    return (
        <AppBar position="fixed" open={open} className="bg-[var(--header-background-primary-color)]">
            <Toolbar sx={{ bgcolor: 'var(--header-background-primary-color)', borderBottom: `1px solid ${darkTheme ? '#ffffff1a' : '#eaedf1'}` }}>
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
                <TextInput
                    className=""
                    placeholder="Search for results..."
                    type="text"
                    icon="fa-search"
                />
                <Typography component="div" sx={{ marginLeft: 'auto' }}>
                    <IconButton onClick={handleThemeToggle}>
                        {darkTheme ? <Brightness3Icon sx={{ color: 'var(--button-primary-color)' }} /> : <WbSunnyIcon sx={{ color: 'var(--button-primary-color)' }} />}
                    </IconButton>
                    <PopoverDropdown
                        btnText={
                            <Badge badgeContent={notificationsCount ?? 0} color="primary">
                                <NotificationsIcon sx={{ color: 'var(--button-primary-color)' }} />
                            </Badge>
                        }
                        className="ms-3 inline-block"
                        contentClassName="!w-[300px]"
                        dropdownContent={<NotificationBox notifications={notifications} />}
                        popoverPosition="right"
                        btnClassName="btn-sm !bg-transparent"
                        notSelect={true}
                    />
                    <IconButton onClick={handleSettings}>
                        <SettingsIcon sx={{ color: 'var(--button-primary-color)' }} />
                    </IconButton>
                    <IconButton onClick={handleLogout}>
                        <AccountBoxIcon sx={{ color: 'var(--button-primary-color)' }} />
                    </IconButton>
                    <Avatar
                        text={loggedInUser?.userName?.charAt(0).toUpperCase()}
                        size="40px"
                        sx={{
                            width: '30px',
                            height: '30px',
                        }}
                        className ="!inline-block ms-2"
                    />
                    <PopoverDropdown
                        btnText="Admin"
                        className="!inline-block"
                        notSelect={true}
                        dropdownContent={
                            <List>
                                <ListItem className="popover-item">
                                    <button onClick={() => { handleLogoutDropdownClose(); handleLogout() }}>
                                        <LogoutIcon />  Logout
                                    </button>
                                </ListItem>
                                <ListItem className="popover-item">
                                    <button onClick={() => { handleLogoutDropdownClose(); navigate('/board'); }}>
                                        <DeveloperBoardIcon /> Developer
                                    </button>
                                </ListItem>
                            </List>
                        }
                        popoverPosition="right"
                        btnClassName="btn-sm !bg-transparent"
                    />
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
