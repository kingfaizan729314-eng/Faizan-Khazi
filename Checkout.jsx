/* Admin layout */
.admin-layout { display: flex; min-height: 100vh; background: #f8fafc; }

.admin-sidebar {
  width: 240px;
  background: #0f172a;
  color: #fff;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  position: fixed;
  top: 0; left: 0; bottom: 0;
  z-index: 50;
  overflow-y: auto;
}

.admin-logo { padding: 1.25rem 1.5rem; font-size: 1rem; font-weight: 800; border-bottom: 1px solid rgba(255,255,255,0.07); }

.admin-nav { flex: 1; padding: 0.75rem 0; }
.admin-nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.7rem 1.5rem;
  color: #94a3b8;
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.15s;
}
.admin-nav-item:hover { color: #fff; background: rgba(255,255,255,0.07); }
.admin-nav-item.active { color: #fff; background: rgba(59,130,246,0.2); border-right: 3px solid #3b82f6; }

.admin-logout {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1.5rem;
  color: #f87171;
  background: transparent;
  border: none;
  border-top: 1px solid rgba(255,255,255,0.07);
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  width: 100%;
  text-align: left;
}
.admin-logout:hover { background: rgba(248,113,113,0.08); }

.admin-main { flex: 1; margin-left: 240px; display: flex; flex-direction: column; }

.admin-topbar {
  background: #fff;
  border-bottom: 1px solid #e2e8f0;
  padding: 0.75rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.admin-menu-toggle { display: none; background: transparent; border: none; cursor: pointer; color: #374151; }
.admin-user { font-size: 0.875rem; color: #374151; font-weight: 500; }

.admin-content { padding: 1.75rem; flex: 1; }

/* Page heading */
.admin-page-title { font-size: 1.375rem; font-weight: 700; color: #0f172a; margin-bottom: 1.5rem; }

.admin-loading { padding: 3rem; text-align: center; color: #64748b; }

/* Stat grid */
.stat-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin-bottom: 1.75rem; }

.stat-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 1.25rem; border-left: 4px solid #e2e8f0; }
.stat-card.blue { border-left-color: #3b82f6; }
.stat-card.green { border-left-color: #22c55e; }
.stat-card.purple { border-left-color: #a855f7; }
.stat-card.yellow { border-left-color: #eab308; }
.stat-card.red { border-left-color: #ef4444; }

.stat-value { font-size: 1.5rem; font-weight: 800; color: #0f172a; margin-bottom: 0.25rem; }
.stat-label { font-size: 0.8rem; color: #64748b; font-weight: 500; }

/* Dashboard grid */
.dashboard-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }

/* Cards */
.admin-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 1.25rem; }
.card-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem; }
.card-header h3 { font-size: 0.95rem; font-weight: 700; color: #0f172a; }
.card-header a { font-size: 0.8rem; color: #3b82f6; text-decoration: none; }
.card-header button { font-size: 0.8rem; background: #3b82f6; color: #fff; border: none; padding: 0.35rem 0.875rem; border-radius: 6px; cursor: pointer; font-weight: 600; }

/* Tables */
.admin-table { width: 100%; border-collapse: collapse; font-size: 0.875rem; }
.admin-table th { text-align: left; padding: 0.5rem 0.75rem; font-size: 0.75rem; font-weight: 700; color: #64748b; text-transform: uppercase; border-bottom: 1px solid #f1f5f9; }
.admin-table td { padding: 0.65rem 0.75rem; color: #374151; border-bottom: 1px solid #f8fafc; vertical-align: middle; }
.admin-table tr:last-child td { border-bottom: none; }
.admin-table tr:hover td { background: #fafafa; }
.product-name-cell { font-weight: 600; color: #0f172a; max-width: 180px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.low-stock { color: #ef4444 !important; font-weight: 700; }

/* Status badges */
.status-badge { display: inline-block; padding: 0.2rem 0.6rem; border-radius: 100px; font-size: 0.73rem; font-weight: 700; text-transform: capitalize; }
.status-badge.yellow { background: #fef9c3; color: #a16207; }
.status-badge.blue { background: #dbeafe; color: #1d4ed8; }
.status-badge.purple { background: #ede9fe; color: #6d28d9; }
.status-badge.green { background: #dcfce7; color: #15803d; }
.status-badge.red { background: #fee2e2; color: #b91c1c; }
.status-badge.gray { background: #f3f4f6; color: #6b7280; }

/* Pagination */
.table-toolbar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; flex-wrap: wrap; gap: 0.75rem; }
.toolbar-search { padding: 0.45rem 0.875rem; border: 1px solid #e2e8f0; border-radius: 7px; font-size: 0.875rem; outline: none; width: 220px; }
.toolbar-search:focus { border-color: #3b82f6; }

.table-pagination { display: flex; justify-content: flex-end; align-items: center; gap: 0.5rem; margin-top: 1rem; font-size: 0.875rem; color: #64748b; }
.page-btn { padding: 0.35rem 0.75rem; border: 1px solid #e2e8f0; border-radius: 6px; background: #fff; cursor: pointer; font-size: 0.8rem; }
.page-btn:hover:not(:disabled) { border-color: #3b82f6; color: #3b82f6; }
.page-btn:disabled { opacity: 0.4; cursor: not-allowed; }

/* Forms */
.admin-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
.admin-form-group { display: flex; flex-direction: column; gap: 0.4rem; }
.admin-form-group.full { grid-column: 1 / -1; }
.admin-form-group label { font-size: 0.8rem; font-weight: 600; color: #374151; }
.admin-form-group input,
.admin-form-group select,
.admin-form-group textarea {
  padding: 0.55rem 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 7px;
  font-size: 0.875rem;
  outline: none;
  font-family: inherit;
}
.admin-form-group input:focus,
.admin-form-group select:focus,
.admin-form-group textarea:focus { border-color: #3b82f6; }
.admin-form-group textarea { resize: vertical; }

/* Modal */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.modal {
  background: #fff;
  border-radius: 14px;
  padding: 1.75rem;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
}

.modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
.modal-header h2 { font-size: 1.1rem; font-weight: 700; color: #0f172a; }
.modal-close { background: transparent; border: none; color: #9ca3af; cursor: pointer; font-size: 1.25rem; }
.modal-close:hover { color: #374151; }
.modal-footer { display: flex; justify-content: flex-end; gap: 0.75rem; margin-top: 1.5rem; }
.btn-cancel { padding: 0.55rem 1.25rem; border: 1px solid #e2e8f0; border-radius: 7px; background: #fff; cursor: pointer; font-size: 0.875rem; font-weight: 500; color: #374151; }
.btn-save { padding: 0.55rem 1.25rem; background: #3b82f6; color: #fff; border: none; border-radius: 7px; cursor: pointer; font-size: 0.875rem; font-weight: 600; }
.btn-save:disabled { background: #93c5fd; cursor: not-allowed; }

/* Action buttons in tables */
.btn-edit { padding: 0.25rem 0.65rem; background: #eff6ff; color: #3b82f6; border: none; border-radius: 5px; cursor: pointer; font-size: 0.78rem; font-weight: 600; }
.btn-delete { padding: 0.25rem 0.65rem; background: #fef2f2; color: #ef4444; border: none; border-radius: 5px; cursor: pointer; font-size: 0.78rem; font-weight: 600; }
.btn-edit:hover { background: #dbeafe; }
.btn-delete:hover { background: #fee2e2; }

.action-cell { display: flex; gap: 0.4rem; align-items: center; }

@media (max-width: 1024px) {
  .stat-grid { grid-template-columns: repeat(2, 1fr); }
  .dashboard-grid { grid-template-columns: 1fr; }
}

@media (max-width: 768px) {
  .admin-sidebar { transform: translateX(-100%); transition: transform 0.25s; }
  .admin-sidebar.open { transform: translateX(0); }
  .admin-main { margin-left: 0; }
  .admin-menu-toggle { display: flex; }
  .stat-grid { grid-template-columns: repeat(2, 1fr); }
  .admin-form-grid { grid-template-columns: 1fr; }
}
