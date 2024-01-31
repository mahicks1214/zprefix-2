// ItemList.js
import React, { useState, useEffect } from 'react';

function ItemList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Fetch items from the backend and update the state
    fetch('/api/items')
      .then((response) => response.json())
      .then((data) => setItems(data));
  }, []);

  return (
    <div>
      <h2>My Inventory</h2>
      {items.map((item) => (
        <div key={item.id}>
          <h3>{item.name}</h3>
          <p>Description: {item.description}</p>
          <p>Quantity: {item.quantity}</p>
          {/* Add buttons for editing and deleting items */}
        </div>
      ))}
    </div>
  );
}

export default ItemList;
