"use client";

import React, { useState } from 'react';

function ItemList({ items }) {
  const [sortBy, setSortBy] = useState('name');
  const [grouped, setGrouped] = useState(false);

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    if (grouped) {
      setGrouped(false);
    }
  };

  const sortFunctions = {
    name: (a, b) => a.name.localeCompare(b.name),
    category: (a, b) => a.category.localeCompare(b.category),
  };

  // Create a copy of the items prop and sort it
  const sortedItems = [...items].sort(sortFunctions[sortBy] || (() => 0));

  const handleGroupClick = () => {
    setGrouped(!grouped);
    if (grouped) {
      setSortBy('name'); // Reset sorting when grouping is turned off
    }
  };

  // Create a copy of the items prop and group and sort it
  const groupedItems = grouped
    ? sortedItems.reduce((acc, item) => {
        const category = item.category.toLowerCase();
        const capitalizedCategory = category.charAt(0).toUpperCase() + category.slice(1);
        acc[capitalizedCategory] = [...(acc[capitalizedCategory] || []), item];
        return acc;
      }, {})
    : null;

  // Create a copy of the grouped items and sort it
  const groupAndSortByCategory = () => {
    const groupedAndSorted = Object.keys(groupedItems || {})
      .sort()
      .reduce((acc, category) => {
        acc[category] = groupedItems[category].sort((a, b) => a.name.localeCompare(b.name));
        return acc;
      }, {});
    return groupedAndSorted;
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="mb-4">
      <label htmlFor="sortBySelect" className="text-white mr-2">
        Sort by:
      </label>
      <select
        id="sortBySelect"
        value={sortBy}
        onChange={handleSortChange}
        className="mt-4 bg-dark-slate text-black p-2 rounded-md"
      >
        <option value="name">Name</option>
        <option value="category">Category</option>
      </select>
    </div>
      <div className="mb-4">
        <button
          onClick={() => {
            setSortBy('name');
            if (grouped) {
              setGrouped(false);
            }
          }}
          className={`${
            sortBy === 'name' && !grouped ? 'bg-orange-500 text-white' : 'bg-gray-400 text-gray-800'
          } px-4 py-2 rounded-md mr-2`}
        >
          Sort by Name
        </button>
        <button
          onClick={() => {
            setSortBy('category');
            if (grouped) {
              setGrouped(false);
            }
          }}
          className={`${
            sortBy === 'category' && !grouped ? 'bg-orange-500 text-white' : 'bg-gray-400 text-gray-800'
          } px-4 py-2 rounded-md mr-2`}
        >
          Sort by Category
        </button>
        <button
          onClick={handleGroupClick}
          className={`${
            grouped ? 'bg-orange-500 text-white' : 'bg-gray-400 text-gray-800'
          } px-4 py-2 rounded-md`}
        >
          Group by Category
        </button>
      </div>
      {grouped
        ? Object.keys(groupAndSortByCategory()).map((category) => (
            <div key={category}>
              <h2 className="text-white capitalize">{category}</h2>
              <ul>
                {groupAndSortByCategory()[category].map((item, index) => (
                  <li
                    key={index}
                    className="bg-dark-slate p-4 rounded-md shadow-md mb-4 border-white border hover:scale-105 transition-transform duration-300"
                  >
                    <div className="text-lg font-semibold text-white">Name: {item.name}</div>
                    <div className="text-white">
                      Buy {item.quantity} in {item.category}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))
        : (
          <ul>
            {sortedItems.map((item, index) => (
              <li
                key={index}
                className="bg-dark-slate p-4 rounded-md shadow-md mb-4 border-white border hover:scale-105 transition-transform duration-300"
              >
                <div className="text-lg font-semibold text-white">Name: {item.name}</div>
                <div className="text-white">
                  Buy {item.quantity} in {item.category}
                </div>
              </li>
            ))}
          </ul>
        )
      }
    </div>
  );
}

export default ItemList;