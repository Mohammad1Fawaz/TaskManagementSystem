// MainContent.js
import React from 'react';
import Box from '@mui/material/Box';
import Board from '../../pages/Board';

//import Projects from '../../pages/Projects';

const MainContent = ({ selectedItem, setNotifications, onlineUsers }) => {

    return (
        <Box component="main" className="flex-grow !mt-12 !pt-7 px-2 bg-[var(--main-background-primary-color)] w-[40vh] h-screen">
            {selectedItem === 0 && (
                <div className="flex flex-col ">
                    <Board setNotifications={setNotifications} onlineUsers={onlineUsers} />
                </div>
            )}
            {selectedItem === 1 && (
                <div className="mt-4">
                </div>
            )}
            {selectedItem === 2 && (
                <div className="mt-4">
                    <p>Hello in projects page</p>
                </div>
            )}
        </Box>
    );
};

export default MainContent;
