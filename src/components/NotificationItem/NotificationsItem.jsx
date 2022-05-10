import React, { useState, useEffect,useContext } from "react";
import APIAddress from "../../APIAddress";
import { SyncLoader } from "react-spinners";
import { toast } from "react-toastify";
import { css } from "@emotion/react";
import axios from "../../services/api-interceptor";
import { Divider } from "@mui/material";
import { CustomThemeContext } from "../../utils/custom-theme-provider";

const override = css`
  margin: 0 auto;
`;

const NotificationItem = (props) => {
  const { currentTheme} = useContext(CustomThemeContext)
  const isDark = Boolean(currentTheme === 'dark')
  const [loading, setLoading] = useState(false);
  const [isActive, setActive] = useState(false);

  const markNotificationAsSeen = async () => {
    setLoading(true);
    try {
      const response = await axios
        .put(APIAddress.value + "/api/Notification/SetAsSeen/" + props.id, props.id)
        .then(function (response) {
          setActive(!isActive);
        });
    } catch (err) {
      toast.error(err.response.data.message);
    }
    setLoading(false);

  }
       
    
  return (
    <div>
      <div className={isActive ? 'notificationsitem': "notificationsitem-unread"}>
        <button className="notificationsitem-button" onClick={() => markNotificationAsSeen()}>
          <div className="notificationsitem-grid">
          <div className="notificationsitem-grid-time">
              <span>
                może jakaś data i czas ?
              </span>
            </div>
            <div className="notificationsitem-grid-item">
              <span>
                {props.text}
              </span>
            </div>
            <div>
              <SyncLoader
                loading={loading}
                color={"#ffffff"}
                css={override}
                size={15}
              /></div>
          </div>
        </button>
      </div>
      <Divider style={{backgroundColor: isDark ? '#5e6b9d': ''}}/>
    </div>
  )
}

export default NotificationItem;