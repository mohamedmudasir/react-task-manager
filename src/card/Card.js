import React from "react";
import "../card/Card.css";

export default function CardComponent(props) {
  const { name } = props;
  return (
    <div className="card-container">
      <div className="card-header">
        <div className="title">{name}</div>
        <div className="card-action-btn">
          <button>edit</button>
          <button>color</button>
        </div>
      </div>
    </div>
  );
}
