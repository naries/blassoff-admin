import React from "react";

export const SharableLink = ({ episodeUrl, name, logo, sharingUrl }) => {
  return (
    <div className="d-flex flex-column align-items-center ml-5">
      <a target="_blank" href={`${sharingUrl}${episodeUrl}`}>
        <img className="share-link" src={logo} alt="fbook" />
      </a>
      <a target="_blank" href={`${sharingUrl}${episodeUrl}`}>
        <div className="text-13 share-link" style={{color: "#000"}}>{name}</div>
      </a>
    </div>
  );
};
