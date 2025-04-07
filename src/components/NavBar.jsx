import { Link } from "react-router-dom";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useState } from "react";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <h1>AC&MAD</h1>
        </Link>
      </div>

      {/* Menú de navegación para escritorio */}
      <nav className="desktopNav">
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="#products">Products</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </nav>

      {/* Ícono del carrito */}
      <Link to="/cart" className="cartIcon" style={{ cursor: "pointer" }}>
        <ShoppingCart />
        <span>0</span>
      </Link>

      {/* Botón de menú móvil */}
      <button className="menuButton" onClick={toggleMenu}>
        {isMenuOpen ? <X /> : <Menu />}
      </button>

      {/* Menú móvil */}
      {isMenuOpen && (
        <div className="mobileMenu">
          <nav>
            <ul>
              <li>
                <a href="/" onClick={toggleMenu}>
                  Home
                </a>
              </li>
              <li>
                <a href="#products" onClick={toggleMenu}>
                  Products
                </a>
              </li>
              <li>
                <a href="#about" onClick={toggleMenu}>
                  About
                </a>
              </li>
              <li>
                <a href="#contact" onClick={toggleMenu}>
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default NavBar;