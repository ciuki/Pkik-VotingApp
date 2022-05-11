import React, {useContext} from "react";
import { toast, ToastContainer } from "react-toastify";
import { CustomThemeContext } from "../../utils/custom-theme-provider";


const CustomFooter = () => {
  const { currentTheme, setTheme } = useContext(CustomThemeContext)
  const isDark = Boolean(currentTheme === 'dark')

  return (
    <section className="footer" style={{
      backgroundColor: isDark ? '#374785' : '#d06e73'
  }}>
      <div className="follow">
        <a href="https://www.facebook.com/" className="link">
          <img src="/Utilities/fb.png" alt="fb" />
        </a>
        <a href="https://www.instagram.com/" className="link">
          <img src="/Utilities/ig.png" alt="ig" />
        </a>
        <a href="https://twitter.com/" className="link">
          <img src="/Utilities/tw.png" alt="tw" />
        </a>
        <a href="https://www.youtube.com/" className="link">
          <img src="/Utilities/yt.png" alt="yt" />
        </a>
        <a href="https://github.com/xLaider/poll-react-app" className="link">
          <img src="/Utilities/git.png" alt="git" />
        </a>
      </div>
      <div className="follow">
        <div className="authors">
          <div className="authorstitle">
            Autorzy
          </div>
          <div className="authorsitem">
            Kamil Gołyźniak
          </div>
          <div className="authorsitem">
            Tomasz Gołowieszko
          </div>
          <div className="authorsitem">
            Rafał Miczek
          </div>
          <div className="authorsitem">
            Mateusz Błażków
          </div>
        </div>
      </div>
      <div className="follow">
        GNU General Public License
      </div>
      <ToastContainer
        position="top-center"
        autoClose={10000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </section>
  );
};

export default CustomFooter;