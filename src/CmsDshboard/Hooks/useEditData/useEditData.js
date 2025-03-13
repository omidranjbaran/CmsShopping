import { useState } from 'react';

const UseEditData = () => {


  const EditData = async (url, newData) => {

      await fetch(url, {
        method: 'PUT', // Adjust the method as per your API requirements (PUT, PATCH, etc.)
        headers: {
          'Content-Type': 'application/json', // Adjust content type if needed
        },
        body: JSON.stringify(newData), // Replace newData with the updated data object
        // Add other options like credentials, headers, etc., if necessary
      });
  };

  return { EditData };
};

export default UseEditData;
