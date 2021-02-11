import React, { Component } from "react";
import "./App.css";
import AddTask from "./AddTask";
import TaskList from "./TaskList";
import Popup from "./Popup";

class App extends Component {
  counter = 0;
  taskToEdit = 0;
  state = {
    tasks: [],
  };
  deleteTask = (id) => {
    //WERSJA 1
    const tasks = [...this.state.tasks];
    const index = tasks.findIndex((task) => task.id === id.id);
    tasks.splice(index, 1);
    this.setState({ tasks });

    //wersja 2
    // let tasks = [...this.state.tasks];
    // tasks.filter((task) => task.id !== id.id);
    // this.setState({ tasks });
  };
  changeTaskStatus = (id) => {
    const tasks = Array.from(this.state.tasks);
    tasks.forEach((task) => {
      if (task.id === id.id) {
        task.active = false;
        task.finishDate = new Date().getTime();
      }
    });
    this.setState({
      tasks,
    });
  };
  addTask = (text, date, important) => {
    const addTask = {
      id: this.counter,
      text,
      date,
      important,
      private: true,
      active: true,
      finishDate: null,
    };
    this.counter++;
    this.setState((prevState) => ({
      tasks: [...prevState.tasks, addTask],
    }));
    return true;
  };
  showPopup = (id) => {
    document.querySelector(".popup").style.display = "flex";
    const editTaskId = id.id;
    this.taskToEdit = editTaskId;
  };
  editTask = (text, date, important) => {
    const editId = this.taskToEdit;
    const editTask = {
      id: editId,
      text,
      date,
      important,
      private: true,
      active: true,
      finishDate: null,
    };

    const tasks = [...this.state.tasks];
    const index = tasks.findIndex((task) => task.id === editId);
    tasks.splice(index, 1);
    const completedUpdate = [...tasks, editTask];

    this.setState({
      tasks: completedUpdate,
    });

    document.querySelector(".popup").style.display = "none";
    return true;
  };
  render() {
    return (
      <div className="App">
        <header className="header">
          <h1 className="header__title"> TODO APP</h1>
          <AddTask add={this.addTask} />
        </header>
        <TaskList
          tasks={this.state.tasks}
          delete={this.deleteTask}
          change={this.changeTaskStatus}
          show={this.showPopup}
        />
        <Popup edit={this.editTask} tasks={this.state.tasks} />
      </div>
    );
  }
}

export default App;
