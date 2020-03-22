import React, { useState } from "react";
import { Card } from "antd";
import "../card/Card.css";
import ModalComponent from "./modal";
import { Draggable } from "react-beautiful-dnd";

export default function CardComponent(props) {
  const [modalState, updateModalState] = useState(false);
  const [modalData, updateModalData] = useState({});
  const { name, id } = props.props;
  const updateModalDataState = targetData => {
    console.log(targetData, "targetData");
    updateModalData(targetData);
    updateModalState(true);
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
              headStyle={{ textAlign: "left" }}
              className="card-container"
              onDoubleClick={() => updateModalDataState(props)}
            ></Card>
          </div>
        )}
      </Draggable>
      <ModalComponent
        props={modalData}
        visible={modalState}
        handleCancel={() => updateModalState(false)}
      />
    </React.Fragment>
  );
}
