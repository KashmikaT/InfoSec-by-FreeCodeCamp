const express = require('express');
const bcrypt = require('bcrypt'); // Require bcrypt for hashing
const helmet = require('helmet'); // Import helmet
const app = express();

// Middleware for parsing JSON data (needed for POST requests with JSON bodies)
app.use(express.json());

// Use Helmet to set security headers
app.use(helmet());

// Simulate a user database (in a real application, use a database)
let users = []; // This will store user objects with hashed passwords

// Function to register a new user (hashing the password with bcrypt)
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // Check if username is already taken
  const existingUser = users.find(user => user.username === username);
  if (existingUser) {
    return res.status(400).send('Username is already taken');
  }

  // Generate salt and hash the password with bcrypt
  const saltRounds = 12; // The cost factor
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds); // Hash the password with salt
    users.push({ username, password: hashedPassword }); // Store the user with the hashed password
    res.status(200).send('User registered successfully');
  } catch (error) {
    res.status(500).send('Error hashing password');
  }
});

// Function to login and verify the user's password
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Find the user by username
  const user = users.find(user => user.username === username);
  if (!user) {
    return res.status(400).send('Invalid username or password');
  }

  // Compare the entered password with the stored hashed password using bcrypt
  try {
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      res.status(200).send('Login successful');
    } else {
      res.status(400).send('Invalid username or password');
    }
  } catch (error) {
    res.status(500).send('Error comparing passwords');
  }
});

// Home route
app.get("/", function (req, res) {
  res.send('Welcome to the secured app!');
});

// Set the port and start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
