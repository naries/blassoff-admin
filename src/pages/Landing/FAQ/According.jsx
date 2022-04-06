import React, { useState } from "react";

const Accordion = ({ title, content }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="faq-accordion-item">
      <div
        className="faq-accordion-title"
        onClick={() => setIsActive(!isActive)}
      >
        <div>{title}</div>
        <div>{isActive ? "-" : "+"}</div>
      </div>
      <div
        className={`faq-accordion-content ${
          isActive ? "" : "faq-item-collapsed"
        }`}
      >
        {content}
      </div>
    </div>
  );
};

export default Accordion;
