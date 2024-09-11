import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setSelectedProduct } from '../redux/slices/productSlices';
import "../css/productDetail.css";
import { CiCircleMinus, CiCirclePlus } from 'react-icons/ci';
import SimilarProduct from './SimilarProduct';
import { addToBasket } from '../redux/slices/basketSlices';

const ProductDetails = () => {
  const { id } = useParams();
  const { products, selectedProduct } = useSelector((store) => store.product);
  const dispatch = useDispatch();
  const [count, setCount] = useState(1); // Başlangıçta 1 olarak ayarla
  const [showMore, setShowMore] = useState(false);
  const [sliderIndex, setSliderIndex] = useState(0);

  const increment = () => setCount(count + 1);

  const decrement = () => {
    if (count > 1) { // Minimum 1 olmalı
      setCount(count - 1);
    }
  };
  
  const addBasket = () => {
    if (count > 0) {
      const payload = {
        id: selectedProduct.id,
        price: selectedProduct.price,
        image: selectedProduct.image,
        title: selectedProduct.title,
        count, // count burada kullanılır
        description: selectedProduct.description
      }
      dispatch(addToBasket(payload));
    }
  }

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

  // Slider hareket fonksiyonları
  const handlePrevSlide = () => {
    if (sliderIndex > 0) {
      setSliderIndex(sliderIndex - 1);
    }
  };

  const handleNextSlide = () => {
    if (sliderIndex < similarProducts.length - 3) { // 3 ürünü göster
      setSliderIndex(sliderIndex + 1);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4 col-sm-12 mb-4">
          <div className="image-container">
            <img
              src={image}
              alt={title || "Product Image"}
              className="img-fluid rounded shadow-sm"
            />
          </div>
        </div>
        <div className="col-md-8 col-sm-12">
          <div className="product-details p-4 border rounded shadow-sm">
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
              <button onClick={addBasket} className="btn btn-primary ms-3 w-100">Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
      <h3 className="similar-products-title">Benzer Ürünler</h3>
      <div className="similar-products-slider position-relative">
        {similarProducts.length > 3 && (
          <>
            <button className="slider-button slider-button-left" onClick={handlePrevSlide}>{"<"}</button>
            <button className="slider-button slider-button-right" onClick={handleNextSlide}>{">"}</button>
          </>
        )}
        <div className="d-flex" style={{ transform: `translateX(-${sliderIndex * (100 / 3)}%)`, transition: 'transform 0.3s ease' }}>
          {similarProducts.map((product) => (
            <SimilarProduct key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
