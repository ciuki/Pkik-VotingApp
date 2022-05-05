import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import Select from "react-dropdown-select";

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

  const changeDates = (value) =>{
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
    <div>
      <div>
        <label>Nazwa</label>
        <input type="text" onChange={(e) => changeName(e.target.value)}></input>
      </div>
      <div>
        <label>Zablokuj anonimowe głosy</label>
        <input
          type="checkbox"
          onChange={(e) => changeAnonymous(e.target.checked)}
        ></input>
      </div>
      <div>
        <label>Zablokuj publiczne wyniki</label>
        <input
          type="checkbox"
          onChange={(e) => changeResultsArePublic(e.target.checked)}
        ></input>
      </div>
      <div>
        <label>Wybierz typ ankiety</label>
        <Select
                className="choose"
                options={options}
                onChange={(e) => changePollType(e)}
              />
      </div>
      <div>
        <Calendar
        selectRange={true}
          minDate={new Date()}
          onChange={(value, e) => changeDates(value)}
        />
      </div>
      <div>
          <button onClick={() => props.createConfig(configData)}>Dalej</button>
      </div>
    </div>
  );
};

export default ConfigPoll;
