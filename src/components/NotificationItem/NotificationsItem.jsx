import React, { useState, useContext } from "react";
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
  const [isActive, setActive] = useState();

  const markNotificationAsSeen = async () => {
    setLoading(true);
    try {
        await axios
        .put(APIAddress.value + "/api/Notification/SetAsSeen/" + props.id)
        .then(function (response) {
          setActive(false);
        });
    } catch (err) {
      toast.error(err.response.data.message);
    }
    setLoading(false);

  }       
  return (
    <div>
      <div className={!isActive ? 'notificationsitem': "notificationsitem-unread"} 
      style={{backgroundColor: isDark ? '#374785': '', color: isDark ? '#ffffff' : ''}}>
        <button className="notificationsitem-button" onClick={() => markNotificationAsSeen()}>
          <div className="notificationsitem-grid">
          <div className="notificationsitem-grid-time">
              <span>
              
              </span>
            </div>
            <div className="notificationsitem-grid-item"
             style={{color: isDark ?'#9ba3c2' : ''}}>
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