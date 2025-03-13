import React, { useEffect, useState, useContext } from "react";
import "./AddNewProduct.css";
import UsePostFormData from "../../Hooks/usePostFormData/usePostFormData";
import UseGetData from "../../Hooks/useGetData/useGetData";
import { ProductContext } from "../../Contexts/Contexts";
import { Form, Button, Col, Row } from "react-bootstrap";
import Toast from "react-bootstrap/Toast";
export default function AddNewProduct() {
  const [productName, setproductName] = useState(null);
  const [productPrice, setproductPrice] = useState(null);
  const [productQuantity, setproductQuantity] = useState(null);
  const [productImage, setproductImage] = useState(null);
  const [datas, setDatas] = useState();
  const { dark, setDark } = useContext(ProductContext);
  const { value, setValue } = useContext(ProductContext);
  const [statusNet, setStatusNet] = useState(null);

  const [messageProduct, setMessageProduct] = useState("");
  const [messagePrice, setMessagePrice] = useState("");
  const [messageQuantity, setMessageQuantity] = useState("");
  const [messageImage, setMessageImage] = useState("");

  const [clickAdd, setClickAdd] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!productName) {
      setMessageProduct(" مقدار باید وارد شود");
    }
    if (!productImage) {
      setMessageImage("عکس را وارد کنید");
    }
    if (!productPrice) {
      setMessagePrice(" مقدار باید وارد شود");
    } 
    if (!productQuantity) {
      setMessageQuantity(" مقدار باید وارد شود");
    } 
    if(productImage && productName && productPrice && productQuantity){
      const { postFormData } = UsePostFormData(
        "https://showtests-34c40-default-rtdb.firebaseio.com/products.json"
      );

      const formData = {
        productName,
        productPrice,
        productQuantity,
        productImage,
      };
      setValue((prev) => !prev);

      postFormData(formData)
        .then((ok) => {
          if (ok) {
            setStatusNet(true);
          }
        })
        .catch((error) => {
          console.error("Error:", error); // Log any errors that occur during the process
        });

      setproductName("");
      setproductPrice("");
      setproductQuantity("");
      setproductImage("");

      setTimeout(() => {
        setStatusNet(false);
      }, 2000);
    }
  };

  return (
    <div className={dark ? "maindivDark" : "main-div"}>
      <h1 className="titleAdd"> افزودن محصول جدید</h1>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col xs={12} md={6} className="mb-3">
            <Form.Control
              value={productName}
              onChange={(e) => {
                setMessageProduct('')
                setproductName(e.target.value);
              }}
              type="text"
              placeholder="اسم محصول را بنویسید"
            />
            <span>{messageProduct}</span>
            
          </Col>
          <Col xs={12} md={6} className="mb-3">
            <Form.Control
              value={productPrice}
              onChange={(e) => {
                setMessagePrice('')
                setproductPrice(e.target.value)
              }}
              type="text"
              placeholder="قیمت محصول را بنویسید"
            />
            <span>{messagePrice}</span>
          </Col>
          <Col xs={12} md={6} className="mb-3">
            <Form.Control
              value={productQuantity}
            
              onChange={(e) => {
                setMessageQuantity('')
                setproductQuantity(e.target.value)}}
              type="text"
              placeholder="موجودی محصوب را بنویسید"
            />
            <span>{messageQuantity}</span>
          </Col>
          <Col xs={12} md={6} className="mb-3">
            <Form.Control
              value={productImage}
              onChange={(e) => {
                setMessageImage("");
                setproductImage(e.target.value);
              }}
              type="file"
              placeholder="عکس محصول را آپلود کنید"
            />
            <span>{messageImage}</span>
          </Col>
        </Row>

        <Row className="mb-3 ">
          <Col xs={12} className="d-flex justify-content-end">
            <Button variant="light" type="submit" className="w-auto ">
              ثبت محصول
            </Button>
          </Col>
        </Row>
      </Form>

      {statusNet && (
        <Toast className="tostmainStyle">
          <Toast.Body className="toastBodyStyle">
            محصول جدید به لیست اضافه شد.
          </Toast.Body>
        </Toast>
      )}
    </div>
  );
}
