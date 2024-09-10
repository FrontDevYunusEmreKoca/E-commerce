import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../redux/slices/productSlices';

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
    <div>
      {/* Ürünleri burada listeleyebilirsiniz */}
    </div>
  );
};

export default ProductList;
