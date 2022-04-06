import React, { useState } from "react";

const CreateQuestion = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [changed, setChanged] = useState([]);
  
  const questionsToRender = [];
  const addQuestionToList = (i) => {
    console.log(questions.length, i);
    if (
      questions.length >= i + 1 &&
      questions[i].question !== currentQuestion.question
    ) {
      setQuestions([...questions.slice(0, i), ...questions.slice(i + 1)]);
      let tempQuestionArray = [...questions];
      tempQuestionArray.splice(i, 0, currentQuestion);
      tempQuestionArray.splice(i + 1, 1);
      console.log(tempQuestionArray);
      setQuestions(tempQuestionArray);
    } else if (
      questions.length >= i + 1 &&
      questions[i].question === currentQuestion.question
    ) {
      //moze sie przyda jeszcze
    } else {
      setQuestions([...questions, currentQuestion]);
    }
    if (changed.includes(i)) {
      setChanged((prevState) => prevState.filter((prevItem) => prevItem !== i));
    }
    console.log(questions);
  };

  const changeCurrentQuestion = (i, e) => {
    let tempQuestion = {
      index: i,
      question: e.target.value,
    };
    setCurrentQuestion(tempQuestion);
    if (questions.length>=i+1 && tempQuestion.question !== questions[i].question) {
      if (!changed.includes(i)) {
        setChanged((changed) => [...changed, i]);
      }
    }
  };

  for (let i = 0; i < questions.length + 1; i++) {
    questionsToRender.push(
      <div className={`Question${i + 1}`}>
        <label for="Question">Pytanie {i + 1}</label>
        <input type="text" onChange={(e) => changeCurrentQuestion(i, e)} />
        {!questions.some(function (item){
          return item.index === i;
        }) && !changed.some(function (item){
          return item === i;
        }) ? (
          <button onClick={(e) => addQuestionToList(i)}> Dodaj </button>
        ) : (
          <></>
        )}
        {questions.some(function (item){
          return item.index === i;
        }) && changed.some(function (item){
          return item === i;
        }) ? (
          <button onClick={(e) => addQuestionToList(i)}> Zaktualizuj </button>
        ) : (
          <></>
        )}
      </div>
    );
  }
  return <div>{questionsToRender}</div>;
};

export default CreateQuestion;
