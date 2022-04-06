import React from "react";
import AudappLogo from "../../../assets/landing/assets/images/audapp-icon.svg";
import FacebookLogo from "../../../assets/landing/assets/images/facebook-icon.svg";
import TwitterLogo from "../../../assets/landing/assets/images/twitter-icon.svg";
import InstagramLogo from "../../../assets/landing/assets/images/instagram-icon.svg";
import AppleStore from "../../../assets/landing/assets/images/apple-store.svg";
import GoogleStore from "../../../assets/landing/assets/images/google-store.svg";
import "./style.css";
import { NavLink } from "react-router-dom";

export const Footer = () => {
  return (
    <div className="landing-footer">
      <div className="logo-section">
        <div className="logo-container">
          <img src={AudappLogo} alt="aud app logo" />
          <span className="audapp-logo-txt">audapp</span>
        </div>
        <div className="app-description">
          Through Audapp original content creators are able to reach more
          listeners, nurturing an engaging, profitable, and thriving podcast
          ecosystem.
        </div>
      </div>
      <div>
        <div className="landing-footer-title">COMPANY</div>
        <ul>
          <li>About Us</li>
          <li>Contact Us</li>
          <li>Audapp Blog</li>
          <li>Help</li>
        </ul>
      </div>
      <div>
        <div className="landing-footer-title">AFFILIATES</div>
        <ul>
          <li>Podcast featured</li>
          <li>Advertisers</li>
          <li>
            <NavLink title="Our Privacy Policy" to="/terms">
              Privacy Policy
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="socials-section">
        <div className="socials">
          <img src={FacebookLogo} alt="fbook" />
          <img src={TwitterLogo} alt="twitter" />
          <img src={InstagramLogo} alt="instagram" />
        </div>
        <div className="socials--text">
          Subscribe to your favorite podcast and Join the community today.
        </div>
        <div className="socials--app">
          <img src={AppleStore} alt="twitter" />
          <img src={GoogleStore} alt="instagram" />
        </div>
      </div>
    </div>
  );
};
