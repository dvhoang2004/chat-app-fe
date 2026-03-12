import React, { useState } from 'react'
import './Settings.css'
import UserInfo from "../../components/UserInfo/UserInfo"
import HelpNSupport from "../../components/HelpNSupport/HelpNSupport"
// This is the settings page where users can change their preferences and account information.

const Settings = () => {

  const settingsOptions = [
    { element: <UserInfo />, label: "Account", id: "account" },
    { element: <HelpNSupport />, label: "Help & Support", id: "help-support" },
    { element: <p>You want to switch account?</p>, label: "Switch Account", id: "switch-account" },
  ];

  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className="settings-container">
      <div className="settings-sidebar">
        <h2 className="settings-title">Settings</h2>
        <ul className="settings-options-list">
          {settingsOptions.map((opt, index) => (
            <li
              key={opt.id}
              className={`settings-option ${index === selectedIndex ? 'active' : ''}`}
              onClick={() => setSelectedIndex(index)}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      </div>
      <div className="settings-content">
        {settingsOptions[selectedIndex].element}
      </div>
    </div>
  );
};

export default Settings;
