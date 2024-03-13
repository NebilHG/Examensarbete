import React, { useContext } from "react";
import { PRODUCTS } from "../../../data/products";
import { ShopContext } from "../../context/shop-context";
import CartItem from "../../components/cartItem/CartItem";
import { Link } from "react-router-dom";

function Cart() {
  const { cartItems, getTotalCartAmount } = useContext(ShopContext);
  const totalAmount = getTotalCartAmount();

  return (
    <section className="cart">
      <h1>Cart</h1>
      <div className="cartItems">
        {PRODUCTS.map((product) => {
          if (cartItems[product.id] !== 0) {
            return <CartItem data={product} />;
          }
        })}
      </div>
      {totalAmount > 0 ? (
        <div className="checkout">
          <p>Total: {totalAmount} kr</p>
          <Link to="/shop">
            <button>Continute Shopping</button>
          </Link>

          <button>Checkout </button>
        </div>
      ) : (
        <h1> Your Cart is Empty</h1>
      )}
    </section>
  );
}

export default Cart;
