const express = require('express');
const cors = require('cors');
require('dotenv').config();

const db = require('./config/db');
const eventsRouter = require('./routes/events');
const signupRoutes = require('./routes/signupRoutes');
const loginRoutes = require('./routes/loginRoutes');
const adminRoutes = require('./routes/adminRoutes');
const attendeeRoutes = require('./routes/attendeeRoutes');

const app = express();
const PORT = process.env.PORT || 1252;

app.use(cors());
app.use(express.json());

// app.use(bodyParser.json()); // something new when login routes added

app.use(express.urlencoded({ extended: true }));
app.use('/events', eventsRouter);
app.use('/signup', signupRoutes);
app.use('/login', loginRoutes);
app.use('/admin', adminRoutes);
app.use('/attendee', attendeeRoutes);


app.get('/', (req, res) => {
  res.send('Event Management System Backend');
});

app.get('/test-db', (req, res) => {
  db.query('SELECT 1 + 1 AS solution', (err, results) => {
    if (err) {
      res.status(500).send('Error connecting to the database');
      console.error(err);
    } else {
      res.send(`Database connection successful! Result: ${results[0].solution}`);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
