import React from "react";

const CheckboxGrid = (props) => {
    
const answersArray = [];
    for (let i = 0; i < props.question.answers.length; i++) {
        answersArray.push(
          <div className="checkboxgrid-answer">
            <div className="checkboxgrid-checkbox-container">
              <label className="checkboxgrid-checkbox-label">
                <input value={props.question.answers[i].id} onChange={(e) => props.handleVoteChange(e,props.question.id)} type="radio" name={"answer"+props.index}></input>
                <span className="checkboxgrid-checkbox-custom" />
              </label>
            </div>
            <div className="checkboxgrid-answer-container">
              <span className="checkboxgrid-answer-content">
                {props.question.answers[i].text}
              </span >
            </div>
          </div>
        );
      }
    return (
        <div className="checkboxgrid-answers">
          {answersArray}
        </div>
    );
};

export default CheckboxGrid;