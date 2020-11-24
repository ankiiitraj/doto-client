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
    var d = document;
    var x = !d.getElementById("razorpay-embed-btn-js");
    if (x) {
      var s = d.createElement("script");
      s.defer = !0;
      s.id = "razorpay-embed-btn-js";
      s.src = "https://cdn.razorpay.com/static/embed_btn/bundle.js";
      d.body.appendChild(s);
    } else {
      var rzp = window["__rzp__"];
      rzp && rzp.init && rzp.init();
    }
  }, [props.done]);

  return (
    <>
      <center style={{ padding: "5px" }}>
        <div
          style={{display: (window.innerWidth < 700 ? "none" : ""), position: "fixed", bottom: "0", right: "0", zIndex: "1000"}}
          className="razorpay-embed-btn"
          data-url="https://pages.razorpay.com/pl_G1Yg5MfSMvwqxs/view"
          data-text="Support Us"
          data-color="#528FF0"
          data-size="medium"
        ></div>
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
            <div
              onClick={() => {
                toggleSettings(!settingsOpen);
              }}
            >
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
