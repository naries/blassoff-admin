import React from "react";
import { Slide, toast } from "react-toastify";

export const CopyLink = ({ episodeUrl, name, logo }) => {
  return (
    <div className="d-flex flex-column align-items-center ml-5">
      <img
        onClick={() => {
          navigator.clipboard.writeText(episodeUrl);
          toast("copied", {
            autoClose: 1000,
            transition: Slide,
          });
        }}
        className="share-link"
        src={logo}
        alt={name}
      />
      <div
        className="text-13 share-link"
        onClick={() => {
          navigator.clipboard.writeText(episodeUrl);
          toast("copied", {
            autoClose: 1000,
            transition: Slide,
          });
        }}
      >
        {name}
      </div>
    </div>
  );
};
