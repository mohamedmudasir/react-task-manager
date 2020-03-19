import React from "react";
import "./App.css";
import BoardComponent from "./board/Board";
import HeaderComponent from "./header/header";
import SideNavigation from "./sideNavigation/sidenavigation";
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
          name: "Default board 1",
          lists: [
            {
              id: "LI-2231",
              name: "Board component",
              cards: [
                { id: "CR-22311", name: "Expand card1" },
                { id: "CR-22312", name: "Expand card2" }
              ]
            },
            {
              id: "LI-2232",
              name: "Board component2",
              cards: [{ id: "22321", name: "Expand card3" }]
            }
          ]
        }
      ],
      selectedBoard: {},
      openDrawer: false
    };
  }
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
  // addNewList = () => {
  //   console.log("called from app");
  //   this.setState({
  //     boards: {
  //       lists: [
  //         ...this.state.boards.lists,
  //         {
  //           name: `List ${this.state.boards.lists.length + 1}`,
  //           cards: [{ name: "Expand card2" }]
  //         }
  //       ]
  //     }
  //   });
  //   console.log(this.state, "board component udpate");
  // };
  openDrawer = () => {
    this.setState({ openDrawer: true });
    console.log(this.state, "opend");
  };
  closeDrawer = () => {
    this.setState({ openDrawer: false });
  };
  render() {
    return (
      <div className="App">
        <HeaderComponent />
        <SideNavigation
          boards={this.state.boards}
          drawerState={this.state.openDrawer}
          closeDrawer={this.openDrawer}
        />
        <BoardComponent
          props={this.state.boards[0]}
          addNewList={this.addNewList}
          changeBoard={this.openDrawer}
        />
      </div>
    );
  }
}

export default App;
