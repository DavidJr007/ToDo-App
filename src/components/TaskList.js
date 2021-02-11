import React from "react";
import Task from "./Task";
import "./TaskList.css";

const TaskList = (props) => {
  const active = props.tasks.filter((task) => task.active);
  const done = props.tasks.filter((task) => !task.active);

  if (active.length >= 2) {
    active.sort((a, b) => {
      if (a.id > b.id) {
        return 1;
      }
      if (a.id < b.id) {
        return -1;
      }
      return 0;
    });
  }
  if (done.length >= 2) {
    done.sort((a, b) => {
      if (a.finishDate < b.finishDate) {
        return 1;
      }
      if (a.finishDate > b.finishDate) {
        return -1;
      }
      return 0;
    });
  }

  const activeTasks = active.map((task) => (
    <Task
      key={task.id}
      task={task}
      change={props.change}
      delete={props.delete}
      show={props.show}
    />
  ));
  const doneTasks = done.map((task) => (
    <Task
      key={task.id}
      task={task}
      change={props.change}
      delete={props.delete}
    />
  ));
  return (
    <div className="todo-list">
      <div className="todo-list--active">
        <h1 className="todo-list__title">TO DO:</h1>
        {activeTasks.length > 0 ? (
          activeTasks
        ) : (
          <p className="todo-list__empty">Your to do list is empty :)</p>
        )}
      </div>
      <div className="todo-list--done">
        <h2 className="todo-list__title">
          {done.length > 0 ? `Done (${done.length})` : false}
        </h2>
        {done.length > 5 && (
          <div className="todo-list__done-overflow">
            You can see only last 5 done task
          </div>
        )}
        {doneTasks.slice(0, 5)}
      </div>
    </div>
  );
};

export default TaskList;
