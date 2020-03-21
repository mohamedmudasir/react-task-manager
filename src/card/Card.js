import React, { useState } from "react";
import { Card } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "../card/Card.css";
import ModalComponent from "./modal";

export default function CardComponent(props) {
  const [modalState, updateModalState] = useState(false);
  const [modalData, updateModalData] = useState({});
  const { name } = props;
  const updateModalDataState = targetData => {
    console.log(targetData, "targetData");
    updateModalData(targetData);
    updateModalState(true);
  };

  return (
    <React.Fragment>
      <Card
        title={name}
        headStyle={{ textAlign: "left" }}
        className="card-container"
        onDoubleClick={() => updateModalDataState(props)}
      ></Card>
      <ModalComponent
        props={modalData}
        visible={modalState}
        handleCancel={() => updateModalState(false)}
      />
    </React.Fragment>
  );
}
