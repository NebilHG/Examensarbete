import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { ListChecks, ListPlus } from "phosphor-react";

function Sidebar() {
  return (
    <div className="sidebar">
      <Link to={"/addproduct"} style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <ListPlus size={32} />
          <p>Add Product</p>
        </div>
      </Link>

      <Link to={"/listproduct"} style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <ListChecks size={32} />
          <p>Product List</p>
        </div>
      </Link>
    </div>
  );
}

export default Sidebar;
