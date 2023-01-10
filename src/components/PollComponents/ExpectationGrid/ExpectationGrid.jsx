import React, {useContext} from "react";

import { CustomThemeContext } from "../../../utils/custom-theme-provider";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faFrown} from "@fortawesome/free-regular-svg-icons"
import {faFrownOpen} from "@fortawesome/free-regular-svg-icons"
import {faGrin} from "@fortawesome/free-regular-svg-icons"
import {faLaughBeam} from "@fortawesome/free-regular-svg-icons"
import {faMeh} from "@fortawesome/free-regular-svg-icons"

const ExpectationGrid = (props) => {
    const { currentTheme} = useContext(CustomThemeContext)
    const likeness_square = [];
    let x;


    for (let i = 0; i < 5; i++) {
        switch(i){
            case 0:
                x = faFrown;
                break;
            case 1:
                x=faFrownOpen;
                break;
            case 2:
                x=faMeh;
                break;
            case 3:
                x=faGrin;
                break;
            case 4:
                x=faLaughBeam;
                break;
            default:
                break;
        }
        likeness_square.push(
            <div className="expectationgrid-expectation-answer">
                <div className="expectationgrid-expectation-container">
                    <label className="expectationgrid-expectation-label">
                        <input type="radio" name={"expectationgroup"+props.index} onChange={(e) => props.handleVoteChange(e,props.question.id)} value={props.question.answers[i].id} />
                        <span className="expectationgrid-expectation-custom" style={{backgroundColor: '#10152b', color:'#9ba3c2'}}><FontAwesomeIcon icon={x} /></span>
                    </label>
                </div>
            </div>
        );
    }
    return (
        <div className="expectationgrid-answers">
            <div className="expectationgrid-expectation-answers">
                {likeness_square}
            </div>
            <div className="expectationgrid-expectation-signature">
               <span>Nie bardzo :/</span>
               <span>Sredniawa</span>
               <span>Super!!!</span>
            </div>
        </div>
    );
};

export default ExpectationGrid;