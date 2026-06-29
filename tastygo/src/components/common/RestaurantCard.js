// ─── RestaurantCard.js ────────────────────────────────────────────────────────
// Used on Home and Restaurants pages.
// Receives a restaurant object from mockData and links to its detail page.

import { Link } from 'react-router-dom';
import './RestaurantCard.css';

export default function RestaurantCard({ restaurant }) {
  const { id, name, category, rating, deliveryTime, deliveryFee, image, tags } = restaurant;

  return (
    <Link to={`/restaurants/${id}`} className="restaurant-card">
      <div className="rc-image-wrap">
        <img src={image} alt={name} className="rc-image" loading="lazy" />
        {tags.length > 0 && (
          <span className="rc-tag badge badge-primary">{tags[0]}</span>
        )}
      </div>

      <div className="rc-body">
        <div className="rc-header">
          <h3 className="rc-name">{name}</h3>
          <span className="rc-rating">⭐ {rating}</span>
        </div>

        <p className="rc-category">{category}</p>

        <div className="rc-meta">
          <span>🕐 {deliveryTime}</span>
          <span className="rc-dot" />
          <span>₹{deliveryFee} delivery</span>
        </div>
      </div>
    </Link>
  );
}
