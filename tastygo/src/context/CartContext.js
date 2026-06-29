// ─── CartContext.js ──────────────────────────────────────────────────────────
// Global cart state via Context API + useReducer.
// Wrap <App> with <CartProvider> so every page can read/update the cart.
// Consumer pages import useCart() hook — no prop drilling needed.

import { createContext, useContext, useReducer } from 'react';

const CartContext = createContext(null);

// ── Reducer ──────────────────────────────────────────────────────────────────
function cartReducer(state, action) {
  switch (action.type) {

    case 'ADD_ITEM': {
      const existing = state.items.find(i => i.id === action.item.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map(i =>
            i.id === action.item.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      return {
        ...state,
        restaurantId: action.restaurantId,
        restaurantName: action.restaurantName,
        items: [...state.items, { ...action.item, quantity: 1 }],
      };
    }

    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(i => i.id !== action.id),
        // Clear restaurant info when cart empties
        restaurantId: state.items.length === 1 ? null : state.restaurantId,
        restaurantName: state.items.length === 1 ? null : state.restaurantName,
      };

    case 'UPDATE_QUANTITY': {
      if (action.quantity <= 0) {
        return cartReducer(state, { type: 'REMOVE_ITEM', id: action.id });
      }
      return {
        ...state,
        items: state.items.map(i =>
          i.id === action.id ? { ...i, quantity: action.quantity } : i
        ),
      };
    }

    case 'CLEAR_CART':
      return initialState;

    default:
      return state;
  }
}

// ── Initial State ─────────────────────────────────────────────────────────────
const initialState = {
  items: [],
  restaurantId: null,
  restaurantName: null,
};

// ── Provider ──────────────────────────────────────────────────────────────────
export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, initialState);

  // Derived values — computed here so components don't repeat logic
  const totalItems = cart.items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal   = cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const addItem       = (item, restaurantId, restaurantName) =>
    dispatch({ type: 'ADD_ITEM', item, restaurantId, restaurantName });

  const removeItem    = (id)              => dispatch({ type: 'REMOVE_ITEM', id });
  const updateQty     = (id, quantity)    => dispatch({ type: 'UPDATE_QUANTITY', id, quantity });
  const clearCart     = ()                => dispatch({ type: 'CLEAR_CART' });

  return (
    <CartContext.Provider value={{ cart, totalItems, subtotal, addItem, removeItem, updateQty, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

// ── Hook ──────────────────────────────────────────────────────────────────────
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>');
  return ctx;
}
