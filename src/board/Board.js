import React from "react";
import "./Board.css";
import ListComponent from "../list/list";

export default class BoardComponent extends React.Component {
  constructor(props) {
    console.log(props, "props");
    super(props);
    this.state = { ...{ ...props } };
    console.log(this.state, "board state");
  }
  addNewCard = () => {
    this.setState({
      props: {
        cards: [
          ...this.state.props.lists.cards,
          { name: `New card ${this.state.props.lists.cards.length + 1}` }
        ]
      }
    });
    console.log(this.state);
  };
  componentWillMount() {
    console.log("component will mount");
  }
  componentDidMount() {
    console.log("component did mount");
  }
  componentWillUpdate() {
    console.log("component will update");
  }
  shouldComponentUpdate() {
    console.log("should component update");
    return true;
  }
  componentDidUpdate() {
    console.log("component did update");
  }
  componentWillReceiveProps() {
    console.log("component will receive props");
  }
  componentWillUnmount() {
    console.log("component to be destroyed");
  }
  render() {
    return (
      <div className="board-container">
        <div className="action-btn">
          <button onClick={this.props.addNewList}>Add List ...</button>
        </div>
        <div className="board-list-container">
          {this.state.props.lists.map(list => (
            <ListComponent props={list} />
          ))}
        </div>
      </div>
    );
  }
}
