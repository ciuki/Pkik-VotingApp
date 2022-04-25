import React, {useState} from 'react';
import {
    Button, Divider,
    Grid, TextField, Typography
} from '@mui/material';
import { Link} from 'react-router-dom';
import APIAddress from '../../../APIAddress';
import { loginUser } from '../../../services/authorizeService';


const LoginView = () => {

    const [emailInput, setEmail] = useState("");
    const [passwordInput, setPassword] = useState("")

    const handleLogin = (e) =>{
        let loginObject = {
            username: emailInput,
            password: passwordInput
        };
        console.log(loginObject);
        loginUser(loginObject);
    }


    return (
        <div className='login-view'>
            <Grid className='login-window' container direction='column'>
                <div className='login-title'>
                    LOGOWANIE
                </div>
                <Grid className='login-form' container direction='column'
                    justifyContent='space-around' alignItems='stretch'>
                    <TextField onChange={(e) => setEmail(e.target.value)} className='login-textfield' label='nazwa użytkownika'/>
                    <TextField onChange={(e) => setPassword(e.target.value)} className='login-textfield' label='hasło'/>
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
