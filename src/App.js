import { useState } from "react";
import { Logo } from "./logo";
import { Form } from "./Form";
import PackingList from "./PackingList";
import { Item } from "./Item";

function App() {
  const [items, setItems] = useState([]);
  const packedItems = items.filter((item) => item.packed).length;
  function handleAddItem(item) {
    setItems((items) => [...items, item]);
  }
  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }
  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item,
      ),
    );
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handleAddItem} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
        handleClearAll={handleClearAll}
      />
      <Status items={items} />
    </div>
  );
}
export default App;
function handleClearAll() {
  const confirmed = window.confirm("Are you sure you want to clear all items?");
  if (!confirmed) return;
  setItems([]);
}

function Status({ items }) {
  if (!items.length)
    return (
      <p className="status">
        <em>Your packing list is empty.</em>
      </p>
    );
  const total = items.length;
  const packed = items.filter((item) => item.packed).length;
  const percentage = total === 0 ? 0 : Math.round((packed / total) * 100);
  return (
    <footer className="status">
      <em>
        {percentage === 100
          ? "You are ready to go!"
          : `You have packed ${percentage}% of your items.`}
      </em>
      <em>
        {" "}
        You have {total} items on your list, and you already packed {packed} (
        {percentage}%){" "}
      </em>
    </footer>
  );
}
