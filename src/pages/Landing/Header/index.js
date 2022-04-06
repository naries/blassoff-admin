import React from "react";
import { useHistory } from "react-router";
import Logo from "../../../assets/img/audapp-logo.svg";
import './style.css';

export const Header = () => {
  const history = useHistory();
  return (
    <nav
      id="landing-navbar"
      className="landing-navbar navbar-expand-xl navbar-header navbar-mobile"
    >
      <div className="landing-navbar-container container">
        <div className="landing-logo" onClick={()=> history.push("/")}>
          <img src={Logo} alt="Logo" />
        </div>
        <div className="header-right">
          <button className="header--login" onClick={()=> history.push("/login")}>Login</button>
          <button className="header--get-started" onClick={()=> history.push("/signup")}>Get Started</button>
        </div>
      </div>
    </nav>
  );
};
