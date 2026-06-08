import React, { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import api from '../utils/api';
import ProductCard from '../components/common/ProductCard';
import './Shop.css';

const SORT_OPTIONS = [
  { label: 'Newest', value: 'created-DESC' },
  { label: 'Price: Low to High', value: 'price-ASC' },
  { label: 'Price: High to Low', value: 'price-DESC' },
  { label: 'Top Rated', value: 'rating-DESC' },
  { label: 'Best Selling', value: 'sold-DESC' },
];

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, total: 0, pages: 1 });
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  const category = searchParams.get('category') || '';
  const search = searchParams.get('search') || '';
  const sort = searchParams.get('sort') || 'created-DESC';
  const page = parseInt(searchParams.get('page') || '1');
  const minPrice = searchParams.get('minPrice') || '';
  const maxPrice = searchParams.get('maxPrice') || '';
  const inStock = searchParams.get('inStock') || '';
  const featured = searchParams.get('featured') || '';

  const updateParam = (key, val) => {
    const p = new URLSearchParams(searchParams);
    if (val) p.set(key, val); else p.delete(key);
    p.delete('page');
    setSearchParams(p);
  };

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const [sortField, sortOrder] = sort.split('-');
      const params = new URLSearchParams({ page, limit: 12, sort: sortField, order: sortOrder });
      if (category) params.set('category', category);
      if (search) params.set('search', search);
      if (minPrice) params.set('minPrice', minPrice);
      if (maxPrice) params.set('maxPrice', maxPrice);
      if (inStock) params.set('inStock', inStock);
      if (featured) params.set('featured', featured);

      const res = await api.get(`/products?${params}`);
      setProducts(res.data.data || []);
      setPagination(res.data.pagination || {});
    } finally {
      setLoading(false);
    }
  }, [category, search, sort, page, minPrice, maxPrice, inStock, featured]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    api.get('/products/categories').then(res => setCategories(res.data.data || []));
  }, []);

  const clearFilters = () => setSearchParams({});

  const hasFilters = category || search || minPrice || maxPrice || inStock || featured;

  return (
    <div className="shop-page">
      <div className="container">
        {/* Header */}
        <div className="shop-header">
          <div>
            <h1>
              {search ? `Results for "${search}"` :
               category ? categories.find(c => c.slug === category)?.name || 'Products' :
               featured ? 'Featured Products' : 'All Products'}
            </h1>
            <p>{pagination.total || 0} products found</p>
          </div>
          <div className="shop-controls">
            <button className="btn-filter" onClick={() => setShowFilters(!showFilters)}>
              <SlidersHorizontal size={16} /> Filters
            </button>
            <select
              className="sort-select"
              value={sort}
              onChange={e => updateParam('sort', e.target.value)}
            >
              {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        </div>

        <div className="shop-body">
          {/* Sidebar Filters */}
          <aside className={`shop-sidebar ${showFilters ? 'open' : ''}`}>
            <div className="sidebar-header">
              <span><Filter size={16} /> Filters</span>
              {hasFilters && <button onClick={clearFilters} className="clear-btn"><X size={14} /> Clear</button>}
            </div>

            {/* Categories */}
            <div className="filter-group">
              <h4>Category</h4>
              <div className="filter-options">
                <label className="filter-option">
                  <input type="radio" checked={!category} onChange={() => updateParam('category', '')} />
                  <span>All Categories</span>
                </label>
                {categories.map(c => (
                  <label key={c._id} className="filter-option">
                    <input type="radio" checked={category === c.slug} onChange={() => updateParam('category', c.slug)} />
                    <span>{c.name} <em>{c.product_count}</em></span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="filter-group">
              <h4>Price Range</h4>
              <div className="price-inputs">
                <input
                  type="number" placeholder="Min" value={minPrice}
                  onChange={e => updateParam('minPrice', e.target.value)}
                />
                <span>–</span>
                <input
                  type="number" placeholder="Max" value={maxPrice}
                  onChange={e => updateParam('maxPrice', e.target.value)}
                />
              </div>
            </div>

            {/* In Stock */}
            <div className="filter-group">
              <label className="filter-option">
                <input
                  type="checkbox"
                  checked={inStock === 'true'}
                  onChange={e => updateParam('inStock', e.target.checked ? 'true' : '')}
                />
                <span>In Stock Only</span>
              </label>
            </div>

            {/* Featured */}
            <div className="filter-group">
              <label className="filter-option">
                <input
                  type="checkbox"
                  checked={featured === 'true'}
                  onChange={e => updateParam('featured', e.target.checked ? 'true' : '')}
                />
                <span>Featured Only</span>
              </label>
            </div>
          </aside>

          {/* Products */}
          <main className="shop-main">
            {loading ? (
              <div className="product-grid">
                {[...Array(12)].map((_, i) => <div key={i} className="skeleton-card" />)}
              </div>
            ) : products.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">🔍</div>
                <h3>No products found</h3>
                <p>Try adjusting your filters or search query.</p>
                <button onClick={clearFilters} className="btn-primary">Clear Filters</button>
              </div>
            ) : (
              <>
                <div className="product-grid">
                  {products.map(p => <ProductCard key={p._id} product={p} />)}
                </div>

                {/* Pagination */}
                {pagination.pages > 1 && (
                  <div className="pagination">
                    <button
                      disabled={page <= 1}
                      onClick={() => updateParam('page', String(page - 1))}
                      className="page-btn"
                    >
                      Previous
                    </button>
                    {[...Array(pagination.pages)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => updateParam('page', String(i + 1))}
                        className={`page-btn ${page === i + 1 ? 'active' : ''}`}
                      >
                        {i + 1}
                      </button>
                    ))}
                    <button
                      disabled={page >= pagination.pages}
                      onClick={() => updateParam('page', String(page + 1))}
                      className="page-btn"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
