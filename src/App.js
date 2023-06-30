import React, { useState } from "react";
import "./App.css";

//image imports
import inputIcon from "./assets/images/task-input-icon.JPG";

//components
import Task from "./components/task/task";

function App() {
  //held states
  const [taskBarContainer, setTaskBarContainer] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [activeDiv, setActiveDiv] = useState("All");

  const handleDeleteTask = (taskToDelete) => {
    setTaskBarContainer((prevTasks) =>
      prevTasks.filter((task) => task !== taskToDelete)
    );
  };

  const addTask = () => {
    setTaskBarContainer((prevTasks) => [
      ...prevTasks,
      { task: newTask, completed: false },
    ]);
    setNewTask("");
  };

  const handleClick = (divName) => {
    setActiveDiv(divName);
  };

  const clearAll = () => {
    setTaskBarContainer([]);
    console.log("All Tasks Cleared");
  };

  const filteredTasks = taskBarContainer.filter((task) => {
    if (activeDiv === "All") {
      return true;
    } else if (activeDiv === "Pending") {
      return !task.completed;
    } else if (activeDiv === "Completed") {
      return task.completed;
    }
    return true;
  });

  return (
    <div className="background-color-container">
      <div className="main-container">
        <div className="upper-container">
          <div className="input-container">
            <img
              onClick={() => {
                addTask();
              }}
              alt="inputicon"
              src={inputIcon}
            />
            <form
              onSubmit={(event) => {
                event.preventDefault();
                addTask();
              }}
            >
              <input
                className="mainInput"
                onSubmit={() => addTask()}
                placeholder="Add a new task"
                onChange={(e) => setNewTask(e.target.value)}
                value={newTask}
              ></input>
              <input type="submit" style={{ display: "none" }} />
            </form>
          </div>
          <div className="actions-container">
            <div className="actions">
              <div
                className={activeDiv === "All" ? "active" : ""}
                onClick={() => handleClick("All")}
              >
                All
              </div>
              <div
                className={activeDiv === "Pending" ? "active" : ""}
                onClick={() => handleClick("Pending")}
              >
                Pending
              </div>
              <div
                className={activeDiv === "Completed" ? "active" : ""}
                onClick={() => handleClick("Completed")}
              >
                Completed
              </div>
            </div>
            <button
              className="clearAllButton"
              onClick={() => {
                clearAll();
              }}
            >
              Clear All
            </button>
          </div>
        </div>
        <div className="task-container">
          {filteredTasks.map((task, index) => (
            <Task
              key={index}
              task={task.task}
              completed={task.completed}
              deleteTask={() => handleDeleteTask(task)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
