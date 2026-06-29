# 🍔 TastyGo — Food Ordering MVP

A clean React food ordering web app built with functional components, Context API, and plain CSS.

---

## Quick Start

```bash
cd tastygo
npm install
npm start
# Opens at http://localhost:3000
```

---

## Folder Structure

```
tastygo/
├── public/
│   └── index.html              # HTML shell, loads Google Fonts
├── src/
│   ├── index.js                # React entry point
│   ├── App.js                  # Router + CartProvider wrapper
│   │
│   ├── data/
│   │   └── mockData.js         # ALL static data (restaurants, menus, categories)
│   │
│   ├── context/
│   │   └── CartContext.js      # Global cart state (useReducer + Context API)
│   │
│   ├── styles/
│   │   └── global.css          # Design tokens (:root CSS vars) + base styles
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.js/.css  # Sticky nav with cart badge
│   │   │   └── Footer.js/.css  # Simple footer
│   │   └── common/
│   │       ├── RestaurantCard.js/.css   # Card used on Home + Restaurants
│   │       ├── MenuItem.js/.css         # Menu item row with Add/Qty control
│   │       ├── SearchBar.js/.css        # Controlled search input
│   │       └── CategoryFilter.js/.css   # Pill filter buttons
│   │
│   └── pages/
│       ├── Home.js/.css              # Hero + category filter + restaurant grid
│       ├── Restaurants.js/.css       # Full listing with search + filter
│       ├── RestaurantDetail.js/.css  # Menu tabs + sticky cart sidebar
│       ├── Cart.js/.css              # Cart items + bill summary
│       ├── Checkout.js/.css          # Delivery form + payment selection
│       └── OrderSuccess.js/.css      # Confirmation + live tracker demo
```

---

## How Files Connect

```
index.js
  └── App.js
        ├── CartProvider (CartContext.js) ← wraps everything
        └── BrowserRouter
              ├── Navbar (reads totalItems from CartContext)
              ├── Pages (routes)
              │     ├── Home → RestaurantCard, CategoryFilter, SearchBar
              │     ├── Restaurants → RestaurantCard, SearchBar, CategoryFilter
              │     ├── RestaurantDetail → MenuItem (reads/writes CartContext)
              │     ├── Cart → reads CartContext, writes qty/remove
              │     ├── Checkout → reads CartContext, calls clearCart on submit
              │     └── OrderSuccess → reads router location.state
              └── Footer
```

---

## Key Design Decisions

| Decision | Reason |
|---|---|
| `useReducer` in CartContext | Predictable state transitions, easy to add new actions |
| CSS variables in `:root` | Change brand colors in one place |
| Each component has its own CSS file | No global conflicts, easy to find and edit |
| `mockData.js` is the single data source | Swap with a real API call later with minimal changes |
| `useMemo` on filtered restaurants | Prevents re-filtering on every keystroke |

---

## Customisation Tips

**Change brand colour:** Edit `--color-primary` in `src/styles/global.css`

**Add a restaurant:** Add an entry to `restaurants[]` and a menu array in `menuItems{}` in `mockData.js`

**Connect a real API:** Replace imports from `mockData.js` with `useEffect` + `fetch` calls in each page

**Add Redux later:** Replace `CartContext.js` with a Redux slice — component interfaces stay the same

---

## Tech Stack

- React 18 (functional components + hooks)
- React Router v6
- Context API + useReducer
- Plain CSS (no framework)
- ESLint (react + react-hooks plugins)
