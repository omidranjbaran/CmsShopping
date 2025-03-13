import React, { useEffect, useContext, useState } from "react";
import useGetData from "../../../Hooks/useGetData/useGetData";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { Container, Row, Col } from "react-bootstrap";
import ModelBox from "../../ModelBox/ModelBox";
import { ProductContext } from "../../../Contexts/Contexts";
import "./ShowFetchDatas.css";
import SearchIcon from "@mui/icons-material/Search";
export default function ShowFetchUserDatas() {
  const { dark, setDark } = useContext(ProductContext);
  const [show, setShow] = useState(false);
  const [showModelEdit, setShowModelEdit] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const { value, setValue } = useContext(ProductContext);

  const [productName, setName] = useState("");
  const [productPrice, setPrice] = useState("");
  const [productQuantity, setQuantity] = useState("");
  const [productImage, setImage] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [fetchDatas, setFetchDatas] = useState(null);
  const [plainDtats, setPlainDatas] = useState("");
  const [messageConnection, setMessageConnection] = useState("");
  useEffect(() => {
    fetch("https://showtests-34c40-default-rtdb.firebaseio.com/products.json")
      .then((res) => res.json())
      .then((data) => {
        setFetchDatas(Object.entries(data));
        setPlainDatas(Object.entries(data));
      })
      .then(setMessageConnection("منتظر بمانید"))
      .catch((err) => setMessageConnection(" داده ای وجود ندارد"));
  }, [value, show, showModelEdit]);

  // console.log(data[1][1]);
  const handleDeleteShow = (id) => {
    setShow((prev) => !prev);
    setId(id);
    setTitle("عملیات حذف");
    setMessage("آیا از حذف این آیتم اطمینان دارید؟");
  };

  const handleEdit = (id) => {
    setShowModelEdit((prev) => !prev);
    setId(id);
    setTitle("عملیات ویرایش");
    setMessage("");
    const get_value = Object.fromEntries(fetchDatas);

    setName(get_value[id].productImage);
    setPrice(get_value[id].productPrice);
    setImage(get_value[id].productImage);
    setQuantity(get_value[id].productQuantity);
  };

  const handleInfo = (id) => {
    setShowInfo((prev) => !prev);
    const get_value = Object.fromEntries(fetchDatas);
    console.log();
    setName(get_value[id].productName);
    setPrice(get_value[id].productPrice);
    setQuantity(get_value[id].productQuantity);
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    const filteredWords = fetchDatas.filter((item) =>
      item[1].productName.toLowerCase().includes(searchTerm)
    );
    setPlainDatas(filteredWords);
  };

  return (
    <ProductContext.Provider
      value={{
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
      }}
    >
      <Container style={{ minHeight: "100vh" }}>
        <Row>
          <Col>
            {plainDtats ? (
              <>
                <div className="divSearchBar">
                  <input
                    type="text"
                    className="inputSearchFetch"
                    onChange={handleSearch}
                    placeholder="جستجو بر اساس نام"
                  />
                </div>

                <Table
                  striped
                  bordered
                  hover
                  size="lg"
                  className="tableStyle"
                  variant={dark ? "dark" : "light"}
                >
                  <thead>
                    <tr>
                      <th>عکس</th>
                      <th>اسم </th>
                      <th>قیمت </th>
                      <th> موجودی</th>
                      <th>عملیات</th>
                    </tr>
                  </thead>
                  <tbody className="trStyle">
                    {plainDtats
                      .slice()
                      .reverse()
                      .map((item, index) => (
                        <tr>
                          <td className="tdStyle">
                            <img
                              className="imgStyle"
                              src={`images/${
                                item[1].productImage &&
                                item[1].productImage.slice(12)
                              }`}
                              alt="photome"
                            />
                          </td>
                          <td className="tdStyle">{item[1].productName}</td>
                          <td className="tdStylesideButtons">
                            {item[1].productPrice}
                          </td>
                          <td className="tdStylesideButtons">
                            {item[1].productQuantity}
                          </td>
                          <td className="tdButtons">
                            <Button
                              onClick={() => {
                                console.log(item[0]);
                                handleInfo(item[0]);
                              }}
                              variant="primary"
                              className="buttonStyle"
                            >
                              جزییات
                            </Button>
                            <Button
                              variant="primary"
                              onClick={() => handleDeleteShow(item[0])}
                              className="buttonStyle"
                            >
                              حذف
                            </Button>
                            <Button
                              onClick={() => handleEdit(item[0])}
                              variant="primary"
                              className="buttonStyle"
                            >
                              ویرایش
                            </Button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </>
            ) : (
              <div className="messageConnection">
                <p className="pmessageConnection">{messageConnection}</p>
              </div>
            )}
          </Col>
        </Row>
        <ModelBox />
      </Container>
    </ProductContext.Provider>
  );
}
