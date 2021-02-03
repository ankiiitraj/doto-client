import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "../list/list.css";
import "./leaderboard.css";

const Leaderboard = ({username}) => {
  const [data, updateData] = useState([]);
  const [loaded, updateLoaded] = useState(0);
  const [message, updateMessage] = useState("Loading . . . 🤸🏻 🏃🏻 🚶🏻🧍🏻🧎🏻");
  const [pageOffset, updateOffset] = useState(0);
  const [disableNext, toggleDisableNext] = useState(false);
  const limit = 25;
  let ranking = 1;
  useEffect(() => {
    console.log(username);
    updateLoaded(0);
    axios
      .get(
        `${process.env.REACT_APP_BASE_ENDPOINT || ""}/leaderboard?offset=${
          limit * pageOffset
        }`
      )
      .then((res) => {
        if (res.data.result.length === 0) {
          updateOffset((cur) => cur - 1);
        } else {
          if (res.data.result.length < limit) {
            toggleDisableNext(true);
          }else{
            toggleDisableNext(false);
          }
          updateData([...res.data.result]);
          console.log(res.data.result);
        }
        updateLoaded(1);
      })
      .catch((err) => {
        updateMessage("Something went wrong, Try reloading! 🤪");
        NotificationManager.warning("Something went wrong, Try reloading! 🤪");
      });
  }, [pageOffset]);

  return (
    <>
      <h1 style={{ textAlign: "center", color: "#4E9948" }}>Leaderboard</h1>
      {loaded === 1 && (
        <div className="leaderboard-wrapper">
          <table className="table-items" style={{ minWidth: "auto" }}>
            <thead>
              <tr>
                <th>#</th>
                <th>Username</th>
                <th>Score</th>
                <th className="overflow">Questions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((elem, idx) => {
                return (
                  elem.inLeaderboard && (
                    <tr style={{backgroundColor: elem.username === username ? "#227aa9" : ""}} key={idx}>
                      <td>{pageOffset * limit + ranking++}</td>
                      <td title={elem.name}>{elem.username}</td>
                      <td>{elem.done.length}</td>
                      <td className="overflow">
                        {elem.done.map((prob, id) => {
                          return (
                            <span key={id}>
                              {prob}
                              {id < elem.done.length - 1 ? "," : ""}{" "}
                            </span>
                          );
                        })}
                      </td>
                    </tr>
                  )
                );
              })}
            </tbody>
          </table>
          <div className="paginate">
            <button
              onClick={() => {
                updateOffset(0);
              }}
              className="paginate-button"
            >
              {"First"}
            </button>
            <button
              onClick={() => {
                updateOffset((cur) => Math.max(cur - 1, 0));
              }}
              className="paginate-button"
            >
              {"<- Pervious"}
            </button>
            <button
              onClick={() => {
                updateOffset((cur) => cur + 1);
              }}
              className="paginate-button"
              disabled={disableNext}
            >
              {"Next ->"}
            </button>
          </div>
        </div>
      )}
      {!loaded && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1
            style={{
              color:
                message === "Something went wrong, Try reloading! 🤪"
                  ? "#f55331"
                  : "#009879",
              fontSize: "xxx-large",
              textAlign: "center",
            }}
          >
            {message}
          </h1>
        </div>
      )}
      <NotificationContainer />
    </>
  );
};

export default Leaderboard;
