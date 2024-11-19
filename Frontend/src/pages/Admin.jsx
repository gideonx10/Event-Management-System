// AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState(''); // String input
  const [description, setDescription] = useState(''); // String input
  const [date, setDate] = useState(''); // String input
  const [time, setTime] = useState(''); // String input
  const [venueId, setVenueId] = useState(0); // Number input (set to 0 or any valid initial value)
  const [attendees, setAttendees] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [organizerId, setOrganizerId] = useState(1); // Set a default organizer ID, or fetch from user session.

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:1252/events');
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const addEvent = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:1252/events', {
        title,
        description,
        date,
        time,
        venue_id: venueId,
        organizer_id: organizerId,
      });
      if (response.data.success) {
        alert('Event added successfully!');
        fetchEvents(); // Refresh the events list after adding a new event
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Failed to add event:', error);
      alert('Error adding event.');
    }
  };

  const removeEvent = async (eventId) => {
    try {
      await axios.delete(`http://localhost:1252/events/${eventId}`);
      fetchEvents();
    } catch (error) {
      console.error('Error removing event:', error);
    }
  };

  const viewAttendees = async (eventId) => {
    try {
      const response = await axios.get(`http://localhost:1252/events/${eventId}/attendees`);
      setAttendees(response.data);
      setSelectedEventId(eventId);
    } catch (error) {
      console.error('Error fetching attendees:', error);
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-blue-500 to-blue-700 text-black min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      {/* Add Event Form */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Add Event</h2>
        <form onSubmit={addEvent}>
          <input
            type="text"
            placeholder="Title"
            className="p-2 rounded border mb-2 w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Description"
            className="p-2 rounded border mb-2 w-full"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="date"
            className="p-2 rounded border mb-2 w-full"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <input
            type="time"
            className="p-2 rounded border mb-2 w-full"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Venue ID"
            className="p-2 rounded border mb-2 w-full"
            value={venueId}
            onChange={(e) => setVenueId(Number(e.target.value))}
          />
          <button type="submit" className="bg-yellow-500 px-4 py-2 rounded hover:bg-yellow-400">
            Add Event
          </button>
        </form>
      </div>

      {/* View Events */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Existing Events</h2>
        <ul>
          {events.map((event) => (
            <li key={event.event_id} className="mb-2">
              {event.title} - {event.date}
              <button onClick={() => removeEvent(event.event_id)} className="ml-4 bg-red-500 px-2 py-1 rounded text-white">
                Remove
              </button>
              <button onClick={() => viewAttendees(event.event_id)} className="ml-4 bg-green-500 px-2 py-1 rounded text-white">
                View Attendees
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
