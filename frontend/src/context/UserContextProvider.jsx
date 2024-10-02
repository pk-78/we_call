import React, { useState } from "react";
import UserContext from "./UserContext";

export default function UserContextProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [notLoggedInPage, setNotLoggedInPage] = useState(false);
  return (
    <UserContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, notLoggedInPage, setNotLoggedInPage }}
    >
      {children}
    </UserContext.Provider>
  );
}
