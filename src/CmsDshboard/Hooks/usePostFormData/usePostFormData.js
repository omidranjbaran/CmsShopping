export default function usePostFormData(url) {
    const postFormData = (formData) => {
      return new Promise((resolve, reject) => {
        fetch(url, {
          method: 'POST',
          body: JSON.stringify(formData),
        })
        .then(response => {
          if (response.ok) {
            resolve(response.ok); // Resolve with the boolean value (response.ok) if the request was successful
          } else {
            reject(new Error('Failed to post form data'));
          }
        })
        .catch(error => {
          reject(error); // Reject with an error if something goes wrong
        });
      });
    };
  
    return { postFormData };
  }
  