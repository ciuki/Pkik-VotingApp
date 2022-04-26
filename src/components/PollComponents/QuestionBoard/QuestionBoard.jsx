import React from "react";
import CheckboxGrid from "../CheckboxGrid/CheckboxGrid";
import ExpectationGrid from "../ExpectationGrid/ExpectationGrid";
import LikenessGrid from "../LikenessGrid/LikenessGrid";
import OpenQuestion from "../OpenQuestion/OpenQuestion";

let question = {
  Answers: ["Jedna odp", "druga odp", "trzecia odp", "czwarta odp", "Jedna odp", "druga odp", "trzecia odp", "czwarta odp"],
  Question: "Pytanie testowe?",
};

const QuestionBoard = () => {
  
  return (
    <div className="answers-area">
      <div className="question">
        <h3>Pytanie testowe?</h3>
        <CheckboxGrid  question={question} />
      </div>
      <div className="question">
        <h3>Pytanie testowe?</h3>
        <LikenessGrid />
      </div>
      <div className="question">
        <h3>Pytanie testowe?</h3>
        <ExpectationGrid/>
      </div>
      <div className="question">
        <h3>Pytanie testowe?</h3>
        <OpenQuestion/>
      </div>
    </div>
  );
};

export default QuestionBoard;
