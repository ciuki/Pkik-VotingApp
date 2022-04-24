import React from 'react';
import {
    Button, Divider,
    Grid, TextField, Typography
} from '@mui/material';
import { Link} from 'react-router-dom';



const LoginView = () => {

    


    return (
        <div className='login-view'>
            <Grid className='login-window' container direction='column'>
                <div className='login-title'>
                    LOGOWANIE
                </div>
                <Grid className='login-form' container direction='column'
                    justifyContent='space-around' alignItems='stretch'>
                    <TextField className='login-textfield' label='nazwa użytkownika'/>
                    <TextField className='login-textfield' label='hasło'/>
                    <Grid gap='16px' container direction='column'>
                        <Button className='login-button'>
                            zaloguj
                        </Button>
                        <Divider />
                        <Typography textAlign='center' variant="caption">
                            Jeśli nie posiadasz jeszcze konta,
                            <br />
                            <Link to='/register'>
                                    załóż je
                            </Link>
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>

        </div>
    );


}


export default LoginView; 
