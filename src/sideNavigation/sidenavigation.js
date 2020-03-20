import React, { useState } from "react";
import "./sideNavigation.css";
import { Drawer, Button, Input } from "antd";

export default function SideNavigation(props) {
  const [btnState, updateBtnState] = useState(props.drawerState);
  let btnType;
  if (!btnState) {
    btnType = (
      <Button type="primary" block onClick={() => changeBtn(true)}>
        Add New Board
      </Button>
    );
  } else {
    btnType = (
      <Input
        placeholder="Enter Board Name"
        onPressEnter={e => createNewBoard(e)}
      />
    );
  }

  const changeBtn = state => {
    updateBtnState(state);
  };
  const closeDrawer = () => {
    updateBtnState(false);
    props.closeDrawer();
  };
  const createNewBoard = e => {
    if (e.target.value) {
      changeBtn(false);
      props.createNewBoard(e.target.value);
    }
  };
  const updateBoard = id => {
    console.log(id, "navigation");
    props.updateBoardId(id);
    closeDrawer();
  };
  const boardList = props.boards.map(({ name, id }) => {
    return (
      <div
        className="board-name"
        key={id.toString()}
        style={{ cursor: "pointer" }}
        onClick={() => updateBoard(id)}
      >
        {name}
      </div>
    );
  });

  return (
    <Drawer
      title="Select Board"
      placement="right"
      closable={true}
      onClose={closeDrawer}
      visible={props.drawerState}
      width={350}
    >
      <div className="side-navigation-container">
        <div className="boards-list">{boardList}</div>
      </div>
      {btnType}
    </Drawer>
  );
}
