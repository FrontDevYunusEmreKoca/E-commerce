import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../redux/slices/productSlices';
import Product from './Product';
import "../css/product.css";

const ProductList = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((store) => store.product);
  
  useEffect(() => {
    // getAllProducts fonksiyonunu çağırırken parantezleri ekleyin
    dispatch(getAllProducts());
  }, [dispatch]);

  useEffect(() => {
    console.log(products);
    
  }, [products]);

  return (
    <div className="container">
      <div className="row  mt-4" >
        {products.map(product => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};


export default ProductList;
