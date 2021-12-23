import React, { useState, createContext } from "react";

export const AuthenticationContext = createContext();

export const AuthenticationProvider = (props) => {
  const [status, setStatus] = useState({
    isLoggedIn: localStorage.getItem("isLoggedIn"),
    username: localStorage.getItem("username"),
  });

  return (
    <AuthenticationContext.Provider value={[status, setStatus]}>
      {props.children}
    </AuthenticationContext.Provider>
  );
};
