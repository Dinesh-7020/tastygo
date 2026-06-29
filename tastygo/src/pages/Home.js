// ─── Home.js ──────────────────────────────────────────────────────────────────
// Landing page with hero, category filter, and featured restaurant grid.
// Search navigates to /restaurants with query param.

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { restaurants, categories } from '../data/mockData';
import RestaurantCard from '../components/common/RestaurantCard';
import CategoryFilter from '../components/common/CategoryFilter';
import SearchBar from '../components/common/SearchBar';
import './Home.css';

export default function Home() {
  const [query, setQuery]       = useState('');
  const [activecat, setActivecat] = useState('All');
  const navigate = useNavigate();

  const handleSearch = (val) => {
    setQuery(val);
    if (val.trim()) {
      navigate(`/restaurants?search=${encodeURIComponent(val.trim())}`);
    }
  };

  const filtered = restaurants.filter(r =>
    activecat === 'All' || r.category === activecat
  );

  return (
    <div className="home-page">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-text">
            <p className="hero-eyebrow">Free delivery on your first order</p>
            <h1 className="hero-title">
              Hungry?<br />
              <span className="hero-accent">We&apos;ve got you.</span>
            </h1>
            <p className="hero-sub">
              Order from the best local restaurants and get it delivered hot to your door.
            </p>
            <div className="hero-search">
              <SearchBar
                value={query}
                onChange={handleSearch}
                placeholder="Search for restaurants or dishes…"
              />
            </div>
          </div>

          <div className="hero-visual" aria-hidden="true">
            <div className="hero-blob" />
            <span className="hero-emoji">🍔</span>
            <span className="hero-emoji-2">🍕</span>
            <span className="hero-emoji-3">🍣</span>
          </div>
        </div>
      </section>

      {/* ── Stats strip ──────────────────────────────────────────────────── */}
      <section className="stats-strip">
        <div className="container stats-inner">
          <div className="stat"><strong>50+</strong><span>Restaurants</span></div>
          <div className="stat-divider" />
          <div className="stat"><strong>30 min</strong><span>Avg delivery</span></div>
          <div className="stat-divider" />
          <div className="stat"><strong>4.6 ★</strong><span>Avg rating</span></div>
          <div className="stat-divider" />
          <div className="stat"><strong>10k+</strong><span>Happy orders</span></div>
        </div>
      </section>

      {/* ── Browse by category ───────────────────────────────────────────── */}
      <section className="container section-gap">
        <h2 className="section-title">Browse by Category</h2>
        <CategoryFilter
          categories={categories}
          active={activecat}
          onSelect={setActivecat}
        />
      </section>

      {/* ── Restaurant grid ──────────────────────────────────────────────── */}
      <section className="container section-gap">
        <h2 className="section-title">
          {activecat === 'All' ? 'All Restaurants' : activecat}
          <span className="section-count">{filtered.length}</span>
        </h2>

        {filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🍽️</div>
            <h3>No restaurants found</h3>
            <p>Try a different category.</p>
          </div>
        ) : (
          <div className="restaurant-grid">
            {filtered.map(r => <RestaurantCard key={r.id} restaurant={r} />)}
          </div>
        )}
      </section>

    </div>
  );
}
