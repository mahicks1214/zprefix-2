import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();

// const express = require('express');
// const app = express();
// const port = process.env.PORT || 8082;

// app.use(express.json());

// const usersRouter =  require('../backend/routes/users');
// const itemsRouter =  require('../backend/routes/items');

// app.use('/users', usersRouter);
// app.use('/items', itemsRouter);

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
