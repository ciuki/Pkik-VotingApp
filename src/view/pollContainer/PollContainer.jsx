import {
  CreateVoteAggregateDTO,
  CreateVoteDTO,
  PostVoteAggregateDTO,
} from "../../services/pollService";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import APIAddress from "../../APIAddress";
import { CustomThemeContext } from "../../utils/custom-theme-provider";
import { Divider } from "@mui/material";
import QuestionBoard from "../../components/PollComponents/QuestionBoard/QuestionBoard";
import SyncLoader from "react-spinners/SyncLoader";
import axios from "../../services/api-interceptor";
import { css } from "@emotion/react";
import { toast } from "react-toastify";

const override = css`
position: fixed;
  top: 50%;
  left: 0;
  width: 100vw;
`;

const PollContainer = () => {
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [pollData, setPollData] = useState("");
  const [chosenVotes, setChosenVotes] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
          await axios
          .get(APIAddress.value + "/api/Poll/" + id)
          .then(function (response) {
            setPollData(response.data);
          })
          .catch((error) => {
            toast.error("Nie masz dostępu do głosowania w tej ankiecie!");
            navigate("/");
          });
      } catch (err) {
        toast.error(err.response.data);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleToken = (token) =>{
    setToken(token);
  }

  const handleVoting = (e, i, text) => {
    let voteDTO;
    if (e !== null) {
      voteDTO = CreateVoteDTO(i, e.target.value, null);
    } else {
      voteDTO = CreateVoteDTO(i, null, text);
    }
    let existFlag = false;
    for (let j = 0; j < chosenVotes.length; j++) {
      if (chosenVotes[j].questionId === i) {
        setChosenVotes([
          ...chosenVotes.slice(0, j),
          ...chosenVotes.slice(j + 1),
        ]);
        let tempChosenVotesArray = [...chosenVotes];
        tempChosenVotesArray.splice(j, 0, voteDTO);
        tempChosenVotesArray.splice(j + 1, 1);
        setChosenVotes(tempChosenVotesArray);
        existFlag = true;
      }
    }
    if (!existFlag) {
      setChosenVotes([...chosenVotes, voteDTO]);
    }
  };
  const handleFinalizeVote = () => {
    setLoading(true);
    let VoteAggregateDTO = CreateVoteAggregateDTO(pollData.id, token, chosenVotes);
    vote(VoteAggregateDTO);
  };

  const vote = async (VoteAggregateDTO) => {
    var storedIDs = null;
    if (localStorage.getItem("token") === null){
      storedIDs = JSON.parse(localStorage.getItem("votedIDs"));
    }
    if (storedIDs !== null) {
      for (let i = 0; i < storedIDs.length; i++) {
        if (id === storedIDs[i]) {
          toast.error("Nie możesz glosować 2 razy w tej samej ankiecie!");
          setLoading(false);
          return;
        }
      }
      storedIDs.push(id);
      localStorage.setItem("votedIDs", JSON.stringify(storedIDs));
    }else{
      let fstIdToAdd = [];
      fstIdToAdd.push(id);
      localStorage.setItem("votedIDs", JSON.stringify(fstIdToAdd));
    }
    let status = await PostVoteAggregateDTO(VoteAggregateDTO);
    setLoading(false);
    if (status === 204) {
      navigate("/summary/" + id);
    }
  };

  return (
    <div className="pollcontainer-poll-container">
      <div className="pollcontainer-inner-poll-container">
        <div className="pollcontainer-question-board" style={{backgroundColor:'#374785', color:'#9ba3c2'}}>
          <div className="pollcontainer-questions-area">
            <h1 style={{color:'white'}}>{pollData.name}</h1>
          </div>
          <Divider style={{backgroundColor:'#5e6b9d'}}/>
          <QuestionBoard Poll={pollData} handleTokenInput={handleToken} handleVoteChange={handleVoting} />
          <div>
            <button
              style={{backgroundColor:'#9ba3c2', color:'white'}}
              className="pollcontainer-button"
              type="button"
              onClick={(e) => handleFinalizeVote()}
            >
              Zagłosuj
            </button>
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
