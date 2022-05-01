import React, { useState } from "react";
import CreateQuestions from "../../components/CreateQuestion/CreateQuestion";
import CreateAnswers from "../../components/CreateAnswers/CreateAnswers";
import { postPoll } from "../../services/pollService";
import { Navigate } from "react-router-dom";



const CreatePoll = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(null);
  const [finalQuestionWithAnwersToAddIndex, setFinalQuestionWithAnswersToAddIndex] = useState(null);
  const handleQuestionChange = (value) => {
    let tempQuestion = {
      index: currentQuestionIndex,
      text: questions[currentQuestionIndex].text,
      description: "text",
      type: questions[currentQuestionIndex].type,
      answers: value,
    };
    const myNewArray = Object.assign([...questions], {
      [currentQuestionIndex]: tempQuestion,
    });
    for (let i=currentQuestionIndex+1; i<=finalQuestionWithAnwersToAddIndex; i++){
        if (myNewArray[i].type === 1){
            console.log(i);
            setCurrentQuestionIndex(i);
            break;
        }
    }
    setQuestions(myNewArray);
  };
  const handleFinalize = (value) => {
    let tempQuestion = {
      index: currentQuestionIndex,
      text: questions[currentQuestionIndex].text,
      description: "text",
      type: questions[currentQuestionIndex].type,
      answers: value,
    };
    const myNewArray = Object.assign([...questions], {
      [currentQuestionIndex]: tempQuestion,
    });

    setQuestions(myNewArray);
    console.log(myNewArray);
    let finalQuestionObject = [];
    for (let i = 0; i < myNewArray.length; i++) {
      let tempAnswerObject = [];
      if (myNewArray[i].type === 1){
        for (let j = 0; j < myNewArray[i].answers.length; j++) {
            let tempAnswer = {
              value: myNewArray[i].answers[j],
            };
            tempAnswerObject.push(tempAnswer);
          }
      }
      
      let tempQuestionObject = {
        text: myNewArray[i].text,
        description: "text",
        type: myNewArray[i].type,
        answers: tempAnswerObject,
      };

      finalQuestionObject.push(tempQuestionObject);
    }
    postPoll(finalQuestionObject);
    return <Navigate to='/invite' />
  };

  const finishAddingQuestions = (value) => {
    setQuestions(value);
    let temp = null;
    let temp2 = null;
    for (let i = 0; i < value.length; i++) {
      if (value[i].type === 1) {
        if (temp2 === null) {
          temp2=i;
          console.log(i);
        }
        temp = i;
        console.log(i);
      }
      setCurrentQuestionIndex(temp2);
      setFinalQuestionWithAnswersToAddIndex(temp);
    }
  };

  return (
    <div className="PollCreationArea">
      <div className="inner-poll-container">
        <div className="question-board">
          <div className="questions-area">
            <h1>Stwórz ankiete</h1>
          </div>
          <div>
            {questions.length < 1 ? (
              <CreateQuestions
                onChange={(value) => {
                  finishAddingQuestions(value)
                }}
              />
            ) : (
              <CreateAnswers
                nextQuestion={(value) => handleQuestionChange(value)}
                questionParameter={questions[currentQuestionIndex]}
                questionsLength={finalQuestionWithAnwersToAddIndex}
                finalize={(value) => handleFinalize(value)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePoll;
