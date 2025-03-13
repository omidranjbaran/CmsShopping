import React, { useEffect,useContext, useState } from "react";
import {ProductContext} from '../../Contexts/Contexts'
export default function useGetData(url) {
  const [data, setData] = useState(null);
  const {value,setValue} = useContext(ProductContext);
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((datas) => {
        if (datas === null) {
          setData(0); // Set data to null if the fetched data is null
        } else {
          setData(Object.entries(datas)); // Otherwise, set the data
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error + 'problem is here');
        // Handle errors here
      });
  }, [data,value]);

  return { data,setData };
}
