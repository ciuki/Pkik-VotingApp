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
  let questionsToRender = [];
  console.log(props.Poll);
  if (props.Poll !== "") {
    for (let i = 0; i < props.Poll.questions.length; i++) {
      switch (props.Poll.questions[i].type) {
        case 1:
          questionsToRender.push(
            <div className="question">
              <h3>{props.Poll.questions[i].text}</h3>
              <CheckboxGrid answers={props.Poll.questions[i].answers} />
            </div>
          );
          break;
        case 2:
          questionsToRender.push(
            <div className="question">
              <h3>{props.Poll.questions[i].text}</h3>
              <OpenQuestion question={question} />
            </div>
          );
        break; 
      }
    }
  }

  return (
    <div className="answers-area">
      {questionsToRender}
    </div>
  );
};

export default QuestionBoard;
