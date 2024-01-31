// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ItemList from './components/Inventory/ItemList';
import ItemDetail from './components/Inventory/ItemDetail';
import ItemForm from './components/Inventory/ItemForm';
import PublicItemList from './components/Inventory/PublicItemList';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/items" component={ItemList} />
          <Route path="/item/:id" component={ItemDetail} />
          <Route path="/create-item" component={ItemForm} />
          <Route path="/public-items" component={PublicItemList} />
          <Route exact path="/" component={PublicItemList} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
