import React from "react";
import CheckboxGrid from "../CheckboxGrid/CheckboxGrid";
import ExpectationGrid from "../ExpectationGrid/ExpectationGrid";
import LikenessGrid from "../LikenessGrid/LikenessGrid";
import OpenQuestion from "../OpenQuestion/OpenQuestion";

let question = {
  Answers: [
    "Jedna odp",
    "druga odp",
    "trzecia odp",
    "czwarta odp",
    "Jedna odp",
    "druga odp",
    "trzecia odp",
    "czwarta odp",
  ],
  Question: "Pytanie testowe?",
};

const QuestionBoard = (props) => {
  const handleVoteChange = (e, i,text) => {
    props.handleVoteChange(e, i,text);
  };
  let questionsToRender = [];
  if (props.Poll !== "") {
    for (let i = 0; i < props.Poll.questions.length; i++) {
      switch (props.Poll.questions[i].type) {
        case 0:
          questionsToRender.push(
            <div className="question">
              <h3>{props.Poll.questions[i].text}</h3>
              <CheckboxGrid
                question={props.Poll.questions[i]}
                index={i}
                handleVoteChange={handleVoteChange}
              />
            </div>
          );
          break;
        case 1:
          questionsToRender.push(
            <div className="question">
              <h3>{props.Poll.questions[i].text}</h3>
              <OpenQuestion
                question={props.Poll.questions[i]}
                index={i}
                handleVoteChange={handleVoteChange}
              />
            </div>
          );
          break;
        case 2:
          questionsToRender.push(
            <div className="question">
              <h3>{props.Poll.questions[i].text}</h3>
              <LikenessGrid
                question={props.Poll.questions[i]}
                index={i}
                handleVoteChange={handleVoteChange}
              />
            </div>
          );
          break;
        case 3:
          questionsToRender.push(
            <div className="question">
              <h3>{props.Poll.questions[i].text}</h3>
              <ExpectationGrid
                question={props.Poll.questions[i]}
                index={i}
                handleVoteChange={handleVoteChange}
              />
            </div>
          );
          break;
      }
    }
  }

  return <div className="answers-area">{questionsToRender}</div>;
};

export default QuestionBoard;
