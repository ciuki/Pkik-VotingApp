import React from "react";

const NavBar = ({ isLoggedIn, permission }) => {
  let navBarItems = [];
  if (isLoggedIn) {
    navBarItems.push(
      <li className="nav-item">
        <a href="#" className="nav-link">
          <img src="Utilities/survey.svg" alt="Przegladaj swoje ankiety" />
          <span className="link-text">Przegladaj swoje ankiety</span>
        </a>
      </li>
    );
    navBarItems.push(
      <li className="nav-item">
        <a href="#" className="nav-link">
          <img src="Utilities/logout.svg" alt="Wyloguj się" />
          <span className="link-text">Wyloguj się</span>
        </a>
      </li>
    );
  } else {
    navBarItems.push(
      <li className="nav-item">
        <a href="#" className="nav-link">
          <img src="Utilities/login.svg" alt="Zaloguj się" />
          <span className="link-text">Zaloguj się</span>
        </a>
      </li>
    );
  }
  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a href="" className="nav-link">
            <img src="Utilities/pen.svg" alt="Stwórz ankietę" />
            <span className="link-text">Stwórz ankietę</span>
          </a>
        </li>
        {navBarItems}
      </ul>
    </nav>
  );
};

export default NavBar;
