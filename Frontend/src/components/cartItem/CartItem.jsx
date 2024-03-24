import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";

function CartItem(props) {
  const { id, name, desc, productImage, price } = props.data;
  const { cartItems, addToCart, removeFromCart, updateCartItemCount } =
    useContext(ShopContext);

  return (
    <div className="cartItem">
      <img src={productImage} />
      <div className="description">
        <h3>{name}</h3>
        <p>{desc}</p>
        <p>Price: {price}kr</p>
        <div className="counter">
          <button onClick={() => removeFromCart(id)}>-</button>
          <input
            value={cartItems[id]}
            onChange={(e) => updateCartItemCount(Number(e.target.value), id)}
          />
          <button onClick={() => addToCart(id)}>+</button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
