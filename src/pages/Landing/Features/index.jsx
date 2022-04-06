import React from "react";
import FreePodcast from "../../../assets/landing/assets/images/free-podcast-icon.svg";
import EasyPodcast from "../../../assets/landing/assets/images/easy-podcast-icon.svg";
import ReachNig from "../../../assets/landing/assets/images/reach-nigeria-icon.svg";
import "./style.css";

export const Features = () => {
  return (
    <div className="features-container container-fluid">
      <div className="features-container--title">Are you a Podcaster?</div>
      <div className="features-container--description">
        <div className="txt">
          Audapp, the new app designed to make podcasting a breeze. We give you
          the tools to listen, create and stream seamlessly.
        </div>
      </div>
      <div className="feature-card-container">
        <div className="features-container--card">
          <img src={FreePodcast} alt="free podcast" />
          <div className="features-container--cardTitle">
            Free Podcast Services
          </div>
          <div className="features-container--cardContent">
            In an effort to support our creators and content producer. we
            provide free podcast hosting with unlimited episodes and design
            features.
          </div>
        </div>

        <div className="features-container--card">
          <img src={EasyPodcast} alt="easy podcast" />
          <div className="features-container--cardTitle">
            Free Podcast Services
          </div>
          <div className="features-container--cardContent">
            In an effort to support our creators and content producer. we
            provide free podcast hosting with unlimited episodes and design
            features.
          </div>
        </div>

        <div className="features-container--card">
          <img src={ReachNig} alt="reach nig" />
          <div className="features-container--cardTitle">
            Free Podcast Services
          </div>
          <div className="features-container--cardContent">
            In an effort to support our creators and content producer. we
            provide free podcast hosting with unlimited episodes and design
            features.
          </div>
        </div>
      </div>
    </div>
  );
};
