import React, { useState, useEffect } from "react";
import List from "./list/List";
// import { FcSettings } from "react-icons/fc";
import Settings from "./settings/Settings";
import "./main.css";
import dataDSA from "../data/problems.json";
import topicsDSA from "../data/topics.json";
import dataCP from "../data/kartikCpProblems.json";
import topicsCP from "../data/kartikCpTopics.json";

const Main = (props) => {
  const [counter, updateCounter] = useState(0);
  const [settingsOpen, toggleSettings] = useState(false);
  // eslint-disable-next-line
  const [data, updateData] = useState(props.which === 'done' ? dataDSA : dataCP);
  // eslint-disable-next-line
  const [topics, updateTopics] = useState(props.which === 'done' ? topicsDSA : topicsCP);
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
        <div className="user-detail" style={{paddingBottom:"40px", paddingTop:"30px"}}>
          <span
            style={{
              fontSize: "xx-large",
              color:
                props.message === "Loading data failed, try reloading!🧍‍♂️"
                  ? "#f55331"
                  : "#009879",
            }}
          >
            {props.message}
          </span>
          <div style={{fontWeight: 600, color: "#44003ecc", paddingBottom:"20px"}}>{(window.localStorage.getItem('which') || "done") === "done" ? "Love Babbar's Sheet" : "Kartik Arora's Sheet"}</div>
          
          <div className="main-card">
            <div className="solved-count">
              <div style={{ fontSize: "xxx-large", color: "#B2B2B2", fontWeight: 600 }}>
                <span style={{ color: "#FF00B888" }}>{counter}</span> / {data.length}
              </div>
            </div>
            {/* <div
              onClick={() => {
                toggleSettings(!settingsOpen);
              }}
            >
              <FcSettings className={settingsOpen ? "rotated" : ""} />
            </div> */}
          </div>
        </div>
        {settingsOpen === true && <Settings toggleSettings={toggleSettings} />}
        <List
          which={props.which}
          done={props.done}
          data={data}
          topics={topics}
          updateCounter={updateCounter}
          dataArrived={props.dataArrived}
        />
      </center>
    </>
  );
};

export default Main;
