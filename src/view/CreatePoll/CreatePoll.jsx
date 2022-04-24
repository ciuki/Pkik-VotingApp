import React, { useState } from "react";
import CreateQuestions from "../../components/CreateQuestion/CreateQuestion";
import CreateAnswers from "../../components/CreateAnswers/CreateAnswers";

const CreatePoll = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState();
    const handleQuestionChange = (value) => {
        let tempQuestion = {
            index: currentQuestionIndex,
            question: questions[currentQuestionIndex].question,
            answers: value
        };
        const myNewArray = Object.assign([...questions], {
            [currentQuestionIndex]: tempQuestion
        });
        setQuestions(myNewArray);
        setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
    console.log(questions[currentQuestionIndex]);
    console.log(currentQuestionIndex);
    console.log(questions);
    return (
        <div className="PollCreationArea">
            <div className="inner-poll-container">
                <div className="question-board">
                    <div className="questions-area">
                        <h1>Stwórz ankiete</h1>
                    </div>
                    <div>
                        {questions.length < 1 ?
                            <CreateQuestions onChange={(value) => { setQuestions(value); setCurrentQuestionIndex(0) }} />
                            : <CreateAnswers nextQuestion={(value) => handleQuestionChange(value)} questionParameter={questions[currentQuestionIndex]} questionsLength={questions.length} />}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreatePoll;