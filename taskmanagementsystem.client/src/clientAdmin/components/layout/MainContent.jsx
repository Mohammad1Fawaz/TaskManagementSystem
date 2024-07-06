import React from 'react';
import { Box } from '@mui/material';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

const MainContent = ({ element, breadCrumbs }) => {
    const breadcrumbArray = breadCrumbs.split('/').map((crumb, index) => (
        <React.Fragment key={index}>
            {index > 0 && <KeyboardDoubleArrowRightIcon />}
            <Box component="span" sx={{ fontSize: 'inherit', color: index === 0 ? 'var(--button-primary-color)' : '' }}>
                {crumb}
            </Box>
        </React.Fragment>
    ));

    return (
        <Box component="main" className="flex-grow mt-[3.9rem] p-2 bg-[var(--main-background-primary-color)] w-[40vh] min-h-[100vh]">
            <Box sx={{ fontWeight: 500, fontSize: 18 }}>
                {breadcrumbArray}
            </Box>
            <Box>
                {element}
            </Box>
        </Box>
    );
};

export default MainContent;
