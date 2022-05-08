import { Divider } from "@mui/material";
import { Link } from "react-router-dom";
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
            <Link to="/" className="nav-link">
            <div>
              <button className='button' type="button">Powrót</button>
            </div>
            </Link>
            
          </div>
      </div>
    </div>
  );
};
export default PollSummary;