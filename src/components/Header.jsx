import React, { useState } from "react";
import logo from "../images/agd_siyah.png";
import logo2 from "../images/agd_beyaz.png";
import "../css/header.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setDrawer } from "../redux/slices/basketSlices"; // setDrawer eylem oluşturucusunu import edin
import { addToBasket } from "../redux/slices/basketSlices";

const Header = () => {
  const [theme, setTheme] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products } = useSelector((store) => store.basket);

  const changeTheme = () => {
    const navbar = document.getElementsByClassName("navbar")[0];
    const root = document.getElementById("root");

    setTheme(!theme);

    if (!theme) {
      // Dark mode aktif
      navbar.classList.remove("navbar-light", "bg-light");
      navbar.classList.add("navbar-dark", "bg-dark");
      root.classList.remove("navbar-light", "bg-light");
      root.classList.add("navbar-dark", "bg-dark");
    } else {
      // Light mode aktif
      navbar.classList.remove("navbar-dark", "bg-dark");
      navbar.classList.add("navbar-light", "bg-light");
      root.classList.remove("navbar-dark", "bg-dark");
      root.classList.add("navbar-light", "bg-light");
    }
  };

  const handleAddToBasket = (product) => {
    dispatch(addToBasket(product));
    setPopupMessage("Ürün başarıyla eklendi!");
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000); // Popup'ı 3 saniye sonra gizle
  };

  return (
    <>
      <nav
        className={`navbar ${
          theme ? "navbar-dark bg-dark" : "navbar-light bg-light"
        }`}
      >
        <div className="container">
          <a className="navbar-brand" onClick={() => navigate("/")}>
            <img src={theme ? logo2 : logo} alt="Logo" className="logo" />
          </a>
          <div className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button
              className={`btn ${
                theme ? "btn-outline-light" : "btn-outline-dark"
              } btn-sm`}
              type="submit"
            >
              Search
            </button>
            <div className="icons">
              <i
                onClick={changeTheme}
                className={`fa-solid fa-lightbulb ms-3 ${
                  theme ? "text-light" : "text-dark"
                }`}
              ></i>
              <button
                onClick={() => dispatch(setDrawer(true))} // Drawer'ı açmak için true geçiyoruz
                type="button"
                className="btn btn-sm btn-primary position-relative ms-2"
              >
                <i
                  className={`fa-solid fa-basket-shopping ${
                    theme ? "text-light" : "text-dark"
                  }`}
                ></i>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {products.length}
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>
      {showPopup && (
        <div className="popup show">
          {popupMessage}
        </div>
      )}
    </>
  );
};

export default Header;
