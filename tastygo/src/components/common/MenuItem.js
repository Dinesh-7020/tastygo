// ─── MenuItem.js ─────────────────────────────────────────────────────────────
// Used on RestaurantDetail page for each menu item.
// Reads cart state to show current quantity and +/- controls.

import { useCart } from '../../context/CartContext';
import './MenuItem.css';

export default function MenuItem({ item, restaurantId, restaurantName }) {
  const { cart, addItem, updateQty } = useCart();

  const cartItem = cart.items.find(i => i.id === item.id);
  const qty      = cartItem ? cartItem.quantity : 0;

  // If items are from a different restaurant, disable adding
  const differentRestaurant = cart.restaurantId && cart.restaurantId !== restaurantId;

  return (
    <div className="menu-item">
      <div className="mi-info">
        <div className="mi-header">
          <span className={`veg-dot ${item.isVeg ? 'veg' : 'nonveg'}`} title={item.isVeg ? 'Veg' : 'Non-veg'} />
          <h4 className="mi-name">{item.name}</h4>
        </div>
        <p className="mi-desc">{item.description}</p>
        <p className="mi-price">₹{item.price}</p>
      </div>

      <div className="mi-right">
        {item.image && (
          <img src={item.image} alt={item.name} className="mi-image" loading="lazy" />
        )}

        <div className="mi-action">
          {qty === 0 ? (
            <button
              className="btn btn-outline mi-add-btn"
              onClick={() => addItem(item, restaurantId, restaurantName)}
              disabled={differentRestaurant}
              title={differentRestaurant ? 'Clear cart to order from a different restaurant' : ''}
            >
              {differentRestaurant ? 'Different restaurant' : '+ Add'}
            </button>
          ) : (
            <div className="qty-control">
              <button onClick={() => updateQty(item.id, qty - 1)}>−</button>
              <span>{qty}</span>
              <button onClick={() => updateQty(item.id, qty + 1)}>+</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
