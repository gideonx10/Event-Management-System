import React from "react";
import Home3 from "./Hero";
const Home = () => {
  return (
    <div className="container mx-auto text-center py-16">
      <h1 className="text-4xl font-bold text-blue-700 mb-4">Welcome to Eventify</h1>
      <p className="text-gray-600 mb-2">
        Discover and book amazing events with ease. Join us to make your moments memorable!
      </p>
      {/* <button
        onClick={() => alert("Explore functionality coming soon!")}
        className="bg-yellow-500 text-white px-6 py-2 rounded-md hover:bg-yellow-600"
      >
        Explore Events
      </button> */}
      {/* <Home3/> */}
    </div>
  );
};

export default Home;
