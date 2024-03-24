import React, { useEffect, useState } from "react";
import "./style.css";

function ListProduct() {
  const [allproducts, setAllProducts] = useState([]);
  const [message, setMessage] = useState("");

  const fetchInfo = async () => {
    try {
      const response = await fetch("http://localhost:3500/products");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setAllProducts(data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const handleRemove = async (id) => {
    try {
      await fetch(`http://localhost:3500/deleteproduct/${id}`, {
        method: "DELETE",
      });

      setMessage("Product Deleted successfully!");
      // Refresh products after deletion
      fetchInfo();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="list-product">
      <h1>All Products List</h1>
      {message && <p className="alert">{message}</p>}
      <div className="list-product_format-main">
        <p>Product</p>
        <p>Title</p>
        <p>Price</p>
        <p>Description</p>
        <p>Remove</p>
      </div>
      {allproducts.map((product) => (
        <div key={product.id} className="list-product_format-main">
          <img
            src={product.productImage}
            alt={product.name}
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
          />
          <p>{product.name}</p>
          <p>{product.price} SEK</p>
          <p>{product.desc}</p>
          <button onClick={() => handleRemove(product._id)}>Remove</button>
        </div>
      ))}
    </div>
  );
}

export default ListProduct;
