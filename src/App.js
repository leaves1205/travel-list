import { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);
  function handleAddItem(item) {
    setItems((items) => [...items, item]);
  }
  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handleAddItem} />
      <PackingList items={items} onDeleteItem={handleDeleteItem} />
      <Status />
    </div>
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

function PackingList({ items, onDeleteItem }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item key={item.id} item={item} onDeleteItem={onDeleteItem} />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, onDeleteItem }) {
  return (
    <li>
      <span style={{ textDecoration: item.packed ? "line-through" : "none" }}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}> X </button>
    </li>
  );
}
function Status() {
  return (
    <footer>
      <em> You have X items on your list, and you already packed X (X%) </em>
    </footer>
  );
}
