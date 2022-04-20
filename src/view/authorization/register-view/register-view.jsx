import React from 'react';
import { Button, Divider,
    Grid, TextField, Typography} from '@mui/material';
import { Link,} from 'react-router-dom';


const RegisterView = () =>{

        return (
            <div className='register-view'>
                <Grid className='register-window' container direction='column'>
                    <div className='register-title'>
                    </div>
                    <Grid className='register-form' container direction='column'
                        justifyContent='space-around' alignItems='stretch'>
                        <TextField className='login-textfield' >
                        </TextField>    
                        <TextField className='login-textfield'>
                        </TextField>   
                        <TextField className='login-textfield' type='password'></TextField>    
                        <Grid gap='16px' container direction='column'>
                            <Button className='login-button' >          
                            </Button> 
                            <Divider/>
                            <Typography textAlign='center' variant="caption">           
                                <br/> 
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>         
            </div>
        );
    }




export default RegisterView ;
