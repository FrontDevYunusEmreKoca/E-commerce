import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../css/product.css";

const SimilarProduct = ({ product }) => {
  const { id, price, image, description, title, count } = product;
  const navigate = useNavigate();

  return (
    <div className="col-md-4 col-lg-4 col-6  my-5">
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
          {/* Burada tam yolu belirtiyoruz */}
          <button onClick={() => navigate(`/product-details/${id}`)} className="btn btn-sm">
            Detaya Git
          </button>
        </div>
      </div>
    </div>
  );
};

export default SimilarProduct;
