import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faFrown} from "@fortawesome/free-regular-svg-icons"
import {faFrownOpen} from "@fortawesome/free-regular-svg-icons"
import {faMeh} from "@fortawesome/free-regular-svg-icons"
import {faGrin} from "@fortawesome/free-regular-svg-icons"
import {faLaughBeam} from "@fortawesome/free-regular-svg-icons"





const ExpectationGrid = (props) => {
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
            <div className="expectation-answer">
                <div className="expectation-container">
                    <label className="expectation-label">
                        <input type="radio" name={"expectationgroup"+props.index} onChange={(e) => props.handleVoteChange(e,props.question.id)} value={props.question.answers[i].id} />
                        <span className="expectation-custom"><FontAwesomeIcon icon={x} /></span>
                    </label>
                </div>
            </div>
        );
    }
    return (
        <div className="answers">
            <div className="expectation-answers">
                {likeness_square}
            </div>
            <div className="expectation-signature">
               <span>Nie bardzo :/</span>
               <span>Sredniawa</span>
               <span>Super!!!</span>
            </div>
        </div>
    );
};

export default ExpectationGrid;