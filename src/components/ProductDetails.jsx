import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setSelectedProduct } from '../redux/slices/productSlices';
import "../css/productDetail.css";
import { CiCircleMinus, CiCirclePlus } from 'react-icons/ci';
import SimilarProduct from './SimilarProduct';

const ProductDetails = () => {
  const { id } = useParams();
  const { products, selectedProduct } = useSelector((store) => store.product);
  const dispatch = useDispatch();
  const [count, setCount] = useState(0);
  const [showMore, setShowMore] = useState(false); // Açıklama için durum

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    if (count > 0) { 
      setCount(count - 1);
    }
  };

  useEffect(() => {
    getProductById();
  }, [id, products]);

  const getProductById = () => {
    const product = products.find((product) => product.id === parseInt(id));
    if (product) {
      dispatch(setSelectedProduct(product));
    }
  };

  const { price, image, description, title, category } = selectedProduct;

  // Benzer ürünleri filtreleme
  const similarProducts = products.filter((product) => product.category === category && product.id !== parseInt(id));

  return (
    <div className="container mt-5">
      <div className="row d-flex align-items-stretch">
        {/* Ürün Görseli */}
        <div className="col-md-4 col-sm-12 mb-4">
          <div className="image-container h-100">
            <img
              src={image}
              alt={title || "Product Image"}
              className="img-fluid rounded shadow-sm"
            />
          </div>
        </div>
        {/* Ürün Detayları */}
        <div className="col-md-8 col-sm-12 d-flex flex-column mb-4">
          <div className="product-details p-4 border rounded shadow-sm flex-grow-1">
            <h5 className="product-title mb-3">{title || "Product Title"}</h5>
            <p className="product-price text-success fs-3 mb-3">${price ? price.toFixed(2) : "0.00"}</p>
            <p className="product-description mb-4">
              {showMore ? description : `${description?.slice(0, 100)}...`}
              {description && description.length > 100 && (
                <button 
                  className="btn btn-link p-0 ms-2"
                  onClick={() => setShowMore(!showMore)}
                >
                  {showMore ? "Daha Az Göster" : "Daha Fazla Göster"}
                </button>
              )}
            </p>
            <div className="d-flex align-items-center mb-4">
              <div className="iconsDetails d-flex align-items-center">
                <CiCirclePlus 
                  onClick={increment}
                  style={{ fontSize: "40px", cursor: "pointer", marginRight: "5px" }} 
                />
                <span style={{ fontSize: "35px", margin: "0 10px" }}>{count}</span>
                <CiCircleMinus 
                  onClick={decrement}
                  style={{ fontSize: "40px", cursor: "pointer", marginLeft: "5px" }} 
                />
              </div>
              <button className="btn btn-primary ms-3 w-100">Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
      {/* Benzer Ürünler Başlığı */}
      <div className="row my-5">
        <h4 className="mb-4 border-bottom m">Benzer Ürünler</h4>
        {similarProducts.map((product) => (
          <SimilarProduct key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductDetails;
