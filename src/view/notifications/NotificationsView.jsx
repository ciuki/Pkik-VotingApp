import React, { useState, useEffect } from "react";
import APIAddress from "../../APIAddress";
import NotificationItem from "../../components/NotificationItem/NotificationsItem";
import {toast} from "react-toastify";
import { SyncLoader } from "react-spinners";
import { css } from "@emotion/react";

import axios from "../../services/api-interceptor";

const override = css`
  margin: 0 auto;
  border-color: red;
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
                setNotifications(response.data);
              });
          } catch (err) {
            toast.error(err.response.data.message);
          }
        };
        fetchData();
        setLoading(false);
      }, []);

    let notificationsToRender = [];
    if (notifications !== null){
        for (let i=0; i<notifications.length; i++){
            notificationsToRender.push(<div>
                <NotificationItem text={notifications[i].title} id={notifications[i].id}/>
            </div>)
        }
    }
    return (
        <div style={{marginLeft: 5+'rem'}}>
            {notificationsToRender.length>0 ? notificationsToRender : <>Brak nowych powiadomień</>}
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