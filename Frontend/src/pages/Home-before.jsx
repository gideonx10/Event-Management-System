import React from 'react';

function Home1() {
  return (
    <div className="bg-gradient-to-b from-indigo-500 via-purple-600 to-pink-500 min-h-screen text-white">
      <header className="text-center py-20">
        <h1 className="text-6xl font-extrabold mb-4">Welcome to Eventify</h1>
        <p className="text-2xl">Your one-stop solution for event management</p>
      </header>
      <section className="py-10 px-4">
        <h2 className="text-center text-4xl font-bold mb-6">Why Choose Us?</h2>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white text-black p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Easy Booking</h3>
            <p>Book events with a single click and enjoy a seamless experience.</p>
          </div>
          <div className="bg-white text-black p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Wide Variety</h3>
            <p>Choose from a wide variety of events tailored to your interests.</p>
          </div>
          <div className="bg-white text-black p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Reliable Services</h3>
            <p>We ensure high-quality services to make your events memorable.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home1;
