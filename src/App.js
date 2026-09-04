const initialItems = [
  { id: 1, description: "Passport", quantity: 1, packed: false },
  { id: 2, description: "Sunglasses", quantity: 1, packed: false },
  { id: 3, description: "Toothbrush", quantity: 1, packed: false },
];
export default function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
      <PackingList />
      <Status />
    </div>
  );
}

function Logo() {
  return <h1> Far Away </h1>;
}

function Form() {
  function handleSubmit(event) {
    event.preventDefault();
    c
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3> What do you need for your trip?</h3>
      <select>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>
      <input type="text" placeholder="Item..." />
      <button>Add</button>
    </form>
  );
}

function PackingList() {
  return (
    <div className="list">
      <ul>
        {initialItems.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
}

function Item({ item }) {
  return (
    <li>
      <span style={{ textDecoration: item.packed ? "line-through" : "none" }}>
        {item.quantity} {item.description}
      </span>
      <button> X </button>
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
