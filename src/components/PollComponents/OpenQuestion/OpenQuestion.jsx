import { TextField } from "@mui/material";
import React from "react";


const OpenQuestion = (props) => {
    console.log(props);
    return (
        <div className="openquestion-answers">
            <div className="openquestion-inside-answers">
                <textarea className="openquestion-textbox" onChange={(e) => props.handleVoteChange(null,props.question.id,e.target.value)} name={"likenessgroup"+props.index} />
            </div>
        </div>
    );
};

export default OpenQuestion;