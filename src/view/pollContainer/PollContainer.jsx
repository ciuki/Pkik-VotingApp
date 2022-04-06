import React from "react";
import QuestionBoard from "../../components/QuestionBoard/QuestionBoard";

let question = {
  Answers: ["Jedna odp", "druga odp", "trzecia odp"],
  Question: "Pytanie testowe?",
};

const PollContainer = () => {
  return (
    <div className="poll-container">
      <div className="inner-poll-container">
        <QuestionBoard question={question} />
      </div>
    </div>
  );
};
export default PollContainer;
