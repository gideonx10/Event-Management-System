const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Fetch all events
router.get('/events', (req, res) => {
  db.query('SELECT * FROM Events', (err, results) => {
    if (err) {
      console.error('Error fetching events:', err);
      console.log('Error fetching events:', err);
      res.status(500).json({ error: 'Database error' });
    } else {
      res.json(results);
    }
  });
});

// Add a new event
router.post('/events', (req, res) => {
  const { title, description, date, time, venue_id, organizer_id } = req.body;

  if (!title || !date || !time || !organizer_id) {
    return res.status(400).json({ success: false, message: 'Required fields missing' });
  }

  const query = `
    INSERT INTO Events (title, description, date, time, venue_id, organizer_id)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  db.query(query, [title, description, date, time, venue_id, organizer_id], (err) => {
    if (err) {
      console.error('Error inserting event:', err);
      return res.status(500).json({ success: false, message: 'Error adding event' });
    }
    res.status(201).json({ success: true, message: 'Event added successfully' });
  });
});

// Delete event
router.delete('/events/:eventId', (req, res) => {
  const { eventId } = req.params;
  db.query('DELETE FROM Events WHERE event_id = ?', [eventId], (err) => {
    if (err) {
      console.error('Error deleting event:', err);
      res.status(500).json({ error: 'Failed to delete event' });
    } else {
      res.json({ message: 'Event removed successfully' });
    }
  });
});

// View attendees
router.get('/api/events/:eventId/attendees', (req, res) => {
  const { eventId } = req.params;
  db.query(`
    SELECT Users.user_id, Users.name, Users.email 
    FROM Bookings 
    JOIN Users ON Bookings.user_id = Users.user_id 
    WHERE Bookings.event_id = ?
  `, [eventId], (err, results) => {
    if (err) {
      console.error('Error fetching attendees:', err);
      res.status(500).json({ error: 'Error fetching attendees' });
    } else {
      res.json(results);
    }
  });
});

module.exports = router;
