import React from "react";
import Skeleton from "react-loading-skeleton";
import "./style.css";
export const GridItem = ({
  title,
  value,
  icon,
  loading,
  className,
  handleClick,
}) => {
  return (
    <div className={`d-card ${className}`} onClick={handleClick}>
      <div className="d-flex flex-row align-items-center w-100">
        <div className="mr-3">{icon}</div>
        <div className="w-100">
          <div className="d-card-title mb-2">{loading ? <Skeleton /> : title}</div>
          <div className="d-card-value">{loading ? <Skeleton /> : value}</div>
        </div>
      </div>
    </div>
  );
};
