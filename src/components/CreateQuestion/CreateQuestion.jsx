import React, { useContext, useState } from "react";

import { CustomThemeContext } from "../../utils/custom-theme-provider";
import Select from "react-dropdown-select";
import { toast } from "react-toastify";

const options = [
  { value: "Closed", label: "Zamknięte" },
  { value: "Open", label: "Otwarte" },
  { value: "Emoji", label: "Emoji" },
  { value: "Reaction", label: "Reakcja" },
];

const CreateQuestions = (props) => {
  const { currentTheme} = useContext(CustomThemeContext)
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
    setCurrentQuestion("");
  };

  const changeCurrentQuestion = (i, e) => {
    
    let typeToAssign = "Closed"; //sproboj wymyslic inne przypisywanie
    if (selectedTypes.length >= i + 1) {
      typeToAssign = selectedTypes[i];
    }else{
      setSelectedTypes([...selectedTypes, typeToAssign]);
    }
    let tempQuestion = {
      index: i,
      text: e.target.value,
      type: typeToAssign,
    };
    setCurrentQuestion(tempQuestion);
    if (questions.length >= i + 1 && tempQuestion.text !== questions[i].text) {
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

  const handleTypeChange = (e, i) => {
    if (selectedTypes.length >= 1 && selectedTypes[i] !== e[0].value) {
      setSelectedTypes([
        ...selectedTypes.slice(0, i),
        ...selectedTypes.slice(i + 1),
      ]);
      let tempSelectedTypesArray = [...selectedTypes];
      tempSelectedTypesArray.splice(i, 0, e[0].value);
      tempSelectedTypesArray.splice(i + 1, 1);
      setSelectedTypes(tempSelectedTypesArray);
    } else if (selectedTypes[i] === e[0].value) {
      //moze sie przyda
    } else {
      setSelectedTypes([...selectedTypes, e[0].value]);
      
    }
    if (questions.length > i) {
      let tempQuestion = questions[i];
      tempQuestion.type = e[0].value;
      setQuestions([...questions.slice(0, i), ...questions.slice(i + 1)]);
      let tempQuestionArray = [...questions];
      tempQuestionArray.splice(i, 0, tempQuestion);
      tempQuestionArray.splice(i + 1, 1);
      setQuestions(tempQuestionArray);
    } else if (currentQuestion.index === i) {
      let tempCQ = currentQuestion;
      tempCQ.type = e[0].value;
      setCurrentQuestion(tempCQ);
    }

  };
  const handleGoToAnswerCreations = () =>{
    if (currentQuestion === "" && questions.length>0){
      props.onChange(questions);
    }else{
      if (!questions.length>0){
        toast.warning("Nie dokończono dodawania pytania!");
      }else{
        toast.warning("Nie dokończono dodawania pytania! \n Kliknij 'Dodaj odpowiedź', lub usuń wpisaną treść")
      }
    }
  }
  for (let i = 0; i < questions.length + 1; i++) {
    questionsToRender.push(
      <div className="createquestion-question">
        <h3 className="createquestion-h3">Pytanie {i + 1}</h3>
        <div className="answers">
          <div className="createquestion-answers">
            <textarea
              type="text"
              readOnly={!changed.includes(i) && changed.length > 0}
              className="createquestion-textbox"
              onChange={(e) => changeCurrentQuestion(i, e)}
            />
            <div className="createquestion-menu">
              <Select
                placeholder="Zamknięte"
                selectedTypes=''
                className="createquestion-choose"
                options={options}
                onChange={(e) => handleTypeChange(e, i)}
              />
              {questions.some(function (item) {
                return item.index === i;
              }) &&
              changed.some(function (item) {
                return item === i;
              }) &&
              inputComplete.some(function (item) {
                return item === i;
              }) ? (
                <button 
                style={{backgroundColor:'#9ba3c2', color:'white'}}
                className='createquestion-button' onClick={(e) => addQuestionToList(i)}>
                  {" "}
                  Zaktualizuj pytanie
                </button>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
        {!questions.some(function (item) {
          return item.index === i;
        }) &&
        !changed.some(function (item) {
          return item === i;
        }) &&
        inputComplete.some(function (item) {
          return item === i;
        }) ? (
          <button 
          style={{backgroundColor:'#9ba3c2', color:'white'}}
          disabled={changed.length>0 ? true : false} className='createquestion-button' onClick={(e) => addQuestionToList(i)}> Dodaj pytanie </button>
        ) : (
          <></>
        )}
      </div>
    );
  }
  return (
    <div>
      {questionsToRender}
      <div>
        <button
          style={{backgroundColor:'#9ba3c2', color:'white'}}
          className='createquestion-button'
          onClick={() => handleGoToAnswerCreations() }
        >
          Dalej
        </button>
      </div>
    </div>
  );
};

export default CreateQuestions;
