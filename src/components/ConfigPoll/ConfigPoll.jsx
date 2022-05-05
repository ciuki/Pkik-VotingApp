import { FormControl, FormControlLabel, FormGroup, FormLabel, Switch, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import Select from "react-dropdown-select";
import 'react-calendar/dist/Calendar.css';

const options = [
  { value: 0, label: "Prywatna" },
  { value: 1, label: "Publiczna" },
  { value: 2, label: "Chroniona" },
  { value: 3, label: "Ukryta" },
];

const axios = require("axios");

const ConfigPoll = (props) => {
  const [configData, setConfigData] = useState({
    name: "defuatName",
    allowAnonymous: true,
    isActive: true,
    resultsArePublic: true,
    pollType: 0,
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
    console.log(value);
    let tempConfig = configData;
    tempConfig.pollType = value[0].value;
    setConfigData(tempConfig);
  };

  const changeDates = (value) => {
    console.log(value);
    console.log(value[0].toString())
    changeStartDate(value[0]);
    changeEndDate(value[1]);
  }

  const changeStartDate = (value) => {
    let tempConfig = configData;
    tempConfig.startDate = value;
    setConfigData(tempConfig);
    console.log(configData);
  };
  const changeEndDate = (value) => {
    let tempConfig = configData;
    tempConfig.endDate = value;
    setConfigData(tempConfig);
  };

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
            <button className="configpoll-button" onClick={() => props.createConfig(configData)}>Dalej</button>
          }
          labelPlacement="top"
        />
      </FormGroup>
    </FormControl>
  );
};

export default ConfigPoll;
