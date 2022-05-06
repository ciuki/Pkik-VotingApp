import APIAddress from '../APIAddress';
import jwt from 'jwt-decode';
import { toast } from 'react-toastify';
import axios from "../services/api-interceptor";


export async function loginUser(loginData){
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
            toast.success("Udało się zalogować");
            window.location.reload(false);
        });
        
    }catch (err){
        toast.error(err.response.data.message);
        return false;
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
        toast.error(err.response.data.message);
    }
}

export function createRegisterDTO(email, password){
    let registerDTO = {
        Email: email,
        Password: password,
    }
    return registerDTO;
}

