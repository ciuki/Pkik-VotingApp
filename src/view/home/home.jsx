import React, { useState, useEffect } from "react";
import { css } from "@emotion/react";
import SyncLoader from "react-spinners/SyncLoader";
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom";
import APIAddress from "../../APIAddress";

import axios from "../../services/api-interceptor";
import { Divider } from "@mui/material";

const override = css`
  position: fixed;
  top: 50%;
  left: 0;
  width: 100vw;
`;

const Home = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [pollsData, setPollsData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios
          .get(APIAddress.value + "/api/Poll")
          .then(function (response) {
            let array = response.data;
            array.reverse();
            setPollsData(array);
          });
      } catch (err) {
        toast.error(err.response.data); // ***
      }
      setLoading(false);
    };
    fetchData();
  }, []);
  let itemsToRender = [];
  if (pollsData !== null) {
    for (let i = 0; i < pollsData.length; i++) {
      if (pollsData[i].allowAnonymous || localStorage.getItem('token') !== null)
        itemsToRender.push(<>
          <div className="home-questions-area">
            <div className="home-questions-area-cell">{pollsData[i].isActive ? <div>aktywne</div> : <div>nieaktywne</div>}.</div>
            <div className="home-questions-area-cell">{pollsData[i].name}</div>
            <div className="home-questions-area-cell"><button className="home-button" onClick={(e) => navigate("/poll/" + pollsData[i].id)}>Zagłosuj</button></div>
            <div className="home-questions-area-cell"><button className="home-button" onClick={(e) => navigate("/summary/" + pollsData[i].id)}>Zobacz wyniki</button></div>
          </div>
          <Divider />
        </>)
    }
  }
  return (
    <div className="home-container">
      <div className="home-inner-poll-container">
        <div className="home-question-board">
          <div className="home-questions-area">
            <div className="home-questions-area-title">Status</div>
            <div className="home-questions-area-title">Nazwa</div>
            <div className="home-questions-area-title">Głosowanie</div>
            <div className="home-questions-area-title">Wyniki</div>
          </div>
          <Divider /> 
            {itemsToRender}
            <SyncLoader
              loading={loading}
              color={"#ffffff"}
              css={override}
              size={15}
            />
        </div>
      </div>
    </div>

  );
}

export default Home;