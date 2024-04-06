// MainContent.js
import React from 'react';
import Box from '@mui/material/Box';
import Users from '../../pages/Users';
import Roles from '../../pages/Roles';
//import Projects from '../../pages/Projects';

const MainContent = ({ selectedItem, setNotifications }) => {
    return (
        <Box component="main" className="flex-grow mt-4 p-4 pt-5 bg-[var(--main-background-primary-color)] w-[40vh] min-h-[100vh]">
            {selectedItem === 0 && (
                <div>
                    <Users setNotifications={setNotifications} />
                </div>
            )}
            {selectedItem === 1 && (
                <div>
                    <Roles />
                </div>
            )}
            {selectedItem === 2 && (
                <div>
                    <p>Hello in projects page</p>
                </div>
            )}
        </Box>
    );
};

export default MainContent;
