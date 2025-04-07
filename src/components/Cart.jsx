"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2, CreditCard, Tag, Check, X } from "lucide-react"
import "../styles/Cart.css"
import { Link } from "react-router-dom";

function Cart({ onBackClick }) {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Artisan Chair",
      category: "chairs",
      price: 450,
      quantity: 1,
      color: "Natural",
      image: "https://via.placeholder.com/100",
    },
    {
      id: 2,
      name: "Craftsman Table",
      category: "tables",
      price: 1200,
      quantity: 1,
      color: "Walnut",
      image: "https://via.placeholder.com/100",
    },
  ])

  const [promoCode, setPromoCode] = useState("")
  const [promoApplied, setPromoApplied] = useState(false)
  const [promoError, setPromoError] = useState(false)

  const increaseQuantity = (id) => {
    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item)))
  }

  const decreaseQuantity = (id) => {
    setCartItems(
      cartItems.map((item) => (item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item)),
    )
  }

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "discount20") {
      setPromoApplied(true)
      setPromoError(false)
    } else {
      setPromoError(true)
      setPromoApplied(false)
    }
  }

  const clearPromoCode = () => {
    setPromoCode("")
    setPromoApplied(false)
    setPromoError(false)
  }

  // Calculate totals
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const discount = promoApplied ? subtotal * 0.2 : 0
  const shipping = subtotal > 1000 ? 0 : 50
  const tax = (subtotal - discount) * 0.07
  const total = subtotal - discount + shipping + tax

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  return (
    <motion.div
      className="cart-container"
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "tween", duration: 0.3 }}
    >
      <Link to="/" className="back-button">
        <ArrowLeft size={20} />
        Back to Home
      </Link>
      <h1>Your Cart</h1>
      <div className="cart-count">
        <ShoppingBag size={20} />
        <span>
          {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
        </span>
      </div>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <ShoppingBag size={64} />
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added any items to your cart yet.</p>
          <motion.button
            className="continue-shopping-button"
            onClick={onBackClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Browse Products
          </motion.button>
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-items">
            <div className="cart-items-header">
              <span className="product-col">Product</span>
              <span className="price-col">Price</span>
              <span className="quantity-col">Quantity</span>
              <span className="total-col">Total</span>
            </div>

            {cartItems.map((item) => (
              <div className="cart-item" key={item.id}>
                <div className="product-col">
                  <div className="cart-item-image">
                    <img src={item.image || "/placeholder.svg"} alt={item.name} />
                  </div>
                  <div className="cart-item-details">
                    <h3>{item.name}</h3>
                    <p className="cart-item-category">{item.category}</p>
                    <p className="cart-item-color">Color: {item.color}</p>
                    <button className="remove-item-button" onClick={() => removeItem(item.id)}>
                      <Trash2 size={14} />
                      Remove
                    </button>
                  </div>
                </div>

                <div className="price-col">
                  <span className="item-price">{formatCurrency(item.price)}</span>
                </div>

                <div className="quantity-col">
                  <div className="quantity-selector">
                    <button
                      className="quantity-button"
                      onClick={() => decreaseQuantity(item.id)}
                      disabled={item.quantity <= 1}
                    >
                      <Minus size={16} />
                    </button>
                    <span className="quantity-value">{item.quantity}</span>
                    <button className="quantity-button" onClick={() => increaseQuantity(item.id)}>
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                <div className="total-col">
                  <span className="item-total">{formatCurrency(item.price * item.quantity)}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>

            <div className="promo-code-section">
              <div className="promo-input-container">
                <Tag size={16} />
                <input
                  type="text"
                  placeholder="Promo Code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  disabled={promoApplied}
                />
                {promoApplied ? (
                  <button className="clear-promo-button" onClick={clearPromoCode}>
                    <X size={16} />
                  </button>
                ) : (
                  <button className="apply-promo-button" onClick={applyPromoCode} disabled={!promoCode}>
                    Apply
                  </button>
                )}
              </div>

              {promoApplied && (
                <div className="promo-success">
                  <Check size={14} />
                  <span>20% discount applied!</span>
                </div>
              )}

              {promoError && (
                <div className="promo-error">
                  <X size={14} />
                  <span>Invalid promo code</span>
                </div>
              )}

              <p className="promo-hint">Try "DISCOUNT20" for 20% off</p>
            </div>

            <div className="summary-details">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>

              {promoApplied && (
                <div className="summary-row discount">
                  <span>Discount (20%)</span>
                  <span>-{formatCurrency(discount)}</span>
                </div>
              )}

              <div className="summary-row">
                <span>Shipping</span>
                <span>{shipping === 0 ? "Free" : formatCurrency(shipping)}</span>
              </div>

              <div className="summary-row">
                <span>Tax (7%)</span>
                <span>{formatCurrency(tax)}</span>
              </div>

              <div className="summary-row total">
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>

            <motion.button className="checkout-button" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <CreditCard size={18} />
              Proceed to Checkout
            </motion.button>

            <div className="shipping-note">
              <p>Free shipping on orders over $1,000</p>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  )
}

export default Cart

