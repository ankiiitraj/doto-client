import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "../list/list.css";
import './leaderboard.css';

const Leaderboard = () => {
  const [data, updateData] = useState([]);
  const [loaded, updateLoaded] = useState(0);
  const [message, updateMessage] = useState("Loading . . . 🤸🏻 🏃🏻 🚶🏻🧍🏻🧎🏻");
  useEffect(() => {
    axios
      .get("/api/leaderboard")
      .then((res) => {
        updateData([...res.data.result]);
        updateLoaded(1);
        console.log(res.data.result);
      })
      .catch((err) => {
        updateMessage("Something went wrong, Try reloading! 🤪");
        NotificationManager.warning("Something went wrong, Try reloading! 🤪");
      });
  }, []);

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Leaderboard</h1>
      {loaded === 1 && (
        <center>
          <table className="table-items" style={{minWidth: 'auto'}}>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Score</th>
                <th className="overflow">Questions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((elem, idx) => {
                return (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>{elem.name}</td>
                    <td>{elem.done.length}</td>
                    <td className='overflow'>
											{elem.done.map((prob, id) => {
												return <span key={id}>{prob}, </span>
											})}
										</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </center>
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
