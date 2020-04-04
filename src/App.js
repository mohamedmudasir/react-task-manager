import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import BoardComponent from "./post-login/board/Board";
import HeaderComponent from "./post-login/header/header";
import SideNavigation from "./post-login/sideNavigation/sidenavigation";
import LoginComponent from "./pre-login/login";
import { DragDropContext } from "react-beautiful-dnd";
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      boards: [
        {
          id: "BR-100",
          name: "Personal",
          lists: [
            {
              id: "LI-1001",
              name: "Home",
              cards: [
                { id: "CR-10011", name: "Expenses- Jan" },
                { id: "CR-10012", name: "Expenses - April" },
              ],
            },
            {
              id: "LI-1002",
              name: "Mobile",
              cards: [
                { id: "CR-10021", name: "Mobile expenses - Jan" },
                { id: "CR-10022", name: "Mobile expenses - Jan" },
              ],
            },
          ],
        },
        {
          id: "BR-101",
          name: "Travel",
          lists: [
            {
              id: "LI-1011",
              name: "Australia",
              cards: [
                { id: "CR-10111", name: "Travel-apr expenses" },
                { id: "CR-10112", name: "Travel May expenses" },
              ],
            },
            {
              id: "LI-1012",
              name: "Travel List",
              cards: [
                { id: "CR-10121", name: "New Card 2" },
                { id: "CR-10122", name: "New Card5" },
              ],
            },
          ],
        },
      ],
      selectedBoardId: "BR-100",
      selectedBoardData: {},
      openDrawer: false,
      backgroundColor: "rgb(75, 191, 107)",
    };
  }
  componentWillMount() {
    this.setState(
      { selectedBoardId: this.state.boards[0].id },
      this.getCurrentBoardData()
    );
    console.log("component will mount");
    document.getElementById(
      "root"
    ).style.background = this.state.backgroundColor;
  }
  componentDidMount() {
    console.log("component did mount");
  }
  componentWillUpdate() {
    console.log("component will update");
  }
  shouldComponentUpdate(previousState, currentState) {
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

  /** Function to create new board
   * @param boardName Name given in input field
   */
  createNewBoard = (boardName) => {
    const newBoardData = {
      id: `BR-${
        this.idGenerator(this.state.boards)
          ? this.idGenerator(this.state.boards) + 1
          : 510
      }`,
      name: boardName,
      lists: [],
    };
    this.setState({ boards: [...this.state.boards, newBoardData] });
  };

  /** To add new List - called from list component */
  addNewList = () => {
    const { lists, id } = this.state.selectedBoardData;
    const payload = {
      id: `LI-${
        this.idGenerator(lists)
          ? this.idGenerator(lists) + 1
          : id.split("-")[1].toString() + 1
      }`,
      name: `New List ${lists.length + 1}`,
      cards: [],
    };
    this.setState((previousState) => {
      const boardIndexToReplace = previousState.boards.findIndex(
        ({ id }) => id === previousState.selectedBoardId
      );
      previousState.boards[boardIndexToReplace].lists.push(payload);
      return { boards: previousState.boards };
    });
  };

  /**To edit list name  - to be implemented */
  editList = (targetListId) => {
    const filteredList = this.state.selectedBoardData.lists.filter(
      ({ id }) => id === targetListId
    );
    console.log(filteredList);
  };

  /** Delete list
   * @param targetListId list id to be deleted
   */
  deleteList = (targetListId) => {
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

  /** Add new card
   * @param targetListId listid in which card to be added
   */
  addNewCard = (targetListId) => {
    const { lists } = this.state.selectedBoardData;
    const listIndexToReplace = lists.findIndex(({ id }) => id === targetListId);
    const targetList = lists[listIndexToReplace];
    const payload = {
      id: `CR-${
        this.idGenerator(targetList.cards)
          ? this.idGenerator(targetList.cards) + 1
          : targetListId.split("-")[1].toString() + 1
      }`,
      name: `New Card ${targetList.cards.length + 1}`,
    };
    this.setState((previousState) => {
      const boardIndexToReplace = previousState.boards.findIndex(
        ({ id }) => id === previousState.selectedBoardId
      );
      previousState.boards[boardIndexToReplace].lists[
        listIndexToReplace
      ].cards.push(payload);
      return { boards: previousState.boards };
    });
  };
  deleteCard = (cardId, listId) => {
    const currentBoardData = { ...this.state.selectedBoardData };
    const listIndexToUpdate = currentBoardData.lists.findIndex(
      ({ id }) => id === listId
    );
    const cardIndexToUpdate = currentBoardData.lists[
      listIndexToUpdate
    ].cards.findIndex(({ id }) => id === cardId);
    currentBoardData.lists[listIndexToUpdate].cards.splice(
      cardIndexToUpdate,
      1
    );
    this.setState((previousState) => {
      const currentBoardIndex = previousState.boards.findIndex(
        ({ id }) => id === previousState.selectedBoardId
      );
      previousState.boards[currentBoardIndex] = currentBoardData;
      return { boards: previousState.boards };
    });
  };

  /** Id generator for new card, list and board
   * @param  data array to be iterated to find last id
   */
  idGenerator = (data) => {
    const maxId = data.map((currentData) => {
      return currentData.id.split("-")[1];
    });
    return maxId.length ? Math.max(...maxId) : 0;
  };

  /**Open card modal */
  openDrawer = () => {
    this.setState({ openDrawer: true });
  };

  /**Close card modal */
  closeDrawer = () => {
    this.setState({ openDrawer: false });
  };

  /** Select current board
   * @param id selected board id from side navigation
   */
  updateBoardId = (id) => {
    this.setState({ selectedBoardId: id }, () => this.getCurrentBoardData());
  };

  /** Get selected board data from state */
  getCurrentBoardData = () => {
    const filteredData = this.state.boards.filter(
      ({ id }) => id === this.state.selectedBoardId
    );
    const selectedBoardData = filteredData[0];
    this.setState({ selectedBoardData });
  };

  /**Update state after card is dropped
   * @param result drag and drop data
   */
  handleDragEnd = (result) => {
    /**Drop only inside a list */
    console.log(result, "result");
    const { draggableId, destination } = result;
    if (destination) {
      const draggableType = draggableId.split("-")[0];
      if (draggableType === "CR") {
        this.handleCardDragDrop(result);
      } else if (draggableType === "LI") {
        this.handleListDragDrop(result);
      }
    }
  };
  handleCardDragDrop(result) {
    const { source, destination } = result;
    const startIndex = source.index;
    const srcParentId = source.droppableId;
    const endIndex = destination.index;
    const destinationParentId = destination.droppableId;
    /** Drop logic for same list */
    if (srcParentId === destinationParentId) {
      const srcListIndex = this.state.selectedBoardData.lists.findIndex(
        ({ id }) => id === srcParentId
      );
      this.setState((previousState) => {
        const srcListData = previousState.selectedBoardData.lists[srcListIndex];
        const srcCardData = srcListData.cards[startIndex];
        srcListData.cards.splice(startIndex, 1);
        srcListData.cards.splice(endIndex, 0, srcCardData);
        return { boards: previousState.boards };
      });
    } else {
      /**Drop logic for different list */
      this.setState((previousState) => {
        const boardData = previousState.selectedBoardData;
        const srcListIndex = boardData.lists.findIndex(
          ({ id }) => id === srcParentId
        );
        const desListIndex = boardData.lists.findIndex(
          ({ id }) => id === destinationParentId
        );
        const srcCardData = boardData.lists[srcListIndex].cards[startIndex];
        boardData.lists[srcListIndex].cards.splice(startIndex, 1);
        boardData.lists[desListIndex].cards.length
          ? boardData.lists[desListIndex].cards.splice(endIndex, 0, srcCardData)
          : boardData.lists[desListIndex].cards.push(srcCardData);
        return { boards: previousState.boards };
      });
    }
  }
  handleListDragDrop(result) {
    console.log("list dragged");
  }
  render() {
    return (
      <React.Fragment>
        <Router>
          <Switch>
            <Route path="/" exact>
              <LoginComponent />
            </Route>
            <Route path="/dashboard">
              <div className="App">
                <HeaderComponent />
                <SideNavigation
                  boards={this.state.boards}
                  drawerState={this.state.openDrawer}
                  closeDrawer={this.closeDrawer}
                  updateBoardId={this.updateBoardId}
                  createNewBoard={this.createNewBoard}
                />
                <DragDropContext onDragEnd={this.handleDragEnd}>
                  <BoardComponent
                    props={this.state.selectedBoardData}
                    addNewList={() => this.addNewList()}
                    addNewCard={this.addNewCard}
                    deleteCard={this.deleteCard}
                    changeBoard={this.openDrawer}
                    editList={this.editList}
                    deleteList={this.deleteList}
                  />
                </DragDropContext>
              </div>
            </Route>
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
