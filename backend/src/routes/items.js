const express = require('express');
const router = express.Router();
const knex = require('knex');
const knexConfig = require('../knexfile').development;

const db = knex(knexConfig);

// GET all items
router.get('/', async (req, res) => {
  try {
    const items = await db('items').select('*');
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching items.' });
  }
});

// GET a specific item by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const item = await db('items').where({ item_id: id }).first();
    if (!item) {
      return res.status(404).json({ error: 'Item not found.' });
    }
    res.json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching the item.' });
  }
});

// POST a new item
router.post('/', async (req, res) => {
  const { user_id, item_name, description, item_quantity } = req.body;
  if (!user_id || !item_name || !description || item_quantity === undefined) {
    return res.status(400).json({ error: 'Please provide all required fields.' });
  }

  try {
    const newItem = await db('items').insert({
      user_id,
      item_name,
      description,
      item_quantity,
    });
    res.status(201).json(newItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while creating the item.' });
  }
});

// PUT (update) an existing item
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { user_id, item_name, description, item_quantity } = req.body;
  if (!user_id || !item_name || !description || item_quantity === undefined) {
    return res.status(400).json({ error: 'Please provide all required fields.' });
  }

  try {
    const updatedItem = await db('items')
      .where({ item_id: id })
      .update({ user_id, item_name, description, item_quantity });
    if (!updatedItem) {
      return res.status(404).json({ error: 'Item not found.' });
    }
    res.json(updatedItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while updating the item.' });
  }
});

// DELETE an item by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedItem = await db('items').where({ item_id: id }).del();
    if (!deletedItem) {
      return res.status(404).json({ error: 'Item not found.' });
    }
    res.json({ message: 'Item deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while deleting the item.' });
  }
});

// GET all public items (Step 4)
router.get('/public', async (req, res) => {
  try {
    const publicItems = await db('items').select('item_id', 'item_name', 'description').limit(100);
    res.json(publicItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching public items.' });
  }
});

// GET a specific public item by ID (Step 5)
router.get('/public/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const publicItem = await db('items')
      .select('item_id', 'item_name', 'description')
      .where({ item_id: id })
      .first();
    if (!publicItem) {
      return res.status(404).json({ error: 'Public item not found.' });
    }
    res.json(publicItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching the public item.' });
  }
});

module.exports = router;
