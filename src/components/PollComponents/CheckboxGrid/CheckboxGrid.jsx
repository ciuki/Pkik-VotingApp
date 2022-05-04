import React from "react";

const CheckboxGrid = (props) => {
    
const answersArray = [];
    for (let i = 0; i < props.question.answers.length; i++) {
        answersArray.push(
          <div className="answer">
            <div className="checkbox-container">
              <label className="checkbox-label">
                <input value={props.question.answers[i].id} onChange={(e) => props.handleVoteChange(e,props.question.id)} type="radio" name={"answer"+props.index}></input>
                <span className="checkbox-custom" />
              </label>
            </div>
            <div className="answer-container">
              <span className="answer-content">
                {props.question.answers[i].text}
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