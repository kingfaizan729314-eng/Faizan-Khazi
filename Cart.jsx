import React, { useEffect, useState } from 'react';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import './Admin.css';

const STATUSES = ['pending', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'];
const STATUS_COLORS = { pending: 'yellow', processing: 'blue', shipped: 'purple', delivered: 'green', cancelled: 'red', refunded: 'gray' };

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, total: 0 });
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page, limit: 20 });
      if (statusFilter) params.set('status', statusFilter);
      const res = await api.get(`/admin/orders?${params}`);
      setOrders(res.data.data || []);
      setPagination(res.data.pagination || {});
    } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, [page, statusFilter]);

  const updateStatus = async (id, status) => {
    try {
      const res = await api.put(`/admin/orders/${id}/status`, { status });
      toast.success('Status updated');
      setSelected(res.data.data);
      load();
    } catch { toast.error('Update failed'); }
  };

  return (
    <div>
      <h1 className="admin-page-title">Orders</h1>
      <div className="admin-card">
        <div className="table-toolbar">
          <select className="toolbar-search" style={{ width: 160 }} value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1); }}>
            <option value="">All Statuses</option>
            {STATUSES.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
          </select>
          <span style={{ fontSize: '0.875rem', color: '#64748b' }}>{pagination.total} total orders</span>
        </div>

        {loading ? <div style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>Loading...</div> : (
          <table className="admin-table">
            <thead>
              <tr><th>Order #</th><th>Customer</th><th>Items</th><th>Total</th><th>Status</th><th>Date</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {orders.map(o => (
                <tr key={o._id}>
                  <td style={{ fontWeight: 600 }}>{o.order_number}</td>
                  <td>{o.user_id?.name || 'Guest'}<br /><small style={{ color: '#94a3b8' }}>{o.user_id?.email}</small></td>
                  <td>{o.items?.length}</td>
                  <td style={{ fontWeight: 600 }}>${o.total?.toFixed(2)}</td>
                  <td><span className={`status-badge ${STATUS_COLORS[o.status]}`}>{o.status}</span></td>
                  <td>{new Date(o.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button className="btn-edit" onClick={() => setSelected(o)}>View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div className="table-pagination">
          <button className="page-btn" disabled={page <= 1} onClick={() => setPage(p => p - 1)}>Prev</button>
          <span>Page {page}</span>
          <button className="page-btn" disabled={orders.length < 20} onClick={() => setPage(p => p + 1)}>Next</button>
        </div>
      </div>

      {/* Order detail modal */}
      {selected && (
        <div className="modal-backdrop" onClick={e => e.target === e.currentTarget && setSelected(null)}>
          <div className="modal">
            <div className="modal-header">
              <h2>Order #{selected.order_number}</h2>
              <button className="modal-close" onClick={() => setSelected(null)}>✕</button>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <strong>Status: </strong>
              <select
                value={selected.status}
                onChange={e => updateStatus(selected._id, e.target.value)}
                style={{ marginLeft: '0.5rem', padding: '0.3rem 0.6rem', border: '1px solid #e2e8f0', borderRadius: '6px' }}
              >
                {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <table className="admin-table" style={{ marginBottom: '1rem' }}>
              <thead><tr><th>Product</th><th>Qty</th><th>Price</th><th>Subtotal</th></tr></thead>
              <tbody>
                {selected.items?.map((item, i) => (
                  <tr key={i}>
                    <td>{item.product_name}</td>
                    <td>{item.quantity}</td>
                    <td>${item.price?.toFixed(2)}</td>
                    <td>${item.subtotal?.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ display: 'flex', gap: '2rem', fontSize: '0.875rem', color: '#374151' }}>
              <div>
                <strong>Subtotal:</strong> ${selected.subtotal?.toFixed(2)}<br />
                {selected.discount > 0 && <><strong>Discount:</strong> −${selected.discount?.toFixed(2)}<br /></>}
                <strong>Shipping:</strong> ${selected.shipping_cost?.toFixed(2)}<br />
                <strong>Tax:</strong> ${selected.tax?.toFixed(2)}<br />
                <strong>Total:</strong> ${selected.total?.toFixed(2)}
              </div>
              {selected.shipping_address && (
                <div>
                  <strong>Shipping to:</strong><br />
                  {selected.shipping_address.name}<br />
                  {selected.shipping_address.street}<br />
                  {selected.shipping_address.city}, {selected.shipping_address.state} {selected.shipping_address.postal_code}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
