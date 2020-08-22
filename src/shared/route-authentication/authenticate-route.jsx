import React from "react";
import { LOGIN_CONFIG } from "../../constants/login-constants";
import { Redirect } from "react-router-dom";
import { Route } from "react-router-dom";

const AuthenticateRoute = ({ path, exact, component: Component, ...rest }) => {
  const currentUserToken = JSON.parse(
    localStorage.getItem(LOGIN_CONFIG.tokenName)
  );
  return (
    <Route path={path} exact={exact}>
      {currentUserToken ? <Component {...rest} /> : <Redirect to="/login" />}
    </Route>
  );
};

export { AuthenticateRoute };
