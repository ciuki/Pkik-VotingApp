import React, { useState, useEffect,useContext } from "react";
import { Button, Divider, Grid, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import {
  createRegisterDTO,
  registerUser,
} from "../../../services/authorizeService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import { css } from "@emotion/react";

const override = css`
position: fixed;
top: 50%;
left: 0;
width: 100vw;
`;

const RegisterView = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    if (email===""){
      toast.error("Wypełnij wszystkie dane");
    }else{
      setLoading(true);
      let registerDTO = createRegisterDTO(email, password);
      let respone = await registerUser(registerDTO);
      setLoading(false);
      if (respone){
          navigate("/login");
      }
    }
    
    
  };

  return (
    <div className="register-view">
      <Grid className="register-window" container direction="column">
        <div className="register-title">REJESTRACJA</div>
        <Grid
          className="register-form"
          container
          direction="column"
          justifyContent="space-around"
          alignItems="stretch"
        >
          <TextField
            className="login-textfield"
            label="e-mail"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            className="login-textfield"
            type="password"
            label="hasło"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Grid gap="16px" container direction="column">
            <Button className="login-button" onClick={(e) => handleRegister()}>
              zarejestruj
            </Button>
            <Divider/>
            <Typography textAlign="center" variant="caption">
              Jeśli masz już konto,
              <br />
              <Link to="/login">zaloguj się</Link>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <SyncLoader
        loading={loading}
        color={"#ffffff"}
        css={override}
        size={15}
      />
    </div>
  );
};

export default RegisterView;
