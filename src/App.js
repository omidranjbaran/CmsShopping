import React, { useState } from "react";
import { useRoutes } from "react-router-dom";
import routes from "./CmsDshboard/routes";
import "./App.css";
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "./CmsDshboard/Components/SideBar/SideBar";
import TopBar from "./CmsDshboard/Components/TopBar/TopBar";
import { ProductContext } from "../src/CmsDshboard/Contexts/Contexts";

export default function App() {
  const routers = useRoutes(routes);
  const [dark, setDark] = useState(JSON.parse(localStorage.getItem('dark')));

  return (
    <ProductContext.Provider value={{ dark, setDark }}>
        <Container fluid dir="rtl"  style={ dark ? { backgroundColor:'#333333'} : {}}>
          <Row className="flex-row " >
            <Col xs={12}  lg={1}>
              <Sidebar  />
            </Col>
            <Col xs={12} lg={11} >
              <TopBar />

              {routers}
            </Col>
          </Row>
        </Container>

    </ProductContext.Provider>
  );
}
