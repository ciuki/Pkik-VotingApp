import React, {useState, useEffect} from "react";
import APIAddress from "../../APIAddress";
import { Navigate, useNavigate } from "react-router-dom";

const axios = require("axios");

const MyPolls = () => {
    const navigate = useNavigate();
    const [pollsData, setPollsData] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios
              .get(APIAddress.value + "/api/Poll/MyPolls")
              .then(function (response) {
                console.log(response.data);
                setPollsData(response.data);
              });
          } catch (err) {
            console.error("Error response:");
            console.error(err.response.data); // ***
            console.error(err.response.status); // ***
            console.error(err.response.headers);
          }
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
    </table>
    </>);
}

export default MyPolls;