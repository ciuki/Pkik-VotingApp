import React, { useState } from "react";
import CreateQuestions from "../../components/CreateQuestion/CreateQuestion";
import CreateAnswers from "../../components/CreateAnswers/CreateAnswers";
import { postPoll } from "../../services/pollService";

const CreatePoll = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState();
    const handleQuestionChange = (value) => {
        
        let tempQuestion = {
            index: currentQuestionIndex,
            text: questions[currentQuestionIndex].text,
            description: "text",
            answers: value
        };
        const myNewArray = Object.assign([...questions], {
            [currentQuestionIndex]: tempQuestion
        });
        setQuestions(myNewArray);
        setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
    const handleFinalize = (value) =>{
        let tempQuestion = {
            index: currentQuestionIndex,
            text: questions[currentQuestionIndex].text,
            description: "text",
            answers: value
        };
        const myNewArray = Object.assign([...questions], {
            [currentQuestionIndex]: tempQuestion
        });
        setQuestions(myNewArray);
        let finalQuestionObject = [];
        console.log(questions);
        for (let i=0; i<questions.length; i++){
            let tempAnswerObject = [];           
            for (let j=0; j<questions[i].answers.length; j++){
                let tempAnswer = {
                    value: questions[i].answers[j]
                }
                tempAnswerObject.push(tempAnswer);
            }
            let tempQuestionObject = {
                text: questions[i].text,
                description: "text",
                type: 1,
                answers: tempAnswerObject
            }

            finalQuestionObject.push(tempQuestionObject);
        }
        postPoll(finalQuestionObject);
    }
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
                            : <CreateAnswers nextQuestion={(value) => handleQuestionChange(value)} questionParameter={questions[currentQuestionIndex]} questionsLength={questions.length} 
                            finalize={(value) => handleFinalize(value)}/>}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreatePoll;