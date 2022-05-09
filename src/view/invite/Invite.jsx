import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import APIAddress from "../../APIAddress";
import Select from "react-dropdown-select";
import axios from "../../services/api-interceptor";
import SyncLoader from "react-spinners/SyncLoader";
import { css } from "@emotion/react";
import { Divider } from "@mui/material";
const options = [];

const override = css`
margin: 0 auto;
position: absolute;
top:50%;
left:50%;
`;

const Invite = (props) => {
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
        const response = await axios
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
      let respone = await axios.put(APIAddress.value + "/api/Poll/Invite/" + id, { userIds: ids })
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
    invitedPeopleToRender.push(<div>{emails[i]}</div>);
  }

  return (
    <div className="invite-container">
      <div className="invite-inner-poll-container">
        <div className="invite-question-board">
          <div className="invite-questions-area">
            <h1>Zaproś</h1>
          </div>
          <Divider />
          <div className="invite-question-area">
              <div className="invite-question-area-group">
                <div className="invite-question-area-title"> Lista do zaproszenia: </div>
                <div className="invite-question-area-listitem">{invitedPeopleToRender}</div>
              </div>
            <div className="invite-question-area-group2">
              <Select
                placeholder="Użytkownicy"
                className="choose"
                options={options}
                onChange={(e) => handleChange(e)}
                color="#000080"
              />
              <button className="invite-button2" onClick={() => handleAddToList()}>Dodaj do listy</button>
            </div>
          </div>
          {emails.length > 0 ? <button className="invite-button" onClick={async () => sendInvites()}>Zaproś podane osoby</button> : <></>}
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
