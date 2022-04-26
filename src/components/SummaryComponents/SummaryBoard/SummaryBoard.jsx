import React from "react";
import BarChartComponent from "../BarChart/BarChart";
import PieChartComponent from "../PieChart/PieChart";




const SummaryBoard = () => {
  
  return (
    <div className="answers-area">
      <div className="question">
        <h3>Pytanie testowe?</h3>
        <PieChartComponent/>
      </div>
      <div className="question">
        <h3>Pytanie testowe?</h3>
        <BarChartComponent/>
      </div>
    </div>
  );
};

export default SummaryBoard;
