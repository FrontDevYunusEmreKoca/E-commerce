import React from "react";
import "../css/product.css";

const Product = ({ product }) => {
  const { id, price, image, description, title, count } = product;

  return (
    <div className="col-md-4 col-lg-3  col-6 mt-3">
      <div className="card product-card">
        <div className="product-img-container">
          <img src={image} className="product-img" alt={title} />
        </div>
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <div className="d-flex justify-content-between align-items-center mt-3">
            <span className="text-success fs-5">${price.toFixed(2)}</span>
            <span className="badge bg-secondary">
              <i className="fa-solid fa-box"></i> {count} items
            </span>
          </div>
        </div>
        <div className="hover-overlay btn-sm">
          <button className="btn btn-sm">Detaya Git</button>
        </div>
      </div>
    </div>
  );
};

export default Product;
