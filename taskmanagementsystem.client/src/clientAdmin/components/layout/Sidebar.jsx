// Drawer.js
import React from 'react';
import MuiDrawer from '@mui/material/Drawer';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import WorkIcon from '@mui/icons-material/Work';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import { styled, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import MainLogo from '../../../common/components/ui/images/MainLogo';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
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

const Sidebar = ({ open, selectedItem, handleDrawerClose, handleListItemClick }) => {
    const theme = useTheme();

    return (
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
    );
};

export default Sidebar;
