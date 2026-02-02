import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiSearch, FiMenu, FiX } from "react-icons/fi";
import useDebounce from "../../hooks/useDebounce";
import "./index.css";

const Navbar = ({ onSearch }) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 300);
  const location = useLocation();
  const navigate = useNavigate();

  // 🔍 Trigger search (debounced)
  useEffect(() => {
    if (onSearch) {
      onSearch(debouncedSearch.trim());
    }
  }, [debouncedSearch, onSearch]);

  // 🚀 Redirect to menu when user starts typing
  useEffect(() => {
    if (search.trim() && location.pathname !== "/menu") {
      navigate("/menu");
    }
  }, [search, location.pathname, navigate]);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="logo">
          <Link to="/">Restaurant<span> Admin</span></Link>
        </div>

        {/* Desktop Links */}
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/menu">Menu</Link></li>
          <li><Link to="/orders">Order</Link></li>
        </ul>

        <div className="nav-actions">
          <div className="search-box">
            <FiSearch className="search-icon" />
            <input
              type="search"
              placeholder="Search food..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search menu items"
            />
          </div>

          
          {/* <button
            className="menu-toggle"
            onClick={() => setShowMobileMenu((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {showMobileMenu ? <FiX /> : <FiMenu />}
          </button> */}
        </div>
      </div>

      {/* Mobile Menu
      <div className={`mobile-menu ${showMobileMenu ? "active" : ""}`}>
        <Link to="/" onClick={() => setShowMobileMenu(false)}>Home</Link>
        <Link to="/menu" onClick={() => setShowMobileMenu(false)}>Menu</Link>
        <Link to="/orders" onClick={() => setShowMobileMenu(false)}>Order</Link>
      </div> */}
    </nav>
  );
};

export default Navbar;
