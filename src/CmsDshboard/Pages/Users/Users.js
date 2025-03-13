import React, { useContext, useState } from "react";
import "./Users.css";
import { ProductContext } from "../../Contexts/Contexts";
import ShowFetchUserDatas from "../../Components/ShowFetchDatas/ShowFetchUserDatas/ShowFetchUserDatas";
export default function Users() {
  const [clickSubmit, setClickSubmit] = useState(false);
  const { dark, setDark } = useContext(ProductContext);
  return (
    <>
      <ProductContext.Provider
        value={{ value: clickSubmit, setValue: setClickSubmit, dark, setDark }}
      >
        <ShowFetchUserDatas />
      </ProductContext.Provider>
    </>
  );
}
