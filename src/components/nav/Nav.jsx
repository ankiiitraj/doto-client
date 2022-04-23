import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo_lite from "./images/logo_lite.png";
import "./nav.css";

const Nav = (props) => {
  const [disabled, handleClick] = useState(true);
  const token = window.localStorage.getItem("token");

  const [clicked, setClicked] = useState(false);

  const handleOpen = () => {
    setClicked(!clicked);
  };

  return (
    <nav className="nav">
      <div className="nav-brand">
        <Link to="/" style={{ textDecoration: "none"}}>
          <img style ={{maxWidth:"7rem"}} src={logo_lite} alt={"logo"}/>
        </Link>
      </div>

      <div className="nav-items">
        <div className="dropdown">
          {/* Menu icon */}
          <ul className={clicked ? "nav-list active" : "nav-list"}>
            <Link className="nav-link" to="/" onClick={handleOpen}>
              <li>home</li>
            </Link>
            <Link className="nav-link" to="/about" onClick={handleOpen}>
              <li>about</li>
            </Link>
            <Link className="nav-link" to="/lists" onClick={handleOpen}>
              <li>change list</li>
            </Link>
            <Link className="nav-link nav-donate" to={{pathname: "https://pages.razorpay.com/pl_G1Yg5MfSMvwqxs/view"}} target="_blank">
              buy me <span aria-label="coffee" role="img" style={{ fontSize: "x-large" }}>☕</span>
            </Link>
            <Link
              className={!token ? "hidden" : "nav-link-mobile hidden"}
              onClick={() => {
                window.localStorage.clear();
                props.signout();
                handleOpen();
              }}
              to="/"
            >
              <li>Sign-out</li>
            </Link>
          </ul>
          </div>
          </div>  
          <div
            className="avatar mobile"
            disabled={token ? false : true}
            onClick={() => {
              if (token) {
                handleClick(!disabled);
              }
            }}
            style={{
              backgroundColor: "#78cc71",
              backgroundImage: `url(${
                window.localStorage.getItem("url") || "./profile.png"
              })`,
            }}
            title={props.user.name}
          ></div>

          <div
            onClick={() => {
              handleClick(!disabled);
            }}
            style={{ display: disabled ? "none" : "block" }}
            className="dropdown-items"
          >
            <div className="dropdown-item mobile">
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

          {/* Menu icon */}
          <div className="menu-icon" onClick={handleOpen}>
            <i className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
          </div>
          
    </nav>
  );
};

export default Nav;
