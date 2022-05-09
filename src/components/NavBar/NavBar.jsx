import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import APIAddress from "../../APIAddress";
import { toast } from "react-toastify";

import axios from "../../services/api-interceptor";

const NavBar = () => {
  const [notifications, setNotifications] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (localStorage.getItem("token") !== null) {
          const response = await axios
            .get(APIAddress.value + "/api/Notification")
            .then(function (response) {
              let counter=0;
              for (let i=0; i<response.data.length; i++){
                if(!response.data[i].seen){
                  counter++;
                }
                setNotifications(counter);
              }
            });
        }
      } catch (err) {
        toast.error(err.response.data.message);
      }
    };
    fetchData();
  }, []);

  let navBarItems = [];
  if (localStorage.getItem("token") !== null) {
    navBarItems.push(
      <li className="nav-item">
        <Link to="/myPolls" className="nav-link">
          <img src="/Utilities/survey.svg" alt="Przegladaj swoje ankiety" />
          <span className="link-text">Przegladaj swoje ankiety</span>
        </Link>
      </li>
    );
    navBarItems.push(
      <li className="nav-item">
        <Link to="/notifications" className="nav-link">
          <div>
            {notifications !== null && notifications !== 0 ? (
              <span className="notifications-badge">
                {notifications}
              </span>
            ) : (
              <></>
            )}

            <img src="/Utilities/notifications.svg" alt="Powiadomienia" />
          </div>
          <span className="link-text">Powiadomienia</span>
        </Link>
      </li>
    );
    navBarItems.push(
      <li className="nav-item">
        <Link to="/logout" className="nav-link">
          <img src="/Utilities/logout.svg" alt="Wyloguj się" />
          <span className="link-text">Wyloguj się</span>
        </Link>
      </li>
    );
  } else {
    navBarItems.push(
      <li className="nav-item">
        <Link to="/login" className="nav-link">
          <img src="/Utilities/login.svg" alt="Zaloguj się" />
          <span className="link-text">Zaloguj się</span>
        </Link>
      </li>
    );
  }
  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            <img src="/Utilities/home.svg" alt="Stwórz ankietę" />
            <span className="link-text">Strona główna</span>
          </Link>
          <Link to="/pollcreate" className="nav-link">
            <img src="/Utilities/pen.svg" alt="Stwórz ankietę" />
            <span className="link-text">Stwórz ankietę</span>
          </Link>
        </li>
        {navBarItems}
      </ul>
    </nav>
  );
};

export default NavBar;
