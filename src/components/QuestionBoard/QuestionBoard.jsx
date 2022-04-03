import React from "react";

const type = "checkbox";

const QuestionBoard = ({ question: { Answers, Question } }) => {
  const answersArray = [];

  for (let i = 0; i < Answers.length; i++) {
    answersArray.push(
      <div className="answer">
        <div className="checkbox-container">
          <label className="checkbox-label">
            <input type="checkbox"></input>
            <span className="checkbox-custom" />
          </label>
        </div>
        <div className="answer-container">
          <span className="answer-content">
            {Answers[i]}
          </span >
        </div>
      </div>
    );
  }
  return (
    <div className="question-board">
      <div className="question">
        <h1>{Question}</h1>
      </div>
      <div className="answers-area">
        {answersArray}
      </div>
      <div>
        <button type="button">Dalej</button>
      </div>
    </div>
  );
};

export default QuestionBoard;
