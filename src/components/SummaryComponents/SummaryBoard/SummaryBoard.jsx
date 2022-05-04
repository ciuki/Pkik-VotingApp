import React, {useState, useEffect} from "react";
import BarChartComponent from "../BarChart/BarChart";
import PieChartComponent from "../PieChart/PieChart";
import { GetVotesByPollId } from "../../../services/votesService";
import APIAddress from "../../../APIAddress";

const axios = require('axios');


const SummaryBoard = () => {
  const [votes, setVotes] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try{
        const response = await axios.get(APIAddress.value+"/api/Vote/"+4)
        .then(function (response){
            setVotes(response.data);
        });
    }catch (err){
        console.error("Error response:");
        console.error(err.response.data);    // ***
        console.error(err.response.status);  // ***
        console.error(err.response.headers);
    }
      
    };
    fetchData();
  }, []);
  return (
    <div className="answers-area">
      <div className="question">
        <h3>Pytanie testowe?</h3>
        <PieChartComponent Votes={votes === "" ? null : votes.voteQuestions[0].answers}/>
      </div>
      <div className="question">
        <h3>Pytanie testowe?</h3>
        <BarChartComponent Votes={votes === "" ? null : votes.voteQuestions[0].answers}/>
      </div>
    </div>
  );
};

export default SummaryBoard;
