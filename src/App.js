import React from "react";
import {
  Dashboard,
  Episodes,
  Records,
  ConfirmEmail,
  Activate,
  ResetPassword,
  Verification,
  ActivateUser,
  ChangePassword,
  AccountSettings,
  BackgroundMusic,
  NotFound,
  UpdateProfile,
} from "./pages";

import { Route, Switch, Redirect } from "react-router-dom";
import AuthRoute from "./components/AuthRoute";
import { Login } from "./pages/Landing/Login";
import Users from "./pages/Users";
import Customers from "./pages/Customer";
import Payments from "./pages/Payments";
import FreeContent from "./pages/Content/free";
import LiveContent from "./pages/Content/live";

function App() {
  return (
    <Switch>
      <Route exact path="/" render={() => <Login />} />
      <Route exact path="/login" render={() => <Login />} />
      <AuthRoute exact path="/users" render={() => <Users />} />
      <AuthRoute exact path="/customers" render={() => <Customers />} />
      <AuthRoute exact path="/payments" render={() => <Payments />} />
      <AuthRoute exact path="/contents/free-rounds" render={() => <FreeContent />} />
      <AuthRoute exact path="/contents/live-rounds" render={() => <LiveContent />} />
      <AuthRoute exact path="/dashboard" render={() => <Dashboard />} />
      <AuthRoute path="/not-found" component={NotFound} />
      <Redirect to="/not-found" />
    </Switch>
  );
}

export default App;
