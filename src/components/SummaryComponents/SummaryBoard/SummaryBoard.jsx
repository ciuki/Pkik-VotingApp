import React, { useState, useEffect } from "react";
import BarChartComponent from "../BarChart/BarChart";
import PieChartComponent from "../PieChart/PieChart";
import APIAddress from "../../../APIAddress";
import { useParams } from "react-router-dom";
import CountUp from "react-countup";

const axios = require("axios");

const SummaryBoard = () => {
  const { id } = useParams();
  const [votes, setVotes] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios
          .get(APIAddress.value + "/api/Vote/" + id)
          .then(function (response) {
            console.log(response.data.voteQuestions);
            setVotes(response.data);
          });
      } catch (err) {
        console.error("Error response:");
        console.error(err.response.data); // ***
        console.error(err.response.status); // ***
        console.error(err.response.headers);
      }
    };
    fetchData();
  }, []);
  let chartsToRender = [];
  console.log(votes);
  if (votes !== null) {
    for (let i = 0; i < votes.voteQuestions.length; i++) {
      console.log("here");
      switch (votes.voteQuestions[i].questionType) {
        case 1:
          chartsToRender.push(
            <div className="summaryboard-question">
              <h3>{votes.voteQuestions[i].questionText}</h3>
              <PieChartComponent
                Votes={votes === "" ? null : votes.voteQuestions[i].answers}
              />
            </div>
          );
          chartsToRender.push(
            <div className="summaryboard-question">
              <h3>{votes.voteQuestions[i].questionText}</h3>
              <BarChartComponent
                Votes={votes === "" ? null : votes.voteQuestions[i].answers}
              />
            </div>
          );
          break;
        case 2:
          break;
        case 3:
        case 4:
          let count = 0;
          let amount = 0;
          for (let j = 0; j < votes.voteQuestions[i].answers.length; j++) {
            amount += votes.voteQuestions[i].answers[j].count;
            count +=
              parseInt(votes.voteQuestions[i].answers[j].answerText, 10) *
              votes.voteQuestions[i].answers[j].count;
          }
          let average = count / amount;
          chartsToRender.push(
            <div className="summaryboard-question">
              <h3>{votes.voteQuestions[i].questionText}</h3>
              <CountUp duration={5} end={average} decimals={2} useEasing={true} prefix="Średni wynik: "/>
            </div>
          );
          break;
      }
    }
  }

  return <div className="summaryboard-answers-area">{chartsToRender}</div>;
};

export default SummaryBoard;
