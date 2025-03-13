import React, { useContext, useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import { deepPurple } from "@mui/material/colors";
import NotificationsIcon from "@mui/icons-material/Notifications";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { Container, Row, Col, Button, Toast } from "react-bootstrap";
import "./TopBar.css";
import { ProductContext } from "../../Contexts/Contexts";

export default function TopBar() {
  const { dark, setDark } = useContext(ProductContext);
  const [showNotif, setShowNotif] = useState(false);

  const handleDarkModeToggle = () => {
    const newBoolean = !dark;
    localStorage.setItem("dark", JSON.stringify(newBoolean));
    setDark((prev) => !prev);
  };

  return (
    <Container fluid className="main-container">
      <Row className={dark ? " divContainerDark" : "div_container"}>
        <Col xs={12} md={6}>
          <div className="divInfo">
            <div>
              <Avatar sx={{ bgcolor: deepPurple[500] }}>OP</Avatar>
            </div>
            <div className="divTP">
              <p>امید رنجبران</p>
              <p className="placeStyle">برنامه نویس فرانت اند </p>
            </div>
          </div>
        </Col>
        <Col xs={12} md={6}>
          <div className="divSearch">
            <input className="inputSearch" placeholder="جستجو کنید..." />
            <button className="buttonSearch">جستجو</button>
            <NotificationsIcon
              className="iconStyle"
              onClick={() => setShowNotif((prev) => !prev)}
            />
            <div className="divNotif">
              <Toast show={showNotif}>
                <Toast.Header
                  className="toastHeaderStyle"
                  closeButton={false}
                  onClick={() => setShowNotif(false)}
                >
                  نمایش پیغام ها
                  <button
                    type="button"
                    class="btn-close custom-btn-close"
                    aria-label="Close"
                    data-dismiss="toast"
                  ></button>
                </Toast.Header>
                <Toast.Body>خالی میباشد.</Toast.Body>
              </Toast>
            </div>

            <DarkModeIcon
              className="iconStyle"
              onClick={handleDarkModeToggle}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
}
