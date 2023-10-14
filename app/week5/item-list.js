"use client"
import React, { useState } from "react";
import Item from "./item"; 
import items from "./items.json"; 

export default function ItemList() {
  const [sortBy, setSortBy] = useState("name");
  const [groupByCategory, setGroupByCategory] = useState(false); 

  function itemsSort(a, b) {
    if (a[sortBy] < b[sortBy]) {
      return -1;
    }
    if (a[sortBy] > b[sortBy]) {
      return 1;
    }
    return 0;
  }

  items.sort(itemsSort);


  function groupItemsByCategory() {
    const groupedItems = {};
    items.forEach((item) => {
      if (!groupedItems[item.category]) {
        groupedItems[item.category] = [];
      }
      groupedItems[item.category].push(item);
    });
    return groupedItems;
  }

  return (
    <main className="flex justify-center">
      <div className="mt-4 w-68 max-w-md bg-white p-8 rounded-lg shadow-md">
        <h1 className="pl-2 text-xl text-zinc-800 font-bold mb-4">
          Shopping List:
        </h1>
        <div className="flex justify-between mb-4 ml-2">
          <div className="flex justify-between">
            <button
              onClick={() => setSortBy("name")}
              className="text-zinc-800 text-sm font-bold"
            >
              Name
            </button>
            <button
              onClick={() => setSortBy("category")}
              className="text-zinc-800 text-sm font-bold ml-4"
            >
              Category
            </button>
            <button
              onClick={() => setGroupByCategory(!groupByCategory)} 
              className="text-zinc-800 text-sm font-bold ml-4"
            >
              {groupByCategory ? "Ungroup" : "Group by Category"}
            </button>
          </div>
        </div>
        {groupByCategory ? (
          <ul>
            {Object.keys(groupItemsByCategory()).map((category) => (
              <div key={category}>
                <h2 className="text-zinc-800 text-md font-bold mb-2">
                  {category}
                </h2>
                <ul>
                  {groupItemsByCategory()[category].map((item) => (
                    <Item
                      key={item.id}
                      name={item.name}
                      quantity={item.quantity}
                      category={item.category}
                    />
                  ))}
                </ul>
              </div>
            ))}
          </ul>
        ) : (
          <ul>
            {items.map((item) => (
              <Item
                key={item.id}
                name={item.name}
                quantity={item.quantity}
                category={item.category}
              />
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}