import React, { useEffect, useState } from "react";
import "./task.css";

//image imports
import dotsIcon from "../../assets/images/horizontal-dots.png";
import deleteIcon from "../../assets/images/delete-task-icon.png";

export default function Task({ task, completed, deleteTask, updateTask }) {
  //held states
  const [potentialDelete, setPotentialDelete] = useState(false);
  const [isCompleted, setIsCompleted] = useState(completed);

  //reverts to three dots in case you didnt mean to delete task
  useEffect(() => {
    let timerId = null;
    if (potentialDelete) {
      timerId = setTimeout(() => {
        setPotentialDelete(false);
      }, 3000);
    }
    return () => {
      clearTimeout(timerId);
    };
  }, [potentialDelete]);

  //handles individual tasks' completed status
  const handleCheckboxChange = () => {
    setIsCompleted(!isCompleted);
    updateTask();
  };

  return (
    <div className="individualTask">
      <div className="leftContainer">
        <input
          onChange={() => {
            handleCheckboxChange();
            console.log(completed);
          }}
          type="checkbox"
        ></input>
        <span className={isCompleted ? "strikethrough" : ""}>{task}</span>
      </div>
      <img
        onClick={() => {
          if (potentialDelete) {
            deleteTask();
          }
          setPotentialDelete(!potentialDelete);
        }}
        className="dots"
        alt="deleteOption"
        src={potentialDelete ? deleteIcon : dotsIcon}
      />
    </div>
  );
}
