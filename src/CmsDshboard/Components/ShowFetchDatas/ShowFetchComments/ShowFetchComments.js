import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Table, Button, Modal } from "react-bootstrap";
import datas from "../../../DatasComment";
import { ProductContext } from "../../../Contexts/Contexts";
import "./ShowFetchComments.css";
export default function ShowFetchComments() {
  const { dark, setDark } = useContext(ProductContext);
  const [showModelCommnet, setShowModelCommnet] = useState(false);
  const [comment, setComment] = useState("");
  const [plainDtats, setPlainDatas] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setPlainDatas(datas);
  }, []);

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    const filteredWords = datas.filter((item) =>
      item.userName.toLowerCase().includes(searchTerm)
    );
    setPlainDatas(filteredWords);
  };

  return (
    <Container style={{ height: "100vh " }}>
      <Row>
        <Col>
          <div className="divSearchBar">
            <input
              type="text"
              className="inputSearchFetch"
              onChange={handleSearch}
              placeholder="جستجو بر اساس نام"
            />
          </div>
          {plainDtats ? (
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
                  <th>محصول </th>
                  <th>کامنت </th>
                  <th> تاریخ</th>
                  <th>ساعت</th>
                  <th>عملیات</th>
                </tr>
              </thead>

              <tbody className="trStyle">
                {plainDtats
                  .slice()
                  .reverse()
                  .map((item, index) => (
                    <tr>
                      <td>{item.userName}</td>
                      <td>{item.product}</td>
                      {/* Comment Show Button */}
                      <td>
                        <Button
                          variant="primary"
                          onClick={() => {
                            setComment(item.Comment);
                            setShowModelCommnet((prev) => !prev);
                          }}
                          className="buttonStyle"
                        >
                          مشاهده کامنت
                        </Button>
                        <Modal
                          size="md"
                          show={showModelCommnet}
                          style={{ direction: "rtl", marginTop: "8%" }}
                        >
                          <Modal.Body>{comment}</Modal.Body>
                          <Modal.Footer>
                            <Button
                              variant="secondary"
                              onClick={() => setShowModelCommnet(false)}
                            >
                              بستن
                            </Button>
                          </Modal.Footer>
                        </Modal>
                      </td>
                      <td>{item.date}</td>
                      <td>{item.hour}</td>
                      <td>
                        {/* delete section Button */}
                        <Button
                          variant="primary"
                          //   onClick={() => handleDeleteShow(item[0])}
                          className="buttonStyle"
                        >
                          حذف
                        </Button>

                        {/* Edit section Button */}
                        <Button
                          // onClick={() => handleEdit(item[0])}
                          variant="primary"
                          className="buttonStyle"
                        >
                          ویرایش
                        </Button>

                        {/* Answer section Button */}
                        <Button
                          // onClick={() => handleEdit(item[0])}
                          variant="primary"
                          className="buttonStyle"
                        >
                          پاسخ
                        </Button>

                        {/* Confirm section Button */}
                        <Button
                          // onClick={() => handleEdit(item[0])}
                          variant="primary"
                          className="buttonStyle"
                        >
                          تایید
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          ) : (
            <p>منتظر بمانید</p>
          )}
        </Col>
      </Row>
    </Container>
  );
}
