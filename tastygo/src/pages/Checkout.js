// ─── Checkout.js ─────────────────────────────────────────────────────────────
// Delivery details form + order summary.
// On submit → clears cart and navigates to /order-success.

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Checkout.css';

const DELIVERY_FEE = 29;
const TAXES_RATE   = 0.05;

const initialForm = {
  name: '', phone: '', email: '',
  address: '', city: '', pincode: '',
  paymentMethod: 'cod',
};

export default function Checkout() {
  const { cart, totalItems, subtotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [form,   setForm]   = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [placing, setPlacing] = useState(false);

  if (totalItems === 0) {
    return (
      <div className="page container">
        <div className="empty-state">
          <div className="empty-icon">🛒</div>
          <h3>Nothing to checkout</h3>
          <Link to="/restaurants" className="btn btn-primary">Browse Restaurants</Link>
        </div>
      </div>
    );
  }

  const taxes = Math.round(subtotal * TAXES_RATE);
  const total = subtotal + DELIVERY_FEE + taxes;

  // ── Validation ──────────────────────────────────────────────────────────────
  function validate() {
    const e = {};
    if (!form.name.trim())                      e.name    = 'Name is required';
    if (!/^\d{10}$/.test(form.phone))           e.phone   = 'Enter a valid 10-digit number';
    if (!/\S+@\S+\.\S+/.test(form.email))       e.email   = 'Enter a valid email';
    if (!form.address.trim())                   e.address = 'Address is required';
    if (!form.city.trim())                      e.city    = 'City is required';
    if (!/^\d{6}$/.test(form.pincode))          e.pincode = 'Enter a valid 6-digit pincode';
    return e;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (errors[name]) setErrors(er => ({ ...er, [name]: '' }));
  }

  function handleSubmit() {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }

    setPlacing(true);
    // Simulate API delay
    setTimeout(() => {
      clearCart();
      navigate('/order-success', { state: { name: form.name, total } });
    }, 1200);
  }

  // ── Field helper ────────────────────────────────────────────────────────────
  function Field({ label, name, type = 'text', placeholder }) {
    return (
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={form[name]}
          onChange={handleChange}
          className={errors[name] ? 'input-error' : ''}
        />
        {errors[name] && <p className="field-error">{errors[name]}</p>}
      </div>
    );
  }

  return (
    <div className="page container checkout-page">
      <h1 className="page-title">Checkout</h1>

      <div className="checkout-layout">

        {/* ── Form ───────────────────────────────────────────────────────── */}
        <div className="checkout-form">

          <section className="form-section">
            <h2 className="form-section-title">📍 Delivery Details</h2>
            <Field label="Full Name"    name="name"    placeholder="Dinesh Sonawane" />
            <div className="form-row">
              <Field label="Phone"      name="phone"   type="tel"   placeholder="9876543210" />
              <Field label="Email"      name="email"   type="email" placeholder="you@email.com" />
            </div>
            <Field label="Full Address" name="address" placeholder="House no, Street, Area" />
            <div className="form-row">
              <Field label="City"       name="city"    placeholder="Pune" />
              <Field label="Pincode"    name="pincode" placeholder="411001" />
            </div>
          </section>

          <section className="form-section">
            <h2 className="form-section-title">💳 Payment Method</h2>
            <div className="payment-options">
              {[
                { value: 'cod',   label: '💵 Cash on Delivery', desc: 'Pay when your order arrives' },
                { value: 'upi',   label: '📱 UPI',               desc: 'Pay via any UPI app' },
                { value: 'card',  label: '💳 Credit / Debit Card', desc: 'Visa, Mastercard, RuPay' },
              ].map(opt => (
                <label key={opt.value} className={`payment-option ${form.paymentMethod === opt.value ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={opt.value}
                    checked={form.paymentMethod === opt.value}
                    onChange={handleChange}
                  />
                  <div>
                    <p className="pay-label">{opt.label}</p>
                    <p className="pay-desc">{opt.desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </section>

        </div>

        {/* ── Order summary ──────────────────────────────────────────────── */}
        <aside className="checkout-summary">
          <h2 className="cart-summary-title">Order Summary</h2>
          {cart.restaurantName && (
            <p className="co-restaurant">From: <strong>{cart.restaurantName}</strong></p>
          )}

          <div className="co-items">
            {cart.items.map(item => (
              <div key={item.id} className="co-item-row">
                <span>{item.quantity}× {item.name}</span>
                <span>₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>

          <hr className="divider" />

          <div className="bill-row"><span>Item total</span>      <span>₹{subtotal}</span></div>
          <div className="bill-row"><span>Delivery fee</span>    <span>₹{DELIVERY_FEE}</span></div>
          <div className="bill-row"><span>Taxes</span>           <span>₹{taxes}</span></div>
          <hr className="divider" />
          <div className="bill-row bill-total"><span>Total</span><span>₹{total}</span></div>

          <button
            className="btn btn-primary co-place-btn"
            onClick={handleSubmit}
            disabled={placing}
          >
            {placing ? '⏳ Placing order…' : `Place Order · ₹${total}`}
          </button>

          <Link to="/cart" className="co-back">← Back to Cart</Link>
        </aside>

      </div>
    </div>
  );
}
