import Axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "../list/list.css";
import "./settings.css";

const Settings = (props) => {
  const [userSettings, updateUserSettings] = useState({
    loaded: false,
    message: "Loading . . .",
    buttonName: "Edit",
    editing: false,
  });
  const fetchSettings = () => {
    Axios.get(`${process.env.REACT_APP_BASE_ENDPOINT || ""}/user-settings`, {
      headers: {
        authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        const data = res.data.result;
        data.username = data.username || data.email.split("@")[0];
        updateUserSettings({ ...userSettings, ...data, loaded: true });
      })
      .catch((err) => {
        updateUserSettings({
          ...userSettings,
          message: "Something went wrong, try RELOADING!",
        });
      });
  };
  useEffect(() => {
    fetchSettings();
    //eslint-disable-next-line
  }, []);

  const updateDbSettings = (item, value) => {
    Axios.put(
      `${process.env.REACT_APP_BASE_ENDPOINT || ""}/user-settings`,
      { item, value },
      {
        headers: {
          authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      }
    )
      .then(() => {
        userSettings[item] = value;
        updateUserSettings({ ...userSettings });
        NotificationManager.success("Updated");
      })
      .catch(() => {
        NotificationManager.warning(
          "something wrong happened! try again later 😵"
        );
      });
  };

  return (
    <>
      <div className="settings-card">
        <div className="settings-header">
          <span>Settings</span>
          <AiOutlineCloseCircle
            style={{ cursor: "pointer" }}
            onClick={() => {
              props.toggleSettings();
            }}
          />
        </div>
        <hr style={{ background: "#96FF8D", height: "2px", border: "none" }} />
        <div className="settings-options">
          {userSettings.loaded === false ? (
            userSettings.message
          ) : (
            <>
              <div className="settings-option">
                <span>
                  Leaderboard
                  <span style={{ fontSize: "small" }}>(opt out)</span>
                </span>
                <input
                  checked={userSettings.inLeaderboard}
                  onChange={(e) => {
                    updateDbSettings("inLeaderboard", e.target.checked);
                  }}
                  type="checkbox"
                  id={`switch-ool`}
                />
                <label htmlFor={`switch-ool`}>Toggle</label>
              </div>
              <div className="settings-option">
                <span>Username</span>
                <input
                  disabled={!userSettings.editing}
                  value={userSettings.username}
                  style={{
                    textAlign: "right",
                    maxWidth: "100px",
                  }}
                  onChange={(e) => {
                    updateUserSettings({
                      ...userSettings,
                      username: e.target.value,
                    });
                  }}
                />
                {/* Needs thinking */}
                {/* <button
                  onClick={() => {
                    updateUserSettings({
                      ...userSettings,
                      buttonName: userSettings.editing ? "Edit" : "Save",
                      editing: !userSettings.editing,
                    });
                  }}
                >
                  {userSettings.buttonName}
                </button> */}
              </div>
              <span style={{ fontSize: "small", color: "#ff0000" }}>
                *Feature for changing username is coming soon
              </span>
            </>
          )}
        </div>
      </div>
      <NotificationContainer />
    </>
  );
};

export default Settings;
