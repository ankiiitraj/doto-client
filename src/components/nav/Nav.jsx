import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./nav.css";

const Nav = (props) => {
  const [disabled, handleClick] = useState(true);
  const token = window.localStorage.getItem("token");

  const [clicked, setClicked] = useState(false);

  const handleOpen = () => {
    setClicked(!clicked)
  }

  return (
      <nav className="nav">
        <div className="nav-brand">
          <Link to="/" style={{ textDecoration: "none", color: "#FF7A00" }}>
            <b>Doto</b>
          </Link>
        </div>

        <div className="nav-items">

            <div className="dropdown">

              {/* Menu icon */}
              {/* <div className="menu-icon" onClick={handleOpen}>
                  <i className={ clicked ? "fas fa-times" : "fas fa-bars"}></i>
              </div> */}

              <ul className={clicked ? "nav-list active" : "nav-list"}>
              <Link className="nav-link" to="/" onClick={handleOpen}>
                <li>
                  Home
                </li>
              </Link>
              <Link className="nav-link" to="/about" onClick={handleOpen}>
                <li>
                  About
                </li>
              </Link>
              <Link className="nav-link" to="/leaderboard" onClick={handleOpen}>
                <li>
                  Leaderboard
                </li>
              </Link>
              <Link
                    className={disabled ? "hidden" : "nav-link-mobile"}
                    onClick={() => {
                      window.localStorage.clear();
                      props.signout();
                      handleOpen()
                    }}
                    to="/"
                  >
                    <li>
                      Sign-out
                    </li>
              </Link>
            </ul>

              <div
                className="avatar mobile"
                disabled={token ? false : true}
                onClick={() => {
                  if(token){
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
              >
              </div>

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
                  <i className={ clicked ? "fas fa-times" : "fas fa-bars"}></i>
              </div>

            </div>

        </div>

      </nav>
  );
};

export default Nav;
