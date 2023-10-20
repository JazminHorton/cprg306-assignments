"use client";

import Link from 'next/link';
import React, { useState } from 'react';
import ItemList from './item-list';
import NewItem from './new-item';
import itemsData from './items.json';

function Page() {
  // State for the shopping list items
  const [items, setItems] = useState(itemsData);

  // Function to handle adding a new item to the list
  const handleAddItem = (newItem) => {
    // Create an updated list with the new item
    const updatedItems = [...items, newItem];
    console.log(updatedItems); // Log the updated items (for debugging)
    setItems(updatedItems);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold text-white mb-4 group">
        <a className="bg-black text-white px-4 py-2 relative group">
          My Shopping List 🛒
        </a>
      </h1>

      <div className="bg-black p-6 rounded-md shadow-md w-full md:w-3/4 lg:w-1/2 border border-gray-400">
        {/* Render the NewItem component to add new items */}
        <NewItem onAddItem={handleAddItem} />
        {/* Render the ItemList component to display the items */}
        <ItemList items={items} />
      </div>

      {/* Link back to the homepage */}
      <Link href="/" className="text-white hover:underline mt-5">
        Back to Home
      </Link>
    </main>
  );
}

export default Page;
