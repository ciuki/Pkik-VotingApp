import React, { useContext } from "react";

import { BrowserRouter } from "react-router-dom";
import CustomFooter from "../../components/footer/footer";
import CustomRoutes from "../../routes/routes";
import { CustomThemeContext } from "../../utils/custom-theme-provider";
import NavBar from "../../components/NavBar/NavBar";

const MainPage = () => {

    return (
        <div style={{backgroundColor:'#10152b', minHeight:'100vh'}}>
            <BrowserRouter>
                <CustomRoutes />
                <NavBar isLoggedIn={localStorage.token} />
                <CustomFooter/>
            </BrowserRouter>          
            <ul className="circles">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
           
        </div>
    );
};

export default MainPage;