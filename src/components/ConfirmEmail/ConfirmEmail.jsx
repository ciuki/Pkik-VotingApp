import React, {useEffect} from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import APIAddress from "../../APIAddress";
import axios from "../../services/api-interceptor";

const ConfirmEmail = () =>{
  const navigate = useNavigate();
    const {id} = useParams();
    const {token} = useParams();
    useEffect(() => {
        const fetchData = async () => {
          try {
            console.log(id, token);
            let newToken = token.replace(/\//g, '%2f');
            newToken = newToken.replace(/\+/g, '%2b');
            newToken = newToken.replace(/\=/g, '%3d');
            let confirmMailDTO = {
              userId: id,
              confirmationToken: newToken 
            };
            console.log(confirmMailDTO);
            const response = await axios
              .post(APIAddress.value + "/api/User/ConfirmMail/",confirmMailDTO)
              .then(function (response) {
                toast.success("Konto zostało zatwierdzone!");
                navigate("/login");
              });
          } catch (err) {
            toast.error(err.response.data.message);
            console.log(err);
          }
        };
        fetchData();
      }, []);
      return <>Trwa potwierdzanie...</>
}

export default ConfirmEmail;