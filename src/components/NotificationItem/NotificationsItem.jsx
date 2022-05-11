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
  const [isSeen, setSeen] = useState(props.isSeen);
  const markNotificationAsSeen = async () => {

    setLoading(true);
    try {
        await axios
        .put(APIAddress.value + "/api/Notification/SetAsSeen/" + props.id)
        .then(function (response) {
          setSeen(true);
        });
    } catch (err) {
      toast.error(err.response.data.message);
    }
    setLoading(false);

  }       
  return (
    <div>
      <div className='notificationsitem'
      style={{backgroundColor: isDark  ?  isSeen ? '#374785': '#5e6b9d' : !isSeen ? '#000080': 'white' , color: isDark ? '#ffffff' : ''}}>
        <button className="notificationsitem-button" onClick={() => markNotificationAsSeen()}>
          <div className="notificationsitem-grid">
          <div className="notificationsitem-grid-time">
              <span>
              
              </span>
            </div>
            <div className="notificationsitem-grid-item"
             style={{color: isDark ?'#9ba3c2' : isSeen ? '' :'white'}}>
              <span style= {{fontWeight: isSeen ? '' : 'bold'}}>
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