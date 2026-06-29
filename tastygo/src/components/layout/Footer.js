// ─── Footer.js ───────────────────────────────────────────────────────────────
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <span className="footer-logo">🍔 TastyGo</span>
          <p>Great food, delivered fast.</p>
        </div>
        <nav className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/restaurants">Restaurants</Link>
          <Link to="/cart">Cart</Link>
        </nav>
        <p className="footer-copy">© {new Date().getFullYear()} TastyGo. MVP build.</p>
      </div>
    </footer>
  );
}
