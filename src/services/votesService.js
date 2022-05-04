import APIAddress from "../APIAddress";

const axios = require('axios');

export async function GetVotesByPollId(pollID){
    try{
        const response = await axios.get(APIAddress.value+"/api/Vote/"+pollID)
        .then(function (response){
            return response.data;
        });
    }catch (err){
        console.error("Error response:");
        console.error(err.response.data);    // ***
        console.error(err.response.status);  // ***
        console.error(err.response.headers);
    }
}