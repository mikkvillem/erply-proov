import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, roles, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!sessionStorage.getItem("user")) {
          // not logged in so redirect to login page with the return url
          return <Redirect to={{ pathname: "/login" }} />;
        }

        // logged in so return component
        return <Component {...props} />;
      }}
    />
  );
};

export default PrivateRoute;
