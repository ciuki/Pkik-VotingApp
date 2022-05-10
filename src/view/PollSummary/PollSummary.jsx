import { Divider } from "@mui/material";
import { Link } from "react-router-dom";
import React, {useContext } from "react";
import SummaryBoard from "../../components/SummaryComponents/SummaryBoard/SummaryBoard";
import { CustomThemeContext } from "../../utils/custom-theme-provider";



const PollSummary = () => {
  const { currentTheme} = useContext(CustomThemeContext)
  const isDark = Boolean(currentTheme === 'dark')
  return (
    <div className="summary-container">
      <div className="summary-inner-poll-container">
          <div className="summary-question-board" style={{backgroundColor: isDark ? '#374785': '', color: isDark ?'#9ba3c2' : ''}}>
            <div className="summary-questions-area">
              <h1 style={{color: isDark ? 'white' : '#949494'}}>Tytuł ankiety</h1>
            </div>
            <Divider style={{backgroundColor: isDark ? '#5e6b9d': ''}}/>
            <SummaryBoard/>
            <Link to="/" className="nav-link">
            <div>
              <button 
              style={{backgroundColor: isDark ? '#9ba3c2': '', color: isDark ?'white' : ''}}
              className='summary-button' type="button">Powrót</button>
            </div>
            </Link>
            
          </div>
      </div>
    </div>
  );
};
export default PollSummary;