import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Down } from "../data/down-arrow.svg";
import "./nav.css";

const Nav = (props) => {
  const [disabled, handleClick] = useState(true);
  const token = window.localStorage.getItem("token");

  return (
    <>
      <nav className="nav">
        <div className="nav-brand">
          <Link to="/" style={{ textDecoration: "none", color: "black" }}>
            DoTo <br />
            <span style={{ fontSize: "large" }}>TrackProgress</span>
          </Link>
        </div>
        <div className="nav-items">
          <div className="nav-items">
            <div className="dropdown">
              <button
                disabled={token ? false : true}
                onClick={() => {
                  handleClick(!disabled);
                }}
                className="nav-button"
              >
                Hello {props.user.name}!{" "}
                <span>
                  <Down height="15px" width="15px" />
                </span>
              </button>
              <div
                onClick={() => {
                  handleClick(!disabled);
                }}
                style={{ display: disabled ? "none" : "block" }}
                className="dropdown-items"
              >
                <div className="dropdown-item">
                  <Link
                    onClick={() => {
                      window.localStorage.clear();
                      props.signout();
                    }}
                    to="/"
                  >
                    Sign out
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <hr style={{ width: "100vw", height: "0px" }} />
      <div
        style={{
          display: "flex",
          fontSize: "x-large",
          justifyContent: "center",
        }}
      >
        <Link className="nav-link" to="/">Home</Link>
        <Link className="nav-link" to="/leaderboard">Leaderboard</Link>
      </div>
      <hr style={{ width: "100vw", height: "0px" }} />
    </>
  );
};

export default Nav;
