const knex = require('knex');
const knexConfig = require('../knexfile').development;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const db = knex(knexConfig);

// Function to hash the password using bcrypt
const hashPassword = async (password) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

// Function to generate a JSON web token (JWT) for user session handling
const generateToken = (user) => {
  const payload = {
    userId: user.id,
    username: user.username,
  };

  const secret = 'Eqnfu4SSkx5MyG1tDUwRkze9'; 
  const options = {
    expiresIn: '1h', // Token expiration time
  };

  return jwt.sign(payload, secret, options);
};

// Controller function for user registration
const registerUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the username is already taken
    const existingUser = await db('users').where('username', username).first();

    if (existingUser) {
      return res.status(400).json({ error: 'Username is already taken.' });
    }

    // Hash the user's password before storing it in the database
    const hashedPassword = await hashPassword(password);

    // Insert the new user into the database
    const newUser = await db('users').insert({ username, password_hash: hashedPassword });

    res.status(201).json({ message: 'Registration successful.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred during registration.' });
  }
};

// Controller function for user login
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by username
    const user = await db('users').where('username', username).first();

    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password.' });
    }

    // Verify the password using bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid username or password.' });
    }

    // Generate a token for the user's session
    const token = generateToken(user);

    res.status(200).json({ message: 'Login successful.', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred during login.' });
  }
};

module.exports = { registerUser, loginUser };
