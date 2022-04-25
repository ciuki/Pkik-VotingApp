import APIAddress from '../APIAddress';
const axios = require('axios');
export async function loginUser(loginData){
    try{
        console.log(loginData);
        const response = await axios.post(APIAddress.value+"/login", 
        {
            username: loginData.username,
            password: loginData.password
        }).then(function (response){
            console.log(response.data.tokenInfo.token);
        });
        
    }catch (err){
        console.error("Error response:");
        console.error(err.response.data);    // ***
        console.error(err.response.status);  // ***
        console.error(err.response.headers);
    }
}