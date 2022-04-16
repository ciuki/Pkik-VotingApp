import React from "react";

const CheckboxGrid = ({ question: { Answers, Question } }) => {
    
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
        <div className="answers">
          {answersArray}
        </div>
    );
};

export default CheckboxGrid;