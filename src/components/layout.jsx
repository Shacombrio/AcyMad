"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importar useNavigate
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, ShoppingCart } from "lucide-react";
import acymadLogo from "../assets/acymadlogo.jpg";
import ProductDetail from "./ProductDetail"; 
import defaultImage from "../assets/defaultImage.jpg";
import ImageAbout from "../assets/muebles.jpg";
import NavBar from "./NavBar";
import Cart from "./Cart";

function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState(null); // Estado para el producto seleccionado
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate(); // Hook para navegar entre rutas

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCartClick = () => {
    setIsCartOpen(true); // Mostrar el carrito
  };

  const handleCloseCart = () => {
    setIsCartOpen(false); // Ocultar el carrito
  };

  const handleAddToCart = () => {
    setShowPopup(true); // Mostrar el popup
    setTimeout(() => setShowPopup(false), 3000); // Ocultar el popup después de 3 segundos
  };

  const categories = ["all", "chairs", "tables", "storage", "lighting"];

  const featuredProducts = [
    {
      id: 1,
      name: "Artisan Chair",
      category: "chairs",
      price: "$450",
      image: "https://artisan.ba/_next/image?url=https%3A%2F%2Fartisan-production.ams3.cdn.digitaloceanspaces.com%2Fneva_chair_gallery_1_66f49a708e.png&w=828&q=75",
    },
    {
      id: 2,
      name: "Craftsman Table",
      category: "tables",
      price: "$1,200",
      image: "https://www.amishtables.com/cdn/shop/products/desk-craftsman-desk-1_700x.jpg?v=1492618869",
    },
    {
      id: 3,
      name: "Modern Shelf",
      category: "storage",
      price: "$850",
      image: "https://m.media-amazon.com/images/I/81qlqf49xIL._AC_SX679_.jpg",
    },
    {   
      id: 4,
      name: "Pendant Light",
      category: "lighting",
      price: "$320",
      image: "https://www.ikea.com/mx/en/images/products/skurup-pendant-lamp-black__0604110_pe681110_s5.jpg?f=xl",
    },
    {
      id: 5,
      name: "Lounge Chair",
      category: "chairs",
      price: "$680",
      image: "https://m.media-amazon.com/images/I/710ZKaRdRFL.__AC_SX300_SY300_QL70_FMwebp_.jpg",
    },
    {
      id: 6,
      name: "Coffee Table",
      category: "tables",
      price: "$750",
      image: "https://assets.wfcdn.com/im/54294279/resize-h800-w800%5Ecompr-r85/2545/254500354/Jahaira+Round+Coffee+Table+with+2-Tier+Storage+Shelves.jpg",
    },
  ];

  const filteredProducts =
    activeCategory === "all"
      ? featuredProducts
      : featuredProducts.filter((product) => product.category === activeCategory);

  return (
    <div className="container">

      {isCartOpen && <Cart onBackClick={handleCloseCart} />}

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="mobileMenu"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
          >
            <nav>
              <ul>
                <motion.li initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                  <a href="/" onClick={toggleMenu}>
                    Home
                  </a>
                </motion.li>
                <motion.li initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                  <a href="#products" onClick={toggleMenu}>
                    Products
                  </a>
                </motion.li>
                <motion.li initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                  <a href="#about" onClick={toggleMenu}>
                    About
                  </a>
                </motion.li>
                <motion.li initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                  <a href="#contact" onClick={toggleMenu}>
                    Contact
                  </a>
                </motion.li>
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {selectedProduct ? (
          // Mostrar solo ProductDetail si hay un producto seleccionado
          <ProductDetail
            product={selectedProduct}
            onBackClick={() => setSelectedProduct(null)} // Volver a la lista de productos
            onAddToCart={handleAddToCart}
          />
        ) : (
          // Mostrar el contenido principal si no hay un producto seleccionado
          <>
            <section className="hero">
              <motion.div
                className="heroContent"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2>Craftsmanship Meets Modern Design</h2>
                <p>
                  Handcrafted furniture that combines traditional blacksmithing and carpentry techniques with contemporary
                  aesthetics.
                </p>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <a href="#products" className="ctaButton">
                    Explore Collection <ArrowRight size={16} />
                  </a>
                </motion.div>
              </motion.div>
              <div className="heroImage">
                <img src={acymadLogo} alt="AC&MAD Logo" />
              </div>
            </section>

            <section id="products" className="products">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Our Collection
              </motion.h2>

              <div className="categoryFilter">
                {categories.map((category, index) => (
                  <motion.button
                    key={category}
                    className={`categoryButton ${activeCategory === category ? "activeCategory" : ""}`}
                    onClick={() => setActiveCategory(category)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </motion.button>
                ))}
              </div>

              <div className="productGrid">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeCategory}
                    className="productGridInner"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {filteredProducts.map((product) => (
                      <motion.div
                        key={product.id}
                        className="productCard"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        whileHover={{ y: -10 }}
                        onClick={() => navigate(`/product/${product.id}`)} // Navegar a la página de detalles
                      >
                        <div className="productImage">
                          <img src={product.image || "/placeholder.svg"} alt={product.name} />
                        </div>
                        <div className="productInfo">
                          <h3>{product.name}</h3>
                          <p className="productCategory">{product.category}</p>
                          <p className="productPrice">{product.price}</p>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            </section>
          </>
        )}

<section id="about" className="about">
          <div className="aboutContent">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Our Craft
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              AC&MAD combines traditional blacksmithing and carpentry techniques with modern design principles. Each
              piece is meticulously crafted by our artisans, ensuring exceptional quality and unique character.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              We source sustainable materials and employ time-honored craftsmanship to create furniture that stands the
              test of time, both in durability and design.
            </motion.p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <a href="#contact" className="secondaryButton">
                Our Story <ArrowRight size={16} />
              </a>
            </motion.div>
          </div>
          <div className="aboutImage">
            <img src={ImageAbout} alt="AC&MAD Craftsmanship" />
          </div>
        </section>

        <section id="contact" className="contact">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Get In Touch
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Interested in our pieces or have a custom project in mind? Contact us to discuss your requirements.
          </motion.p>
          <motion.form
            className="contactForm"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="formGroup">
              <input type="text" placeholder="Name" required />
            </div>
            <div className="formGroup">
              <input type="email" placeholder="Email" required />
            </div>
            <div className="formGroup">
              <textarea placeholder="Message" rows={5} required></textarea>
            </div>
            <motion.button
              type="submit"
              className="submitButton"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Send Message
            </motion.button>
          </motion.form>
        </section>
      </main>

      {/* Popup */}
      {showPopup && (
        <div className="popup">
          <p>Item added to cart!</p>
          <button onClick={handleCartClick}>Go to Cart</button>
        </div>
      )}
    </div>
  );
}

export default Layout;

