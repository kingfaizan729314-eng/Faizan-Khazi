.orders-page { padding: 2rem 0 4rem; }
.orders-page h1 { font-size: 1.5rem; font-weight: 700; color: #0f172a; margin-bottom: 1.75rem; }
.back-link { display: inline-flex; align-items: center; gap: 0.4rem; color: #64748b; text-decoration: none; font-size: 0.875rem; margin-bottom: 1.5rem; }
.back-link:hover { color: #3b82f6; }

.empty-state { text-align: center; padding: 5rem 2rem; color: #94a3b8; }
.empty-state h3 { font-size: 1.25rem; font-weight: 600; color: #374151; margin: 1rem 0 0.5rem; }
.empty-state p { color: #64748b; margin-bottom: 1.5rem; }
.btn-primary { display: inline-flex; align-items: center; gap: 0.4rem; background: #3b82f6; color: #fff; text-decoration: none; padding: 0.65rem 1.5rem; border-radius: 8px; font-weight: 600; }

/* Status badges */
.status-badge { display: inline-block; padding: 0.25rem 0.75rem; border-radius: 100px; font-size: 0.78rem; font-weight: 700; text-transform: capitalize; }
.status-badge.yellow { background: #fef9c3; color: #a16207; }
.status-badge.blue { background: #dbeafe; color: #1d4ed8; }
.status-badge.purple { background: #ede9fe; color: #6d28d9; }
.status-badge.green { background: #dcfce7; color: #15803d; }
.status-badge.red { background: #fee2e2; color: #b91c1c; }
.status-badge.gray { background: #f3f4f6; color: #6b7280; }
.status-badge.lg { padding: 0.4rem 1rem; font-size: 0.875rem; }

/* Orders list */
.orders-list { display: flex; flex-direction: column; gap: 1rem; }

.order-card {
  display: block;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1.25rem;
  text-decoration: none;
  transition: box-shadow 0.2s, border-color 0.2s;
}
.order-card:hover { box-shadow: 0 4px 12px rgba(0,0,0,0.08); border-color: #cbd5e1; }

.order-card-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem; }
.order-number { font-weight: 700; color: #0f172a; font-size: 0.95rem; }
.order-date { color: #64748b; font-size: 0.8rem; margin-top: 0.15rem; }

.order-items-preview { display: flex; flex-direction: column; gap: 0.4rem; margin-bottom: 0.875rem; }
.preview-item { display: flex; align-items: center; gap: 0.6rem; font-size: 0.8rem; color: #374151; }
.preview-item img { width: 32px; height: 32px; object-fit: cover; border-radius: 5px; background: #f8fafc; }
.more-items { font-size: 0.78rem; color: #9ca3af; }

.order-total { font-size: 0.875rem; color: #64748b; }
.order-total strong { color: #0f172a; }

/* Order detail */
.order-detail-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem; }
.order-detail-header h1 { font-size: 1.4rem; font-weight: 700; color: #0f172a; margin-bottom: 0.25rem; }
.order-detail-header p { color: #64748b; font-size: 0.875rem; }

/* Progress tracker */
.order-progress {
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1.5rem 2rem;
  flex-wrap: wrap;
  gap: 0;
}

.progress-step { display: flex; flex-direction: column; align-items: center; gap: 0.4rem; flex: 0 0 auto; }
.step-dot {
  width: 36px; height: 36px; border-radius: 50%;
  border: 2px solid #e2e8f0;
  background: #f8fafc;
  color: #94a3b8;
  display: flex; align-items: center; justify-content: center;
  font-size: 0.8rem; font-weight: 700;
  transition: all 0.2s;
}
.progress-step.done .step-dot { background: #3b82f6; border-color: #3b82f6; color: #fff; }
.step-label { font-size: 0.75rem; font-weight: 600; color: #94a3b8; text-transform: capitalize; }
.progress-step.done .step-label { color: #3b82f6; }

.progress-line { flex: 1; height: 2px; background: #e2e8f0; min-width: 40px; transition: background 0.2s; }
.progress-line.done { background: #3b82f6; }

/* Detail grid */
.order-detail-grid { display: grid; grid-template-columns: 1fr 300px; gap: 1.5rem; align-items: start; }

.order-items-card, .order-summary-card, .address-card {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1.25rem;
}
.order-items-card h3, .order-summary-card h3, .address-card h3 { font-size: 0.95rem; font-weight: 700; color: #0f172a; margin-bottom: 1rem; }
.order-side { display: flex; flex-direction: column; gap: 1rem; }

.order-line-item { display: flex; align-items: center; gap: 1rem; padding: 0.875rem 0; border-bottom: 1px solid #f1f5f9; }
.order-line-item:last-child { border-bottom: none; }
.order-line-item img { width: 56px; height: 56px; object-fit: cover; border-radius: 8px; background: #f8fafc; flex-shrink: 0; }
.oli-info { flex: 1; }
.oli-name { font-weight: 600; color: #0f172a; font-size: 0.9rem; margin-bottom: 0.2rem; }
.oli-variant { font-size: 0.78rem; color: #64748b; }
.oli-qty { font-size: 0.8rem; color: #94a3b8; margin-top: 0.15rem; }
.oli-subtotal { font-weight: 700; color: #0f172a; }

.sum-row { display: flex; justify-content: space-between; font-size: 0.875rem; color: #374151; margin-bottom: 0.6rem; }
.sum-row.green { color: #16a34a; }
.sum-total { display: flex; justify-content: space-between; font-size: 1rem; font-weight: 800; color: #0f172a; padding-top: 0.875rem; border-top: 2px solid #e2e8f0; margin-top: 0.5rem; margin-bottom: 1rem; }

.payment-info { display: flex; justify-content: space-between; align-items: center; font-size: 0.8rem; color: #64748b; }
.pay-status { padding: 0.2rem 0.6rem; border-radius: 100px; font-size: 0.75rem; font-weight: 700; text-transform: capitalize; }
.pay-status.paid { background: #dcfce7; color: #15803d; }
.pay-status.pending { background: #fef9c3; color: #a16207; }

.address-card p { font-size: 0.875rem; color: #374151; margin: 0.15rem 0; }

@media (max-width: 768px) {
  .order-detail-grid { grid-template-columns: 1fr; }
  .order-progress { padding: 1rem; gap: 0; overflow-x: auto; }
}
