const express = require('express');
const app = express();
const port = process.env.PORT || 8082;
const cors = require('cors');
const knex = require('knex');
const knexConfig = require('../knexfile');

const db = knex(knexConfig.development);

const usersRouter = require('./routes/users');
const itemsRouter = require('./routes/items');
const publicItemsRouter = require('./routes/publicItems');
const loginRouter = require('./routes/login'); // Add login route
const registerRouter = require('./routes/register'); // Add register route

const corsOptions = {
  origin: 'http://localhost:3000/',
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/users', usersRouter);
app.use('/items', itemsRouter);
app.use('/public-items', publicItemsRouter);
app.use('/login', loginRouter); // Mount login route
app.use('/register', registerRouter); // Mount register route

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
