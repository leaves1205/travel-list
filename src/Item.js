import React from "react";
export function Item({ item, onDeleteItem, onToggleItem, onClearAll }) {
  return (
    <li>
      <input
        type="checkbox"
        checked={item.packed}
        onChange={() => onToggleItem(item.id)}
      />
      <span style={{ textDecoration: item.packed ? "line-through" : "none" }}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}> X </button>
      <button onClick={onClearAll}>Clear All</button>
    </li>
  );
}
