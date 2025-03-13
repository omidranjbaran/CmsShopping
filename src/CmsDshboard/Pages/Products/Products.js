import React, { useState, useContext } from "react";
import "./Products.css";
import AddNewProduct from "../../Components/AddNewProduct/AddNewProduct";
import ShowFetchDatas from "../../Components/ShowFetchDatas/ShowFetchProductDatas/ShowFetchDatas";
import { ProductContext } from "../../Contexts/Contexts";
export default function Products() {
  const [clickSubmit, setClickSubmit] = useState(false);

  const { dark, setDark } = useContext(ProductContext);

  return (
    <>
      <ProductContext.Provider
        value={{
          value: clickSubmit,
          setValue: setClickSubmit,
          dark,
          setDark,
        }}
      >
        <AddNewProduct />
        <ShowFetchDatas />
      </ProductContext.Provider>
    </>
  );
}
