// ItemDetail.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ItemDetail() {
  const { id } = useParams();
  const [item, setItem] = useState({});

  useEffect(() => {
    // Fetch item details from the backend using the 'id' parameter
    fetch(`/api/items/${id}`)
      .then((response) => response.json())
      .then((data) => setItem(data));
  }, [id]);

  return (
    <div>
      <h2>Item Details</h2>
      <h3>{item.name}</h3>
      <p>Description: {item.description}</p>
      <p>Quantity: {item.quantity}</p>
      {/* Add buttons for editing and deleting items */}
    </div>
  );
}

export default ItemDetail;
