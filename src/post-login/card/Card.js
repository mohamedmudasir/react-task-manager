import React, { useState } from "react";
import { Card } from "antd";
import "./Card.css";
import ModalComponent from "./modal";
import { Draggable } from "react-beautiful-dnd";

export default function CardComponent(props) {
  const [modalState, updateModalState] = useState(false);
  const [modalData, updateModalData] = useState({});
  const { name, id } = props.props;

  /** Update select card data to modal */
  const updateModalDataState = targetData => {
    updateModalData(targetData);
    updateModalState(true);
  };
  const saveCardData = () => {};
  const deleteCard = () => {
    props.deleteCard(modalData.id, props.listId);
    updateModalState(false);
  };

  return (
    <React.Fragment>
      <Draggable draggableId={id} index={props.index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            type="card"
          >
            <Card
              style={{
                color: "black",
                borderRadius: "5px",
                border: "1px solid #b1b2b27a",
                boxShadow: "1px 1px 1px 1px #b1b2b273",
                background: snapshot.isDragging ? "#00bcd47a" : "inherit"
              }}
              className="card-container"
              onDoubleClick={() => updateModalDataState(props.props)}
            >
              <div
                className="card-name"
                style={{ textAlign: "left", fontSize: "16px" }}
              >
                {name}
              </div>
            </Card>
          </div>
        )}
      </Draggable>
      <ModalComponent
        props={modalData}
        visible={modalState}
        handleCancel={() => updateModalState(false)}
        saveCardData={saveCardData}
        deleteCard={deleteCard}
      />
    </React.Fragment>
  );
}
