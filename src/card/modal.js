import React, { useEffect } from "react";
import { Modal, Input, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

export default function ModalComponent(props) {
  const { name } = props.props;
  const { TextArea } = Input;
  useEffect(() => {}, []);
  return (
    <Modal
      title={name}
      visible={props.visible}
      onOk={props.saveCardData}
      onCancel={props.handleCancel}
      width={800}
    >
      <div
        className="modal-description"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between"
        }}
      >
        <div
          className="description-input"
          style={{ width: "calc(100% - 100px)" }}
        >
          <TextArea placeholder="Enter description" />
        </div>
        <div className="delete-icon" style={{ width: "30px" }}>
          <Button
            type="primary"
            icon={<DeleteOutlined />}
            size={30}
            onClick={props.deleteCard}
          />
        </div>
      </div>
      <div
        className="modal-data"
        style={{ width: "calc(100% - 100px)", marginTop: "30px" }}
      >
        <TextArea placeholder="Enter comments" />
      </div>
    </Modal>
  );
}
