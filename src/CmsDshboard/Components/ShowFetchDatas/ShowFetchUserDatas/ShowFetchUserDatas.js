import React, { useEffect, useContext, useState } from "react";
import useGetData from "../../../Hooks/useGetData/useGetData";
import Button from "react-bootstrap/Button";
import "./ShowFetchUserDatas.css";
import Table from "react-bootstrap/Table";
import { Container, Row, Col } from "react-bootstrap";
import ModelBoxUser from "../../ModelBox/ModelBoxUser/ModelBoxUser";
import { ProductContext } from "../../../Contexts/Contexts";
export default function ShowFetchUserDatas() {
  const { dark, setDark } = useContext(ProductContext);
  const [show, setShow] = useState(false);
  const [showModelEdit, setShowModelEdit] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [site, setSite] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [fetchDatas, setFetchDatas] = useState(null);
  const [plainDtats, setPlainDatas] = useState("");
  const [messageConnection, setMessageConnection] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setFetchDatas(Object.entries(data));
        setPlainDatas(Object.entries(data));
      })
      .then(setMessageConnection("منتظر بمانید"))
      .catch((err) => setMessageConnection(" داده ای وجود ندارد"));
  }, [show, showModelEdit]);

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

    setUsername(get_value[id].name);
    setEmail(get_value[id].email);
    setPhone(get_value[id].phone);
    setSite(get_value[id].website);
  };

  const handleInfo = (id) => {
    setShowInfo((prev) => !prev);
    const get_value = Object.fromEntries(fetchDatas);
    setUsername(get_value[id].name);
    setEmail(get_value[id].email);
    setPhone(get_value[id].phone);
    setSite(get_value[id].website);
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();

    setSearchTerm(searchTerm);

    const filteredWords = fetchDatas.filter((item) =>
      item[1].name.toLowerCase().includes(searchTerm)
    );
    setPlainDatas(filteredWords);
  };

  return (
    <ProductContext.Provider
      value={{
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
      }}
    >
      <Container style={{ height: "100vh " }}>
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
                  className="tableStyle"
                  variant={dark ? "dark" : "light"}
                >
                  <thead>
                    <tr>
                      <th>نام کاربری</th>
                      <th>ایمیل </th>
                      <th>شماره تفن</th>
                      <th>آدرس سایت</th>
                      <th>عملیات</th>
                    </tr>
                  </thead>
                  <tbody className="trStyle">
                    {plainDtats
                      .slice()
                      .reverse()
                      .map((item, index) => (
                        <tr key={item.id}>
                          <td className="tdStyle">{item[1].name}</td>
                          <td className="tdStyle">{item[1].email}</td>
                          <td className="tdStylesideButtons">
                            {item[1].phone}
                          </td>
                          <td className="tdStylesideButtons">
                            {item[1].website}
                          </td>
                          <td style={{ width: "400px" }}>
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
        <ModelBoxUser />
      </Container>
    </ProductContext.Provider>
  );
}
