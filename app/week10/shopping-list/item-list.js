"use client";
import React, { useState } from 'react';


function ItemList({ items, onItemSelect, onDeleteItem }) {
  const [sortBy, setSortBy] = useState('name');
  const [grouped, setGrouped] = useState(false);


  const sortFunctions = {
    name: (a, b) => a.name.localeCompare(b.name),
    category: (a, b) => a.category.localeCompare(b.category),
  };


  const sortedItems = [...items].sort(sortFunctions[sortBy]);

  const handleGroupClick = () => {
    setGrouped(!grouped);
    if (!grouped) {
      setSortBy('name'); 
    }
  };


  const groupedItems = grouped
    ? sortedItems.reduce((acc, item) => {
        const category = item.category.toLowerCase();
        const capitalizedCategory = category.charAt(0).toUpperCase() + category.slice(1);
        acc[capitalizedCategory] = [...(acc[capitalizedCategory] || []), item];
        return acc;
      }, {})
    : null;


  const handleItemClick = (item) => {
    if (onItemSelect) {
      onItemSelect(item);
    }
  };

  const handleDeleteClick = (event, itemId) => {
    event.stopPropagation(); 
    onDeleteItem(itemId);
  };


  return (
    <div className="container mx-auto mt-8">
      <div className="mb-4 flex items-center">
        <label htmlFor="sortBySelect" className="text-white mr-4">
          Sort by:
        </label>
        <button
          onClick={() => {
            setSortBy('name');
            setGrouped(false);
          }}
          className={`${
            sortBy === 'name' && !grouped ? 'bg-orange-500 text-white' : 'bg-gray-400 text-gray-800'
          } px-4 py-2 rounded-md mx-2`}
        >
          Name
        </button>
        <button
          onClick={() => {
            setSortBy('category');
            setGrouped(false);
          }}
          className={`${
            sortBy === 'category' && !grouped ? 'bg-orange-500 text-white' : 'bg-gray-400 text-gray-800'
          } px-4 py-2 rounded-md mx-2`}
        >
          Category
        </button>
        <button
          onClick={handleGroupClick}
          className={`${
            grouped ? 'bg-orange-500 text-white' : 'bg-gray-400 text-gray-800'
          } px-4 py-2 rounded-md mx-2`}
        >
          Group by Category
        </button>
      </div>
      {grouped
        ? Object.entries(groupedItems).map(([category, items]) => (
            <div key={category}>
              <h2 className="text-white capitalize">{category}</h2>
              <ul>
                {items.map((item) => (
                  <li
                    key={item.id} // Ensure a unique key for each item
                    className="bg-dark-slate p-4 rounded-md shadow-md mb-4 border-white border hover:scale-105 transition-transform duration-300 flex justify-between items-center"
                  >
                    <div onClick={() => handleItemClick(item)} className="flex-grow">
                      <div className="text-lg font-semibold text-white">{item.name}</div>
                      <div className="text-white">
                        Buy {item.quantity} in {item.category}
                      </div>
                    </div>
                    <button
                      onClick={(e) => handleDeleteClick(e, item.id)}
                      className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))
        : (
          <ul>
            {sortedItems.map((item) => (
              <li
                key={item.id}
                className="bg-dark-slate p-4 rounded-md shadow-md mb-4 border-white border hover:scale-105 transition-transform duration-300 flex justify-between items-center"
              >
                <div onClick={() => handleItemClick(item)} className="flex-grow">
                  <div className="text-lg font-semibold text-white">{item.name}</div>
                  <div className="text-white">
                    Buy {item.quantity} in {item.category}
                  </div>
                </div>
                <button
                  onClick={(e) => handleDeleteClick(e, item.id)}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
    </div>
  );
}

export default ItemList;