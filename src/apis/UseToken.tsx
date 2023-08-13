import { useState } from "react";

const useToken = () => {
  const getToken = () => {
    const tokenString = sessionStorage.getItem("token");
    if (tokenString) {
      const userToken = JSON.parse(tokenString);
      console.log("y a le token");
      console.log(userToken);
      return userToken;
    }
    return null;
  };

  const [token, setToken] = useState(getToken());
  const saveToken = (userToken: String) => {
    sessionStorage.setItem("token", JSON.stringify(userToken));
    setToken(userToken);
  };
  return {
    setToken: saveToken,
    token,
  };
};

export default useToken;
