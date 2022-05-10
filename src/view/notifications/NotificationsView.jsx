import React, { useState, useEffect,useContext } from "react";
import APIAddress from "../../APIAddress";
import NotificationItem from "../../components/NotificationItem/NotificationsItem";
import { toast } from "react-toastify";
import { SyncLoader } from "react-spinners";
import { CustomThemeContext } from "../../utils/custom-theme-provider";
import { css } from "@emotion/react";

import axios from "../../services/api-interceptor";
import { Divider } from "@mui/material";

const override = css`
    margin: 0 auto;
    position: absolute;
    top:50%;
    left:50%;
`;


const NotificationsView = () => {
  const { currentTheme} = useContext(CustomThemeContext)
  const isDark = Boolean(currentTheme === 'dark')
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
          <NotificationItem text={notifications[i].title} id={notifications[i].id} />
        </div>)
      } else {
        seenNotificationsToRender.push(<div>
          <NotificationItem text={notifications[i].title} id={notifications[i].id} />
        </div>)
      }

    }
  }
  return (
    <div className="notificationview-poll-container">
      <div className="notificationview-inner-poll-container">
        <div className="notificationview-question-board" 
        style={{backgroundColor: isDark ? '#374785': '', color: isDark ?'#9ba3c2' : ''}}>
          <div className="notificationview-questions-area"
            style={{backgroundColor: isDark ? '#374785': '', color: isDark ?'#9ba3c2' : ''}}>
            <h1 style={{color: isDark ? 'white' : '#949494'}}>Powiadomienia</h1>
          </div>
          <Divider style={{backgroundColor: isDark ? '#5e6b9d': ''}}/>
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