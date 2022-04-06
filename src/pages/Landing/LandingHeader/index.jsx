import React from "react";
import { useHistory } from "react-router";
import "./style.css";

export const LandingHeader = () => {
  const history = useHistory();

  return (
    <div id="landing-header" className="landing-header-section ">
      <div className="container">
        <div className="row">
          <div className="landing-header-content col-12 col-lg-6">
            <div className="header--title">
              <span className="header--title-white">Audapp</span> Podcasting
              Tools and Listening App...
            </div>
            <div className="header--sub-title">
              Nigeria’s largest podcasting platform.
            </div>
            <div className="header--actions">
              <button
                className="header--signup"
                onClick={() => history.push("/signup")}
              >
                Sign up
              </button>
              <button
                className="header--start-listening"
                onClick={() => history.push("/login")}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
