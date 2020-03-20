import React, { useEffect } from "react";
import "./sideNavigation.css";
import { Drawer } from "antd";

export default function SideNavigation(props) {
  useEffect(() => {
    console.log(props, "sidenavigaton");
  }, [props.drawerState]);
  const updateBoard = id => {
    console.log(id, "navigation");
    props.updateBoardId(id);
  };
  const boardList = props.boards.map(({ name, id }) => {
    return (
      <div className="board-name" onClick={() => updateBoard(id)}>
        {name}
      </div>
    );
  });

  return (
    <Drawer
      title="Select Board"
      placement="right"
      closable={true}
      onClose={props.closeDrawer}
      visible={props.drawerState}
      width={350}
    >
      <div className="side-navigation-container">
        <div className="boards-list">{boardList}</div>
      </div>
    </Drawer>
  );
}
