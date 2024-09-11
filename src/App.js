import "./App.css";
import Header from "./components/Header";
import Loading from "./components/Loading";
import Drawer from "@mui/material/Drawer";
import RouterConfig from "./config/RouterConfig";
import { useDispatch, useSelector } from "react-redux";
import {
  calculateAmountBasket,
  removeFromBasket,
  setDrawer,
} from "./redux/slices/basketSlices";
import { FaArrowRight, FaRegTrashAlt } from "react-icons/fa";
import logo from "./images/agd_siyah.png"; // Logo dosya yolu
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const { products, drawer, totalAmount } = useSelector(
    (store) => store.basket
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(calculateAmountBasket());
  }, [dispatch, products]);

  const handleRemoveFromBasket = (productId) => {
    dispatch(removeFromBasket({ id: productId }));
  };
  const handleContinueShopping = () => {
    dispatch(setDrawer(false)); // Drawer'ı kapat
    navigate("/"); // Alışverişe devam et
  };

  return (
    <div className="App">
      <Header />
      <RouterConfig />
      <Loading />
      <Drawer
        onClose={() => dispatch(setDrawer(false))}
        anchor="right"
        open={drawer}
      >
        <div className="drawer-content">
          <div className="drawer-header">
            <img src={logo} alt="Logo" className="drawer-logo" />
            <p className="drawer-title">Sepetim</p>
          </div>
          <div className="drawer-items border-bottom">
            {products && products.length > 0 ? (
              products.map((product) => (
                <div className="drawer-item" key={product.id}>
                  <img
                    src={product.image}
                    width={50}
                    height={50}
                    alt={product.title}
                  />
                  <div className="drawer-item-details">
                    <p className="title">{product.title}</p>
                    <div className="item-info">
                      <p className="price text-success fw-bold">
                        ${product.price.toFixed(2)}
                      </p>
                      <p className="quantity">
                        <span className="quantity-label">Adet:</span>{" "}
                        {product.count}
                      </p>
                      <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleRemoveFromBasket(product.id)}
                  >
                    <FaRegTrashAlt />
                  </button>
                    </div>
                  </div>
                
                </div>
              ))
            ) : (
              <p>No products in the basket</p>
            )}
          </div>
          <button
            onClick={handleContinueShopping}
            className="btn-secondary btn-sm p-1"
          >
            <FaArrowRight /> Alışverişe Devam Et
          </button>
          <div className="drawer-footer">
            <p className="footer-text ">Toplam Tutar:</p>
            <p className="footer-amount">${totalAmount}</p>
          </div>
        </div>
      </Drawer>
    </div>
  );
}

export default App;
