import React, { useState } from "react";
import logo from "../images/agd_siyah.png";
import logo2 from "../images/agd_beyaz.png";
import "../css/header.css";

const Header = () => {
  const [theme, setTheme] = useState(false);

  const changeTheme = () => {
    const navbar = document.getElementsByClassName("navbar")[0]; // İlk navbar elemanını seç
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

  return (
    <nav className={`navbar ${theme ? "navbar-dark bg-dark" : "navbar-light bg-light"}`}>
      <div className="container">
        <a className="navbar-brand" href="#">
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
            className={`btn ${theme ? "btn-outline-light" : "btn-outline-dark"} btn-sm`} 
            type="submit"
          >
            Search
          </button>
          <div className="icons">
            <i 
              className={`fa-solid fa-basket-shopping ms-3 ${theme ? "text-light" : "text-dark"}`}
            ></i>
            <i 
              onClick={changeTheme} 
              className={`fa-solid fa-lightbulb ms-3 ${theme ? "text-light" : "text-dark"}`}
            ></i>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
