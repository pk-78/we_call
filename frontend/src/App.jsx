import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
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
import OtherProfile from "./components/OtherProfile";
// import LiveWatch from "./pages/LiveRoom";
import PartyRoom from "./pages/PartyRoom";
import OfferPage from "./components/OfferPage";
import Live from "./components/Live";
import EditProfile from "./components/EditProfile";
import LiveRoom from "./pages/LiveRoom";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [offerPage, setOfferPage] = useState(false);
  const [name, setName] = useState("");

  const coins = 200;
  return (
    <div>
      <Navbar name={name} />
      <Toaster />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setName={setName} />} />
        <Route path="/signup" element={<Signup />} />

        {/* Nested routes under AppLayout */}
        {/* <Route */}
        {/* // element={ */}
        {/* // <PrivateRoute isLoggedIn={isLoggedIn}> */}
        <Route path="/home" element={<Home />} />
        <Route path="/golive" element={<GoLive />} />
        <Route path="/party" element={<Party />} />
        <Route path="/post" element={<Post />} />
        <Route path="/setting" element={<Setting />} />

        <Route path="/profile/:id" element={<OtherProfile />} />
        <Route path="/live-room/:id" element={<LiveRoom />} />
        <Route path="/party-room" element={<PartyRoom />} />
        <Route path="/pricing" element={<OfferPage />} />
        <Route path="/live" element={<Live />} />
        <Route path="/editProfile" element={<EditProfile />} />

        {/* // </PrivateRoute>
          // } */}
        {/* /> */}
      </Routes>

      {/* <Message /> */}

      <Footer />
    </div>
  );
}

export default App;
