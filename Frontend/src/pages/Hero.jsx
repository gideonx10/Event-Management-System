import React from 'react';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-r from-purple-500 to-blue-500 h-screen flex items-center justify-center text-white text-center">
      <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{ backgroundImage: '/public/events-background.jpg' }}></div>
      <div className="relative z-10">
        <h1 className="text-5xl font-bold leading-tight mb-4">Discover the Best Events Near You</h1>
        <p className="text-lg mb-6">Find events that match your passion and make memories that last.</p>
        <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-md text-xl">Explore Events</button>
      </div>
    </section>
  );
};

export default HeroSection;
