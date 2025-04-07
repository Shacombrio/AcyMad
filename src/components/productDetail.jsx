"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ChevronLeft, Minus, Plus, Ruler, ShoppingCart } from "lucide-react";
import "../styles/productDetail.css";
import { useParams } from "react-router-dom";
import defaultImage from "../assets/defaultImage.jpg";
import Comments from "../components/Comments.jsx";
import { useNavigate } from "react-router-dom"; // Importar useNavigate

const ProductDetail = ({ onBackClick, onAddToCart }) => {
  const { id } = useParams(); // Obtener el ID del producto desde la URL
  const navigate = useNavigate(); // Hook para navegar entre rutas

  useEffect(() => {
    // Desplazar la página al inicio cuando se cargue el componente
    window.scrollTo(0, 0);
  }, []); // Este efecto se ejecuta solo una vez al montar el componente

  // Simular datos de productos (en una app real, esto vendría de una API o contexto)
  const products = [
    {
      id: 1,
      name: "Artisan Chair",
      category: "chairs",
      price: "$450",
      description: "A beautifully handcrafted chair.",
      image: defaultImage,
    },
    // Otros productos...
  ];

  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return <p>Product not found</p>;
  }

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showPopup, setShowPopup] = useState(false);

  const productDetails = {
    id: product?.id || 1,
    name: product?.name || "Artisan Chair",
    category: product?.category || "chairs",
    price: product?.price || "$450",
    description:
      "Handcrafted with precision and care, this piece exemplifies the perfect blend of traditional blacksmithing and expert carpentry. The elegant design offers both aesthetic appeal and functional comfort.",
    stock: 12,
    dimensions: {
      width: "24 inches",
      height: "36 inches",
      depth: "22 inches",
      weight: "15 lbs",
    },
    materials: ["Solid Oak", "Hand-forged Steel", "Premium Leather"],
    colors: ["Natural", "Walnut", "Ebony"],
    images: [defaultImage, defaultImage, defaultImage, defaultImage],
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === productDetails.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? productDetails.images.length - 1 : prevIndex - 1
    );
  };

  const selectImage = (index) => {
    setCurrentImageIndex(index);
  };

  const increaseQuantity = () => {
    if (quantity < productDetails.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    if (typeof onAddToCart === "function") {
      onAddToCart(); // Llamar a la función pasada como prop
    }
    setShowPopup(true); // Mostrar el popup
    setTimeout(() => setShowPopup(false), 3000); // Ocultar el popup después de 3 segundos
  };

  return (
    <div className="product-detail-container">
      <div className="product-detail-header">
        <button className="back-button" onClick={onBackClick}>
          <ChevronLeft size={20} />
          <span>Back to Products</span>
        </button>
      </div>

      <div className="product-detail-content">
        <div className="product-images-section">
          <div className="product-main-image">
            <button className="carousel-button prev" onClick={prevImage}>
              <ArrowLeft size={20} />
            </button>
            <img
              src={productDetails.images[currentImageIndex] || "/placeholder.svg"}
              alt={`${productDetails.name} view ${currentImageIndex + 1}`}
            />
            <button className="carousel-button next" onClick={nextImage}>
              <ArrowRight size={20} />
            </button>
          </div>

          <div className="product-thumbnails">
            {productDetails.images.map((image, index) => (
              <div
                key={index}
                className={`thumbnail ${currentImageIndex === index ? "active" : ""}`}
                onClick={() => selectImage(index)}
              >
                <img src={image || "/placeholder.svg"} alt={`Thumbnail ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>

        <div className="product-info-section">
          <div className="product-category">{productDetails.category}</div>
          <h1 className="product-title">{productDetails.name}</h1>
          <div className="product-price">{productDetails.price}</div>

          <div className="product-description">
            <p>{productDetails.description}</p>
          </div>

          <div className="product-stock">
            <span className={productDetails.stock > 0 ? "in-stock" : "out-of-stock"}>
              {productDetails.stock > 0
                ? `In Stock (${productDetails.stock} available)`
                : "Out of Stock"}
            </span>
          </div>

          <div className="product-colors">
            <h3>Colors</h3>
            <div className="color-options">
              {productDetails.colors.map((color, index) => (
                <div key={index} className="color-option">
                  <input
                    type="radio"
                    id={`color-${index}`}
                    name="color"
                    defaultChecked={index === 0}
                  />
                  <label htmlFor={`color-${index}`}>{color}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="product-quantity">
            <h3>Quantity</h3>
            <div className="quantity-selector">
              <button
                className="quantity-button"
                onClick={decreaseQuantity}
                disabled={quantity <= 1}
              >
                <Minus size={16} />
              </button>
              <span className="quantity-value">{quantity}</span>
              <button
                className="quantity-button"
                onClick={increaseQuantity}
                disabled={quantity >= productDetails.stock}
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          <motion.button
            className="add-to-cart-button"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleAddToCart}
            disabled={productDetails.stock <= 0}
          >
            <ShoppingCart size={18} />
            Add to Cart
          </motion.button>

          <div className="product-dimensions">
            <h3>
              <Ruler size={18} />
              Dimensions
            </h3>
            <ul>
              <li>
                <strong>Width:</strong> {productDetails.dimensions.width}
              </li>
              <li>
                <strong>Height:</strong> {productDetails.dimensions.height}
              </li>
              <li>
                <strong>Depth:</strong> {productDetails.dimensions.depth}
              </li>
              <li>
                <strong>Weight:</strong> {productDetails.dimensions.weight}
              </li>
            </ul>
          </div>

          <div className="product-materials">
            <h3>Materials</h3>
            <ul>
              {productDetails.materials.map((material, index) => (
                <li key={index}>{material}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="popup">
          <p>Item added to cart!</p>
          <button onClick={() => navigate("/cart")}>Go to Cart</button> {/* Redirigir al carrito */}
        </div>
      )}
      <Comments />
    </div>
  );
};

export default ProductDetail;

