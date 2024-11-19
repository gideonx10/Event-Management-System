const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/', (req, res) => {
    db.query('SELECT * FROM Bookings', (err, results) => {
      if (err) {
        res.status(500).json({ error: 'Error fetching bookings' });
        console.error(err);
      } else {
        res.json(results);
      }
    });
  });

// Route to book an event
router.post('/', async (req, res) => {
  const { eventId } = req.params;
  try {
    // Check if the attendee already has a confirmed booking for the event
    const [existingBooking] = await db.query(
      `SELECT * FROM Bookings WHERE user_id = ? AND event_id = ? AND status = 'confirmed'`,
      [req.user.user_id, eventId]
    );

    if (existingBooking.length > 0) {
      return res.status(400).json({ error: 'You have already booked this event.' });
    }

    await db.query(
      'INSERT INTO Bookings (user_id, event_id, status) VALUES (?, ?, ?)',
      [req.user.user_id, eventId, 'confirmed']
    );
    res.status(201).json({ message: 'Event booked successfully' });
  } catch (error) {
    console.error('Error booking event:', error);
    res.status(500).json({ error: 'Failed to book event' });
  }
});

// Route to cancel a booking
router.put('/', async (req, res) => {
  const { eventId } = req.params;
  try {
    const [booking] = await db.query(
      `UPDATE Bookings SET status = 'cancelled' 
       WHERE user_id = ? AND event_id = ? AND status = 'confirmed'`,
      [req.user.user_id, eventId]
    );

    if (booking.affectedRows === 0) {
      return res.status(404).json({ error: 'No confirmed booking found to cancel.' });
    }

    res.status(200).json({ message: 'Booking canceled successfully' });
  } catch (error) {
    console.error('Error canceling booking:', error);
    res.status(500).json({ error: 'Failed to cancel booking' });
  }
});

// Route to view all booked events by the attendee
router.get('/', async (req, res) => {
  try {
    const [bookedEvents] = await db.query(
      `SELECT Events.event_id, Events.title, Events.date, Events.time, Events.description, Bookings.status, Bookings.booking_date 
       FROM Bookings 
       JOIN Events ON Bookings.event_id = Events.event_id 
       WHERE Bookings.user_id = ?`,
      [req.user.user_id]
    );
    res.status(200).json(bookedEvents);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

module.exports =router ;
