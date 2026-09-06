import { useState } from "react";

export default function App() {
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
      />
      <Status items={items} />
    </div>
  );
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
function Logo() {
  return <h1> Far Away </h1>;
}

function Form({ onAddItem }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(event) {
    event.preventDefault();
    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };
    onAddItem(newItem);
    setDescription("");
    setQuantity(1);
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3> What do you need for your trip?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({ items, onDeleteItem, onToggleItem }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            key={item.id}
            item={item}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, onDeleteItem, onToggleItem }) {
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
    </li>
  );
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
