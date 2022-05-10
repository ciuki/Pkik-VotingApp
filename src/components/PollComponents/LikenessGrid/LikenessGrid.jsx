import React from "react";


const LikenessGrid = (props) => {
    console.log(props);
    const likeness_square = [];
    for (let i = 0; i < 10; i++) {
        likeness_square.push(
            <div className="likenessgrid-radio-answer">
                <div className="likenessgrid-radio-container">
                    <label className="likenessgrid-radio-label">
                        <input type="radio" value={props.question.answers[i].id} onChange={(e) => props.handleVoteChange(e,props.question.id)} name={"likenessgroup"+props.index} />
                        <span className="likenessgrid-radio-custom">{i + 1}</span>
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