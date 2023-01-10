import React, { useContext, useEffect, useState } from "react";

import APIAddress from "../../APIAddress";
import { CustomThemeContext } from "../../utils/custom-theme-provider";
import { Divider } from "@mui/material";
import NotificationItem from "../../components/NotificationItem/NotificationsItem";
import { SyncLoader } from "react-spinners";
import axios from "../../services/api-interceptor";
import { css } from "@emotion/react";
import { toast } from "react-toastify";

const override = css`
position: fixed;
top: 50%;
left: 0;
width: 100vw;
`;


const NotificationsView = () => {
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios
          .get(APIAddress.value + "/api/Notification")
          .then(function (response) {
            let array = response.data;
            array.reverse();
            setNotifications(array);
          });
      } catch (err) {
        toast.error(err.response.data.message);
      }
    };
    fetchData();
    setLoading(false);
  }, []);

  let notificationsToRender = [];
  let seenNotificationsToRender = [];
  if (notifications !== null) {
    for (let i = 0; i < notifications.length; i++) {
      if (!notifications[i].seen) {
        notificationsToRender.push(<div>
          <NotificationItem text={notifications[i].title} id={notifications[i].id} isSeen={notifications[i].seen}/>
        </div>)
      } else {
        seenNotificationsToRender.push(<div>
          <NotificationItem text={notifications[i].title} id={notifications[i].id } isSeen={notifications[i].seen} />
        </div>)
      }

    }
  }
  return (
    <div className="notificationview-poll-container">
      <div className="notificationview-inner-poll-container">
        <div className="notificationview-question-board" 
        style={{backgroundColor:'#374785', color:'#9ba3c2'}}>
          <div className="notificationview-questions-area"
            style={{backgroundColor:'#374785', color:'#9ba3c2'}}>
            <h1 style={{color:'white'}}>Powiadomienia</h1>
          </div>
          <Divider style={{backgroundColor:'#5e6b9d'}}/>
          <div className="notificationview-item-container">
            {notificationsToRender.length > 0 ?
              <div className="notificationview-item-container-group">
                <div className="notificationview-item-container-description">Nowe</div>
                {notificationsToRender}
              </div> : <></>}
            {seenNotificationsToRender.length > 0 ?
              <div className="notificationview-item-container-group">
                <div className="notificationview-item-container-description">Wyświetlone</div>
                {seenNotificationsToRender}</div> : <></>}
          </div>
        </div>
      </div>
      <SyncLoader
        loading={loading}
        color={"#ffffff"}
        css={override}
        size={15}
      />
    </div>
  )
}

export default NotificationsView;