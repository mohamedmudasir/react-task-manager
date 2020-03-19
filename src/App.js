import React from "react";
import "./App.css";
import BoardComponent from "./board/Board";
import HeaderComponent from "./header/header";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      boards: {
        name: "Default board 1",
        lists: [
          { name: "Board component", cards: [{ name: "Expand card" }] },
          { name: "Board component2", cards: [{ name: "Expand card" }] }
        ]
      }
    };
  }
  addNewList = () => {
    console.log("called from app");
    this.setState({
      boards: {
        lists: [
          ...this.state.boards.lists,
          { name: `List ${this.state.boards.lists.length + 1}`, cards: [] }
        ]
      }
    });
    console.log(this.state);
  };
  render() {
    return (
      <div className="App">
        <HeaderComponent />
        <BoardComponent
          props={this.state.boards}
          addNewList={this.addNewList}
        />
      </div>
    );
  }
}

export default App;
