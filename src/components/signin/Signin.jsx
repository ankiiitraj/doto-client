import React, { useState, useEffect } from "react";
import axios from "axios";
import "./signin.css";
import { useLocation } from "react-router-dom";
import GoogleLogo from "./images/google-logo.png";

const Signin = (props) => {
  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
  const authURI = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=openid%20email%20profile`;
  const [message, signing] = useState("");
  const location = useLocation().search;
  const code = new URLSearchParams(location).get("code");
  
  useEffect(() => {
    const handleSignIn = () => {
      signing("Signing you in . . .");
      axios
        .get(`${process.env.REACT_APP_BASE_ENDPOINT || ""}/auth?code=${code}`)
        .then((res) => {
          signing("");
          window.localStorage.setItem("token", res.data.token);
          window.localStorage.setItem("email", res.data.email);
          window.localStorage.setItem("name", res.data.given_name);
          window.localStorage.setItem("url", res.data.picture);
          props.signin(true);
        })
        .catch((err) => {
          signing("Something went wrong! Try reloading or open in PC");
          window.localStorage.clear();
        });
    };
    if (code) {
      handleSignIn();
    }
  // eslint-disable-next-line
  }, []);
  return (
    <>
      <center>
        <h1>{message}</h1>
      </center>
      <div className="signin">
        <div className="signin-about">
          Hand picked problem lists for complete interview preparation. Start Solving <span alt={"dev emoji"} role={"img"} aria-label={"dev emoji"}>👨🏻‍💻</span>
        </div>
        <div className="signin-box">
          <a style={{ textDecoration: "none", color: "black" }} href={authURI}>
            <div className="login-with-google">
              <img alt="Google logo" className="logo-google" src={GoogleLogo} />
                signin with google
            </div>
          </a>
        </div>
      </div>
    </>
  );
};

export default Signin;
