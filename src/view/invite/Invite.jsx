import React, { useState, useEffect,useContext } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import APIAddress from "../../APIAddress";
import Select from "react-dropdown-select";
import axios from "../../services/api-interceptor";
import SyncLoader from "react-spinners/SyncLoader";
import { css } from "@emotion/react";
import { Divider } from "@mui/material";
import { CustomThemeContext } from "../../utils/custom-theme-provider";
const options = [];

const override = css`
position: fixed;
  top: 50%;
  left: 0;
  width: 100vw;
`;

const Invite = (props) => {
  const { currentTheme} = useContext(CustomThemeContext)
  const isDark = Boolean(currentTheme === 'dark')
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [usersData, setUsersData] = useState();
  const [emails, setEmails] = useState([]);
  const [ids, setIds] = useState([]);
  const [userID, setUserID] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
          await axios
          .get(APIAddress.value + "/api/User")
          .then(function (response) {
            setUsersData(response.data);
            for (let i = 0; i < response.data.length; i++) {
              options.push({
                value: response.data[i].id,
                label: response.data[i].email,
              });
            }
          });
      } catch (err) {
        toast.error(err.response.data.message);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setUserID(e[0].value);
    setUserEmail(e[0].label);
  };
  const handleAddToList = () => {
    if (emails.includes(userEmail)) {
      toast.error("Email znajudje się już na liście!");
    } else {
      setEmails([...emails, userEmail]);
      setIds([...ids, userID]);
    }
  };
  const sendInvites = async () => {
    setLoading(true);
    try {
        await axios.put(APIAddress.value + "/api/Poll/Invite/" + id, { userIds: ids })
        .then(function (response) {
          toast.success("Podane osoby zostały zaproszone!")
        }).catch(error => {
          toast.error("Nie możesz zapraszać do tej ankiety");
        });
    } catch (err) {
      toast.error(err.response.data);
    }
    setLoading(false);
  }

  let invitedPeopleToRender = [];
  for (let i = 0; i < emails.length + 1; i++) {
    invitedPeopleToRender.push(<div style={{color: isDark ? 'white': ''}}>{emails[i]}</div>);
  }

  return (
    <div className="invite-container">
      <div className="invite-inner-poll-container">
        <div className="invite-question-board" 
        style={{backgroundColor: isDark ? '#374785': '', color: isDark ?'#9ba3c2' : ''}}>
          <div className="invite-questions-area">
            <h1 style={{backgroundColor: isDark ? '#374785': '', color: isDark ? 'white' : '#949494'}}>Zaproś</h1>
          </div>
          <Divider style={{backgroundColor: isDark ? '#5e6b9d': ''}}/>
          <div className="invite-question-area">
              <div className="invite-question-area-group">
                <div className="invite-question-area-title"> Lista do zaproszenia: </div>
                <div className="invite-question-area-listitem"
                 style={{color: isDark ?'#9ba3c2' : ''}}>
                   {invitedPeopleToRender}</div>
              </div>
            <div className="invite-question-area-group2">
              <Select
                placeholder="Użytkownicy"
                className="choose"
                options={options}
                onChange={(e) => handleChange(e)}
                color="#000080"
              />
              <button 
              style={{backgroundColor: isDark ? '#9ba3c2': '', color: isDark ?'white' : ''}}
              className="invite-button2" onClick={() => handleAddToList()}>Dodaj do listy</button>
            </div>
          </div>
          {emails.length > 0 ? <button 
          style={{backgroundColor: isDark ? '#9ba3c2': '', color: isDark ?'white' : ''}}
          className="invite-button" onClick={async () => sendInvites()}>Zaproś podane osoby</button> : <></>}
        </div>
      </div>
      <SyncLoader
        loading={loading}
        color={"#ffffff"}
        css={override}
        size={15}
      />
    </div>
  );
};

export default Invite;
