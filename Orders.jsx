.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  background: #0f172a;
  color: #fff;
  box-shadow: 0 2px 16px rgba(0,0,0,0.3);
}

.navbar-inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1.5rem;
  height: 64px;
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.navbar-logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #fff;
  text-decoration: none;
  font-size: 1.25rem;
  font-weight: 700;
  white-space: nowrap;
}

.logo-icon { font-size: 1.4rem; }

.nav-links {
  display: flex;
  gap: 0.25rem;
}

.nav-links a {
  color: #94a3b8;
  text-decoration: none;
  padding: 0.4rem 0.75rem;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.15s;
}

.nav-links a:hover { color: #fff; background: rgba(255,255,255,0.08); }

.navbar-right {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

/* Search */
.search-wrapper { position: relative; }

.search-form {
  display: flex;
  align-items: center;
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 8px;
  overflow: hidden;
}

.search-input {
  background: transparent;
  border: none;
  outline: none;
  color: #fff;
  padding: 0.45rem 0.75rem;
  width: 200px;
  font-size: 0.875rem;
}

.search-input::placeholder { color: #64748b; }

.search-btn {
  background: transparent;
  border: none;
  color: #94a3b8;
  padding: 0.45rem 0.6rem;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.search-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0,0,0,0.4);
  min-width: 320px;
}

.search-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.65rem 1rem;
  color: #e2e8f0;
  text-decoration: none;
  transition: background 0.15s;
}

.search-item:hover { background: rgba(255,255,255,0.06); }

.search-item img {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 6px;
  background: #334155;
}

.search-item-name { font-size: 0.875rem; font-weight: 500; }
.search-item-price { font-size: 0.8rem; color: #38bdf8; }

/* Cart */
.cart-btn {
  position: relative;
  color: #94a3b8;
  text-decoration: none;
  display: flex;
  align-items: center;
  padding: 0.4rem;
  border-radius: 8px;
  transition: all 0.15s;
}

.cart-btn:hover { color: #fff; background: rgba(255,255,255,0.08); }

.cart-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  background: #3b82f6;
  color: #fff;
  font-size: 0.65rem;
  font-weight: 700;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* User menu */
.user-menu-wrapper { position: relative; }

.user-btn {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.1);
  color: #fff;
  padding: 0.4rem 0.75rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.875rem;
  transition: all 0.15s;
}

.user-btn:hover { background: rgba(255,255,255,0.12); }
.user-name { max-width: 80px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

.user-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 10px;
  min-width: 200px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.4);
  overflow: hidden;
}

.user-dropdown-header {
  padding: 0.875rem 1rem;
  border-bottom: 1px solid #334155;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.user-dropdown-header span { font-weight: 600; color: #f1f5f9; font-size: 0.9rem; }
.user-dropdown-header small { color: #64748b; font-size: 0.75rem; }

.user-dropdown a,
.logout-btn {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.65rem 1rem;
  color: #cbd5e1;
  text-decoration: none;
  font-size: 0.875rem;
  transition: background 0.15s;
  width: 100%;
  border: none;
  background: transparent;
  cursor: pointer;
  text-align: left;
}

.user-dropdown a:hover, .logout-btn:hover { background: rgba(255,255,255,0.06); color: #fff; }
.logout-btn { color: #f87171; }
.logout-btn:hover { background: rgba(248,113,113,0.08); color: #f87171; }

/* Auth links */
.auth-links { display: flex; gap: 0.5rem; align-items: center; }

.btn-login {
  color: #94a3b8;
  text-decoration: none;
  padding: 0.4rem 0.75rem;
  font-size: 0.875rem;
  border-radius: 6px;
  transition: all 0.15s;
}
.btn-login:hover { color: #fff; }

.btn-register {
  background: #3b82f6;
  color: #fff;
  text-decoration: none;
  padding: 0.4rem 0.875rem;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.15s;
}
.btn-register:hover { background: #2563eb; }

/* Mobile */
.mobile-toggle {
  display: none;
  background: transparent;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  padding: 0.3rem;
}

@media (max-width: 768px) {
  .mobile-toggle { display: flex; align-items: center; }
  .search-input { width: 120px; }

  .nav-links {
    display: none;
    position: absolute;
    top: 64px;
    left: 0;
    right: 0;
    background: #0f172a;
    flex-direction: column;
    padding: 1rem;
    border-bottom: 1px solid #1e293b;
  }

  .nav-links.open { display: flex; }
  .nav-links a { padding: 0.65rem 1rem; }
  .user-name { display: none; }
}
