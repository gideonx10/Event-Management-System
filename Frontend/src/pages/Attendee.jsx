// AttendeeDashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Attendee = () => {
  const [events, setEvents] = useState([]);
  const [bookedEvents, setBookedEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
    fetchBookedEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:1252/events');
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const fetchBookedEvents = async () => {
    try {
      const response = await axios.get('http://localhost:1252/attendee/bookings');
      setBookedEvents(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const bookEvent = async (eventId) => {
    try {
      await axios.post(`http://localhost:1252/attendee/book/${eventId}`);
      fetchBookedEvents(); // Refresh bookings
    } catch (error) {
      console.error('Error booking event:', error);
    }
  };

  const cancelBooking = async (eventId) => {
    try {
      await axios.delete(`http://localhost:1252/attendee/book/${eventId}`);
      fetchBookedEvents(); // Refresh bookings
    } catch (error) {
      console.error('Error cancelling booking:', error);
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-blue-500 to-blue-700 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Attendee Dashboard</h1>

      {/* Available Events */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Available Events</h2>
        <ul>
          {events.map((event) => (
            <li key={event.event_id} className="mb-2">
              <span>{event.title} - {event.date}</span>
              <button
                onClick={() => bookEvent(event.event_id)}
                className="ml-4 bg-yellow-500 px-2 py-1 rounded hover:bg-yellow-400"
              >
                Book
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Booked Events */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Your Booked Events</h2>
        <ul>
          {bookedEvents.map((event) => (
            <li key={event.event_id} className="mb-2">
              <span>{event.title} - {event.date}</span>
              <button
                onClick={() => cancelBooking(event.event_id)}
                className="ml-4 bg-red-500 px-2 py-1 rounded hover:bg-red-400"
              >
                Cancel
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Attendee;
