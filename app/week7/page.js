"use client"; 

import Link from 'next/link';
import React, { useState } from 'react';
import ItemList from './item-list';
import NewItem from './new-item';
import itemsData from './items.json';
import MealIdeas from './meal-ideas';

function Page() {
  const [items, setItems] = useState(itemsData); 

  const handleAddItem = (newItem) => {
    const updatedItems = [...items, newItem];
    console.log(updatedItems); // Log updated items
    setItems(updatedItems);
  };
  const [selectedItemName, setSelectedItemName] = useState(null);
  const handleItemSelect = (selectedItem) => {
    const cleanedName = selectedItem.name.split(',')[0].trim().replace(/[^\w\s]/gi, "");
    setSelectedItemName(cleanedName);
  };

  const mainStyle = {
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    width: '100vw',
    height: '100vh',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  };

  return (
    <main style={mainStyle} className="p-2 m-2">
      <h1 className="text-4xl font-bold text-white mb-4 group">
        <a
          className="bg-black text-white px-4 py-2 relative group"
        >
          Shopping List + Meal Ideas
        </a>
        <div class="flex">
          <div class="flex-1 max-w-sm m-2"></div>
        </div>
      </h1>
      <div className="flex justify-center w-full md:w-3/4 lg:w-2/3 gap-4">
        <div className="bg-black opacity-90 p-6 rounded-md shadow-md w-full border border-gray-400">
          <NewItem onAddItem={handleAddItem} />
          <ItemList items={items} onItemSelect={handleItemSelect} />
        </div>

        <div className="bg-black p-6 rounded-md shadow-md w-full border border-gray-400">
          <MealIdeas ingredient={selectedItemName} />
        </div>
      </div>

      <Link href="/" className="text-white hover:underline mt-5">
        Homepage
      </Link>
    </main>
  );
}

export default Page;