import React from "react";
import QuestionBoard from "../../components/QuestionBoard/QuestionBoard";
import Notifications from "../../components/Notifications/Notifications";


const PollContainer = () => {
  return (
    <div className="poll-container">
      <div className="inner-poll-container">
          <div className="question-board">
            <div className="questions-area">
              <h1>Tytuł ankiety</h1>
            </div>
            <QuestionBoard/>
            <div>
              <button type="button">Dalej</button>
            </div>
          </div>
      </div>
      <Notifications />
    </div>
  );
};
export default PollContainer;
