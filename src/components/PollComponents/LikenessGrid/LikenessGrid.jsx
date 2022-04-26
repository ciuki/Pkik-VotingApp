import React from "react";

const likeness_square = [];

for (let i = 0; i < 10; i++) {
    likeness_square.push(
        <div className="radio-answer">
            <div className="radio-container">
                <label className="radio-label">
                    <input type="radio" name="likenessgroup" />
                    <span className="radio-custom">{i + 1}</span>
                </label>
            </div>
        </div>
    );
}

const LikenessGrid = () => {
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