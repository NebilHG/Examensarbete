import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";
import "./style.scss";
function Product(props) {
  const { id, name, desc, productImage, price } = props.data;
  const { addToCart, cartItems } = useContext(ShopContext);

  const cartItemAmount = cartItems[id];

  return (
    <div className="product">
      <img src={productImage} alt={name} />
      <div className="description">
        <h3>{name}</h3>
        <p>{desc}</p>
        <p>Price: {price}kr</p>
      </div>
      <button className="addToCartBtn" onClick={() => addToCart(id)}>
        Add to Cart {cartItemAmount > 0 && <> ({cartItemAmount})</>}
      </button>
    </div>
  );
}

export default Product;
