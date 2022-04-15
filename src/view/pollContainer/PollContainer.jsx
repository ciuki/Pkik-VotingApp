import React from "react";
import QuestionBoard from "../../components/QuestionBoard/QuestionBoard";

let question = {
  Answers: ["Jedna odp", "druga odp", "trzecia odp","czwarta odp","Jedna odp", "druga odp", "trzecia odp","czwarta odp"],
  Question: "Pytanie testowe?",
};

const PollContainer = () => {
  return (
    <div className="poll-container">
      <div className="inner-poll-container">
        <div className="question-board">
          <div className="questions-area">
             <span class="close">X</span>
             <h1>Tytuł ankiety</h1>
          </div>
          <QuestionBoard question={question} />
          <div>
            <button type="button">Dalej</button>
        </div>
        </div>
      </div>
    </div>
  );
};
export default PollContainer;
