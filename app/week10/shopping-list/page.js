"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ItemList from './item-list';
import NewItem from './new-item';
import MealIdeas from './meal-ideas';
import { getShoppingList, addItem, deleteItem } from '../_services/shopping-list-services';
import { useUserAuth } from "../_utils/auth-context";


function Page() {
  const { user } = useUserAuth();
  const [items, setItems] = useState([]);
  const [selectedItemName, setSelectedItemName] = useState(null);

  useEffect(() => {
    if (!user) {
      router.push('/');
    } else {
      loadItems();
    }
  }, [user]);


  const handleAddItem = async (newItem) => {
    try {
      const itemToAdd = {
        ...newItem,
        category: newItem.category.toLowerCase()
      };
  
      const addedItem = await addItem(user.uid, itemToAdd);
      setItems(prevItems => [...prevItems, addedItem]);
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const handleDeleteItem = async (itemId) => {
    console.log(`Deleting item with ID: ${itemId}`)
    if (!itemId) {
      throw new Error("itemId is undefined");
    }  
    try {
      await deleteItem(user.uid, itemId); 
      setItems(currentItems => currentItems.filter(item => item.id !== itemId));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleItemSelect = (selectedItem) => {
    const cleanedName = selectedItem.name.split(',')[0].trim().replace(/[^\w\s]/gi, "");
    setSelectedItemName(cleanedName);
  };

  async function loadItems() {
    try {
      const itemsList = await getShoppingList(user.uid);
      setItems(itemsList);
    } catch (error) {
      console.error('There was an error retrieving the shopping list:', error);
    }
  }

  const pagePosition = {
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
    <main style={pagePosition} className="p-2 m-2">
      <h1 className="text-4xl font-bold text-white mb-4 group">
        <a
          className="bg-black text-white px-4 py-2 relative group"
        >
          Shopping list + meal ideas
        </a>
      </h1>
      <div className="flex justify-center w-full md:w-3/4 lg:w-2/3 gap-4">
        <div className="bg-black opacity-90 p-6 rounded-md shadow-md w-full border border-gray-400">
          <NewItem onAddItem={handleAddItem} />
          <ItemList items={items} onItemSelect={handleItemSelect} onDeleteItem={handleDeleteItem} />
        </div>
        <div className="bg-black p-6 rounded-md shadow-md w-full border border-gray-400">
          <MealIdeas ingredient={selectedItemName} />
        </div>
      </div>
      <Link href="/">
        <div> Homepage </div>
      </Link>
    </main>
  );
}

export default Page;