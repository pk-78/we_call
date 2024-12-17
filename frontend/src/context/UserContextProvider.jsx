import React, { useEffect, useState } from "react";
import UserContext from "./UserContext";
import axios from "axios";
import { url } from "../url/url";

export default function UserContextProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [notLoggedInPage, setNotLoggedInPage] = useState(false);
  const [userDetail, setUserDetail] = useState();
  const [id, setId] = useState(localStorage.getItem("id"));
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const token = useState(localStorage.getItem("token"));
  // console.log(token[0])

  useEffect(() => {
    if (token[0]) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [token[0]]);
  useEffect(() => {
    const fetchUserDetail = async () => {
      try {
        const response = await axios.get(`${url}/api/user/getuser/${id}`);
        // console.log(response?.data?.user);
        const city = response?.data?.user?.location?.city;
        const state = response?.data?.user?.location?.state;
        setCity(city);
        setState(state);
      } catch (error) {
        console.log(error);
      }
    };
    if (id) {
      fetchUserDetail();
    }
  }, [id]);
  // const mongoId=localStorage.getItem("id")

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        notLoggedInPage,
        setNotLoggedInPage,
        userDetail,
        setUserDetail,
        id,
        city,
        state,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
