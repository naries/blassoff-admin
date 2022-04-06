import React from "react";
import BackBtn from "../../assets/svg/back-btn-circle.svg";

export const BackButton = ({ onClick, className }) => {
  return (
    <img
      className={`${className}`}
      src={BackBtn}
      onClick={() => onClick && onClick()}
      alt="back btn"
    />
  );
};
