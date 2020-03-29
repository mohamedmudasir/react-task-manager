import React from "react";
import "./header.css";
import { Avatar } from "antd";
import { HomeFilled, UserOutlined } from "@ant-design/icons";
import { LogoComponent } from "../../shared/components/logo";
export default function HeaderComponent(props) {
  return (
    <div className="header-container">
      <div className="logo">
        <LogoComponent color="white" />
      </div>
      <div className="navigation">
        <div className="nav-container">
          <div className="icon">
            <HomeFilled />
          </div>
          <div className="name">Home</div>
        </div>
        <div className="nav-container">
          <div className="icon">
            <UserOutlined />
          </div>
          <div className="name">Profile</div>
        </div>
        <div className="nav-container">
          <div className="icon">
            <Avatar>MM</Avatar>
          </div>
        </div>
      </div>
    </div>
  );
}
