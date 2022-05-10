import React, { useContext } from "react";
import { BrowserRouter } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import CustomRoutes from "../../routes/routes";
import { CustomThemeContext } from "../../utils/custom-theme-provider";


const MainPage = () => {

  const { currentTheme} = useContext(CustomThemeContext)
  const isDark = Boolean(currentTheme === 'dark')
    return (
        <div style={{backgroundColor: isDark ? '#10152b' : '#f69b9f', minHeight:'100vh'}}>
            <BrowserRouter>
                <CustomRoutes />
                <NavBar isLoggedIn={localStorage.token} />
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