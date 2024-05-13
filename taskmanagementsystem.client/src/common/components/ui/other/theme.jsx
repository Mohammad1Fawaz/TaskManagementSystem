import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#66b2ff', // Change to your primary color
        },
        secondary: {
            main: '#5EBD96', // Change to your secondary color
        },
        text: {
            primary: '#626262', // Change to your text color
            secondary: '#eff7ff', // Change to your secondary text color
        },
    },
    components: {
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderColor: '#dee2e6 !important',
                    '&:hover': {
                        borderColor: '#0d6efd !important',
                    },
                    '&$focused': {
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        transition: 'box-shadow 0.3s ease',
                    },
                },
            },
        },
    },
});

export default theme;
