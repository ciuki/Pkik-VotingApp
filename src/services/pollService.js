import APIAddress from "../APIAddress";
import axios from "../services/api-interceptor"
import {toast} from "react-toastify";

export async function postPoll(pollDTO) {
  try {
    console.log(pollDTO);
    const response = await axios
      .post(APIAddress.value + "/api/poll", pollDTO)
      .then(function (response) {
        console.log(response);
      });
  } catch (err) {
    toast.error(err.response.data.message);
  }
}

export async function GetPollByID(pollID) {
  try {
    const response = await axios
      .get(APIAddress.value + "/api/Poll/" + pollID)
      .then(function (response) {});
  } catch (err) {
    toast.error(err.response.data.message);
  }
}

export function CreateQuestionsDTO(text, description, type, answers) {
  let questionsDTO = {
    Text: text,
    Description: description,
    Type: type,
    Answers: answers,
  };
  return questionsDTO;
}

export function CreateAnswerDTO(text) {
  console.log(text);
  let answerDTO = {
    Text: text,
  };
  return answerDTO;
}

export function CreatePollDTO(
  pollName,
  allowAnonymous,
  isActive,
  resultsArePublic,
  pollType,
  startDate,
  endDate,
  questions,
  allowedUsersIds,
  moderatorsIds
) {
  let pollDTO = {
    Name: pollName,
    AllowAnonymous: allowAnonymous,
    IsActive: isActive,
    ResultsArePublic: resultsArePublic,
    PollType: pollType,
    StarDate: startDate,
    EndDate: endDate,
    questions: questions,
    AllowedUsersIds: allowedUsersIds,
    ModeratorsIds: moderatorsIds,
  };
  return pollDTO;
}

export function CreateVoteAggregateDTO(pollID, votesArray) {
  let voteAggregateDTO = {
    pollId: pollID,
    votes: votesArray,
  };
  return voteAggregateDTO;
}

export function CreateVoteDTO(questionID, answerID) {
  let voteDTO = {
    questionId: questionID,
    answerId: answerID,
  };
  return voteDTO;
}

export async function PostVoteAggregateDTO(voteAggregateDTO) {
  try {
    console.log(voteAggregateDTO);
    const response = await axios
      .post(APIAddress.value + "/api/Vote/Aggregate", voteAggregateDTO)
      .then(function (response) {
        console.log(response);
      });
  } catch (err) {
    toast.error(err.response.data.message);
  }
}
