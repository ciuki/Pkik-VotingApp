import "./App.css";
import "./scssConfig/style.css";

import { CssBaseline } from "@mui/material";
import CustomThemeProvider from "./utils/custom-theme-provider";
import MainPage from "./view/main/main";

function App() {

  return (
    <div className="area">
      <CustomThemeProvider>
        <CssBaseline />
          <MainPage/>
      </CustomThemeProvider>
    </div>
  );
}

export default App;
