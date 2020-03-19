import React from "react";
import CardComponent from "../card/Card";
import "./list.css";

export default function ListComponent(props) {
  const { name, cards } = props.props;
  console.log(props, ";istprops");
  const addNewCard = () => {
    console.log(props.props.cards);
    props.props.cards.push({ name: `New card${props.cards.length}` });
  };
  return (
    <div className="list-container">
      <div className="list-header">
        <div className="list-header">{name}</div>
      </div>
      <div className="list-card-container">
        {cards.map(card => (
          <CardComponent name={card.name} />
        ))}
      </div>
      <div className="list-action-btn">
        <button onClick={addNewCard}>Add new card...</button>
      </div>
    </div>
  );
}
