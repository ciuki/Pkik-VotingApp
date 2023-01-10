import React, {useContext} from "react";
import { ToastContainer, toast } from "react-toastify";

import { CustomThemeContext } from "../../utils/custom-theme-provider";

const CustomFooter = () => {
  const { currentTheme, setTheme } = useContext(CustomThemeContext)

  return (
    <section className="footer" style={{
      backgroundColor:'#374785'
  }}>
      <div className="follow">
        GNU General Public License
      </div>
    </section>
  );
};

export default CustomFooter;