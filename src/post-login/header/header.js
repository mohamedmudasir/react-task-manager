import React, { useState } from "react";
import "./header.css";
import { Avatar, Menu, Dropdown } from 'antd';
import { HomeFilled, UserOutlined } from "@ant-design/icons";
import { LogoComponent } from "../../shared/components/logo";
export default function HeaderComponent(props) {
  const [isVisible, updateDropdownState] = useState(false)
  const handleMenuClick = (e) => {
    updateDropdownState(true)
  }
  const handleVisibleChange = flag => {
    updateDropdownState(flag);
  };
  const menuItems = (
    <Menu onClick={handleMenuClick} style={{width:"120px"}}>
      <Menu.Item key="1">Profile</Menu.Item>
      <Menu.Item key="2">Settings</Menu.Item>
      <Menu.Item key="3">Logout</Menu.Item>
    </Menu>)
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
            <Dropdown overlay={menuItems} onVisibleChange={handleVisibleChange} visible={isVisible} placement="bottomLeft" >
              <Avatar onClick={e=> e.preventDefault()}>MM</Avatar>
            </Dropdown>
          </div>
        </div>
      </div>
    </div>
  );
}
