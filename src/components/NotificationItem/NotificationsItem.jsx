import React, {useState} from "react";
import APIAddress from "../../APIAddress";
import { SyncLoader } from "react-spinners";
import { toast } from "react-toastify";
import { css } from "@emotion/react";
import axios from "../../services/api-interceptor";

const override = css`
  margin: 0 auto;
  border-color: red;
`;

const NotificationItem = (props) =>{
    const [loading, setLoading] = useState(false);

    const markNotificationAsSeen= async () =>{
        setLoading(true);
        try {
            const response = await axios
              .put(APIAddress.value + "/api/Notification/SetAsSeen/"+props.id, props.id)
              .then(function (response) {
                console.log(response);
              });
          } catch (err) {
            toast.error(err.response.data.message);
          }
        setLoading(false);
        
    }

    return (<div>
        <span >{props.text}
        </span>
        <button onClick={() => markNotificationAsSeen()}>☑</button>
        <SyncLoader
          loading={loading}
          color={"#ffffff"}
          css={override}
          size={15}
        />
    </div>)
}

export default NotificationItem;