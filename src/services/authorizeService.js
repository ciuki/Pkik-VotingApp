import APIAddress from '../APIAddress';
import jwt from 'jwt-decode';
const axios = require('axios');
export async function loginUser(loginData){
    console.log(loginData);
    try{
        const response = await axios.post(APIAddress.value+"/login", 
        {
            email: loginData.email,
            password: loginData.password
        }).then(function (response){
            const token = response.data.tokenInfo.token;
            const user = jwt(token);
            localStorage.setItem('token', token);
            localStorage.setItem('userName',user.name);
            localStorage.setItem('userEmail', user.sub);
            window.location.reload(false);
        });
        
    }catch (err){
        console.error("Error response:");
        console.error(err.response.data);    // ***
        console.error(err.response.status);  // ***
        console.error(err.response.headers);
    }
}

export async function registerUser(registerData){
    console.log(registerData);
    try{
        const response = await axios.post(APIAddress.value+"/api/User",{
            Email: registerData.Email,
            Password: registerData.Password
        }).then(function (response){
            console.log(response);
        });
    }catch (err){
        console.error("Error response:");
        console.error(err.response.data);    // ***
        console.error(err.response.status);  // ***
        console.error(err.response.headers);
    }
}

export function createRegisterDTO(email, password){
    let registerDTO = {
        Email: email,
        Password: password,
    }
    return registerDTO;
}

