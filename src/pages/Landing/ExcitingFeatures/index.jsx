import React from "react";
import AppleStore from "../../../assets/landing/assets/images/apple-store.svg";
import GoogleStore from "../../../assets/landing/assets/images/google-store.svg";
import Featurez from "../../../assets/landing/assets/images/exciting-features-img.png";
import "./style.css";

export const ExcitingFeatures = () => {
  return (
    <div className="exciting-features-container container-fluid">
      <div className="exciting-features-container--title">
        Exciting Features
      </div>
      <div>Discover exciting new podcasts with hours of endless content.</div>
      <div className="exciting-features-container--content">
        <div className="exciting-features-container--content-left">
          <img src={Featurez} alt="featurez" />
        </div>
        <div className="exciting-features-container--content-right">
          <ul>
            <li>Make podcast playlists with your favourite episodes</li>
            <li>Listen before bed with the sleep timer</li>
            <li>Listen at your own pace 0.5x, 1x, 2x</li>
            <li>Listen at your own pace 0.5x, 1x, 2x</li>
          </ul>

          <div className="exciting-features-container--content-right-stores">
            <img src={AppleStore} alt="apple" />
            <img src={GoogleStore} alt="google" />
          </div>
        </div>
      </div>
    </div>
  );
};
