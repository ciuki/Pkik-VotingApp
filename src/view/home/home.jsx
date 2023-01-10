import React, { useContext, useEffect, useState } from "react";

import APIAddress from "../../APIAddress";
import { CustomThemeContext } from "../../utils/custom-theme-provider";
import { Divider } from "@mui/material";
import SyncLoader from "react-spinners/SyncLoader";
import axios from "../../services/api-interceptor";
import { css } from "@emotion/react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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
  let currentDate = new Date();
  if (pollsData !== null) {
    for (let i = 0; i < pollsData.length; i++) {
      if (pollsData[i].allowAnonymous || localStorage.getItem("token") !== null)
        itemsToRender.push(
          <>
            <div className="home-questions-area" 
            style={{backgroundColor: '#374785', color:'#9ba3c2'}}>
              <div className="home-questions-area-cell">
                {pollsData[i].isActive ? (
                  <div className="container">
                    <div className="led-box">
                      <div className="led-green"></div>
                    </div>
                  </div>
                ) : (
                  <>
                    {currentDate < new Date(pollsData[i].startDate) ? (
                      <div className="container">
                        <div className="led-box">
                          <div className="led-yellow"></div>
                        </div>
                      </div>
                    ) : (
                      <div className="container">
                        <div className="led-box">
                          <div className="led-red"></div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
              <div className="home-questions-area-cell">
                {pollsData[i].name}
              </div>
              <div className="home-questions-area-cell">
                <button
                  style={{backgroundColor:'#9ba3c2', color:'white'}}
                  className="home-button"
                  onClick={(e) => navigate("/poll/" + pollsData[i].id)}
                >
                  Zagłosuj
                </button>
              </div>
              <div className="home-questions-area-cell">
                <button
                  style={{backgroundColor: '#9ba3c2', color:'white'}}
                  className="home-button"
                  onClick={(e) => navigate("/summary/" + pollsData[i].id)}
                >
                  Zobacz wyniki
                </button>
              </div>
            </div>
            <Divider style={{backgroundColor: '#5e6b9d'}}/>
          </>
        );
    }
  }
  return (
    <div className="home-container">
      <div className="home-inner-poll-container">
        <div className="home-question-board">
          <div className="home-questions-area" style={{backgroundColor:'#374785', color:'white'}}>
            <div className="home-questions-area-title2">Moje ankiety</div>
            <div className="home-questions-area-title">Status</div>
            <div className="home-questions-area-title">Nazwa</div>
            <div className="home-questions-area-title">Głosowanie</div>
            <div className="home-questions-area-title">Wyniki</div>
          </div>
          <Divider style={{backgroundColor:'#5e6b9d'}}/> 
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
};

export default Home;
