import React, {useState, useEffect} from "react";
import APIAddress from "../../APIAddress";
import {  useNavigate } from "react-router-dom";
import { css } from "@emotion/react";
import SyncLoader from "react-spinners/SyncLoader";
import {toast} from "react-toastify"

import axios from "../../services/api-interceptor";

const override = css`
  margin: 0 auto;
  border-color: red;
`;

const MyPolls = () => {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [pollsData, setPollsData] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios
              .get(APIAddress.value + "/api/Poll/MyPolls")
              .then(function (response) {
                setPollsData(response.data);
              });
          } catch (err) {
            toast.error(err.response.data); // ***
          }
          setLoading(false);
        };
        fetchData();
      }, []);
    let itemsToRender = [];
    if (pollsData !== null){
        for (let i=0; i<pollsData.length; i++){
            itemsToRender.push(<>
                <tr>
                    <td>{pollsData[i].name}</td>
                    <td><button onClick={(e)=> navigate("/poll/"+pollsData[i].id)}>Zagłosuj</button></td>
                    <td><button onClick={(e)=> navigate("/summary/"+pollsData[i].id)}>Zobacz wyniki</button></td>
                </tr>
            </>)
        }
    }
    
    return (<>
    <table>
        <tr>
            <th>Nazwa</th>
            <th>Głosowanie</th>
            <th>Wyniki</th>
        </tr>
        {itemsToRender}
        <SyncLoader
          loading={loading}
          color={"#ffffff"}
          css={override}
          size={15}
        />
    </table>
    </>);
}

export default MyPolls;