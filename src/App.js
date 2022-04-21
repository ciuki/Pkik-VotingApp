import "./App.css";
import "./scssConfig/style.css";
import NavBar from "./components/NavBar/NavBar";
import CustomRoutes from "./routes/routes";
import { ThemeProvider } from "@mui/material";
import baseTheme from "./theme/base-theme";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="area">
      <ThemeProvider theme={baseTheme}>
        <BrowserRouter>
          <CustomRoutes />
          <NavBar />
          
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
      </ThemeProvider>
    </div>
  );
}

export default App;
