import React from "react";
import "./Popup.css";

class Popup extends React.Component {
  minDate = new Date().toISOString().slice(0, 10);
  state = {
    text: "",
    checked: false,
    date: "",
  };
  handleCancelClick = () => {
    document.querySelector(".popup").style.display = "none";

    this.setState({
      checked: false,
      date: this.minDate,
      text: "",
    });
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
  handleSaveClick = () => {
    const { text, date, checked } = this.state;
    if (text.length > 0 && date !== "") {
      const edit = this.props.edit(text, date, checked);
      if (edit) {
        this.setState({
          checked: false,
          date: this.minDate,
          text: "",
        });
      }
    } else {
      document.querySelector(".popup__input").style.border = "2px solid red";
      alert("add task description");
    }
  };
  render() {
    let maxDate = this.minDate.slice(0, 4) * 1 + 1;
    maxDate = maxDate + "-12-31";
    return (
      <div className="popup">
        <h3 className="popup__title">Edit task:</h3>
        <div className="popup__body">
          <input
            type="text"
            className="popup__input"
            placeholder="Put in your new task description"
            value={this.state.text}
            onChange={this.handleText}
          />
          <div className="popup__important">
            <input
              id="important"
              type="checkbox"
              checked={this.state.checked}
              onChange={this.handleCheckbox}
              className="popup__important--checkbox"
            />
            <label htmlFor="important" className="popup__important--label">
              Important
            </label>
          </div>
          <div className="popup__deadline">
            <label htmlFor="date" className="popup__deadline--label">
              Deadline
            </label>
            <input
              type="date"
              value={this.state.date}
              min={this.minDate}
              max={maxDate}
              onChange={this.handleDate}
              className="popup__deadline--date"
            />
          </div>
        </div>
        <div className="popup__btn-group">
          <button className="popup__btn accept" onClick={this.handleSaveClick}>
            Save
          </button>
          <button
            className="popup__btn cancel"
            onClick={this.handleCancelClick}
          >
            Cancel
          </button>
        </div>
        <p className="popup__info"></p>
      </div>
    );
  }
}

export default Popup;
