import React, { useState } from "react";
import UserContext from "./UserContext";

export default function UserContextProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [notLoggedInPage, setNotLoggedInPage] = useState(false);
  const [userDetail, setUserDetail] = useState()
  return (
    <UserContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, notLoggedInPage, setNotLoggedInPage, userDetail, setUserDetail }}
    >
      {children}
    </UserContext.Provider>
  );
}
