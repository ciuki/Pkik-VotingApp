import React, { useState, useEffect } from "react";
import BarChartComponent from "../BarChart/BarChart";
import PieChartComponent from "../PieChart/PieChart";
import APIAddress from "../../../APIAddress";
import { useParams } from "react-router-dom";
import CountUp from "react-countup";
import ProgressBar from "@ramonak/react-progress-bar";
import axios from "../../../services/api-interceptor"

const SummaryBoard = () => {
  const { id } = useParams();
  const [votes, setVotes] = useState(null);
  const [openAnswers, setOpenAnswers] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
          await axios
          .get(APIAddress.value + "/api/Vote/" + id)
          .then(function (response) {
            console.log(response.data);
            setVotes(response.data);
            let openAnswersData= [];
            for (let i=0; i<response.data.baseAnswers.length; i++){
              if (response.data.baseAnswers[i].questionType==="Open"){
                openAnswersData.push(response.data.baseAnswers[i]);
              }
            }
            if (openAnswersData.length>0){
              setOpenAnswers(openAnswersData);
            }
          });
      } catch (err) {
      }
    };
    fetchData();
  }, []);
  let chartsToRender = [];
  if (votes !== null) {
    for (let i = 0; i < votes.voteQuestions.length; i++) {
      // eslint-disable-next-line default-case
      switch (votes.voteQuestions[i].questionType) {
        case "Closed":
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
        case "Emoji":
        case "Reaction":
          let count = 0;
          let amount = 0;
          let bar;
          for (let j = 0; j < votes.voteQuestions[i].answers.length; j++) {
            amount += votes.voteQuestions[i].answers[j].count;
            count +=
              parseInt(votes.voteQuestions[i].answers[j].answerText, 10) *
              votes.voteQuestions[i].answers[j].count;
              bar = votes.voteQuestions[i].questionType === "Emoji" ? 5 : 10;
          }
          let average = count / amount;
          chartsToRender.push(
            <div className="summaryboard-question">
              <h3>{votes.voteQuestions[i].questionText}</h3>
              <CountUp duration={5} end={average} decimals={2} useEasing={true} prefix="Średni wynik: "/>
              <div className="progressbar-parent">
                <div className="progressbar">
                <ProgressBar completed={average} maxCompleted={bar} customLabel={average} />
                </div>
              </div>
            </div>
          );
          break;
      }
    }
    
  }
  let openAnswersToRender =[];
  if (openAnswers !== null){
    for(let i=0; i<openAnswers.length; i++){
      openAnswersToRender.push(
      <div className="summaryboard-question">
        <h3>{openAnswers[i].question}</h3>
        <div className="summaryboard-openanswers">
          {openAnswers[i].answer}
        </div>
      </div>)
    }
  }

  return <div className="summaryboard-answers-area">{chartsToRender}{openAnswersToRender}</div>;
};

export default SummaryBoard;
