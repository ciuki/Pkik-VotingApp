import React, { useState, useEffect } from "react";
import QuestionBoard from "../../components/PollComponents/QuestionBoard/QuestionBoard";
import axios from "axios";
import APIAddress from "../../APIAddress";

const PollContainer = () => {
  const [pollData, setPollData] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios
          .get(APIAddress.value + "/api/Poll/" + 2)
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
    console.log(2);
  }, []);
  

  return (
    <div className="poll-container">
      <div className="inner-poll-container">
        <div className="question-board">
          <div className="questions-area">
            <h1>Tytuł ankiety</h1>
          </div>
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
