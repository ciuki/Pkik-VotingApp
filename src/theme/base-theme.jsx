import { createTheme } from '@mui/material';
import { red,darkBlue } from './colors';

const baseTheme = createTheme( {
    palette: {
        primary: {
            main: red
        },
        secondary: {
            main: darkBlue
        }
    },
    typography: {
        fontFamily: 'iA Quattro,montserat',
        fontSize: 15
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    transition: 'all 0.2s'
                }
            }
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    zIndex: 99,
                    backgroundColor: '#74747433',
                    margin: '10px',
                    width: 'auto',
                    borderRadius: '16px'
                }
            }
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '&.login-textfield': {
                        '& fieldset': {
                            'border-color': 'transparent',
                            'transition': 'border .25s',
                            'border-radius': '16px'
                        },
                        
                        'background': '#dadada',
                        'border-radius': '16px',
                        'color': 'black'
                    }
                }

            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    '&.login-button': {
                        'width': '100%',
                        'background-color': red,
                        'color': 'white',
                        'border-radius': '16px',
                        'padding': '1rem'
                    }
                }
            }
        }
    }
} );

export default baseTheme ;
