const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Fetch all users
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
router.post('/', async (req, res) => {
    try {
      const { role, email, password} = req.body;
  
      // Validate request body
      if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and password are required.' });
      }
  
      // Check if the user exists
      const checkUserQuery = `SELECT * FROM Users WHERE email = ?`;
      db.query(checkUserQuery, [email], async (err, result) => {
        if (err) {
          console.error('Error querying user:', err);
          return res.status(500).json({ success: false, message: 'Database query error.' });
        }
  
        if (result.length === 0) {
          // User does not exist
          return res.status(404).json({ success: false, message: 'User not found. Please sign up first!' });
        }
  
        const user = result[0];
  
        // Validate the password
        const passwordMatch = password==user.password ? 1:0;
        if (!passwordMatch) {
          return res.status(401).json({ success: false, message: 'Incorrect password.' });
        }

        // Validate the Role
        const roleMatch = (role==user.role) ? 1:0;
        if (!roleMatch) {
            return res.status(401).json({ success: false, message: 'Unauthorized access!' });
        }

  
        // Successful login
        return res.status(200).json({
          success: true,
          message: 'Login successful!',
          user: {
            user_id: user.user_id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
        });
      });
    } catch (error) {
      console.error('Error in login route:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  });

module.exports= router ;
