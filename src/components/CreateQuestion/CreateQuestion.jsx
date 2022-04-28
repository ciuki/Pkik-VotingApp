import React, { useState } from "react";

const CreateQuestions = (props) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [changed, setChanged] = useState([]);
  const [inputComplete, setInputComplete] = useState([]);
  
  const questionsToRender = [];
  const addQuestionToList = (i) => {
    if (
      questions.length >= i + 1 &&
      questions[i].text !== currentQuestion.text
    ) {
      setQuestions([...questions.slice(0, i), ...questions.slice(i + 1)]);
      let tempQuestionArray = [...questions];
      tempQuestionArray.splice(i, 0, currentQuestion);
      tempQuestionArray.splice(i + 1, 1);
      setQuestions(tempQuestionArray);
    } else if (
      questions.length >= i + 1 &&
      questions[i].text === currentQuestion.text
    ) {
      //moze sie przyda jeszcze
    } else {
      setQuestions([...questions, currentQuestion]);
    }
    if (changed.includes(i)) {
      setChanged((prevState) => prevState.filter((prevItem) => prevItem !== i));
    }
  };

  const changeCurrentQuestion = (i, e) => {
    let tempQuestion = {
      index: i,
      text: e.target.value,
    };
    setCurrentQuestion(tempQuestion);
    if (questions.length>=i+1 && tempQuestion.text !== questions[i].text) {
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
  };

  for (let i = 0; i < questions.length + 1; i++) {
    questionsToRender.push(
      <div className='question'>
        <h3>Pytanie {i+1}</h3>
        <div className="answers">
            <div className="createquestion-answers">
                <textarea type='text'className="textbox" onChange={(e) => changeCurrentQuestion(i, e)} />
            </div>
        </div>
        {!questions.some(function (item){
          return item.index === i;
        }) && !changed.some(function (item){
          return item === i;
        }) && inputComplete.some(function(item){
          return item === i;
        })? (
          <button onClick={(e) => addQuestionToList(i)}> Dodaj pytanie </button>
        ) : (
          <></>
        )}
        {questions.some(function (item){
          return item.index === i;
        }) && changed.some(function (item){
          return item === i;
        }) && inputComplete.some(function(item){
          return item === i;
        })? (
          <button onClick={(e) => addQuestionToList(i)}> Zaktualizuj pytanie</button>
        ) : (
          <></>
        )}
      </div>
    );
  }
  return <div>
    {questionsToRender}
    <div>
      <button onClick ={()=> props.onChange(questions)}>Dalej</button>
    </div>
  </div>;
};

export default CreateQuestions;


//Naprawic generowanie pytan