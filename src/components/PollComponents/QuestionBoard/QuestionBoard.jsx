import React from "react";
import CheckboxGrid from "../CheckboxGrid/CheckboxGrid";
import ExpectationGrid from "../ExpectationGrid/ExpectationGrid";
import LikenessGrid from "../LikenessGrid/LikenessGrid";
import OpenQuestion from "../OpenQuestion/OpenQuestion";

const QuestionBoard = (props) => {
  const handleVoteChange = (e, i, text) => {
    props.handleVoteChange(e, i, text);
  };
  const handleTokenInput = (token) => {
    props.handleTokenInput(token);
  };
  let questionsToRender = [];
  if (props.Poll !== "") {
    for (let i = 0; i < props.Poll.questions.length; i++) {
      // eslint-disable-next-line default-case
      switch (props.Poll.questions[i].type) {
        case "Closed":
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
        case "Open":
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
        case "Emoji":
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
        case "Reaction":
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

  return (
    <div className="answers-area">
      {questionsToRender}
      {props.Poll.pollType === "Protected" ? 
      <>
      <label>Token: </label>
      <input type="text" onChange={(e) =>handleTokenInput(e.target.value)}/>
      </> : <></>}
    </div>
  );
};

export default QuestionBoard;
