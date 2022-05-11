import React, {useEffect,useContext} from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import APIAddress from "../../APIAddress";
import axios from "../../services/api-interceptor";
import { CustomThemeContext } from "../../utils/custom-theme-provider";

const ConfirmEmail = () =>{
  const { currentTheme} = useContext(CustomThemeContext)
  const isDark = Boolean(currentTheme === 'dark')
  const navigate = useNavigate();
    const {id} = useParams();
    const {token} = useParams();
    useEffect(() => {
        const fetchData = async () => {
          try {
            let newToken = encodeURIComponent(token);
            let confirmMailDTO = {
              userId: id,
              confirmationToken: newToken 
            };
            const response = await axios
              .post(APIAddress.value + "/api/User/ConfirmMail/",confirmMailDTO)
              .then(function (response) {
                toast.success("Konto zostało zatwierdzone!");
                navigate("/login");
              });
          } catch (err) {
            toast.error(err.response.data.message);
          }
        };
        fetchData();
      }, []);
      return (
        <div className="summary-container">
        <div className="summary-inner-poll-container">
            <div className="summary-question-board" style={{backgroundColor: isDark ? '#374785': '', color: isDark ?'#9ba3c2' : ''}}>
                <h1 style={{paddingTop: '8rem',paddingBottom: '8rem'}}> Trwa potwierdzanie....</h1>
            </div>
        </div>
      </div>
      )
}

export default ConfirmEmail;