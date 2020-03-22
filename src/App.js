import React from "react";
import "./App.css";
import BoardComponent from "./board/Board";
import HeaderComponent from "./header/header";
import SideNavigation from "./sideNavigation/sidenavigation";
import { DragDropContext } from "react-beautiful-dnd";
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      boards: [
        {
          id: "BR-123",
          name: "Default board 1",
          lists: [
            {
              id: "LI-1231",
              name: "Board component",
              cards: [
                { id: "CR-12311", name: "Expand card1" },
                { id: "CR-12312", name: "Expand card2" }
              ]
            },
            {
              id: "LI-1232",
              name: "Board component2",
              cards: [{ id: "12321", name: "Expand card3" }]
            }
          ]
        },
        {
          id: "BR-223",
          name: "Default board 2",
          lists: [
            {
              id: "LI-2231",
              name: "Board component",
              cards: [
                { id: "CR-22311", name: "Expand card1" },
                { id: "CR-22312", name: "Expand card2" }
              ]
            }
          ]
        }
      ],
      selectedBoardId: "BR-123",
      selectedBoardData: {},
      openDrawer: false
    };
  }
  componentWillMount() {
    this.setState(
      { selectedBoardId: this.state.boards[0].id },
      this.getCurrentBoardData()
    );
    console.log(this.state, "app");
    console.log("component will mount");
  }
  componentDidMount() {
    console.log("component did mount");
  }
  componentWillUpdate() {
    console.log("component will update");
  }
  shouldComponentUpdate(previousState, currentState) {
    console.log(previousState, currentState);
    console.log("should component update");
    if (previousState === currentState) {
      return false;
    } else {
      return true;
    }
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
  createNewBoard = boardName => {
    const newBoardData = {
      id: `BR-${
        this.idGenerator(this.state.boards)
          ? this.idGenerator(this.state.boards) + 1
          : 1211
      }`,
      name: boardName,
      lists: []
    };
    this.setState({ boards: [...this.state.boards, newBoardData] });
    console.log(this.state);
  };

  addNewList = () => {
    const currentBoardData = { ...this.state.selectedBoardData };
    const currentBoardId = currentBoardData.id.split("-")[1];
    const { lists } = currentBoardData;
    lists.push({
      id: `LI-${
        this.idGenerator(lists)
          ? this.idGenerator(lists) + 1
          : currentBoardId.toString() + 1
      }`,
      name: `New List ${lists.length + 1}`,
      cards: []
    });
    const findIndexToReplace = this.state.boards.findIndex(
      ({ id }) => id === this.state.selectedBoardId
    );
    const updateBoardData = [...this.state.boards];
    updateBoardData[findIndexToReplace] = currentBoardData;
    this.setState({ boards: [...updateBoardData] });
    console.log(this.state, "afterupdate");
  };
  editList = targetListId => {
    const filteredList = this.state.selectedBoardData.lists.filter(
      ({ id }) => id === targetListId
    );
    console.log(filteredList);
  };
  deleteList = targetListId => {
    const filteredList = this.state.selectedBoardData.lists.filter(
      ({ id }) => id !== targetListId
    );
    const boardIndextoReplace = this.state.boards.findIndex(
      ({ id }) => id === this.state.selectedBoardId
    );
    const updateBoardData = [...this.state.boards];
    updateBoardData[boardIndextoReplace].lists = filteredList;
    this.setState({ boards: updateBoardData }, this.getCurrentBoardData());
  };
  addNewCard = targetListId => {
    const currentBoardData = { ...this.state.selectedBoardData };
    const { lists } = currentBoardData;
    const indexToReplace = lists.findIndex(({ id }) => id === targetListId);
    const currentListId = targetListId.split("-")[1];
    const targetList = lists[indexToReplace];
    lists[indexToReplace].cards.push({
      id: `CR-${
        this.idGenerator(targetList.cards)
          ? this.idGenerator(targetList.cards) + 1
          : currentListId.toString() + 1
      }`,
      name: `New Card ${lists[indexToReplace].cards.length + 1}`
    });
    const boardIndextoReplace = this.state.boards.findIndex(
      ({ id }) => id === this.state.selectedBoardId
    );
    const updateBoardData = [...this.state.boards];
    updateBoardData[boardIndextoReplace] = currentBoardData;
    this.setState({ boards: [...updateBoardData] });
  };
  idGenerator = data => {
    const maxId = data.map(currentData => {
      return currentData.id.split("-")[1];
    });
    return Math.max(...maxId);
  };
  openDrawer = () => {
    this.setState({ openDrawer: true });
  };
  closeDrawer = () => {
    this.setState({ openDrawer: false });
  };
  updateBoardId = id => {
    this.setState({ selectedBoardId: id }, () => this.getCurrentBoardData());
  };
  getCurrentBoardData = () => {
    const filteredData = this.state.boards.filter(
      ({ id }) => id === this.state.selectedBoardId
    );
    const selectedBoardData = filteredData[0];
    this.setState({ selectedBoardData });
  };
  handleDragEnd = result => {
    console.log(result);
    const { draggableId, source, destination } = result;
    const startIndex = source.index;
    const endIndex = destination.index;
    const srcParentId = source.droppableId;
    const destinationParentId = destination.droppableId;
    const currentBoardIndex = this.state.boards.findIndex(
      ({ id }) => id === this.state.selectedBoardId
    );
    if (srcParentId === destinationParentId) {
      const srcListIndex = this.state.selectedBoardData.lists.findIndex(
        ({ id }) => id === srcParentId
      );
      const updatedCardData = this.state.selectedBoardData.lists[srcListIndex]
        .cards;
      [updatedCardData[startIndex], updatedCardData[endIndex]] = [
        updatedCardData[endIndex],
        updatedCardData[startIndex]
      ];
      this.setState(previousState => {
        previousState.boards[currentBoardIndex] =
          previousState.selectedBoardData;
        return { boards: previousState.boards };
      });
    } else {
      const currentBoardData = { ...this.state.selectedBoardData };
      const srcParentIndex = currentBoardData.lists.findIndex(
        ({ id }) => id === srcParentId
      );
      const desParentIndex = currentBoardData.lists.findIndex(
        ({ id }) => id === destinationParentId
      );
      const srcData = currentBoardData.lists[srcParentIndex].cards.filter(
        ({ id }) => id === draggableId
      )[0];
      const desCardData = currentBoardData.lists[desParentIndex].cards;
      currentBoardData.lists[srcParentIndex].cards.splice(startIndex, 1);
      endIndex
        ? desCardData.splice(endIndex, 0, srcData)
        : desCardData.push(srcData);
      this.setState(previousState => {
        previousState.boards[currentBoardIndex] = currentBoardData;
        return { boards: previousState.boards };
      });

      console.log("to another list");
    }
  };
  handleDragUpdate = result => {
    console.log(result, "update");
  };
  render() {
    return (
      <div className="App">
        <HeaderComponent />
        <SideNavigation
          boards={this.state.boards}
          drawerState={this.state.openDrawer}
          closeDrawer={this.closeDrawer}
          updateBoardId={this.updateBoardId}
          createNewBoard={this.createNewBoard}
        />
        <DragDropContext
          onDragEnd={this.handleDragEnd}
          onDragUpdate={this.handleDragUpdate}
        >
          <BoardComponent
            props={this.state.selectedBoardData}
            addNewList={() => this.addNewList()}
            addNewCard={this.addNewCard}
            changeBoard={this.openDrawer}
            editList={this.editList}
            deleteList={this.deleteList}
          />
        </DragDropContext>
      </div>
    );
  }
}

export default App;
