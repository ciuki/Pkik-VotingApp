import React, { useState, useEffect } from "react";
import {useParams} from "react-router-dom";
import QuestionBoard from "../../components/PollComponents/QuestionBoard/QuestionBoard";
import axios from "axios";
import APIAddress from "../../APIAddress";
import { Divider } from "@mui/material";
import { CreateVoteAggregateDTO, CreateVoteDTO, PostVoteAggregateDTO } from "../../services/pollService";

const PollContainer = () => {
  const {id} = useParams();
  const [pollData, setPollData] = useState("");
  const [chosenVotes, setChosenVotes] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios
          .get(APIAddress.value + "/api/Poll/" + id)
          .then(function (response) {
            console.log(response);
            setPollData(response.data);
          });
      } catch (err) {
        console.error("Error response:");
        console.error(err.response.data);
      }
    };
    fetchData();
  }, []);
  
  const handleVoting = (e,i) => {
    let voteDTO = CreateVoteDTO(i, e.target.value);
    console.log(voteDTO);
    let existFlag = false;
    for (let j=0; j<chosenVotes.length;j++){
        if (chosenVotes[j].questionId === i){
        setChosenVotes([...chosenVotes.slice(0, j), ...chosenVotes.slice(j + 1)]);
        let tempChosenVotesArray = [...chosenVotes];
        tempChosenVotesArray.splice(j, 0, voteDTO);
        tempChosenVotesArray.splice(j + 1, 1);
        console.log(tempChosenVotesArray);
        setChosenVotes(tempChosenVotesArray);
        existFlag=true;
      }
    }
    if (!existFlag){
      setChosenVotes([...chosenVotes, voteDTO]);
    }
  }
  const handleFinalizeVote = () => {
    let VoteAggregateDTO = CreateVoteAggregateDTO(pollData.id, chosenVotes);
    PostVoteAggregateDTO(VoteAggregateDTO);
  }

  return (
    <div className="poll-container">
      <div className="inner-poll-container">
        <div className="question-board">
          <div className="questions-area">
            <h1>Tytuł ankiety</h1>
          </div>
          <Divider/>
          <QuestionBoard Poll={pollData} handleVoteChange={handleVoting}/>
          <div>
            <button type="button" onClick = {(e) => handleFinalizeVote()}>Dalej</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PollContainer;
