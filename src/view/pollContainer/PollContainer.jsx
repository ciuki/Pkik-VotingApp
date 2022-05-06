import React, { useState, useEffect } from "react";
import {useParams} from "react-router-dom";
import QuestionBoard from "../../components/PollComponents/QuestionBoard/QuestionBoard";
import axios from "axios";
import APIAddress from "../../APIAddress";
import { Divider } from "@mui/material";
import { CreateVoteAggregateDTO, CreateVoteDTO, PostVoteAggregateDTO } from "../../services/pollService";
import SyncLoader from "react-spinners/SyncLoader";
import {toast} from "react-toastify"
import { css } from "@emotion/react";

const override = css`
  margin: 0 auto;
  border-color: red;
`;



const PollContainer = () => {
  const [loading, setLoading] = useState(true);
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
        toast.error(err.response.data);
      }
      setLoading(false);
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
    <div className="pollcontainer-poll-container">
      <div className="pollcontainer-inner-poll-container">
        <div className="pollcontainer-question-board">
          <div className="pollcontainer-questions-area">
            <h1>{pollData.name}</h1>
          </div>
          <Divider/>
          <QuestionBoard Poll={pollData} handleVoteChange={handleVoting}/>
          <div>
            <button className='pollcontainer-button' type="button" onClick = {(e) => handleFinalizeVote()}>Dalej</button>
          </div>
        </div>
        <SyncLoader
          loading={loading}
          color={"#ffffff"}
          css={override}
          size={15}
        />
      </div>
    </div>
  );
};
export default PollContainer;
