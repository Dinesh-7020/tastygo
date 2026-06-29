// ─── RestaurantDetail.js ─────────────────────────────────────────────────────
// Shows restaurant info + menu grouped by category.
// Reads :id param from URL → looks up restaurant + menu in mockData.

import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { restaurants, menuItems } from '../data/mockData';
import MenuItem from '../components/common/MenuItem';
import { useCart } from '../context/CartContext';
import './RestaurantDetail.css';

export default function RestaurantDetail() {
  const { id }   = useParams();
  const { totalItems, subtotal, cart } = useCart();

  const restaurant = restaurants.find(r => r.id === id);
  const menu       = menuItems[id] || [];

  const [activeCategory, setActiveCategory] = useState('All');

  if (!restaurant) {
    return (
      <div className="page container">
        <div className="empty-state">
          <div className="empty-icon">🍽️</div>
          <h3>Restaurant not found</h3>
          <Link to="/restaurants" className="btn btn-primary">Browse restaurants</Link>
        </div>
      </div>
    );
  }

  // Build unique menu categories
  const menuCategories = ['All', ...new Set(menu.map(i => i.category))];

  const filteredMenu = activeCategory === 'All'
    ? menu
    : menu.filter(i => i.category === activeCategory);

  const isFromHere = cart.restaurantId === id;

  return (
    <div className="rd-page">

      {/* ── Hero banner ─────────────────────────────────────────────────── */}
      <div className="rd-banner">
        <img src={restaurant.image} alt={restaurant.name} className="rd-banner-img" />
        <div className="rd-banner-overlay" />
        <div className="container rd-banner-content">
          <Link to="/restaurants" className="rd-back">← All Restaurants</Link>
          <h1 className="rd-title">{restaurant.name}</h1>
          <p className="rd-desc">{restaurant.description}</p>
          <div className="rd-meta">
            <span>⭐ {restaurant.rating}</span>
            <span>🕐 {restaurant.deliveryTime}</span>
            <span>🚚 ₹{restaurant.deliveryFee} delivery</span>
            <span>Min order ₹{restaurant.minOrder}</span>
          </div>
        </div>
      </div>

      {/* ── Menu ────────────────────────────────────────────────────────── */}
      <div className="container rd-body">

        {/* Category tabs */}
        <div className="rd-tabs">
          {menuCategories.map(cat => (
            <button
              key={cat}
              className={`rd-tab ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="rd-layout">
          {/* Menu list */}
          <div className="rd-menu">
            <h2 className="rd-menu-title">
              {activeCategory === 'All' ? 'Full Menu' : activeCategory}
            </h2>
            {filteredMenu.map(item => (
              <MenuItem
                key={item.id}
                item={item}
                restaurantId={id}
                restaurantName={restaurant.name}
              />
            ))}
          </div>

          {/* Sticky cart summary */}
          {isFromHere && totalItems > 0 && (
            <aside className="rd-cart-sidebar">
              <div className="rd-cart-box">
                <h3 className="rd-cart-title">Your Order</h3>
                <div className="rd-cart-items">
                  {cart.items.map(item => (
                    <div key={item.id} className="rd-cart-row">
                      <span>{item.quantity}× {item.name}</span>
                      <span>₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
                <hr className="divider" />
                <div className="rd-cart-row rd-cart-total">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <Link to="/cart" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '12px' }}>
                  View Cart ({totalItems})
                </Link>
              </div>
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}
