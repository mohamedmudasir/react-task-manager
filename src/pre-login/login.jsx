import React from "react";
import { useHistory } from "react-router-dom";
import { Card, Input, Button } from "antd";
import { LogoComponent } from "../shared/components/logo";
import "./pre-login.css";
import { LOGIN_CONFIG } from "../constants/login-constants";

export function LoginComponent() {
  const history = useHistory();
  const authenticateUser = () => {
    localStorage.setItem(LOGIN_CONFIG.tokenName, true);
    history.push("/dashboard");
  };
  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div
          className="logo"
          style={{ marginBottom: "20px", marginLeft: "0px" }}
        >
          <LogoComponent color="#0489da" />
        </div>
        <div className="form-container">
          <Card className="form-card" bordered={false}>
            <div className="title">Log in to Stickistic</div>
            <div className="form-controls">
              <div>
                <Input placeholder="Enter email" />
              </div>
              <div>
                <Input placeholder="Enter password" />
              </div>
            </div>
            <div className="submit">
              <Button
                block
                style={{
                  background: "#5AAC44",
                  color: "white",
                  fontWeight: "bold",
                  height: "35px",
                  borderRadius: "4px",
                }}
                onClick={authenticateUser}
              >
                Log In
              </Button>
            </div>
            <hr style={{ marginTop: "30px" }} />
            <div className="signup-route" style={{ marginTop: "30px" }}>
              New User? <span>Signup for an account</span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
