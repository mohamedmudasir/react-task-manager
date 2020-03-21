import React, { useState } from "react";
import CardComponent from "../card/Card";
import "./list.css";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Card, Input } from "antd";

export default function ListComponent(props) {
  const { name, cards, id } = props.props;
  const [listEdit, editState] = useState(false);
  let buttonType;
  const addNewCard = targetList => {
    props.addNewCard(targetList);
  };
  if (cards.length) {
    buttonType = (
      <Button type="primary" onClick={() => addNewCard(id)}>
        Add card
      </Button>
    );
  } else {
    buttonType = (
      <Button block onClick={() => addNewCard(id)}>
        Add new Card
      </Button>
    );
  }
  const enableEdit = () => {
    editState(!listEdit);
  };
  const editList = (e, listId) => {
    props.editList(listId);
  };
  const deleteList = listsId => {
    props.deleteList(listsId);
  };

  const updateListName = e => {
    console.log(e.target.value);
  };
  const editListName = listEdit ? (
    <div className="list-name-edit">
      <Input
        defaultValue={name}
        onChange={e => updateListName(e)}
        onMouseOut={e => editList(e, id)}
      />
    </div>
  ) : null;
  return (
    <Card
      title={name}
      extra={
        <React.Fragment>
          {editListName}
          <div className="icon-container">
            <EditOutlined onClick={enableEdit} />
            <DeleteOutlined onClick={() => deleteList(id)} />
          </div>
        </React.Fragment>
      }
      headStyle={{ textAlign: "left" }}
      className="list-container"
    >
      <div className="list-card-container">
        {cards.map(card => (
          <CardComponent
            draggable="true"
            key={card.id.toString()}
            name={card.name}
          />
        ))}
      </div>
      <div className="list-action-btn">{buttonType}</div>
    </Card>
  );
}
