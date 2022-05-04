import APIAddress from '../APIAddress';


const axios = require('axios');
export async function postPoll(pollDTO){
    try{
        console.log(pollDTO);
        const response = await axios.post(APIAddress.value+"/api/poll", 
        pollDTO).then(function (response){
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
            
        });
        
    }catch (err){
        console.error("Error response:");
        console.error(err.response.data);    // ***
        console.error(err.response.status);  // ***
        console.error(err.response.headers);
    }
}

export function CreateQuestionsDTO(text, description, type, answers){
    let questionsDTO = {
        Text: text,
        Description: description,
        Type: type,
        Answers: answers
    }
    return questionsDTO;
}

export function CreateAnswerDTO(text){
    console.log(text);
    let answerDTO = {
        Text: text
    }
    return answerDTO;
}

export function CreatePollDTO(pollName, allowAnonymous, isActive, pollType, expirationDate, questions, allowedUsersIds, moderatorsIds){

    let pollDTO = {
        Name: pollName,
        AllowAnonymous: allowAnonymous,
        IsActive: isActive,
        PollType: pollType,
        ExpirationDate: "2022-06-26T19:12:24.649Z",
        questions: questions,
        AllowedUsersIds: allowedUsersIds,
        ModeratorsIds: moderatorsIds
    }
    
    return pollDTO;

}