import React, { useContext, useState } from "react";

import { CustomThemeContext } from "../../utils/custom-theme-provider";
import { toast } from "react-toastify";

const CreateAnswers = (props) => {
  const { currentTheme} = useContext(CustomThemeContext)
  const [answers, setAnswers] = useState([]);
  const [changed, setChanged] = useState([]);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [inputComplete, setInputComplete] = useState([]);
  const addAnswerToList = (i) => {
    if (answers.length >= i + 1 && answers[i].text !== currentAnswer.answer) {
      setAnswers([...answers.slice(0, i), ...answers.slice(i + 1)]);
      let tempAnswerArray = [...answers];
      tempAnswerArray.splice(i, 0, currentAnswer);
      tempAnswerArray.splice(i + 1, 1);
      setAnswers(tempAnswerArray);
    } else if (
      answers.length >= i + 1 &&
      answers[i].answer === currentAnswer.answer
    ) {
      //moze sie przyda jeszcze
    } else {
      setAnswers([...answers, currentAnswer]);
    }
    if (changed.includes(i)) {
      setChanged((prevState) => prevState.filter((prevItem) => prevItem !== i));
    }
    
    let tempAnswer = {
      index: 1000,
      text: "",
    };
    setCurrentAnswer(tempAnswer);
  };
  const changeCurrentAnswer = (i, e) => {
    let tempAnswer = {
      index: i,
      text: e.target.value,
    };
    setCurrentAnswer(tempAnswer);
    if (answers.length >= i + 1 && tempAnswer.text !== answers[i].text) {
      if (!changed.includes(i)) {
        setChanged((changed) => [...changed, i]);
      }
    }
    if (e.target.value !== "" && e.target.value !== null) {
      if (!inputComplete.includes(i)) {
        setInputComplete([...inputComplete, i]);
      }
    } else {
      if (inputComplete.includes(i)) {
        setInputComplete((prevState) =>
          prevState.filter((prevItem) => prevItem !== i)
        );
      }
    }
    
  };
  const answersToRender = [];
  for (let i = 0; i < answers.length + 1; i++) {
    answersToRender.push(
      <div className="createanswer-question">
        <h3 className="createanswer-h3">Odpowied?? {i + 1}</h3>
        <div className="createanswer-answers">
          <div className="create-answers">
            <textarea
              type="text"
              readOnly={!changed.includes(i) && changed.length > 0}
              className="createanswer-textbox"
              onChange={(e) => changeCurrentAnswer(i, e)}
            />
            <div className="createanswer-menu">
              {answers.some(function (item) {
                return item.index === i;
              }) &&
              changed.some(function (item) {
                return item === i;
              }) &&
              inputComplete.some(function (item) {
                return item === i;
              }) ? (
                <button
                style={{backgroundColor:'#9ba3c2', color:''}}
                  className="createanswer-button"
                  onClick={(e) => addAnswerToList(i)}
                >
                  {" "}
                  Zaktualizuj odpowied??
                </button>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
        {!answers.some(function (item) {
          return item.index === i;
        }) &&
        !changed.some(function (item) {
          return item.index === i;
        }) &&
        inputComplete.some(function (item) {
          return item === i;
        }) ? (
          <button
          style={{backgroundColor:'#9ba3c2', color:'white'}}
            className="createanswer-button"
            onClick={(e) => addAnswerToList(i)}
          >
            {" "}
            Dodaj odpowied??
          </button>
        ) : (
          <></>
        )}
      </div>
    );
  }
  const finalize = () => {
    if (currentAnswer.text === "" && answers.length > 0) {
      props.finalize(answers);
    } else {
      if (!answers.length > 0) {
        toast.warning("Nie doko??czono dodawania odpowiedzi!");
      } else {
        toast.warning(
          "Nie doko??czono dodawania odpowiedz! \n Kliknij 'Dodaj odpowied??', lub usu?? wpisan?? tre????"
        );
      }
    }
    
  };
  return (
    <div className="CreateAnswersArea">
      <h1>{props.questionParameter.text}</h1>
      {answersToRender}
      {props.questionsLength !== props.questionParameter.index ? (
        <button
        style={{backgroundColor:'#9ba3c2', color:'white'}}
        className="createanswer-button"
          onClick={() => {
            
            if (currentAnswer.text === "" && answers.length > 0) {

              let array = [];
              props.nextQuestion(answers);
              setAnswers(array);
              setInputComplete(array);
              setCurrentAnswer(array);
              setChanged(array);
            } else {
              if (!answers.length > 0) {
                toast.warning("Nie doko??czono dodawania odpowiedzi!");
              } else {
                toast.warning(
                  "Nie doko??czono dodawania odpowiedz! \n Kliknij 'Dodaj odpowied??', lub usu?? wpisan?? tre????"
                );
              }
            }
          }}
        >
          Dalej
        </button>
      ) : (
        <button
          className="createanswer-button"
          onClick={(e) => finalize()}
        >
          Zako??cz
        </button>
      )}
    </div>
  );
};

export default CreateAnswers;
