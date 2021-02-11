import React from "react";
import "./Task.css";

const Task = (props) => {
  const importantStyle = { color: "red" };
  const { text, date, id, important, finishDate, active } = props.task;

  if (active) {
    return (
      <div className="todo-list__item item">
        <div
          className="item__important"
          style={important ? importantStyle : null}
        >
          {text}
        </div>
        <span className="item__deadline">Deadline: {date} </span>
        <div className="item__btn ">
          <button
            className="btn-task  btn--done"
            onClick={() => props.change({ id })}
          >
            <i className="fas fa-check"></i>
          </button>
          <button
            className="btn-task  btn--edit"
            onClick={() => props.show({ id })}
          >
            EDIT
          </button>
          <button
            className="btn-task  btn--delete"
            onClick={() => props.delete({ id })}
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
      </div>
    );
  } else {
    const finishTime = new Date(finishDate).toLocaleString();
    return (
      <div className="todo-list__done-item">
        <div className="item__important">{text}</div>
        <div className="item__done-time">
          (Confirmation date: <span>{finishTime}</span>)
        </div>
        <button
          className="btn-task  btn--delete"
          onClick={() => props.delete({ id })}
        >
          <i className="fas fa-times"></i>
        </button>
      </div>
    );
  }
};

export default Task;
