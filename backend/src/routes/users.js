const express = require('express');
const router = express.Router();
const knex = require('knex'); // Import Knex
const knexConfig = require('../knexfile').development; // Load your Knex configuration

// Create a Knex instance
const db = knex(knexConfig);

// GET all users
router.get('/', async (req, res) => {
  try {
    const users = await db('users').select('*');
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching users.' });
  }
});

// GET a specific user by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await db('users').where({ id }).first();
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching the user.' });
  }
});

// POST a new user
router.post('/', async (req, res) => {
  const { first_name, last_name, username, password_hash } = req.body;
  if (!first_name || !last_name || !username || !password_hash) {
    return res.status(400).json({ error: 'Please provide all required fields.' });
  }

  try {
    const newUser = await db('users').insert({
      first_name,
      last_name,
      username,
      password_hash,
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while creating the user.' });
  }
});

// PUT (update) an existing user
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, username, password_hash } = req.body;
  if (!first_name || !last_name || !username || !password_hash) {
    return res.status(400).json({ error: 'Please provide all required fields.' });
  }

  try {
    const updatedUser = await db('users')
      .where({ id })
      .update({ first_name, last_name, username, password_hash });
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found.' });
    }
    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while updating the user.' });
  }
});

// DELETE a user by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await db('users').where({ id }).del();
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found.' });
    }
    res.json({ message: 'User deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while deleting the user.' });
  }
});

module.exports = router;
