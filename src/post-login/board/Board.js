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
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginBottom: "30px"
        }}
      >
        <div className="board-name">
          <div style={{ color: "white", fontSize: "25px" }}>{name}</div>
        </div>
        <div className="action-btn">
          <Button type="primary" onClick={props.changeBoard}>
            Change Board
          </Button>
          <Button type="primary" onClick={props.addNewList}>
            Add List
          </Button>
        </div>
      </div>

      <div className="board-list-container">
        {lists.map((list, i) => (
          <ListComponent
            tComponent
            props={list}
            key={i.toString()}
            addNewCard={props.addNewCard}
            deleteCard={props.deleteCard}
            editList={props.editList}
            deleteList={props.deleteList}
          />
        ))}
      </div>
    </div>
  );
}
