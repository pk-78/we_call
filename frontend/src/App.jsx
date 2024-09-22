import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "./index.css";
import Home from "./pages/Home";
import Setting from "./pages/Setting";

import { Toaster } from "react-hot-toast";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
// import AppLayout from "./ui/AppLayout";
import Party from "./pages/Party";
import GoLive from "./pages/GoLive";
import Navbar from "./ui/Navbar";
import Footer from "./ui/Footer";

import { useState } from "react";
import PrivateRoute from "./ui/PrivateRoute";
import Message from "./components/Message";
import Post from "./pages/Post";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const coins = 200;
  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} setisLoggedin={setIsLoggedIn} />
      <Toaster />

      <Routes>
        <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/signup"
          element={<Signup setIsLoggedIn={setIsLoggedIn} />}
        />

        {/* Nested routes under AppLayout */}
        {/* <Route */}
        {/* // element={ */}
        {/* // <PrivateRoute isLoggedIn={isLoggedIn}> */}
        <Route path="/home" element={<Home coins={coins} />} />
        <Route path="/golive" element={<GoLive coins={coins} />} />
        <Route path="/party" element={<Party coins={coins} />} />
        <Route path="/post" element={<Post coins={coins} />} />
        <Route path="/setting" element={<Setting coins={coins} />} />
        {/* // </PrivateRoute>
          // } */}
        {/* /> */}
      </Routes>
      <Message />

      <Footer />
    </div>
  );
}

export default App;
