import React from "react";

const Notifications = () => {
  return (
    <div className="notifications">
      <a href="/notifications">
        <button type="button" className="notification-button">
          <img src="Utilities/notifications.svg" alt="Powiadomienia" />
          <span className="notifications-badge">2</span>
        </button>
      </a>
    </div>
  );
};

export default Notifications;
