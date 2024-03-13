import { useNavigate } from "react-router-dom";
import React from "react";
import Header from "../../components/header/Header";
import { PRODUCTS } from "../../../data/products";
import Product from "../../components/product/product";

function Shop() {
  return (
    <>
      <section className="shop">
        <h1> My shop</h1>
        <div className="products">
          {PRODUCTS.map((product) => (
            <Product data={product} />
          ))}
        </div>
      </section>
    </>
  );
}

export default Shop;
