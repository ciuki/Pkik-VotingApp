import React, { useState } from "react";
import CreateQuestions from "../../components/CreateQuestion/CreateQuestion";
import CreateAnswers from "../../components/CreateAnswers/CreateAnswers";
import { postPoll, CreateAnswerDTO, CreateQuestionsDTO, CreatePollDTO } from "../../services/pollService";
import { Navigate, useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";



const CreatePoll = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(null);
  const [finalQuestionWithAnwersToAddIndex, setFinalQuestionWithAnswersToAddIndex] = useState(null);
  const handleQuestionChange = (value) => {
    let updatedQuestionsArray = createUpdatedQuestionsArray(value);
    for (let i=currentQuestionIndex+1; i<=finalQuestionWithAnwersToAddIndex; i++){
        if (updatedQuestionsArray[i].type === 1){
            setCurrentQuestionIndex(i);
            break;
        }
    }
    setQuestions(updatedQuestionsArray);
  };
  const createUpdatedQuestionsArray =(value) => {
    let answersDTOArray = [];
    for (let i=0; i<value.length; i++){
      let tempAnswer = CreateAnswerDTO(value.text);
      answersDTOArray.push(tempAnswer);
    };
    console.log(answersDTOArray);
    let questionDTO = CreateQuestionsDTO(questions[currentQuestionIndex].text,"description",questions[currentQuestionIndex].type,answersDTOArray);
    const updatedQuestionsArray = Object.assign([...questions], {
      [currentQuestionIndex]: questionDTO,
    });
    return updatedQuestionsArray;
  }
  const handleFinalize = (value) => {
    let updatedQuestionsArray = createUpdatedQuestionsArray(value);

    setQuestions(updatedQuestionsArray);
    console.log(updatedQuestionsArray);
    let pollDTO = CreatePollDTO("Ankieta", true, true, 1, null, updatedQuestionsArray, null, null )
    postPoll(pollDTO);
    navigate('/invite');
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
          <Divider/>
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
