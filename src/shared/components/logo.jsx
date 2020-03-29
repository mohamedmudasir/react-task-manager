import React from "react";
import { AliwangwangFilled } from "@ant-design/icons";

export function LogoComponent(props) {
  return (
    <div
      className="logo-container"
      style={{
        display: "flex",
        flexDirection: "row",
        color: props.color,
        justifyContent: "center"
      }}
    >
      <div className="logo-icon">
        <AliwangwangFilled />
      </div>
      <div className="logo-name">Stickistic</div>
    </div>
  );
}
