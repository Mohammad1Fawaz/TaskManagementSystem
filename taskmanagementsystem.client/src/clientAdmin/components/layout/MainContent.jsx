// MainContent.js
import React from 'react';
import Box from '@mui/material/Box';
import Users from '../../pages/Users';
import Roles from '../../pages/Roles';
import Projects from '../../pages/Projects';

const MainContent = ({ selectedItem, setNotifications, onlineUsers }) => {

    return (
        <Box component="main" className="flex-grow mt-4 p-4 pt-5 bg-[var(--main-background-primary-color)] w-[40vh] min-h-[100vh]">
            {selectedItem === 0 && (
                <div className="mt-4">
                    <Users setNotifications={setNotifications} onlineUsers={onlineUsers} />
                </div>
            )}
            {selectedItem === 1 && (
                <div className="mt-4">
                    <Roles />
                </div>
            )}
            {selectedItem === 2 && (
                <div className="mt-4">
                    <Projects />
                </div>
            )}
        </Box>
    );
};

export default MainContent;
