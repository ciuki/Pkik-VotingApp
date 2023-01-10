import React, { useContext, useState } from "react";

import APIAddress from "../../APIAddress";
import { CustomThemeContext } from "../../utils/custom-theme-provider";
import { Divider } from "@mui/material";
import { SyncLoader } from "react-spinners";
import axios from "../../services/api-interceptor";
import { css } from "@emotion/react";
import { toast } from "react-toastify";

const override = css`
  margin: 0 auto;
`;

const NotificationItem = (props) => {
  const { currentTheme} = useContext(CustomThemeContext)
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
      style={{backgroundColor:'#374785', color: ''}}>
        <button className="notificationsitem-button" onClick={() => markNotificationAsSeen()}>
          <div className="notificationsitem-grid">
          <div className="notificationsitem-grid-time">
              <span>
              
              </span>
            </div>
            <div className="notificationsitem-grid-item"
             style={{color:'#9ba3c2'}}>
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
      <Divider style={{backgroundColor:'#5e6b9d'}}/>
    </div>
  )
}

export default NotificationItem;