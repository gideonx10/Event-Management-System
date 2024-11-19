import React, { useEffect, useState } from 'react';

function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch('http://localhost:1252/events')
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <header className="text-center mb-10">
        <h1 className="text-5xl font-bold text-indigo-600">Our Events</h1>
        <p className="text-lg text-gray-700 mt-2">
          Explore and book your favorite events now!
        </p>
      </header>
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div key={event.id} className="bg-white rounded-lg shadow-md p-4">
            <img
              src={event.image_url}
              alt={event.name}
              className="rounded-lg w-full h-40 object-cover mb-4"
            />
            <h2 className="text-xl font-bold mb-2">{event.name}</h2>
            <p className="text-gray-700 mb-4">{event.description}</p>
            <p className="text-indigo-600 font-bold mb-2">${event.price}</p>
            <button className="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600">
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Events;
