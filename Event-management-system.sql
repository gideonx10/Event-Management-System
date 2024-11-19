CREATE DATABASE EventManagement; 
USE EventManagement;

CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('attendee', 'organizer', 'admin') NOT NULL
);

CREATE TABLE Venues (
    venue_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    location TEXT NOT NULL,
    capacity INT NOT NULL
);

CREATE TABLE Events (
    event_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    date DATE NOT NULL,
    time TIME NOT NULL,
    venue_id INT,
    organizer_id INT NOT NULL,
    FOREIGN KEY (venue_id) REFERENCES Venues(venue_id),
    FOREIGN KEY (organizer_id) REFERENCES Users(user_id)
);

CREATE TABLE Bookings (
    booking_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    event_id INT NOT NULL,
    status ENUM('confirmed', 'cancelled') DEFAULT 'confirmed',
    booking_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (event_id) REFERENCES Events(event_id)
);

CREATE TABLE Payments (
    payment_id INT AUTO_INCREMENT PRIMARY KEY,
    booking_id INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    status ENUM('paid', 'pending', 'failed') DEFAULT 'pending',
    payment_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (booking_id) REFERENCES Bookings(booking_id)
);

INSERT INTO Users (name, email, password, role) VALUES
('Alice Johnson', 'alice@example.com', 'password123', 'attendee'),
('Bob Smith', 'bob@example.com', 'password456', 'organizer'),
('Carol Adams', 'carol@example.com', 'password789', 'admin');

SELECT * FROM Users;

INSERT INTO Venues (name, location, capacity) VALUES
('Main Auditorium', '123 Event Street', 200),
('Conference Hall A', '456 Venue Lane', 100),
('Outdoor Lawn', '789 Park Avenue', 300);

SELECT * FROM Venues;

INSERT INTO Events (title, description, date, time, venue_id, organizer_id) VALUES
('Tech Conference 2024', 'A conference on emerging technologies.', '2024-12-15', '10:00:00', 1, 2),
('Startup Pitch Fest', 'Pitch your startup idea to investors.', '2024-11-20', '14:00:00', 2, 2),
('Music Concert', 'Live music performance by popular artists.', '2024-11-25', '18:00:00', 3, 2);

SELECT * FROM Events;

INSERT INTO Bookings (user_id, event_id, status, booking_date) VALUES
(1, 1, 'confirmed', '2024-11-01 10:30:00'),
(1, 3, 'confirmed', '2024-11-02 12:00:00'),
(3, 2, 'cancelled', '2024-11-03 16:15:00');

SELECT * FROM Bookings;

INSERT INTO Payments (booking_id, amount, status, payment_date) VALUES
(1, 500.00, 'paid', '2024-11-01 10:35:00'),
(2, 300.00, 'pending', '2024-11-02 12:05:00'),
(3, 200.00, 'failed', '2024-11-03 16:20:00');

SELECT * FROM Payments;

-- Views-- 
CREATE VIEW ActiveEvents AS
SELECT 
    event_id, 
    title, 
    description, 
    date, 
    time, 
    venue_id 
FROM Events
WHERE date >= CURDATE();
SELECT * FROM ActiveEvents;

CREATE VIEW PastEvents AS
SELECT 
    event_id, 
    title, 
    description, 
    date, 
    time, 
    venue_id 
FROM Events
WHERE date <= CURDATE();
SELECT * FROM PastEvents;

CREATE VIEW UserBookings AS
SELECT 
    u.user_id, 
    u.name AS user_name, 
    e.event_id, 
    e.title AS event_title, 
    b.booking_id, 
    b.status AS booking_status, 
    b.booking_date 
FROM Users u
JOIN Bookings b ON u.user_id = b.user_id
JOIN Events e ON b.event_id = e.event_id;
SELECT * FROM UserBookings;

-- Procedure - Cancel a booking-- 
DELIMITER $$
CREATE PROCEDURE CancelBooking (
    IN p_booking_id INT
)
BEGIN
    UPDATE Bookings
    SET status = 'cancelled'
    WHERE booking_id = p_booking_id;
END $$
DELIMITER ;
CALL CancelBooking(2);
SELECT * FROM Bookings WHERE booking_id = 2;

-- Procedure - Add a new event
DELIMITER $$
CREATE PROCEDURE AddEvent (
    IN p_title VARCHAR(200),
    IN p_description TEXT,
    IN p_date DATE,
    IN p_time TIME,
    IN p_venue_id INT,
    IN p_organizer_id INT
)
BEGIN
    -- Insert a new event into the Events table
    INSERT INTO Events (title, description, date, time, venue_id, organizer_id)
    VALUES (p_title, p_description, p_date, p_time, p_venue_id, p_organizer_id);
    
    -- Display a message confirming the addition of the event
    SELECT CONCAT('Event "', p_title, '" has been added successfully.') AS message;
END $$
DELIMITER ;
CALL AddEvent(
    'Annual Coding Hackathon', 
    'A 24-hour hackathon for developers.', 
    '2024-12-05', 
    '10:00:00', 
    1, 
    2
);


-- Trigger 1: Update Event Capacity on Booking
-- This trigger reduces the capacity of a venue by 1 whenever a new booking is added.
DELIMITER $$
CREATE TRIGGER UpdateVenueCapacityAfterBooking
AFTER INSERT ON Bookings
FOR EACH ROW
BEGIN
    UPDATE Venues
    SET capacity = capacity - 1
    WHERE venue_id = (SELECT venue_id FROM Events WHERE event_id = NEW.event_id);
END $$
DELIMITER ;

-- Trigger 2: Restore Venue Capacity on Booking Cancellation
DELIMITER $$
CREATE TRIGGER RestoreVenueCapacityAfterBookingCancellation
AFTER UPDATE ON Bookings
FOR EACH ROW
BEGIN
    -- Check if the status has changed to 'cancelled'
    IF OLD.status != 'cancelled' AND NEW.status = 'cancelled' THEN
        -- Increase the capacity of the associated venue by 1
        UPDATE Venues
        SET capacity = capacity + 1
        WHERE venue_id = (SELECT venue_id FROM Events WHERE event_id = NEW.event_id);
    END IF;
END $$
DELIMITER ;

-- check the trigger
SELECT capacity FROM Venues WHERE venue_id = 1;

UPDATE Bookings 
SET status = 'cancelled' 
WHERE booking_id = 1;

SELECT capacity FROM Venues WHERE venue_id = 1;

