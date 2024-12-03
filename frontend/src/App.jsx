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
import LiveWatch from "./pages/LiveRoom";
import PartyRoom from "./pages/PartyRoom";
import OfferPage from "./components/OfferPage";
import Live from "./components/Live";
import EditProfile from "./components/EditProfile";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [offerPage, setOfferPage] = useState(false);
  const [name, setName]= useState("")
 

  const coins = 200;
  return (
    <div>
      <Navbar name={name} />
      <Toaster />

      <Routes>
        <Route path="/" element={<Home coins={coins} />} />
        <Route path="/login" element={<Login setName={setName} />} />
        <Route path="/signup" element={<Signup />} />

        {/* Nested routes under AppLayout */}
        {/* <Route */}
        {/* // element={ */}
        {/* // <PrivateRoute isLoggedIn={isLoggedIn}> */}
        <Route path="/home/:id" element={<Home />} />
        <Route path="/golive/:id" element={<GoLive coins={coins} />} />
        <Route path="/party/:id" element={<Party coins={coins} />} />
        <Route path="/post/:id" element={<Post coins={coins} />} />
        <Route path="/setting/:id" element={<Setting coins={coins} />} />

        <Route path="/profile/:id" element={<OtherProfile coins={coins} />} />
        <Route path="/live-room/:id" element={<LiveWatch coins={coins} />} />
        <Route path="/party-room/:id" element={<PartyRoom coins={coins} />} />
        <Route path="/pricing/:id" element={<OfferPage coins={coins} />} />
        <Route path="/live/:id" element={<Live coins={coins} />} />
        <Route path="/editProfile/:id" element={<EditProfile coins={coins} />} />

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
