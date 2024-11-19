import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-700 text-white px-4 py-3 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <Link to="/">Eventify</Link>
        </h1>
        <div className="space-x-4">
          <Link to="/" className="hover:underline mx-2">Home</Link>
          <Link to="/events" className="hover:underline mx-2">Events</Link>
          <Link to="/login" className="hover:underline mx-2">Login</Link>
          {/* <Link to="/signup" className="hover:underline mx-2">Signup</Link> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
