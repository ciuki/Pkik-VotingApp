import React from "react";

const NavBar = ({ isLoggedIn, permission }) => {
  return (
    <div className="navbar">
      <ul>
        <li>
        <a href="">Stwórz ankietę</a>
        </li>
        <li>
          {isLoggedIn ? (
            <div>
              <li>
                <a href="">Przeglądaj swoje ankiety</a>
              </li>
              <li>
                <a href="" className="loginButton">
                  Wyloguj się
                </a>
              </li>
            </div>
          ) : (
            <div>
                <div>
                <a href="" className="loginButton">
                  Zaloguj się
                </a>
              </div>
            </div>
          )}
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
