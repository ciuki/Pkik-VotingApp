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
                </div>
                <Grid className='login-form' container direction='column'
                    justifyContent='space-around' alignItems='stretch'>
                    <TextField className='login-textfield'>
                    </TextField>
                    <TextField className='login-textfield'>
                    </TextField>
                    <Grid gap='16px' container direction='column'>
                        <Button className='login-button'>

                        </Button>
                        <Divider />
                        <Typography textAlign='center' variant="caption">
                            <br />
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>

        </div>
    );


}


export default LoginView; 
