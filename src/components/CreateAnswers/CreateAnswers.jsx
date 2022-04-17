import React, { useState, useEffect } from "react";
import CreateQuestions from "../CreateQuestion/CreateQuestion";

const CreateAnswers = (props) => {
  const [answers, setAnswers] = useState([]);
  const [changed, setChanged] = useState([]);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [inputComplete, setInputComplete] = useState([]);
  const addAnswerToList = (i) => {
    if (answers.length >= i + 1 && answers[i].answer !== currentAnswer.answer) {
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
  };
  const changeCurrentAnswer = (i, e) => {
    let tempAnswer = {
      index: i,
      answer: e.target.value,
    };
    setCurrentAnswer(tempAnswer);
    if (answers.length >= i + 1 && tempAnswer.answer !== answers[i].question) {
      if (!changed.includes(i)) {
        setChanged((changed) => [...changed, i]);
      }
    }
    if (e.target.value !== "" && e.target.value !== null){
      if (!inputComplete.includes(i)){
        setInputComplete([...inputComplete, i]);
      }
    }else{
      if (inputComplete.includes(i)){
        setInputComplete((prevState) => prevState.filter((prevItem) => prevItem !== i));
      }
    }
    console.log(e.target.value);
    console.log(inputComplete);
  };
  const answersToRender = [];
  for (let i = 0; i < answers.length + 1; i++) {
    answersToRender.push(
      <div className={`Answer${i + 1}`}>
        <input type="text" onChange={(e) => changeCurrentAnswer(i, e)} />
        {!answers.some(function (item) {
          return item.index === i;
        }) &&
        !changed.some(function (item) {
          return item.index === i;
        }) && inputComplete.some(function(item){
          return item === i;
        })? (
          <button onClick={(e) => addAnswerToList(i)}> Dodaj</button>
        ) : (
          <></>
        )}
        {answers.some(function (item) {
          return item.index === i;
        }) &&
        changed.some(function (item) {
          return item === i;
        }) ? (
          <button onClick={(e) => addAnswerToList(i)}> Zaktualizuj </button>
        ) : (
          <></>
        )}
      </div>
    );
  }
  console.log(props);
  return <div className="CreateAnswersArea">
      <h1>{props.questionParameter.question}</h1>
      {answersToRender}
      {props.questionsLength-1 !== props.questionParameter.index ?(
      <button onClick ={()=>{
        let array=[];
        props.nextQuestion(answers)
        setAnswers(array);
        setInputComplete(array);
        setCurrentAnswer(array);
        setChanged(array);}}>Dalej</button>) :
        (<button>Zakończ</button>)}
      
      </div>
};

export default CreateAnswers;
