import {
  CreateAnswerDTO,
  CreatePollDTO,
  CreateQuestionsDTO,
  postPoll,
} from "../../services/pollService";
import React, { useContext, useState } from "react";

import ConfigPoll from "../../components/ConfigPoll/ConfigPoll";
import CreateAnswers from "../../components/CreateAnswers/CreateAnswers";
import CreateQuestions from "../../components/CreateQuestion/CreateQuestion";
import { CustomThemeContext } from "../../utils/custom-theme-provider";
import { Divider } from "@mui/material";
import SyncLoader from "react-spinners/SyncLoader";
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";

const override = css`
position: fixed;
  top: 50%;
  left: 0;
  width: 100vw;
`;

const CreatePoll = () => {
  const [loading, setLoading] = useState(false);
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
      if (updatedQuestionsArray[i].type === "Closed") {
        setCurrentQuestionIndex(i);
        break;
      }
    }
    setQuestions(updatedQuestionsArray);
  };
  const createUpdatedQuestionsArray = (value) => {
    let answersDTOArray = [];
    for (let i = 0; i < value.length; i++) {
      let tempAnswer = CreateAnswerDTO(value[i].text);
      answersDTOArray.push(tempAnswer);
    }
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
    setLoading(true);
    let updatedQuestionsArray = value;
    if (flag) {
      updatedQuestionsArray = createUpdatedQuestionsArray(value);
    }
    for (let i = 0; i < updatedQuestionsArray.length; i++) {
      if (updatedQuestionsArray[i].type === "Emoji") {
        let answersDTO = [];
        for (let j = 1; j < 11; j++) {
          let answerDTO = CreateAnswerDTO(j.toString());
          answersDTO.push(answerDTO);
        }
        updatedQuestionsArray[i].answers = answersDTO;
      } else if (updatedQuestionsArray[i].type === "Reaction") {
        let answersDTO = [];
        for (let j = 1; j < 6; j++) {
          let answerDTO = CreateAnswerDTO(j.toString());
          answersDTO.push(answerDTO);
        }
        updatedQuestionsArray[i].answers = answersDTO;
      }
    }
    setQuestions(updatedQuestionsArray);
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
    SendPoll(pollDTO);
  };

  const SendPoll = async (pollDTO) => {
    await postPoll(pollDTO);
    setLoading(false);
    if (localStorage.getItem("token") !== null) {
      navigate("/MyPolls");
    } else {
      navigate("/");
    }
  };

  const finishAddingQuestions = (value) => {
    setQuestions(value);
    let temp = null;
    let temp2 = null;
    for (let i = 0; i < value.length; i++) {
      if (value[i].type === "Closed") {
        if (temp2 === null) {
          temp2 = i;
        }
        temp = i;
      }
    }
    if (temp === null) {
      console.trace();
      handleFinalize(value, false);
    } else {
      setCurrentQuestionIndex(temp2);
      setFinalQuestionWithAnswersToAddIndex(temp);
    }
  };

  return (
    <div className="PollCreationArea " >
      <div className="createpoll-inner-poll-container">
        <div className="createpoll-question-board" style={{backgroundColor:'#374785', color:'#9ba3c2' }}>
          <div className="createpoll-questions-area">
            <h1 style={{color:'white'}}>Stw??rz ankiete</h1>
          </div>
          <Divider style={{backgroundColor:'#5e6b9d',marginBottom:'1rem'}}/>
          <div>
            {pollConfig === null ? (
              <ConfigPoll createConfig={(value) => setPollConfig(value)} />
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
        <SyncLoader
          loading={loading}
          color={"#ffffff"}
          css={override}
          size={15}
        />
      </div>
    </div>
  );
};

export default CreatePoll;
