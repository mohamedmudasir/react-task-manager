export function addNewList(props) {
  console.log("called from app");
  this.setState({
    boards: {
      lists: [
        ...this.state.boards.lists,
        {
          name: `List ${this.state.boards.lists.length + 1}`,
          cards: [{ name: "Expand card2" }],
        },
      ],
    },
  });
  console.log(this.state, "board component udpate");
}

export const findTargetIndex = (srcData, targetId, propertyType) => {
  let srcArray = [];
  const mapArr = {
    board: srcData.boards,
    lists: srcData.lists,
    cards: srcData.cards,
  };
  if (propertyType === "board") {
    srcArray = srcData.boards;
  }
};
