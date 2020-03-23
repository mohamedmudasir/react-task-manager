import React, { useEffect } from "react";
import { Button } from "antd";
import "./Board.css";
import ListComponent from "../list/list";

export default function BoardComponent(props) {
  const { lists, name } = props.props;
  useEffect(() => {
    console.log(props.props.id, "board");
  }, [props]);

  return (
    <div className="board-container">
      <div className="board-name" style={{ marginBottom: "30px" }}>
        <h1>{name}</h1>
      </div>
      <div className="action-btn">
        <Button type="primary" onClick={props.changeBoard}>
          Change Board
        </Button>
        <Button type="primary" onClick={props.addNewList}>
          Add List ...
        </Button>
      </div>
      <div className="board-list-container">
        {lists.map((list, i) => (
          <ListComponent
            props={list}
            key={i.toString()}
            addNewCard={props.addNewCard}
            editList={props.editList}
            deleteList={props.deleteList}
          />
        ))}
      </div>
    </div>
  );
}
