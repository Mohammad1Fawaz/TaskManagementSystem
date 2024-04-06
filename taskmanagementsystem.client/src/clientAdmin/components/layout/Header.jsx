// Header.js
import React, { useState } from 'react';
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
}));



const Header = ({ open, darkTheme, openPopover, handlePopoverOpen, notifications, notificationsCount, handleThemeToggle, showLogo, handleDrawerOpen, handleSettings, handleLogout, anchorEl, handlePopoverClose}) => {

    return (
        <AppBar position="fixed" open={open} className="">
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
                    <IconButton
                        onClick={handlePopoverOpen}
                        aria-describedby={openPopover ? 'notifications-popover' : undefined}
                    >
                        <Badge badgeContent={notificationsCount ?? 0} color="primary">
                            <NotificationsIcon sx={{ color: 'var(--button-primary-color)' }} />
                        </Badge>
                    </IconButton>
                    <Popover
                        id="notifications-popover"
                        open={openPopover}
                        anchorEl={anchorEl}
                        onClose={handlePopoverClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        PaperProps={{
                            sx: {
                                width: '500px',
                            },
                        }}
                        className = "text-[var(--text-secondary-color)] !w-[800px]"
                    >
                        <NotificationBox notifications={notifications} />
                    </Popover>
                    <IconButton onClick={handleSettings}>
                        <SettingsIcon sx={{ color: 'var(--button-primary-color)' }} />
                    </IconButton>
                    <IconButton onClick={handleLogout}>
                        <AccountBoxIcon sx={{ color: 'var(--button-primary-color)' }} />
                    </IconButton>
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
