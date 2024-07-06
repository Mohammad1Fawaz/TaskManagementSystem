// Header.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { styled } from '@mui/material/styles';
import NotificationBox from '../layout/NotificationBox';
import Popover from '@mui/material/Popover';
import Avatar from '../../../common/components/ui/other/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import LogoutIcon from '@mui/icons-material/Logout';
import DeveloperBoardIcon from '@mui/icons-material/DeveloperBoard';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SelectInput from '../../../common/components/ui/inputs/SelectInput';
import { useGetRequest } from '../../../common/hooks/useGetRequest';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Box from '@mui/material/Box';
import PrimaryButton from '../../../common/components/ui/buttons/PrimaryButton';
import PopoverDropdown from '../../../common/components/ui/inputs/PopoverDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentProject, setUserCollaborators, setUserProjects } from '../../../common/redux/actions';

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

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [boardProjects, setBoardProjects] = useState([]);
    const [boardUserCollaborators, setBoardUserCollaborators] = useState([]);
    const { data: projects, isLoading: loadingBoardProjects, error: projectsError } = useGetRequest('/Board/get-client-projects', '', null, true);
    const { data: userCollaborators, isLoading: loadingUserCollaborators, error: userCollaboratorsError } = useGetRequest('/Board/get-user-collaborators', '', null, true);
    const loggedInUser = useSelector((state) => state.loggedInUser);
    const currentProject = useSelector((state) => state.currentProject);
    const [currentSelectedProject, setCurrentSelectedProject] = useState(currentProject.projectId);

    useEffect(() => {
        if (projects) {
            setBoardProjects(projects.message.boardProjects);

            let selectedProject = projects.message.boardProjects.find(project => project.projectId === currentProject.projectId);
            if (!selectedProject && projects.message.boardProjects.length > 0) {
                selectedProject = projects.message.boardProjects[0];
            }

            if (selectedProject) {
                dispatch(setCurrentProject(selectedProject));
                setCurrentSelectedProject(selectedProject.projectId);
            }
        }
    }, [projects, currentProject.projectId, dispatch]);


    useEffect(() => {
        if (userCollaborators)
        {
            setBoardUserCollaborators(userCollaborators.message);
            dispatch(setUserCollaborators(userCollaborators.message));
        }
    }, [userCollaborators, dispatch]);

    const [selectedTeamMember, setSelectedTeamMember] = useState(null);

    const handleSelectTeamMember = (value) => {
        setSelectedTeamMember(value);
    };

    const handleClickAwayNotifications = () => {
        handleCloseNotifications();
    };

    const handleSelectProject = (e) => {
        const selectedProject = boardProjects.find(project => project.projectId === e.value);
        setCurrentSelectedProject(e.value);
        dispatch(setCurrentProject(selectedProject));
    };


    const dropdownOptions = boardUserCollaborators.map(project => ({
        key: (
            <div className='flex align-items-center'>
                <Avatar
                    text={project.userName.charAt(0).toUpperCase()}
                    sx={{ width: '35px', height: '35px', marginRight: '8px' }}
                    className ="me-2"
                />
                {project.userName}
            </div>
        ),
        value: project.userId,
    }));
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
                <SelectInput
                    selectOptions={
                        boardProjects.map(project => ({
                            key: project.projectName + " ( " + project.projectKey + " )",
                            value: project.projectId,
                        }))
                    }
                    className="relative w-[255px] mt-1"
                    handleSelectChange={handleSelectProject}
                    selectedValue={currentSelectedProject}
                    isMulti={false}
                    placeholder="Select a project"
                    inputHeight="h-10"
                    icon="fa-project-diagram"
                />
                <PopoverDropdown
                    btnText="Team"
                    className="ms-3"
                    contentClassName ="!w-[300px]"
                    selectedValue={selectedTeamMember}
                    handleSelect={handleSelectTeamMember}
                    dropdownContent={dropdownOptions}
                    popoverPosition="left"
                    btnClassName= "btn-sm"
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
                        selectedValue={selectedTeamMember}
                        handleSelect={handleSelectTeamMember}
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
                        className="!inline-block ms-2"
                    />
                    <PopoverDropdown
                        btnText={loggedInUser?.userName}
                        className="!inline-block"
                        notSelect={true}
                        contentClassName="!w-[250px]"
                        dropdownContent={
                            <List>
                                <ListItem className="popover-item">
                                    <button onClick={() => { handleLogoutDropdownClose(); handleLogout() }}>
                                        <LogoutIcon />  Logout
                                    </button>
                                </ListItem>
                                {/*<ListItem className="popover-item">*/}
                                {/*    <button onClick={() => { handleLogoutDropdownClose(); navigate('/Developer'); }}>*/}
                                {/*        <DeveloperBoardIcon /> Developer*/}
                                {/*    </button>*/}
                                {/*</ListItem>*/}
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
