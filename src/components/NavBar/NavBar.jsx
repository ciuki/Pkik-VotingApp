import React from "react";

const NavBar = ({ isLoggedIn, permission }) => {
  let navBarItems = [];
  if (isLoggedIn) {
    navBarItems.push(
      <li>
        <a href="/">Przeglądaj swoje ankiety</a>
      </li>
    );
    navBarItems.push(
      <li className="loginButton">
        <a href="/" className="loginButton">
          Wyloguj się
        </a>
      </li>
    );
  } else {
    navBarItems.push(
      <li>
        <a href="/" className="loginButton">
          Zaloguj się
        </a>
      </li>
    );
  }
  return (
    <nav>
      <ul>
        <li>
          <a href="/">Stwórz ankietę</a>
        </li>
        {navBarItems}
      </ul>
    </nav>
  );
};

export default NavBar;
