import React from 'react';

export default function Item({ name, quantity, category }) {
    return (
      <li className="border border-black p-4 mb-4">
        <strong className="font-bold">{name}</strong>
        <p>Quantity: {quantity}</p>
        <p>Category: {category}</p>
      </li>
    );
  };
