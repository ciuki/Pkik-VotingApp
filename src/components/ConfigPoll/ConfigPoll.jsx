import { FormControl, FormControlLabel, FormGroup, FormLabel, Switch, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import Select from "react-dropdown-select";
import 'react-calendar/dist/Calendar.css';
import { toast } from "react-toastify";

const options = [
  { value: 0, label: "Prywatna" },
  { value: 1, label: "Publiczna" },
  { value: 2, label: "Chroniona" },
  { value: 3, label: "Ukryta" },
];

const axios = require("axios");

const ConfigPoll = (props) => {
  const [configData, setConfigData] = useState({
    name: "defualtName",
    allowAnonymous: true,
    isActive: true,
    resultsArePublic: true,
    pollType: 1,
    startDate: new Date().toLocaleString(),
    endDate: null,
    questions: [],
  });

  const changeName = (value) => {
    let tempConfig = configData;
    tempConfig.name = value;
    setConfigData(tempConfig);
  };
  const changeAnonymous = (value) => {
    let tempConfig = configData;
    tempConfig.allowAnonymous = !value;
    setConfigData(tempConfig);
  };
  const changeResultsArePublic = (value) => {
    let tempConfig = configData;
    tempConfig.resultsArePublic = !value;
    setConfigData(tempConfig);
  };
  const changePollType = (value) => {
    let tempConfig = configData;
    tempConfig.pollType = value[0].value;
    setConfigData(tempConfig);
  };

  const changeDates = (value) => {
    let toCompare = new Date().toString().substring(0,15);
    let comparer = value[0].toString().substring(0,15);
    if (toCompare===comparer){
      let actualDate = new Date();
      var newDateObj = new Date(actualDate.getTime() + 1*60000);
      changeStartDate(newDateObj);
    }else{
      changeStartDate(value[0]);
    }
    changeEndDate(value[1]);
  }

  const changeStartDate = (value) => {
    let tempConfig = configData;
    tempConfig.startDate = value;
    setConfigData(tempConfig);
  };
  const changeEndDate = (value) => {
    let tempConfig = configData;
    tempConfig.endDate = value;
    setConfigData(tempConfig);
  };

  const finalizeConfig = () =>{
    if (configData.name !== "defualtName" && configData.name !== ""){
      props.createConfig(configData);
    }else{
      toast.error("Podaj nazwę ankiety");
    }
  }

  return (
    <FormControl component="fieldset" variant="standard">
      <FormLabel component="legend">Ustawienia ankiety</FormLabel>
      <FormGroup>
        <FormControlLabel
          className="configpoll-formcontrollabel"
          control={
            <TextField
              
              hiddenLabel
              id="standard-hidden-label-normal"
              variant="standard"
              onChange={(e) => changeName(e.target.value)}></TextField >
          }
          label="Nazwa ankiety"
          labelPlacement="top"
        />
        <FormControlLabel
          className="configpoll-formcontrollabel"
          control={
            <div>
              <FormControlLabel
          className="configpoll-formcontrollabel"
          control={
            <Switch 
            onChange={(e) => changeResultsArePublic(e.target.checked)} />
          }
          labelPlacement="top"
          label="Zablokuj publiczne wyniki"
          
        />
        <FormControlLabel
          className="configpoll-formcontrollabel"
          control={
            <Switch 
            onChange={(e) => changeAnonymous(e.target.checked)} />
          }
          labelPlacement="top"
          label="Zablokuj anonimowe głosy"
          
        />
              
            </div>
          }
          labelPlacement="top"
          
        />
        <FormControlLabel
          className="configpoll-formcontrollabel"
          control={
            <Select
              disabled={localStorage.getItem('token')===null}
              placeholder="Publiczna"
              className="choose"
              options={options}
              onChange={(e) => changePollType(e)}
              color="#000080"
            />
          }
          label="Wybierz typ ankiety"
          labelPlacement="top"
        />
        <FormControlLabel
          className="configpoll-formcontrollabel"
          control={
            <Calendar
              selectRange={true}
              minDate={new Date()}
              onChange={(value, e) => changeDates(value)}
              color="#f69b9f"
            />
          }
          label="Wybierz okres działania ankiety"
          labelPlacement="top"
        />
        <FormControlLabel
          className="configpoll-formcontrollabel"
          control={
            <button className="configpoll-button" onClick={() => finalizeConfig()}>Dalej</button>
          }
          labelPlacement="top"
        />
      </FormGroup>
    </FormControl>
  );
};

export default ConfigPoll;
