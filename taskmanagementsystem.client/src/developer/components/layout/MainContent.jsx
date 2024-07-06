import { Box } from '@mui/material';

const MainContent = ({ element,breadCrumb }) => (
    <Box component="main" className="flex-grow mt-[3.9rem] p-2 bg-[var(--main-background-primary-color)] w-[40vh] h-screen">
        <Box sx={{ fontWeight: 500, fontSize: 18 }}>
            {breadCrumb}
        </Box>
        {element}
    </Box>
);

export default MainContent;
