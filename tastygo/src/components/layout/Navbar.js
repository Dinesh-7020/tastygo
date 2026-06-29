// ─── Navbar.js ───────────────────────────────────────────────────────────────
// Sticky top navigation. Shows cart item count badge from CartContext.
// NavLink from react-router-dom gives active class automatically.

import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './Navbar.css';

export default function Navbar() {
  const { totalItems } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="container navbar-inner">

        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">🍔</span>
          <span className="logo-text">TastyGo</span>
        </Link>

        {/* Desktop nav links */}
        <nav className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          <NavLink to="/"            end onClick={() => setMenuOpen(false)}>Home</NavLink>
          <NavLink to="/restaurants"     onClick={() => setMenuOpen(false)}>Restaurants</NavLink>
          <NavLink to="/cart"            onClick={() => setMenuOpen(false)} className="cart-link">
            🛒 Cart
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </NavLink>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="hamburger"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen(o => !o)}
        >
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
}
