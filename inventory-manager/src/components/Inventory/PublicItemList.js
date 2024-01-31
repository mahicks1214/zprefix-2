// PublicItemList.js
import React, { useState, useEffect } from 'react';

function PublicItemList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Fetch public items from the backend
    fetch('/api/public-items')
      .then((response) => response.json())
      .then((data) => setItems(data));
  }, []);

  return (
    <div>
      <h2>Public Items</h2>
      {items.map((item) => (
        <div key={item.id}>
          <h3>{item.name}</h3>
          <p>Description: {item.description}</p>
          {/* Display truncated description */}
        </div>
      ))}
    </div>
  );
}

export default PublicItemList;
