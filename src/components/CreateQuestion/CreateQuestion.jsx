import React, { useState } from "react";
import Select from "react-dropdown-select";

const options = [
  {value: 1, label: 'Zamknięte'},
  {value: 2, label: 'Otwarte'},
  {value: 3, label: 'Emoji'},
  {value: 4, label: 'Reakcja'}
]

const CreateQuestions = (props) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [changed, setChanged] = useState([]);
  const [inputComplete, setInputComplete] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  
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
    let typeToAssign = 1;
    if (selectedTypes.length >= i+1){
      typeToAssign = selectedTypes[i];
    }
    let tempQuestion = {
      index: i,
      text: e.target.value,
      type: typeToAssign
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

  //ogarnac czemu typy nie zostaja przypisane do pytan >:(

  const handleTypeChange = (e,i) => {
    if (selectedTypes.length >=1 &&
       selectedTypes[i]!==e[0].value){
      setSelectedTypes([...selectedTypes.slice(0, i), ...selectedTypes.slice(i + 1)]);
      let tempSelectedTypesArray = [...selectedTypes];
      tempSelectedTypesArray.splice(i, 0, e[0].value);
      tempSelectedTypesArray.splice(i + 1, 1);
      setSelectedTypes(tempSelectedTypesArray);
    }else if(selectedTypes[i]===e[0].value){
      
      //moze sie przyda
    }
    else{
      setSelectedTypes([...selectedTypes,e[0].value]);
    }

    if (questions.length > i){
      let tempQuestion = questions[i];
      tempQuestion.type=e[0].value;
      setQuestions([...questions.slice(0, i), ...questions.slice(i + 1)]);
      let tempQuestionArray = [...questions];
      tempQuestionArray.splice(i, 0, tempQuestion);
      tempQuestionArray.splice(i + 1, 1);
      setQuestions(tempQuestionArray);
    }else if(currentQuestion.index === i){
      let tempCQ = currentQuestion;
      tempCQ.type = e[0].value;
      setCurrentQuestion(tempCQ);
    }

  }

  for (let i = 0; i < questions.length + 1; i++) {
    questionsToRender.push(
      <div className='question'>
        <h3>Pytanie {i+1}</h3>
        <div className="answers">
            <div className="createquestion-answers">
                <textarea type='text'className="textbox" onChange={(e) => changeCurrentQuestion(i, e)} />
                <Select options={options} onChange={(e) => handleTypeChange(e,i)} />
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
