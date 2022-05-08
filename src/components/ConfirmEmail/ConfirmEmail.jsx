import React, {useEffect} from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import APIAddress from "../../APIAddress";
import axios from "../../services/api-interceptor";

const ConfirmEmail = () =>{
    const {id} = useParams();
    const {token} = useParams();
    useEffect(() => {
        const fetchData = async () => {
          try {
            console.log(id, token);
            let confirmMailDTO = {
              userId: id,
              confirmationToken: token 
            };
            const response = await axios
              .post(APIAddress.value + "/api/User/ConfirmMail/",confirmMailDTO)
              .then(function (response) {
                console.log(response.data);
              });
          } catch (err) {
            toast.error(err.response.data.message);
          }
        };
        fetchData();
      }, []);
      return <>Trwa potwierdzanie...</>
}

export default ConfirmEmail;