import React from "react";
import "./header.css";
export default function HeaderComponent(props) {
  return (
    <div className="header-container">
      <div className="logo" style={{ display: "flex", flexDirection: "row" }}>
        <div className="icon">
          <div className="name">Atlassian</div>
        </div>
      </div>
      <div className="navigation">
        <div className="nav-container">
          <div className="icon">icon</div>
          <div className="name">Home</div>
        </div>
        <div className="nav-container">
          <div className="icon">icon</div>
          <div className="name">Profile</div>
        </div>
        <div className="nav-container">
          <div className="icon">icon</div>
          <div className="name">Logout</div>
        </div>
      </div>
    </div>
  );
}
