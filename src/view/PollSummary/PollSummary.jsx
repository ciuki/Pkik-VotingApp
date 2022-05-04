import { Divider } from "@mui/material";
import React from "react";
import SummaryBoard from "../../components/SummaryComponents/SummaryBoard/SummaryBoard";



const PollSummary = () => {
  return (
    <div className="summary-container">
      <div className="inner-poll-container">
          <div className="question-board">
            <div className="questions-area">
              <h1>Tytuł ankiety</h1>
            </div>
            <Divider/>
            <SummaryBoard/>
            <div>
              <button type="button">Dalej</button>
            </div>
          </div>
      </div>
    </div>
  );
};
export default PollSummary;