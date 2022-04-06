import React from "react";
import PlusIcon from "../../assets/svg/plus-dark.svg"
import "./style.css"

export const AddNewBtn = (props) => {
  return (
    <button className="add-new-btn" onClick={()=> props.onClick()}>
      <img src={PlusIcon} alt="plus icon" />
      {props.children}
    </button>
  );
};
