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
import { Signup } from "./pages/Landing/Signup";
import LockedAccount from "./pages/Landing/LockedAccount";
import { ForgotPassword } from "./pages/Landing/ForgotPassword";
import Podcasts from "./pages/Podcasts";
import { NewEpisode } from "./pages/Episodes/New";
import Sections from "./pages/Sections";
import Banners from "./pages/Banners";
import { TermsAndConditions } from "./pages/Landing/TermsAndConditions";
import OnlineRadio from "./pages/Radio";
import Creators from "./pages/Creators";
import Notification from "./pages/Notification";
import FlaggedPodcasts from "./pages/FlaggedPodcasts";
import FlaggedEpisodes from "./pages/FlaggedEpisodes";
import Comments from "./pages/Comments";
import Listeners from "./pages/Listeners";
import Users from "./pages/Users";
import Customers from "./pages/Customers";

function App() {
  return (
    <Switch>
      <Route exact path="/" render={() => <Login />} />
      <Route exact path="/login" render={() => <Login />} />
      <AuthRoute exact path="/users" render={() => <Users />} />
      <AuthRoute exact path="/customers" render={() => <Customers />} />
      <AuthRoute path="/not-found" component={NotFound} />
      <Redirect to="/not-found" />
    </Switch>
  );
}

export default App;
