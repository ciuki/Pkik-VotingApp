import React, {useState} from 'react';
import {
    Button, Divider,
    Grid, TextField, Typography
} from '@mui/material';
import {Navigate, Link} from 'react-router-dom';
import APIAddress from '../../../APIAddress';
import { loginUser } from '../../../services/authorizeService';


const LoginView = () => {

    const [emailInput, setEmail] = useState("");
    const [passwordInput, setPassword] = useState("")

    const handleLogin = (e) =>{
        let loginObject = {
            email: emailInput,
            password: passwordInput
        };
        console.log(loginObject);
        loginUser(loginObject);
    }

    if (localStorage.getItem('token') !== null ){
        return <Navigate to='/poll' />
    }

    return (
        <div className='login-view'>
            <Grid className='login-window' container direction='column'>
                <div className='login-title'>
                    LOGOWANIE
                </div>
                <Grid className='login-form' container direction='column'
                    justifyContent='space-around' alignItems='stretch'>
                    <TextField onChange={(e) => setEmail(e.target.value)} className='login-textfield' label='E-mail'/>
                    <TextField onChange={(e) => setPassword(e.target.value)} className='login-textfield' label='hasło' type="password" />
                    <Grid gap='16px' container direction='column'>
                        <Button onClick={(e) => handleLogin(e)} className='login-button'>
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
