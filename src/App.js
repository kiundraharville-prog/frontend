import { useEffect, useState } from "react";
import axios from "axios";

function App() {

  const [products, setProducts] = useState([]);

  const [form, setForm] = useState({
    name: "",
    price: "",
    quantity: ""
  });

  // Load Products
  const getProducts = async () => {

    const response = await axios.get("http://127.0.0.1:5000/products");

    setProducts(response.data);
  };

  useEffect(() => {
    getProducts();
  }, []);

  // Add Product
  const addProduct = async () => {

    await axios.post("http://127.0.0.1:5000/products", form);

    getProducts();

    setForm({
      name: "",
      price: "",
      quantity: ""
    });
  };

  return (
    <div style={{ padding: "20px" }}>

      <h1>Product Dashboard</h1>

      <input
        placeholder="Name"
        value={form.name}
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
      />

      <input
        placeholder="Price"
        value={form.price}
        onChange={(e) =>
          setForm({ ...form, price: e.target.value })
        }
      />

      <input
        placeholder="Quantity"
        value={form.quantity}
        onChange={(e) =>
          setForm({ ...form, quantity: e.target.value })
        }
      />

      <button onClick={addProduct}>
        Add Product
      </button>

      <hr />

      {products.map((product) => (

        <div key={product.id}>

          <h3>{product.name}</h3>

          <p>Price: ${product.price}</p>

          <p>Quantity: {product.quantity}</p>

        </div>
      ))}

    </div>
  );
}

export default App;