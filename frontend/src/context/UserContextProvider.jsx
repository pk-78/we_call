import React, { useState } from "react";
import UserContext from "./UserContext";

export default function UserContextProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [notLoggedInPage, setNotLoggedInPage] = useState(false);
  const [userDetail, setUserDetail] = useState()
  const [id, setId]= useState(localStorage.getItem("id"))
  // const mongoId=localStorage.getItem("id")
  
  return (
    <UserContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, notLoggedInPage, setNotLoggedInPage, userDetail, setUserDetail, id }}
    >
      {children}
    </UserContext.Provider>
  );
}
