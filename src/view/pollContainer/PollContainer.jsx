import React, { useState, useEffect } from "react";
import QuestionBoard from "../../components/PollComponents/QuestionBoard/QuestionBoard";
import axios from "axios";
import APIAddress from "../../APIAddress";
import { Divider } from "@mui/material";

const PollContainer = () => {
  const [pollData, setPollData] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios
          .get(APIAddress.value + "/api/Poll/" + 4)
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
  

  return (
    <div className="poll-container">
      <div className="inner-poll-container">
        <div className="question-board">
          <div className="questions-area">
            <h1>Tytuł ankiety</h1>
          </div>
          <Divider/>
          <QuestionBoard Poll={pollData} />
          <div>
            <button type="button">Dalej</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PollContainer;
