import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Shield, Truck, RotateCcw } from 'lucide-react';
import api from '../utils/api';
import ProductCard from '../components/common/ProductCard';
import './Home.css';

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [fp, cp] = await Promise.all([
          api.get('/products/featured'),
          api.get('/products/categories'),
        ]);
        setFeatured(fp.data.data || []);
        setCategories((cp.data.data || []).slice(0, 8));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const catIcons = {
    laptops: '💻', smartphones: '📱', headphones: '🎧',
    monitors: '🖥️', keyboards: '⌨️', mice: '🖱️',
    storage: '💾', accessories: '🔌',
  };

  return (
    <div className="home">
      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge"><Zap size={14} /> New Arrivals 2025</div>
          <h1>The Future of <span className="hero-accent">Tech</span><br />Is Here</h1>
          <p>Discover cutting-edge laptops, smartphones, headphones and more. Premium tech at competitive prices.</p>
          <div className="hero-btns">
            <Link to="/shop" className="btn-primary">Shop Now <ArrowRight size={16} /></Link>
            <Link to="/shop?featured=true" className="btn-secondary">Featured Products</Link>
          </div>
          <div className="hero-stats">
            <div><strong>500+</strong><span>Products</span></div>
            <div><strong>10K+</strong><span>Customers</span></div>
            <div><strong>4.8★</strong><span>Rating</span></div>
          </div>
        </div>
        <div className="hero-image">
          <img src="https://images.unsplash.com/photo-1593640408182-31c228f90e24?w=700" alt="Tech products" />
        </div>
      </section>

      {/* Trust badges */}
      <section className="trust-badges">
        <div className="trust-inner">
          {[
            { icon: <Truck size={22} />, title: 'Free Shipping', desc: 'On orders over $99' },
            { icon: <Shield size={22} />, title: 'Secure Payment', desc: '256-bit SSL encryption' },
            { icon: <RotateCcw size={22} />, title: '30-Day Returns', desc: 'Hassle-free returns' },
            { icon: <Zap size={22} />, title: 'Fast Delivery', desc: '2-3 business days' },
          ].map((b, i) => (
            <div key={i} className="trust-item">
              <div className="trust-icon">{b.icon}</div>
              <div>
                <strong>{b.title}</strong>
                <p>{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>Shop by Category</h2>
            <Link to="/shop" className="see-all">View All <ArrowRight size={15} /></Link>
          </div>
          <div className="categories-grid">
            {categories.map(cat => (
              <Link to={`/shop?category=${cat.slug}`} key={cat._id} className="category-card">
                <div className="cat-icon">{catIcons[cat.slug] || '🔧'}</div>
                <div className="cat-name">{cat.name}</div>
                <div className="cat-count">{cat.product_count} items</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section bg-gray">
        <div className="container">
          <div className="section-header">
            <h2>Featured Products</h2>
            <Link to="/shop?featured=true" className="see-all">View All <ArrowRight size={15} /></Link>
          </div>
          {loading ? (
            <div className="product-grid-skeleton">
              {[...Array(8)].map((_, i) => <div key={i} className="skeleton-card" />)}
            </div>
          ) : (
            <div className="product-grid">
              {featured.map(p => <ProductCard key={p._id} product={p} />)}
            </div>
          )}
        </div>
      </section>

      {/* Promo banner */}
      <section className="promo-banner">
        <div className="container">
          <div className="promo-inner">
            <div>
              <h2>Save up to 20% on your first order</h2>
              <p>Use code <strong>WELCOME15</strong> at checkout. No minimum order required.</p>
            </div>
            <Link to="/shop" className="btn-primary">Shop Now <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>
    </div>
  );
}
