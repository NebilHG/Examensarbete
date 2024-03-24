import React, { useState } from "react";
import "./style.css";
import { FilePlus } from "phosphor-react";

function AddProduct() {
  const [productDetails, setProductDetails] = useState({
    name: "",
    desc: "",
    price: "",
    productImage: "",
  });

  const [message, setMessage] = useState("");

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const imageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProductDetails({ ...productDetails, productImage: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const Add_Product = async () => {
    try {
      const response = await fetch("http://localhost:3500/addproduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productDetails),
      });

      if (!response.ok) {
        throw new Error("Failed to add product");
      }

      const responseData = await response.json();
      console.log(responseData);
      setMessage("Product added successfully!");
    } catch (error) {
      console.error("Error:", error);
      setMessage("Failed to add product. Please try again.");
    }
  };

  return (
    <div className="add-product">
      <div className="add-procuct_itemfield">
        <p>Product Title</p>
        <input
          value={productDetails.name}
          onChange={changeHandler}
          type="text"
          name="name"
          placeholder="Type here"
        />
      </div>
      <div className="add-procuct_itemfield">
        <p>Product Description</p>
        <input
          value={productDetails.desc}
          onChange={changeHandler}
          type="text"
          name="desc"
          placeholder="Type here"
        />
      </div>
      <div className="add-product_price">
        <div className="add-procuct_itemfield">
          <p>Price</p>
          <input
            value={productDetails.price}
            onChange={changeHandler}
            type="text"
            name="price"
            placeholder="Type here"
          />
        </div>
      </div>
      <div className="add-product_itemfield">
        <label htmlFor="image-input">
          <p>Add image</p>
          {productDetails.productImage ? (
            <img
              src={productDetails.productImage}
              alt="Selected"
              style={{ width: 100, height: 100, objectFit: "cover" }}
            />
          ) : (
            <FilePlus size={45} />
          )}
        </label>
        <input
          onChange={imageHandler}
          type="file"
          name="image"
          id="image-input"
          hidden
        />
      </div>
      {message && <p>{message}</p>}
      <button onClick={Add_Product} className="add-product_btn">
        Add
      </button>
    </div>
  );
}

export default AddProduct;
