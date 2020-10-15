import React from "react";
import { Route } from "react-router-dom";
import Signin from "./signin/Signin";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const token = window.localStorage.getItem("token");
  return (
    <Route
      {...rest}
      render={(props) => {
        if (token) {
          return <Component {...rest} {...props} />;
        } else {
          return <Signin {...rest} {...props} />
        }
      }}
    />
  );
};

export default ProtectedRoute;
