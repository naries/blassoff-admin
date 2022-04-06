import React from "react";
import NgFlag from "../../../assets/svg/ng-flag.svg";
import "./style.css";

export const LocationsWidget = () => {
  return (
    <div className="listeners-loc-container">
      <div className="listeners-loc--title mb-3">Top Listeners Location</div>
      <ul className="listeners-loc">
        <li className="listeners-loc--header">
          <div>Country, Cities</div>
          <div>Counts</div>
        </li>
        <li className="listeners-loc--item">
        <div className="listeners-loc--item-state">
            <img src={NgFlag} alt="ng" />
            Lagos, Ng
          </div>
          <div>35</div>
        </li>
        <li className="listeners-loc--item">
        <div className="listeners-loc--item-state">
            <img src={NgFlag} alt="ng" />
            Abuja, Ng
          </div>
          <div>32</div>
        </li>
        <li className="listeners-loc--item">
          <div className="listeners-loc--item-state">
            <img src={NgFlag} alt="ng" /> Ibadan, Ng
          </div>
          <div>24</div>
        </li>
        <li className="listeners-loc--item">
        <div className="listeners-loc--item-state">
            <img src={NgFlag} alt="ng" />
            FCT, Ng
          </div>
          <div>20</div>
        </li>
        <li className="listeners-loc--item">
        <div className="listeners-loc--item-state">
            <img src={NgFlag} alt="ng" />
            Asaba, Ng
          </div>
          <div>16</div>
        </li>
      </ul>
    </div>
  );
};
