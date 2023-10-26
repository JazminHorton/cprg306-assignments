import React, { useState } from 'react';

const NewItem = ({ onAddItem }) => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState('produce');
  const [error, setError] = useState('');

  const validateForm = () => {
    !name || name.trim() === ''
      ? setError('Name is required')
      : quantity < 1 || quantity > 99
      ? setError('Quantity must be between 1 and 99')
      : setError('');
    return !error;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const item = {
        name,
        quantity,
        category,
      };
      onAddItem(item); // render the onAddItem prop with the item object
      setName('');
      setQuantity(1);
      setCategory('produce');
    }
  };

  return (
    <div>
       <h2 className="text-2xl font-bold text-white mb-4">Add new item</h2>
      <form
        onSubmit={handleSubmit}
        className="p-2 m-4 bg-black text-black max-w-sm w-full"
      >
        <div className="mb-2">
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Item name"
            className="w-full mt-1 border-2 border-gray-300 p-2 rounded-lg font-sans"
          />
        </div>
        <div className="flex justify between">
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={quantity}
            min="1"
            max="99"
            onChange={(e) => setQuantity(Number(e.target.value))}
            required
            className="w-20 ml-1 border-2 border-gray-300 p-2 rounded-lg font-sans"
          />
          <div className="ml-1 border-2 border-gray-300 p-2 rounded-lg font-sans">
            <select
              id="category"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              >
              <option value="" disabled>Category</option>
              <option value="Produce">Produce</option>
              <option value="Dairy">Dairy</option>
              <option value="Bakery">Bakery</option>
              <option value="Meat">Meat</option>
              <option value="Frozen Foods">Frozen Foods</option>
              <option value="Canned Goods">Canned Goods</option>
              <option value="Dry Goods">Dry Goods</option>
              <option value="Beverages">Beverages</option>
              <option value="Snacks">Snacks</option>
              <option value="Household">Household</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
        {error && <p className="error-message">{error}</p>}
        <button
          type="submit"
          className="w-full mt-4 py-2 px-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewItem;