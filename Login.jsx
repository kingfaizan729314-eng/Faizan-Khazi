.shop-page { padding: 2rem 0 4rem; min-height: 100vh; }

.shop-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.shop-header h1 { font-size: 1.5rem; font-weight: 700; color: #0f172a; }
.shop-header p { color: #64748b; font-size: 0.875rem; margin-top: 0.2rem; }

.shop-controls { display: flex; gap: 0.75rem; align-items: center; }

.btn-filter {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: #fff;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  transition: all 0.15s;
}
.btn-filter:hover { border-color: #3b82f6; color: #3b82f6; }

.sort-select {
  padding: 0.5rem 0.875rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: #fff;
  font-size: 0.875rem;
  color: #374151;
  cursor: pointer;
  outline: none;
}
.sort-select:focus { border-color: #3b82f6; }

.shop-body { display: flex; gap: 1.5rem; align-items: flex-start; }

/* Sidebar */
.shop-sidebar {
  width: 240px;
  flex-shrink: 0;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1.25rem;
  position: sticky;
  top: 80px;
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.25rem;
  font-weight: 600;
  color: #0f172a;
  font-size: 0.95rem;
}

.clear-btn {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background: transparent;
  border: none;
  color: #ef4444;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 500;
}

.filter-group { margin-bottom: 1.25rem; border-bottom: 1px solid #f1f5f9; padding-bottom: 1.25rem; }
.filter-group:last-child { border-bottom: none; margin-bottom: 0; }
.filter-group h4 { font-size: 0.8rem; font-weight: 700; color: #374151; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.75rem; }

.filter-options { display: flex; flex-direction: column; gap: 0.5rem; max-height: 220px; overflow-y: auto; }

.filter-option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-size: 0.875rem;
  color: #374151;
}
.filter-option input { cursor: pointer; accent-color: #3b82f6; }
.filter-option em { color: #94a3b8; font-style: normal; font-size: 0.78rem; margin-left: 0.25rem; }

.price-inputs {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.price-inputs input {
  width: 80px;
  padding: 0.4rem 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 0.875rem;
  outline: none;
}
.price-inputs input:focus { border-color: #3b82f6; }
.price-inputs span { color: #9ca3af; }

/* Main */
.shop-main { flex: 1; min-width: 0; }

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
  gap: 1.25rem;
}

.skeleton-card {
  height: 320px;
  background: linear-gradient(90deg, #f8f8f8 25%, #eeeeee 50%, #f8f8f8 75%);
  background-size: 200% 100%;
  animation: shimmer 1.4s infinite;
  border-radius: 12px;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* Empty state */
.empty-state {
  text-align: center;
  padding: 5rem 2rem;
}
.empty-icon { font-size: 3rem; margin-bottom: 1rem; }
.empty-state h3 { font-size: 1.25rem; font-weight: 600; color: #0f172a; margin-bottom: 0.5rem; }
.empty-state p { color: #64748b; margin-bottom: 1.5rem; }

/* Pagination */
.pagination {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 2.5rem;
  flex-wrap: wrap;
}

.page-btn {
  padding: 0.45rem 0.875rem;
  border: 1px solid #e2e8f0;
  border-radius: 7px;
  background: #fff;
  color: #374151;
  cursor: pointer;
  font-size: 0.875rem;
  transition: all 0.15s;
}
.page-btn:hover:not(:disabled) { border-color: #3b82f6; color: #3b82f6; }
.page-btn.active { background: #3b82f6; color: #fff; border-color: #3b82f6; }
.page-btn:disabled { opacity: 0.4; cursor: not-allowed; }

@media (max-width: 900px) {
  .shop-sidebar { display: none; }
  .shop-sidebar.open {
    display: block;
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    z-index: 200;
    border-radius: 0;
    overflow-y: auto;
    width: 100%;
  }
}
