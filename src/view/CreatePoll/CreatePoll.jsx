import React, { useState } from "react";
import CreateQuestions from "../../components/CreateQuestion/CreateQuestion";
import CreateAnswers from "../../components/CreateAnswers/CreateAnswers";
import {
  postPoll,
  CreateAnswerDTO,
  CreateQuestionsDTO,
  CreatePollDTO,
} from "../../services/pollService";
import { Navigate, useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";
import ConfigPoll from "../../components/ConfigPoll/ConfigPoll";

const CreatePoll = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(null);
  const [
    finalQuestionWithAnwersToAddIndex,
    setFinalQuestionWithAnswersToAddIndex,
  ] = useState(null);
  const [pollConfig, setPollConfig] = useState(null);
  const handleQuestionChange = (value) => {
    let updatedQuestionsArray = createUpdatedQuestionsArray(value);
    for (
      let i = currentQuestionIndex + 1;
      i <= finalQuestionWithAnwersToAddIndex;
      i++
    ) {
      if (updatedQuestionsArray[i].type === 1) {
        setCurrentQuestionIndex(i);
        break;
      }
    }
    setQuestions(updatedQuestionsArray);
  };
  console.log(pollConfig);
  const createUpdatedQuestionsArray = (value) => {
    console.log(value);
    let answersDTOArray = [];
    for (let i = 0; i < value.length; i++) {
      let tempAnswer = CreateAnswerDTO(value[i].text);
      answersDTOArray.push(tempAnswer);
    }
    console.log(answersDTOArray);
    let questionDTO = CreateQuestionsDTO(
      questions[currentQuestionIndex].text,
      "description",
      questions[currentQuestionIndex].type,
      answersDTOArray
    );
    const updatedQuestionsArray = Object.assign([...questions], {
      [currentQuestionIndex]: questionDTO,
    });
    return updatedQuestionsArray;
  };
  const handleFinalize = (value, flag) => {
    let updatedQuestionsArray = value;
    if (flag) {
      updatedQuestionsArray = createUpdatedQuestionsArray(value);
    }
    for (let i = 0; i < updatedQuestionsArray.length; i++) {
      if (updatedQuestionsArray[i].type === 3) {
        let answersDTO = [];
        for (let j = 1; j < 11; j++) {
          let answerDTO = CreateAnswerDTO(j.toString());
          answersDTO.push(answerDTO);
        }
        updatedQuestionsArray[i].answers = answersDTO;
      } else if (updatedQuestionsArray[i].type === 4) {
        let answersDTO = [];
        for (let j = 1; j < 6; j++) {
          let answerDTO = CreateAnswerDTO(j.toString());
          answersDTO.push(answerDTO);
        }
        updatedQuestionsArray[i].answers = answersDTO;
      }
    }
    setQuestions(updatedQuestionsArray);
    console.log(updatedQuestionsArray);
    let pollDTO = CreatePollDTO(
      pollConfig.name,
      pollConfig.allowAnonymous,
      true,
      pollConfig.resultsArePublic,
      pollConfig.pollType,
      pollConfig.startDate,
      pollConfig.endDate,
      updatedQuestionsArray,
      null,
      null
    );
    console.trace();
    postPoll(pollDTO);
    navigate("/invite");
  };

  const finishAddingQuestions = (value) => {
    setQuestions(value);
    let temp = null;
    let temp2 = null;
    for (let i = 0; i < value.length; i++) {
      if (value[i].type === 1) {
        if (temp2 === null) {
          temp2 = i;
          console.log(i);
        }
        temp = i;
        console.log(i);
      }
      console.log(temp, temp2);
      if (temp2 === null) {
        console.log(value);
        handleFinalize(value, false);
      } else {
        setCurrentQuestionIndex(temp2);
        setFinalQuestionWithAnswersToAddIndex(temp);
      }
    }
  };

  return (
    <div className="PollCreationArea">
      <div className="inner-poll-container">
        <div className="question-board">
          <div className="questions-area">
            <h1>Stwórz ankiete</h1>
          </div>
          <Divider />
          <div>
            {pollConfig === null ? (
              <ConfigPoll createConfig={(value) => setPollConfig(value)}/>
            ) : (
              <>
                {questions.length < 1 ? (
                  <CreateQuestions
                    onChange={(value) => {
                      finishAddingQuestions(value);
                    }}
                  />
                ) : (
                  <>
                    {currentQuestionIndex !== null ? (
                      <CreateAnswers
                        nextQuestion={(value) => handleQuestionChange(value)}
                        questionParameter={questions[currentQuestionIndex]}
                        questionsLength={finalQuestionWithAnwersToAddIndex}
                        finalize={(value) => handleFinalize(value, true)}
                      />
                    ) : (
                      <></>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePoll;
