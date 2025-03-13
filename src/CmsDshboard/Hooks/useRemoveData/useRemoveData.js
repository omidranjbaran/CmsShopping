import { useState } from "react";
import {ProductContext} from '../../Contexts/Contexts'
const useDeleteData = () => {

  const UseRemoveData = async (url) => {
    await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json", // Adjust content type if needed
      },
      // Add other options like body, credentials, etc., if necessary
    })
    .then(res => res.json())
    .then(data => console.log('success'));
  };

  return { UseRemoveData };
};

export default useDeleteData;
