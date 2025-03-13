import React, { useState, useContext, useEffect, useLayoutEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Table from 'react-bootstrap/Table';
import { ProductContext } from "../../Contexts/Contexts";
import "./model.css";
import useDeleteData from "../../Hooks/useRemoveData/useRemoveData";
import useGetData from "../../Hooks/useGetData/useGetData"
import UseEditData from "../../Hooks/useEditData/useEditData";
import { Col, Row } from "react-bootstrap";

export default function ModelBox() {
  const [objectFromEntries, setobjectFromEntries] = useState("");
  
  //Get Contexts Info
  const {
    productName,
    productPrice,
    productQuantity,
    productImage,
    setName,
    setPrice,
    setQuantity,
    setImage,
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

  // uses Customs Hooks
  const { UseRemoveData } = useDeleteData();
  const { EditData } = UseEditData();

  const { data } = useGetData(
    `https://showtests-34c40-default-rtdb.firebaseio.com/products/${id}.json`
  );

  // useEffect(() => {
  //   if (data && Array.isArray(data) && data.length > 0) {
  //     // Assuming data is an array of key-value pairs
  //     const objectFromEntrie = Object.fromEntries(data);
  //     setobjectFromEntries(objectFromEntrie);
  //     // // Access properties from the object
  //     setName(objectFromEntries.productName);
  //     setPrice(objectFromEntries.productPrice);
  //     setImage(objectFromEntries.productImage);
  //     setQuantity(objectFromEntries.productQuantity);
  //   }
  // }, []);

  const handleClose = () => {
    setShow(false);
    setShowModelEdit(false);
    setShowInfo(false);
    

  };

  const handleDelete = async () => {
    await UseRemoveData(
      `https://showtests-34c40-default-rtdb.firebaseio.com/products/${id}.json`
    );
    setShow((prev) => !prev);
  };

  //Handle Edit Function
  const handleEdit = async () => {
    const newData = {
      productName,
      productPrice,
      productQuantity,
      productImage,
    };

    await EditData(
      `https://showtests-34c40-default-rtdb.firebaseio.com/products/${id}.json`,
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
          <Button variant="primary" onClick={handleDelete}>
            تایید
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Section */}
      <Modal
        show={showModelEdit}
        onHide={handleClose}
        style={{ direction: "rtl" }}
      >
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col xs={12} md={6} className="mb-3">
                <Form.Control
                  value={productName}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                />
              </Col>
              <Col xs={12} md={6} className="mb-3">
                <Form.Control
                  onChange={(e) => setPrice(e.target.value)}
                  type="text"
                  value={productPrice}
                  placeholder="قیمت محصول را بنویسید"
                />
              </Col>
              <Col xs={12} md={6} className="mb-3">
                <Form.Control
                  value={productQuantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  type="text"
                  placeholder="موجودی محصوب را بنویسید"
                />
              </Col>
              <Col xs={12} md={6} className="mb-3">
                <Form.Control
                  onChange={(e) => setImage(e.target.value)}
                  type="file"
                  placeholder="عکس محصول را آپلود کنید"
                />
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            بستن
          </Button>
          <Button variant="primary" onClick={handleEdit}>
            اعمال تغییرات
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Show Info About Product */}

      <Modal show={showInfo} style={{ direction: "rtl"  }}>
        <Modal.Header>
          <Modal.Title>جزییات</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover variant="info" style={{textAlign:"center"}}>
            <thead>
              <tr>
                <th>اسم</th>
                <th>قیمت</th>
                <th>موجودی</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{productName}</td>
                <td>{productPrice}</td>
                <td>{productQuantity}</td>
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

