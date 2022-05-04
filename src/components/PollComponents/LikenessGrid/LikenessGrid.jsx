import React from "react";


const LikenessGrid = (props) => {
    console.log(props);
    const likeness_square = [];
    for (let i = 0; i < 10; i++) {
        likeness_square.push(
            <div className="radio-answer">
                <div className="radio-container">
                    <label className="radio-label">
                        <input type="radio" value={props.question.answers[i].id} onChange={(e) => props.handleVoteChange(e,props.question.id)} name={"likenessgroup"+props.index} />
                        <span className="radio-custom">{i + 1}</span>
                    </label>
                </div>
            </div>
        );
    }
    return (
        <div className="answers">
            <div className="radio-answers">
                {likeness_square}
            </div>
            <div className="radio-signature">
               <span>Nie bardzo :/</span>
               <span>Super !!!!</span>
            </div>
        </div>
    );
};

export default LikenessGrid;