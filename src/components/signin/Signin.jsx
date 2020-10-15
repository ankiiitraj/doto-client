import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import './signin.css';

const Signin = (props) => {
  const CLIENT_ID =
    "942881642900-4difoml0e6ctcj2r0ifvq9k5v842cl9t.apps.googleusercontent.com";
  const history = useHistory();
  const handleSignIn = (response) => {
    const payload = {
      email: response.profileObj.email,
      name: response.profileObj.givenName,
    };
    axios
      .post("/api/auth", payload)
      .then((res) => {
        window.localStorage.setItem("token", res.data.token);
        window.localStorage.setItem("email", response.profileObj.email);
        window.localStorage.setItem("name", response.profileObj.givenName);
        props.signin(true);
      })
      .catch((err) => {
        history.push("/error");
      });
  };
  return (
    <>
      <div className="signin">
        <div className="signin-about">
          Track your progress and multiply efficiency through DoTo.<br/> DoTo contains handpicked problems for DSA mastrey <br/> by none other than <b>Love Babbar</b>.<br/>
          <br/>Check out the video where Love Babbar talks about these questions.<br/>
          <a rel='noopener noreferrer' target='_blank' href='https://www.youtube.com/watch?v=4iFALQ1ACdA'>Link</a>
        </div>
        <div className="signin-box">
          <h1>Sign in to get started!</h1>
          <GoogleLogin
            clientId={CLIENT_ID}
            buttonText="Sign in"
            onSuccess={(response) => {
              handleSignIn(response);
            }}
            onFailure={() => {
              props.history.push("/error");
            }}
            cookiePolicy={"single_host_origin"}
            responseType="code,token"
          />
        </div>
      </div>
    </>
  );
};

export default Signin;
