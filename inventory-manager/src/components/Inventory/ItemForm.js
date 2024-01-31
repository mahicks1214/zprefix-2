// ItemForm.js
import React, { useState } from 'react';

function ItemForm() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    quantity: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCreateItem = () => {
    // Implement item creation logic here (e.g., API call)
  };

  return (
    <div>
      <h2>Create New Item</h2>
      <input
        type="text"
        name="name"
        placeholder="Item Name"
        value={formData.name}
        onChange={handleInputChange}
      />
      <textarea
        name="description"
        placeholder="Item Description"
        value={formData.description}
        onChange={handleInputChange}
      ></textarea>
      <input
        type="number"
        name="quantity"
        placeholder="Item Quantity"
        value={formData.quantity}
        onChange={handleInputChange}
      />
      <button onClick={handleCreateItem}>Create Item</button>
    </div>
  );
}

export default ItemForm;
