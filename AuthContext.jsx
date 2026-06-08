.auth-page {
  min-height: calc(100vh - 64px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
  background: #f8fafc;
}

.auth-card {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 2.5rem;
  width: 100%;
  max-width: 420px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.06);
}

.auth-logo {
  font-size: 1.25rem;
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 1.5rem;
}

.auth-card h1 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 0.25rem;
}

.auth-sub {
  color: #64748b;
  font-size: 0.9rem;
  margin-bottom: 1.75rem;
}

.auth-form { display: flex; flex-direction: column; gap: 1rem; }

.form-group { display: flex; flex-direction: column; gap: 0.4rem; }

.form-group label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #374151;
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 0.65rem 0.875rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.9rem;
  outline: none;
  transition: border-color 0.15s;
  font-family: inherit;
  color: #0f172a;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59,130,246,0.08);
}

.btn-auth {
  background: #3b82f6;
  color: #fff;
  border: none;
  padding: 0.75rem;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s;
  margin-top: 0.25rem;
}

.btn-auth:hover { background: #2563eb; }
.btn-auth:disabled { background: #93c5fd; cursor: not-allowed; }

.auth-switch {
  text-align: center;
  margin-top: 1.25rem;
  font-size: 0.875rem;
  color: #64748b;
}

.auth-switch a {
  color: #3b82f6;
  font-weight: 600;
  text-decoration: none;
}

.auth-switch a:hover { text-decoration: underline; }
