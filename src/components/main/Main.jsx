import React, { useState, useEffect } from "react";
import List from "./list/List";
import { FcSettings } from "react-icons/fc";
import Settings from "./settings/Settings";
import "./main.css";

const Main = (props) => {
  const [counter, updateCounter] = useState(0);
  const [settingsOpen, toggleSettings] = useState(false);

  useEffect(() => {
    updateCounter(props.done.length);
  }, [props.done]);

  return (
    <>
      <center style={{ padding: "5px" }}>
        <div className="user-detail">
          <span
            style={{
              fontSize: "xx-large",
              color:
                props.messsage === "Loading data failed, try reloading!🧍‍♂️"
                  ? "#f55331"
                  : "#009879",
            }}
          >
            {props.messsage}
          </span>
          <hr
            style={{ background: "#96FF8D", height: "2px", border: "none" }}
          />
          <div className="main-card">
            <div className="solved-count">
              <div style={{ fontSize: "xxx-large", color: "#B2B2B2" }}>
                <span style={{ color: "#FF7A00" }}>{counter}</span> / 448
              </div>
              <div
                style={{
                  fontSize: "x-large",
                  color: "#767676",
                  marginTop: "5px",
                }}
              >
                Solved
              </div>
            </div>
            <div onClick={()=>{toggleSettings(!settingsOpen)}}>
              <FcSettings className={settingsOpen ? "rotated" : ""} />
            </div>
          </div>
        </div>
        {settingsOpen === true && <Settings toggleSettings={toggleSettings} />}
        <List
          done={props.done}
          updateCounter={updateCounter}
          dataArrived={props.dataArrived}
        />
      </center>
    </>
  );
};

export default Main;
