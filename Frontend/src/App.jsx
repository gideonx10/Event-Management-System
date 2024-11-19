import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Home2 from "./pages/Home-before";
import Home3 from "./pages/Hero";
import Events from "./pages/Events";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Attendee from "./pages/Attendee";
import Admin from "./pages/Admin";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="bg-blue-50 min-h-screen flex flex-col justify-between">
        {/* <Home /> */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/login" element={<Login />} />
            <Route path="/attendee" element={<Attendee />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/signup" element={<Signup />} />

          </Routes>
        </main>
        <Home3/>
        {/* <Home/> */}
        {/* <Home2 /> */}
      </div>
      {/* <Home3 /> */}
      <Footer />
    </Router>
  );
};

export default App;
