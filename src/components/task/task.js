import React, { useState } from "react";
import "./task.css";

//image imports
import dotsIcon from "../../assets/images/horizontal-dots.png";

export default function Task({ task }) {
  //held states
  const [completed, setCompleted] = useState(false);

  return (
    <div className="individualTask">
      <div className="leftContainer">
        <input
          onChange={() => {
            setCompleted(!completed);
          }}
          type="checkbox"
        ></input>
        <span className={completed ? "strikethrough" : ""}>{task}</span>
      </div>
      <img className="dots" alt="deleteOption" src={dotsIcon} />
    </div>
  );
}
