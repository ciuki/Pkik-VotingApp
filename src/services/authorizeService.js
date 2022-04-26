import APIAddress from '../APIAddress';
import jwt from 'jwt-decode';
const axios = require('axios');
export async function loginUser(loginData){
    try{
        const response = await axios.post(APIAddress.value+"/login", 
        {
            username: loginData.username,
            password: loginData.password
        }).then(function (response){
            const token = response.data.tokenInfo.token;
            const user = jwt(token);
            localStorage.setItem('token', token);
            localStorage.setItem('user',user);
            window.location.reload(false);
        });
        
    }catch (err){
        console.error("Error response:");
        console.error(err.response.data);    // ***
        console.error(err.response.status);  // ***
        console.error(err.response.headers);
    }
}