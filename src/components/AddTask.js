import React, { Component } from "react";
import "./AddTask.css";

class AddTask extends Component {
  minDate = new Date().toISOString().slice(0, 10);
  state = {
    text: "",
    checked: false,
    date: new Date().toISOString().slice(0, 10),
  };
  handleDate = (e) => {
    this.setState({
      date: e.target.value,
    });
  };
  handleText = (e) => {
    this.setState({
      text: e.target.value,
    });
  };
  handleCheckbox = (e) => {
    this.setState({
      checked: e.target.checked,
    });
  };
  handleClick = () => {
    const { text, date, checked } = this.state;
    if (text.length > 0 && date !== "") {
      const add = this.props.add(text, date, checked);
      if (add) {
        this.setState({
          checked: false,
          date: this.minDate,
          text: "",
        });
      }
    } else {
      const textInput = document.querySelector(".form__task-description");
      textInput.style.border = "2px solid red";
      alert("add task description");
      setTimeout(() => {
        textInput.style.border = "";
      }, 2000);
    }
  };
  render() {
    let maxDate = this.minDate.slice(0, 4) * 1 + 1;
    maxDate = maxDate + "-12-31";
    return (
      <>
        <div className="header__form form">
          <input
            type="text"
            placeholder="Add task description"
            value={this.state.text}
            onChange={this.handleText}
            className="form__task-description"
          />
          <div className="form__important">
            <input
              id="important"
              type="checkbox"
              checked={this.state.checked}
              onChange={this.handleCheckbox}
              className="form__important--checkbox"
            />
            <label htmlFor="important" className="form__important--label">
              Important
            </label>
          </div>
          <div className="form__deadline">
            <label htmlFor="date" className="form__deadline--label">
              Deadline
            </label>
            <input
              type="date"
              value={this.state.date}
              min={this.minDate}
              max={maxDate}
              onChange={this.handleDate}
              className="form__deadline--date"
            />
          </div>
        </div>
        <div className="btn">
          <button className="btn__add" onClick={this.handleClick}>
            Add task
          </button>
        </div>
      </>
    );
  }
}

export default AddTask;
