const express = require('express');
const router = express.Router();
const db = require('../config/db'); // MySQL connection

router.get('/', (req, res) => {
    db.query('SELECT * FROM Users', (err, results) => {
      if (err) {
        res.status(500).json({ error: 'Error fetching users' });
        console.error(err);
      } else {
        res.json(results);
      }
    });
  });

// Route for user signup
router.post('/', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Validate request body
    if (!name || !email || !password || !role) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    // Check if the role is valid
    if (!['attendee', 'organizer', 'admin'].includes(role)) {
      return res.status(400).json({ success: false, message: 'Invalid role specified.' });
    }

    // Check if the email already exists
    const checkUserQuery = `SELECT * FROM Users WHERE email = ?`;
    db.query(checkUserQuery, [email], (err, result) => {
      if (err) {
        console.error('Error checking user existence:', err);
        return res.status(500).json({ success: false, message: 'Database query error.' });
      }

      if (result.length > 0) {
        // User already exists
        return res.status(409).json({ success: false, message: 'Email is already registered!' });
      }

      // Insert new user into the database
      const insertUserQuery = `INSERT INTO Users (name, email, password, role) VALUES (?, ?, ?, ?)`;
      db.query(insertUserQuery, [name, email, password, role], (err) => {
        if (err) {
          console.error('Error inserting new user:', err);
          return res.status(500).json({ success: false, message: 'Database insertion error.' });
        }

        return res.status(201).json({ success: true, message: 'Signup successful!' });
      });
    });
  } catch (error) {
    console.error('Error in signup route:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

module.exports = router ;
