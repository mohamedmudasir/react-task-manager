import React, { useEffect, useState } from "react";
import "./sideNavigation.css";
import { Drawer } from "antd";

export default function SideNavigation(props) {
  const [drawerState, updateDrawerState] = useState(false);
  useEffect(() => {
    console.log(drawerState, "sidenavigaton");
  }, [drawerState]);
  const boardList = props.boards.map(board => {
    return <div>{board.name}</div>;
  });
  const closeDrawer = () => {
    updateDrawerState(false);
    props.closeDrawer();
  };
  return (
    <Drawer
      title="Select Board"
      placement="right"
      closable={true}
      onClose={closeDrawer}
      visible={drawerState}
    >
      <div className="side-navigation-container">
        <div class="boards-list">{boardList}</div>
      </div>
    </Drawer>
  );
}
