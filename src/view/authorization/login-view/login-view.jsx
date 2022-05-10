import React, { useState, useEffect,useContext } from "react";
import { Button, Divider, Grid, TextField, Typography } from "@mui/material";
import { Navigate, Link } from "react-router-dom";
import { loginUser } from "../../../services/authorizeService";
import { css } from "@emotion/react";
import SyncLoader from "react-spinners/SyncLoader";
import { toast } from "react-toastify";

const override = css`
margin: 0 auto;
position: absolute;
top:50%;
left:50%;
`;

const LoginView = () => {
  const [loading, setLoading] = useState(false);
  const [emailInput, setEmail] = useState(null);
  const [passwordInput, setPassword] = useState(null);

  const login = async () => {
    let loginObject = {
      email: emailInput,
      password: passwordInput,
    };
    if (emailInput !== null && emailInput !== "") {
      await loginUser(loginObject);
      window.location.reload(false);
    }else{
      toast.error("Wypełnij wszystkie dane!")
    }
    setLoading(false);
    
  };

  const handleLogin = (e) => {
    setLoading(true);
    login();
  };

  if (localStorage.getItem("token") !== null) {
    return <Navigate to="/" />;
  }

  return (
    <div className="login-view">
      <Grid className="login-window" container direction="column">
        <div className="login-title">LOGOWANIE</div>
        <Grid
          className="login-form"
          container
          direction="column"
          justifyContent="space-around"
          alignItems="stretch"
        >
          <TextField
            onChange={(e) => setEmail(e.target.value)}
            className="login-textfield"
            label="E-mail"
          />
          <TextField
            onChange={(e) => setPassword(e.target.value)}
            className="login-textfield"
            label="hasło"
            type="password"
          />
          <Grid gap="16px" container direction="column">
            <Button onClick={(e) => handleLogin(e)} className="login-button">
              zaloguj
            </Button>
            <Divider/>
            <Typography textAlign="center" variant="caption">
              Jeśli nie posiadasz jeszcze konta,
              <br />
              <Link to="/register">załóż je</Link>
            </Typography>
          </Grid>
        </Grid>
        <SyncLoader
          loading={loading}
          color={"#ffffff"}
          css={override}
          size={15}
        />
      </Grid>
    </div>
  );
};

export default LoginView;
