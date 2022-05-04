import React, {useState} from 'react';
import {
    Button, Divider,
    Grid, TextField, Typography
} from '@mui/material';
import { Link, } from 'react-router-dom';
import { createRegisterDTO, registerUser } from '../../../services/authorizeService';


const RegisterView = () => {
    const [login, setLogin] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = (e) =>{
        let registerDTO = createRegisterDTO(email, password);
        registerUser(registerDTO);
    }

    return (
        <div className='register-view'>
            <Grid className='register-window' container direction='column'>
                <div className='register-title'>
                    REJESTRACJA
                </div>
                <Grid className='register-form' container direction='column'
                    justifyContent='space-around' alignItems='stretch'>
                    <TextField className='login-textfield' label='nazwa użytkownika' onChange={(e) => setLogin(e.target.value)}/>
                    <TextField className='login-textfield' label='e-mail' onChange={(e) => setEmail(e.target.value)}/>
                    <TextField className='login-textfield' type='password' label='hasło' onChange={(e) => setPassword(e.target.value)}/>
                    <Grid gap='16px' container direction='column'>
                        <Button className='login-button' onClick={(e)=>handleRegister()}>
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
