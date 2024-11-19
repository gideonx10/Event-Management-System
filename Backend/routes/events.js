const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Fetch all events
router.get('/', (req, res) => {
  db.query('SELECT * FROM Events', (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Error fetching events' });
      console.error(err);
    } else {
      res.json(results);
    }
  });
});

module.exports = router;
