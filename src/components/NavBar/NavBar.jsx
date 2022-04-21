import React from "react";
import { Link } from "react-router-dom";

const NavBar = ({ isLoggedIn, permission }) => {
  let navBarItems = [];
  if (isLoggedIn) {
    navBarItems.push(
      <li className="nav-item">
        <Link to="/poll" className="nav-link">
          <img src="Utilities/survey.svg" alt="Przegladaj swoje ankiety" />
          <span className="link-text">Przegladaj swoje ankiety</span>
        </Link>
      </li>
    );
    navBarItems.push(
      <li className="nav-item">
        <Link to="/login" className="nav-link">
          <img src="Utilities/logout.svg" alt="Wyloguj się" />
          <span className="link-text">Wyloguj się</span>
        </Link>
      </li>
    );
  } else {
    navBarItems.push(
      <li className="nav-item">
        <Link to="/login" className="nav-link">
          <img src="Utilities/login.svg" alt="Zaloguj się" />
          <span className="link-text">Zaloguj się</span>
        </Link>
      </li>
    );
  }
  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <li className="nav-item">
        <Link to="/pollcreate" className="nav-link">
            <img src="Utilities/pen.svg" alt="Stwórz ankietę" />
            <span className="link-text">Stwórz ankietę</span>
          </Link>
        </li>
        {navBarItems}
      </ul>
    </nav>
  );
};

export default NavBar;
