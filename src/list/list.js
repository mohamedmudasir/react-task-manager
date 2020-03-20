import React from "react";
import CardComponent from "../card/Card";
import "./list.css";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Card } from "antd";

export default function ListComponent(props) {
  const { name, cards } = props.props;
  let buttonType;
  console.log(props, ";istprops");
  const addNewCard = targetList => {
    console.log(targetList);
  };
  if (cards.length === 1) {
    buttonType = <Button block>Add new Card</Button>;
  } else {
    buttonType = (
      <Button type="primary" onClick={() => addNewCard(props.props)}>
        Add card
      </Button>
    );
  }
  return (
    <Card
      draggable={true}
      title={name}
      extra={
        <div className="icon-container">
          <EditOutlined />
          <DeleteOutlined />
        </div>
      }
      headStyle={{ textAlign: "left" }}
      className="list-container"
    >
      <div className="list-card-container">
        {cards.map(card => (
          <CardComponent name={card.name} />
        ))}
      </div>
      <div className="list-action-btn">{buttonType}</div>
    </Card>
  );
}
