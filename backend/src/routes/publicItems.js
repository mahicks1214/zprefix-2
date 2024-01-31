// routes/publicItems.js

const express = require('express');
const router = express.Router();

// Sample public items data
const publicItems = [
  { id: 1, name: 'Public Item 1', description: 'Description for Public Item 1' },
  { id: 2, name: 'Public Item 2', description: 'Description for Public Item 2' },
  // Add more public items here
];

// Route for fetching public items
router.get('/', (req, res) => {
  res.json(publicItems);
});

module.exports = router;
