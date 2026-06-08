import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, X, LogOut, Package, Settings, ChevronDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import api from '../../utils/api';
import './Navbar.css';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const searchRef = useRef();
  const userMenuRef = useRef();

  useEffect(() => {
    const handler = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) setShowSearch(false);
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) setShowUserMenu(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSearch = async (q) => {
    setSearch(q);
    if (q.length < 2) { setSearchResults([]); return; }
    try {
      const res = await api.get(`/products/search?q=${encodeURIComponent(q)}`);
      setSearchResults(res.data.data || []);
      setShowSearch(true);
    } catch {}
  };

  const submitSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/shop?search=${encodeURIComponent(search.trim())}`);
      setShowSearch(false);
      setSearch('');
    }
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">⚡</span>
          <span>TechStore</span>
        </Link>

        {/* Nav links */}
        <div className={`nav-links ${mobileOpen ? 'open' : ''}`}>
          <Link to="/" onClick={() => setMobileOpen(false)}>Home</Link>
          <Link to="/shop" onClick={() => setMobileOpen(false)}>Shop</Link>
          <Link to="/shop?category=laptops" onClick={() => setMobileOpen(false)}>Laptops</Link>
          <Link to="/shop?category=smartphones" onClick={() => setMobileOpen(false)}>Phones</Link>
          <Link to="/shop?category=headphones" onClick={() => setMobileOpen(false)}>Audio</Link>
        </div>

        {/* Right side */}
        <div className="navbar-right">
          {/* Search */}
          <div className="search-wrapper" ref={searchRef}>
            <form onSubmit={submitSearch} className="search-form">
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                className="search-input"
              />
              <button type="submit" className="search-btn"><Search size={16} /></button>
            </form>
            {showSearch && searchResults.length > 0 && (
              <div className="search-dropdown">
                {searchResults.map(p => (
                  <Link
                    key={p._id}
                    to={`/product/${p.slug}`}
                    className="search-item"
                    onClick={() => { setShowSearch(false); setSearch(''); }}
                  >
                    {p.images?.[0] && <img src={p.images[0]} alt={p.name} />}
                    <div>
                      <div className="search-item-name">{p.name}</div>
                      <div className="search-item-price">${p.price?.toFixed(2)}</div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Cart */}
          <Link to="/cart" className="cart-btn">
            <ShoppingCart size={20} />
            {cart.item_count > 0 && <span className="cart-badge">{cart.item_count}</span>}
          </Link>

          {/* User menu */}
          {user ? (
            <div className="user-menu-wrapper" ref={userMenuRef}>
              <button className="user-btn" onClick={() => setShowUserMenu(!showUserMenu)}>
                <User size={20} />
                <span className="user-name">{user.name.split(' ')[0]}</span>
                <ChevronDown size={14} />
              </button>
              {showUserMenu && (
                <div className="user-dropdown">
                  <div className="user-dropdown-header">
                    <span>{user.name}</span>
                    <small>{user.email}</small>
                  </div>
                  <Link to="/orders" onClick={() => setShowUserMenu(false)}><Package size={15} /> My Orders</Link>
                  <Link to="/profile" onClick={() => setShowUserMenu(false)}><Settings size={15} /> Profile</Link>
                  {user.role === 'admin' && (
                    <Link to="/admin" onClick={() => setShowUserMenu(false)}><Settings size={15} /> Admin Panel</Link>
                  )}
                  <button onClick={handleLogout} className="logout-btn"><LogOut size={15} /> Logout</button>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-links">
              <Link to="/login" className="btn-login">Login</Link>
              <Link to="/register" className="btn-register">Sign Up</Link>
            </div>
          )}

          {/* Mobile toggle */}
          <button className="mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
    </nav>
  );
}
