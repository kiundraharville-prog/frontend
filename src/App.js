import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const API_URL = "http://127.0.0.1:5000";

  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    price: "",
    quantity: ""
  });

  const fetchProducts = async () => {
    const response = await axios.get(`${API_URL}/products`);
    setProducts(response.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const clearForm = () => {
    setForm({
      name: "",
      price: "",
      quantity: ""
    });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.price || !form.quantity) {
      alert("Please fill in all fields.");
      return;
    }

    if (editingId) {
      await axios.put(`${API_URL}/products/${editingId}`, form);
    } else {
      await axios.post(`${API_URL}/products`, form);
    }

    clearForm();
    fetchProducts();
  };

  const startEdit = (product) => {
    setEditingId(product.id);

    setForm({
      name: product.name,
      price: product.price,
      quantity: product.quantity
    });
  };

  return (
    <div className="page">
      <div className="card">
        <h1>Product Dashboard</h1>
        <p className="subtitle">Manage your product catalog</p>

        <form onSubmit={handleSubmit} className="form">
          <input
            name="name"
            placeholder="Product name"
            value={form.name}
            onChange={handleChange}
          />

          <input
            name="price"
            type="number"
            step="0.01"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
          />

          <input
            name="quantity"
            type="number"
            placeholder="Quantity"
            value={form.quantity}
            onChange={handleChange}
          />

          <button type="submit">
            {editingId ? "Update Product" : "Add Product"}
          </button>

          {editingId && (
            <button type="button" className="cancel" onClick={clearForm}>
              Cancel
            </button>
          )}
        </form>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Edit</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>${Number(product.price).toFixed(2)}</td>
                <td>{product.quantity}</td>
                <td>
                  <button className="edit" onClick={() => startEdit(product)}>
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {products.length === 0 && (
          <p className="empty">No products yet. Add one above.</p>
        )}
      </div>
    </div>
  );
}

export default App;