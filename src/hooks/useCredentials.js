import { useEffect, useState } from "react";

function useCredentials() {
  const [credentials, setCredentials] = useState(null);
  useEffect(() => {
    const jwt = localStorage.getItem("JWT");
    if (jwt === null) {
      setCredentials(null);
    } else {
      const requestOptions = {
        method: "GET",
        headers: { Authorization: `JWT ${jwt}` },
      };
      fetch("/findUser", requestOptions)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setCredentials(data.credentials);
        });
    }
  });
  return credentials;
}

export default useCredentials;
