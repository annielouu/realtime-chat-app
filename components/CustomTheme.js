import { createTheme } from '@mui/material/styles';

const CustomTheme = createTheme({
    palette: {
        primary: {
            main: '#79A2BB', // free to change
            light: '#74B9D2', // free to change
            dark: '#79A2BB', // free to change
            contrastText: 'white' // free to change
        },
    },

    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    backgroundColor: '#2D728B',
                    '&:hover': {
                        backgroundColor: '#4CB5DB'
                    }
                }
            }
        }
    }
});

export default CustomTheme;