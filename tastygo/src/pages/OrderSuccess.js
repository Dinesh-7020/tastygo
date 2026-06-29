// ─── OrderSuccess.js ──────────────────────────────────────────────────────────
// Shown after successful checkout. Reads name + total from router location state.

import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './OrderSuccess.css';

export default function OrderSuccess() {
  const { state }  = useLocation();
  const navigate   = useNavigate();
  const [seconds, setSeconds] = useState(45);

  // Fake delivery countdown
  useEffect(() => {
    if (seconds <= 0) return;
    const t = setTimeout(() => setSeconds(s => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds]);

  // If someone lands here directly with no state, redirect home
  useEffect(() => {
    if (!state) navigate('/', { replace: true });
  }, [state, navigate]);

  if (!state) return null;

  const orderId = `TG${Date.now().toString().slice(-6)}`;

  return (
    <div className="page container success-page">
      <div className="success-card">

        {/* Checkmark animation */}
        <div className="success-icon-wrap">
          <div className="success-icon">✓</div>
        </div>

        <h1 className="success-title">Order Placed! 🎉</h1>
        <p className="success-sub">
          Hey <strong>{state.name}</strong>, your order is confirmed and on its way!
        </p>

        <div className="success-details">
          <div className="detail-row">
            <span>Order ID</span>
            <strong>#{orderId}</strong>
          </div>
          <div className="detail-row">
            <span>Amount Paid</span>
            <strong>₹{state.total}</strong>
          </div>
          <div className="detail-row">
            <span>Estimated delivery</span>
            <strong>30–40 min</strong>
          </div>
        </div>

        {/* Fake live tracker */}
        <div className="tracker">
          <div className="tracker-steps">
            {['Order placed', 'Preparing', 'On the way', 'Delivered'].map((step, i) => (
              <div key={step} className={`tracker-step ${i <= 1 ? 'done' : ''} ${i === 2 ? 'active' : ''}`}>
                <div className="tracker-dot" />
                <span>{step}</span>
              </div>
            ))}
          </div>
          <p className="tracker-eta">🛵 Arriving in ~{seconds}s (demo countdown)</p>
        </div>

        <div className="success-actions">
          <Link to="/" className="btn btn-primary">Back to Home</Link>
          <Link to="/restaurants" className="btn btn-outline">Order Again</Link>
        </div>
      </div>
    </div>
  );
}
