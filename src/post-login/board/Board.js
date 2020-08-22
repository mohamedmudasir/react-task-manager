import React from "react";
import { Button } from "antd";
import "./Board.css";
import ListComponent from "../list/list";
import styled from "styled-components";

const ListWrapper = styled.div`
  width: 272px;
  margin: 0 4px;
  height: 100%;
  box-sizing: border-box;
  display: inline-block;
  vertical-align: top;
  white-space: nowrap;
  position: relative;
`;

export default function BoardComponent(props) {
  const {
    selectedBoardData: { lists, name },
    changeBoard,
    addNewList,
    deleteList,
    editList,
    addNewCard,
    deleteCard,
  } = props;
  return (
    <div className="board-container">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "baseline",
          marginBottom: "30px",
        }}
      >
        <div className="board-name">
          <div style={{ color: "white", fontSize: "25px" }}>{name}</div>
        </div>
        <div className="action-btn">
          <Button type="primary" onClick={changeBoard}>
            Change Board
          </Button>
          <Button type="primary" onClick={addNewList}>
            Add List
          </Button>
        </div>
      </div>

      <div className="board-list-container">
        {lists?.length ? (
          lists.map((list, i) => (
            <ListWrapper>
              <ListComponent
                props={list}
                key={list.id.toString()}
                addNewCard={addNewCard}
                deleteCard={deleteCard}
                editList={editList}
                deleteList={deleteList}
              />
            </ListWrapper>
          ))
        ) : (
          <div className="list-error-message">
            Start by adding new lists.....
          </div>
        )}
      </div>
    </div>
  );
}
