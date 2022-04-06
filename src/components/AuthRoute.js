import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isEmpty } from "lodash";
import { loadState } from "../helpers/local_storage";
import { Layout } from "../components/Layout";
import { ActivateUser } from "../pages";
const AuthRoute = ({ component: Component, render, ...rest }) => {
  const authUser = loadState();
  return (
    <Layout>
      <Route
        {...rest}
        exact
        render={(props) => {
          if (isEmpty(loadState()))
            return (
              <Redirect
                to={{
                  pathname: "/login",
                  state: { from: props.location },
                }}
              />
            );
            return Component ? <Component {...props} /> : render(props);
        }}
      />
    </Layout>
  );
};

export default AuthRoute;
