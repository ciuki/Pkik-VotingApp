import APIAddress from "../APIAddress";
import axios from "../services/api-interceptor"


export async function GetVotesByPollId(pollID){
    try{
        const response = await axios.get(APIAddress.value+"/api/Vote/"+pollID)
        .then(function (response){
            return response.data;
        });
    }catch (err){
        toast.error(err.response.data.message);
    }
}