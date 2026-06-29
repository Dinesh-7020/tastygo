// ─── Restaurants.js ───────────────────────────────────────────────────────────
// Full restaurant listing with live search + category filter.
// Reads ?search= query param from URL (set by Home page search).

import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { restaurants, categories } from '../data/mockData';
import RestaurantCard from '../components/common/RestaurantCard';
import SearchBar from '../components/common/SearchBar';
import CategoryFilter from '../components/common/CategoryFilter';
import './Restaurants.css';

export default function Restaurants() {
  const [searchParams]          = useSearchParams();
  const [query, setQuery]       = useState(searchParams.get('search') || '');
  const [activecat, setActivecat] = useState('All');

  const filtered = useMemo(() => {
    return restaurants.filter(r => {
      const matchesCat   = activecat === 'All' || r.category === activecat;
      const matchesQuery = !query.trim() ||
        r.name.toLowerCase().includes(query.toLowerCase()) ||
        r.category.toLowerCase().includes(query.toLowerCase()) ||
        r.description.toLowerCase().includes(query.toLowerCase());
      return matchesCat && matchesQuery;
    });
  }, [query, activecat]);

  return (
    <div className="page container restaurants-page">
      <h1 className="page-title">Restaurants</h1>
      <p className="page-subtitle">
        {filtered.length} {filtered.length === 1 ? 'restaurant' : 'restaurants'} available
      </p>

      {/* Search + Filter */}
      <div className="restaurants-toolbar">
        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder="Search restaurants or cuisines…"
        />
      </div>

      <div className="toolbar-bottom">
        <CategoryFilter
          categories={categories}
          active={activecat}
          onSelect={setActivecat}
        />
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <h3>No results found</h3>
          <p>Try a different search or category.</p>
          <button className="btn btn-primary" onClick={() => { setQuery(''); setActivecat('All'); }}>
            Clear filters
          </button>
        </div>
      ) : (
        <div className="restaurant-grid">
          {filtered.map(r => <RestaurantCard key={r.id} restaurant={r} />)}
        </div>
      )}
    </div>
  );
}
