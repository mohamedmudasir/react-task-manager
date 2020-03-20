import React from "react";
import CardComponent from "../card/Card";
import "./list.css";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Card } from "antd";

export default function ListComponent(props) {
  const { name, cards, id } = props.props;
  let buttonType;
  console.log(props, ";istprops");
  const addNewCard = targetList => {
    console.log(targetList);
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
          <CardComponent key={card.id.toString()} name={card.name} />
        ))}
      </div>
      <div className="list-action-btn">{buttonType}</div>
    </Card>
  );
}
