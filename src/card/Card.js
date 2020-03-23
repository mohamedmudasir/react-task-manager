import React, { useState } from "react";
import { Card } from "antd";
import "../card/Card.css";
import ModalComponent from "./modal";
import { Draggable } from "react-beautiful-dnd";

export default function CardComponent(props) {
  const [modalState, updateModalState] = useState(false);
  const [modalData, updateModalData] = useState({});
  const { name, id } = props.props;
  console.log(props, "card");

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
        {provided => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            type="card"
          >
            <Card
              title={name}
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
              className="card-container"
              onDoubleClick={() => updateModalDataState(props.props)}
            ></Card>
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
