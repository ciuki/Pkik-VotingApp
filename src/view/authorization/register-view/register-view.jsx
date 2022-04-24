import React from 'react';
import {
    Button, Divider,
    Grid, TextField, Typography
} from '@mui/material';
import { Link, } from 'react-router-dom';


const RegisterView = () => {

    return (
        <div className='register-view'>
            <Grid className='register-window' container direction='column'>
                <div className='register-title'>
                    REJESTRACJA
                </div>
                <Grid className='register-form' container direction='column'
                    justifyContent='space-around' alignItems='stretch'>
                    <TextField className='login-textfield' label='nazwa użytkownika'/>
                    <TextField className='login-textfield' label='e-mail'/>
                    <TextField className='login-textfield' type='password' label='hasło'/>
                    <Grid gap='16px' container direction='column'>
                        <Button className='login-button' >
                            zarejestruj
                        </Button>
                        <Divider />
                        <Typography textAlign='center' variant="caption">
                            Jeśli masz już konto,
                            <br />
                            <Link to='/login'>
                                    zaloguj się
                            </Link>
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}




export default RegisterView;
