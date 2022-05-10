import { FormControl, FormControlLabel, FormGroup, FormLabel, Switch, TextField } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import Calendar from "react-calendar";
import Select from "react-dropdown-select";
import 'react-calendar/dist/Calendar.css';
import { toast } from "react-toastify";
import { CustomThemeContext } from "../../utils/custom-theme-provider";

const options = [
  { value: "Private", label: "Prywatna" },
  { value: "Public", label: "Publiczna" },
  { value: "Protected", label: "Chroniona" },
  { value: "Hidden", label: "Ukryta" },
];

const axios = require("axios");

const ConfigPoll = (props) => {
  const { currentTheme} = useContext(CustomThemeContext)
  const isDark = Boolean(currentTheme === 'dark')
  const [configData, setConfigData] = useState({
    name: "defualtName",
    allowAnonymous: true,
    isActive: true,
    resultsArePublic: true,
    pollType: "Public",
    startDate: new Date().toLocaleString(),
    endDate: null,
    questions: [],
  });

  const [isPrivateOrProtected, setIsPrivateOrProtected] = useState(false);

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
    if (value[0].value === "Protected" || value[0].value === "Private"){
      setIsPrivateOrProtected(true);
      changeAnonymous(true);
    }else{
      changeAnonymous(false);
      setIsPrivateOrProtected(false);
    }
  };

  const changeDates = (value) => {
    let toCompare = new Date().toString().substring(0,15);
    let comparer = value[0].toString().substring(0,15);
    if (toCompare===comparer){
      changeStartDate(null);
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
      <FormLabel style={{color: isDark ?'#9ba3c2' : ''}}
      component="legend">Ustawienia ankiety</FormLabel>
      <FormGroup>
        <FormControlLabel
          className="configpoll-formcontrollabel"
          control={
            <TextField
              style={{color: isDark ?'#ffffff' : ''}} 
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
            style={{color: isDark ?'#A8D0E6' : ''}} 
            onChange={(e) => changeResultsArePublic(e.target.checked)} />
          }
          labelPlacement="top"
          label="Zablokuj publiczne wyniki"
          
        />
        <FormControlLabel
          className="configpoll-formcontrollabel"
          control={isPrivateOrProtected ? 
            <Switch
            style={{color: isDark ?'#A8D0E6' : ''}} 
            checked={isPrivateOrProtected}
            disabled={isPrivateOrProtected}
            onChange={(e) =>  changeAnonymous(e.target.checked)} /> :
            <Switch 
            onChange={(e) =>  changeAnonymous(e.target.checked)} />
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
              color= {isDark ? '#afb5ce' : '#000080'}
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
            <button 
            style={{backgroundColor: isDark ? '#9ba3c2': '', color: isDark ?'white' : ''}}
            className="configpoll-button" onClick={() => finalizeConfig()}>Dalej</button>
          }
          labelPlacement="top"
        />
      </FormGroup>
    </FormControl>
  );
};

export default ConfigPoll;
