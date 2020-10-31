import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./nav.css";

const Nav = (props) => {
  const [disabled, handleClick] = useState(true);
  const token = window.localStorage.getItem("token");

  return (
    <>
      <nav className="nav">
        <div className="nav-brand">
          <Link to="/" style={{ textDecoration: "none", color: "#FF7A00" }}>
            <b>Doto</b>
          </Link>
        </div>
        <div className="nav-items">
          <div className="nav-items">
            <div className="dropdown">
              <div
                disabled={token ? false : true}
                onClick={() => {
                  handleClick(!disabled);
                }}
                style={{
                  backgroundColor: "#78cc71",
                  backgroundImage: `url(${
                    window.localStorage.getItem("url") || "./profile.png"
                  })`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  width: "50px",
                  height: "50px",
                  borderRadius: "50px",
                }}
                title={props.user.name}
              >
              </div>
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
                    Sign-out
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div
        style={{
          display: "flex",
          fontSize: "x-large",
          justifyContent: "center",
          backgroundColor: "#78cc71",
          padding: "10px 0px"
        }}
      >
        <Link className="nav-link" to="/">
          Home
        </Link>
        <Link className="nav-link" to="/about">
          About
        </Link>
        <Link className="nav-link" to="/leaderboard">
          Leaderboard
        </Link>
      </div>
    </>
  );
};

export default Nav;
