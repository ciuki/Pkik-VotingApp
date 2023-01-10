import React, {useContext} from "react";

import { CustomThemeContext } from "../../utils/custom-theme-provider";
import { Divider } from "@mui/material";
import { Link } from "react-router-dom";
import SummaryBoard from "../../components/SummaryComponents/SummaryBoard/SummaryBoard";

const PollSummary = () => {
  return (
    <div className="summary-container">
      <div className="summary-inner-poll-container">
          <div className="summary-question-board" style={{backgroundColor:'#374785', color:'#9ba3c2'}}>
            <div className="summary-questions-area">
              <h1 style={{color:'white'}}>Tytuł ankiety</h1>
            </div>
            <Divider style={{backgroundColor:'#5e6b9d'}}/>
            <SummaryBoard/>
            <Link to="/" className="nav-link">
            <div>
              <button 
              style={{backgroundColor:'#9ba3c2', color:'white'}}
              className='summary-button' type="button">Powrót</button>
            </div>
            </Link>
            
          </div>
      </div>
    </div>
  );
};
export default PollSummary;