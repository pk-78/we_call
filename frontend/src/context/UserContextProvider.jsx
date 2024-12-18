import React, { useEffect, useState } from "react";
import UserContext from "./UserContext";
import axios from "axios";
import { url } from "../url/url";

export default function UserContextProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [notLoggedInPage, setNotLoggedInPage] = useState(false);
  const [userDetail, setUserDetail] = useState();
  const [id, setId] = useState(localStorage.getItem("id"));  //ye maine pta nhi kyu likha h, hasi aarhi h dekh kr
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [tag, setTag]= useState(null)
  const [followingList, setFollowingList]= useState([])
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
        const user =response?.data?.user
        const tag=response?.data?.user?.tags
        const following= response?.data?.user?.otherProfile?.following
        setCity(city);
        setState(state);
        setUserDetail(user)
        setTag(tag)
        setFollowingList(following)
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
        tag,
        followingList
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
