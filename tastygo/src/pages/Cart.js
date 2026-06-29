// ─── Cart.js ──────────────────────────────────────────────────────────────────
// Shows all cart items with quantity controls, subtotal, and delivery fee.
// Reads/updates cart via useCart() hook.

import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Cart.css';

const DELIVERY_FEE = 29;
const TAXES_RATE   = 0.05; // 5 %

export default function Cart() {
  const { cart, totalItems, subtotal, removeItem, updateQty, clearCart } = useCart();

  if (totalItems === 0) {
    return (
      <div className="page container">
        <div className="empty-state">
          <div className="empty-icon">🛒</div>
          <h3>Your cart is empty</h3>
          <p>Add some delicious items from our restaurants!</p>
          <Link to="/restaurants" className="btn btn-primary">Browse Restaurants</Link>
        </div>
      </div>
    );
  }

  const taxes   = Math.round(subtotal * TAXES_RATE);
  const total   = subtotal + DELIVERY_FEE + taxes;

  return (
    <div className="page container cart-page">
      <h1 className="page-title">Your Cart</h1>
      {cart.restaurantName && (
        <p className="page-subtitle">From <strong>{cart.restaurantName}</strong></p>
      )}

      <div className="cart-layout">

        {/* ── Items ──────────────────────────────────────────────────────── */}
        <div className="cart-items">
          <div className="cart-items-header">
            <span>{totalItems} item{totalItems > 1 ? 's' : ''}</span>
            <button className="btn-ghost" onClick={clearCart} style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-primary)' }}>
              Clear cart
            </button>
          </div>

          {cart.items.map(item => (
            <div key={item.id} className="cart-row">
              <div className="cart-row-info">
                <span className={`veg-dot ${item.isVeg ? 'veg' : 'nonveg'}`} />
                <div>
                  <p className="cart-item-name">{item.name}</p>
                  <p className="cart-item-price">₹{item.price} each</p>
                </div>
              </div>

              <div className="cart-row-controls">
                <div className="qty-control">
                  <button onClick={() => updateQty(item.id, item.quantity - 1)}>−</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQty(item.id, item.quantity + 1)}>+</button>
                </div>
                <p className="cart-row-total">₹{item.price * item.quantity}</p>
                <button
                  className="cart-remove"
                  onClick={() => removeItem(item.id)}
                  aria-label="Remove item"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ── Bill summary ─────────────────────────────────────────────── */}
        <aside className="cart-summary">
          <h2 className="cart-summary-title">Bill Details</h2>

          <div className="bill-row"><span>Item total</span>         <span>₹{subtotal}</span></div>
          <div className="bill-row"><span>Delivery fee</span>       <span>₹{DELIVERY_FEE}</span></div>
          <div className="bill-row"><span>Taxes & charges</span>    <span>₹{taxes}</span></div>
          <hr className="divider" />
          <div className="bill-row bill-total"><span>To Pay</span>  <span>₹{total}</span></div>

          <Link to="/checkout" className="btn btn-primary cart-checkout-btn">
            Proceed to Checkout →
          </Link>

          <Link to="/restaurants" className="cart-continue">
            + Add more items
          </Link>
        </aside>
      </div>
    </div>
  );
}
