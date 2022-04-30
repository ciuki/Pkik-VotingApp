import APIAddress from '../APIAddress';
const axios = require('axios');
export async function postPoll(pollData){
    try{
        console.log(pollData);
        const response = await axios.post(APIAddress.value+"/api/poll", 
        {
            allowAnonymous: true,
            isActive: true,
            pollType: 1,
            expirationDate: "2022-06-26T19:12:24.649Z",
            questions: pollData
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

export async function GetPollByID(pollID){
    try{
        const response = await axios.get(APIAddress.value+"/api/Poll/"+pollID, 
        ).then(function (response){
            console.log(response);
            return response.data;
        });
        
    }catch (err){
        console.error("Error response:");
        console.error(err.response.data);    // ***
        console.error(err.response.status);  // ***
        console.error(err.response.headers);
    }
}