import React, { useState, useEffect,useContext } from "react";
import { CustomThemeContext } from "../../../utils/custom-theme-provider";


const LikenessGrid = (props) => {
    const { currentTheme} = useContext(CustomThemeContext)
    const isDark = Boolean(currentTheme === 'dark')
    console.log(props);
    const likeness_square = [];
    for (let i = 0; i < 10; i++) {
        likeness_square.push(
            <div className="likenessgrid-radio-answer">
                <div className="likenessgrid-radio-container">
                    <label className="likenessgrid-radio-label" >
                        <input type="radio" value={props.question.answers[i].id} onChange={(e) => props.handleVoteChange(e,props.question.id)} name={"likenessgroup"+props.index} />
                        <span className="likenessgrid-radio-custom" style={{backgroundColor: isDark ? '#10152b': '', color: isDark ?'#9ba3c2' : ''}}>{i + 1}</span>
                    </label>
                </div>
            </div>
        );
    }
    return (
        <div className="likenessgrid-answers">
            <div className="likenessgrid-radio-answers">
                {likeness_square}
            </div>
            <div className="likenessgrid-radio-signature">
               <span>Nie bardzo :/</span>
               <span>Super !!!!</span>
            </div>
        </div>
    );
};

export default LikenessGrid;