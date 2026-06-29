// ─── App.js ──────────────────────────────────────────────────────────────────
// Root component. Sets up React Router routes and wraps everything in CartProvider.
// Add new pages here by importing and adding a <Route>.

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Restaurants from './pages/Restaurants';
import RestaurantDetail from './pages/RestaurantDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import './styles/global.css';

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <div className="app-wrapper">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/"                      element={<Home />} />
              <Route path="/restaurants"           element={<Restaurants />} />
              <Route path="/restaurants/:id"       element={<RestaurantDetail />} />
              <Route path="/cart"                  element={<Cart />} />
              <Route path="/checkout"              element={<Checkout />} />
              <Route path="/order-success"         element={<OrderSuccess />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}
