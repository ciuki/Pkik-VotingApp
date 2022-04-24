import React from "react";
import { Link } from "react-router-dom";

const Notifications = () => {
  return (
    <div className="notifications">
      <Link to="/notifications">
        <button type="button" className="notification-button">
          <img src="Utilities/notifications.svg" alt="Powiadomienia" />
          <span className="notifications-badge">2</span>
        </button>
      </Link>
    </div>
  );
};

export default Notifications;
