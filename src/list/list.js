import React, { useState } from "react";
import CardComponent from "../card/Card";
import "./list.css";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Card, Input } from "antd";
import { Droppable } from "react-beautiful-dnd";

export default function ListComponent(props) {
  const { name, cards, id } = props.props;
  const [listEdit, editState] = useState(false);
  let buttonType;
  const addNewCard = targetList => {
    props.addNewCard(targetList);
  };

  /** Block and colored button render based on card length */
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
  /** Enable list name editable */
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
    <div>
      <Droppable droppableId={id}>
        {provided => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
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
              headStyle={{
                textAlign: "left",
                borderBottom: "1px solid #00000040",
                background: "rgba(98, 201, 199, 0.19)",
                fontWeight: "600"
              }}
              style={{
                border: "1px solid #00000040",
                boxShadow: "0.5px 0.5px 1px 1px #d3d3d3de",
                background: "white"
              }}
              className="list-container"
            >
              <div className="list-card-container">
                {cards.map((card, index) => (
                  <CardComponent
                    draggable="true"
                    key={card.id}
                    props={card}
                    index={index}
                    deleteCard={props.deleteCard}
                    listId={id}
                  />
                ))}
              </div>
              {provided.placeholder}
              <div className="list-action-btn">{buttonType}</div>
            </Card>
          </div>
        )}
      </Droppable>
    </div>
  );
}
