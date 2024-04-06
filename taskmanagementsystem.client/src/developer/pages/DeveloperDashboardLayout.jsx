import * as React from 'react';
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
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import SearchInput from '../../common/components/ui/inputs/SearchInput';
import MainLogo from '../../common/components/ui/images/MainLogo';
const drawerWidth = 240;

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

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, { shouldForwardProp: (prop) => prop !== 'open', })(({ theme, open }) => ({
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

export const DeveloperLayoutContext = React.createContext();
export default function DeveloperDashboardLayout({ children }) {
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const [showLogo, setShowLogo] = React.useState(false);
    const [selectedItem, setSelectedItem] = React.useState(0);

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

    return (
        <DeveloperLayoutContext.Provider value={{ selectedItem, setSelectedItem }}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    open={open}
                    sx={{
                        bgcolor: '#fff',
                        display: 'flex',
                        height: '50px',
                        justifyContent: 'center'
                    }}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{
                                marginRight: 5,
                                ...(open && { display: 'none' }),
                            }}
                        >
                            <MenuIcon sx={{ color: 'var(--main-button-background-color)' }} />
                        </IconButton>
                        <Typography
                            component="div"
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                width: '100%',
                                height: '10px'
                            }}>
                            <Typography variant="h6" noWrap component="div" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                {showLogo && <MainLogo width="w-[70px] me-3 ms-3" />}
                                <SearchInput type="Search" className="relative" name="email" placeholder="Email" icon="fa-envelope" />
                            </Typography>
                            <Typography component="div">
                                <NotificationsIcon sx={{ color: 'var(--main-button-background-color)', fontSize: '30px', marginRight: '20px' }} />
                                <SettingsIcon sx={{ color: 'var(--main-button-background-color)', fontSize: '30px', marginRight: '20px' }} />
                                <AccountBoxIcon sx={{ color: 'var(--main-button-background-color)', fontSize: '30px' }} />
                            </Typography>
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open}>
                    <DrawerHeader>
                        <MainLogo width="w-[80px] m-auto" />
                        <IconButton onClick={handleDrawerClose} sx={{ color: 'var(--main-button-background-color)' }}>
                            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                        </IconButton>
                    </DrawerHeader>
                    <Divider />
                    <List>
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
                                        bgcolor: index === selectedItem ? 'var(--main-button-background-color)' : 'inherit',
                                        '&:hover': {
                                            bgcolor: 'var(--main-hover-color)',
                                        },
                                        color: 'var(--main-color)'
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                            color: 'var(--main-color)'
                                        }}
                                    >
                                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                    </ListItemIcon>
                                    <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                                </ListItemButton>
                                <Divider />
                            </ListItem>
                        ))}
                    </List>
                </Drawer>
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <DrawerHeader />
                    {selectedItem === 0 && (
                        <div>
                            Something
                        </div>
                    )}
                    {selectedItem === 1 && (
                        <div>
                            Something
                        </div>
                    )}
                    {selectedItem === 2 && (
                        <div>
                            Projects page
                        </div>
                    )}
                </Box>
            </Box>
        </DeveloperLayoutContext.Provider>
    );
}