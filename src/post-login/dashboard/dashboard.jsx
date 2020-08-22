import React from "react";
import BoardComponent from "../board/Board";
import HeaderComponent from "../header/header";
import SideNavigation from "../sideNavigation/sidenavigation";
import { DragDropContext } from "react-beautiful-dnd";
import "./dashboard.css";
export const DashBoardComponent = (props) => {
  const {
    boards,
    openDrawer,
    closeDrawer,
    updateBoardId,
    createNewBoard,
    handleDragEnd,
    selectedBoardData,
    addNewCard,
    addNewList,
    deleteCard,
    editList,
    deleteList,
  } = props;
  console.log(props);
  return (
    <div className="dashboard-wrapper">
      <div className="App">
        <HeaderComponent />
        <SideNavigation
          boards={boards}
          drawerState={openDrawer}
          closeDrawer={closeDrawer}
          updateBoardId={updateBoardId}
          createNewBoard={createNewBoard}
        />
        <DragDropContext onDragEnd={handleDragEnd}>
          <BoardComponent
            selectedBoardData={selectedBoardData}
            addNewList={() => addNewList()}
            addNewCard={addNewCard}
            deleteCard={deleteCard}
            changeBoard={openDrawer}
            editList={editList}
            deleteList={deleteList}
          />
        </DragDropContext>
      </div>
    </div>
  );
};
