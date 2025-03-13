import React, { useState, useContext, useEffect, useLayoutEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Table from 'react-bootstrap/Table';
import {ProductContext} from '../../../Contexts/Contexts'
import "./ModelBoxUser.css";

import useGetData from '../../../Hooks/useGetData/useGetData'
import useDeleteData from "../../../Hooks/useRemoveData/useRemoveData"
import { Col, Row } from "react-bootstrap";
import UseEditData from "../../../Hooks/useEditData/useEditData";

export default function ModelBoxUser() {

  const { UseRemoveData } = useDeleteData();
  const  {EditData} = UseEditData()
  //Get Contexts Info
  const {
    username,
    email,
    phone,
    site,
    setUsername,
    setEmail,
    setPhone,
    setSite,
    show,
    setShow,
    id,
    title,
    message,
    showModelEdit,
    setShowModelEdit,
    showInfo,
    setShowInfo,
  } = useContext(ProductContext);


  const { data } = useGetData(
    `https://showtests-34c40-default-rtdb.firebaseio.com/products/${id}.json`
  );


  const handleClose = () => {
    setShow(false);
    setShowModelEdit(false);
    setShowInfo(false);

  };



  const handleDelete = async () => {
    await UseRemoveData(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );

    setShow(false);
    console.log(id);
  };

  //Handle Edit Function
  const handleEdit = async () => {
    const newData = {
      username,
      email,
      phone,
      site,
    };
 

    await EditData(
      `https://jsonplaceholder.typicode.com/users/${id}`,
      newData
    );
    setShowModelEdit(false);
  };

  return (
    <>
      {/* Delete Section */}
      <Modal show={show} className="Model">
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            بستن
          </Button>
          <Button variant="primary" onClick={handleDelete} >
            تایید
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Section */}
      <Modal
        show={showModelEdit}
        onHide={handleClose}
        style={{ direction: "rtl" }}
        className="Model"
      >
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col xs={12} md={6} className="mb-3">
                <Form.Control
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  placeholder="نام کاربری"
                />
              </Col>
              <Col xs={12} md={6} className="mb-3">
                <Form.Control
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  value={email}
                  placeholder="ایمیل"
                />
              </Col>
              <Col xs={12} md={6} className="mb-3">
                <Form.Control
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type="text"
                  placeholder=" شماره تلفن"
                />
              </Col>
              <Col xs={12} md={6} className="mb-3">
                <Form.Control
                value={site}
                  onChange={(e) => setSite(e.target.value)}
                  placeholder="آدرس سایت"
                />
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            بستن
          </Button>
          <Button variant="primary" onClick={handleEdit} >
            اعمال تغییرات
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Show Info About Product */}

      <Modal show={showInfo} size="lg" style={{ direction: "rtl",  }}  className="Model">
        <Modal.Header>
          <Modal.Title>جزییات</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bodyStyle">
          <Table striped bordered hover variant="info"  className="TableStyle" >
            <thead>
              <tr>
                <th>نام کاربری</th>
                <th>ایمیل</th>
                <th>شماره تلفن</th>
                <th>سایت</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{username}</td>
                <td>{email}</td>
                <td >{phone}</td>
                <td>{site}</td>
              </tr>
              
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            بستن
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

