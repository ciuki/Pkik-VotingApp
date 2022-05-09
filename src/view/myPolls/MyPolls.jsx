import React, { useState, useEffect } from "react";
import APIAddress from "../../APIAddress";
import { useNavigate } from "react-router-dom";
import { css } from "@emotion/react";
import SyncLoader from "react-spinners/SyncLoader";
import { toast } from "react-toastify";

import axios from "../../services/api-interceptor";
import { Divider } from "@mui/material";

const override = css`
    margin: 0 auto;
    position: absolute;
    top:50%;
    left:50%;
`;

const MyPolls = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [pollsData, setPollsData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios
          .get(APIAddress.value + "/api/Poll/MyPolls")
          .then(function (response) {
            setPollsData(response.data);
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
      itemsToRender.push(
        <>
          <tr className="mypolls-questions-area">
            <div className="mypolls-questions-area-cell">{i + 1}.</div>
            <div className="mypolls-questions-area-cell">{pollsData[i].name}</div>
            <div className="mypolls-questions-area-cell">
              <button className="mypolls-button" onClick={(e) => navigate("/poll/" + pollsData[i].id)}>
                Zagłosuj
              </button>
            </div>
            <div className="mypolls-questions-area-cell">
              <button className="mypolls-button" onClick={(e) => navigate("/summary/" + pollsData[i].id)}>
                Zobacz wyniki
              </button>
            </div>
            <div className="mypolls-questions-area-cell-group">
              {!pollsData[i].allowAnonymous ? (
                <div className="mypolls-questions-area-cell">
                  <button className="mypolls-button" onClick={(e) => navigate("/invite/" + pollsData[i].id)}>
                    Zaproś do ankiety
                  </button>
                </div>
              ) : (
                <>Ankieta jest dostępna dla wszystkich</>
              )}
              <div className="mypolls-questions-area-cell">
                <button className="mypolls-button" onClick={(e) => navigate("/AddModerators/" + pollsData[i].id)}>
                  Dodaj moderatorów
                </button>
              </div>
            </div>
          </tr>
          <Divider />
        </>
      );
    }
  }

  return (
    <div className="mypolls-container">
      <div className="mypolls-inner-poll-container">
        <div className="mypolls-question-board">
          <div className="mypolls-questions-area">
            <div className="mypolls-questions-area-title">Lp.</div>
            <div className="mypolls-questions-area-title">Nazwa</div>
            <div className="mypolls-questions-area-title">Głosowanie</div>
            <div className="mypolls-questions-area-title">Wyniki</div>
            <div className="mypolls-questions-area-title">Dodatkowe opcje</div>
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
};

export default MyPolls;
