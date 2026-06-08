import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Package } from 'lucide-react';
import api from '../utils/api';
import './Orders.css';

const STATUS_COLORS = {
  pending: 'yellow', processing: 'blue', shipped: 'purple',
  delivered: 'green', cancelled: 'red', refunded: 'gray',
};

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/orders')
      .then(res => setOrders(res.data.data || []))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="container" style={{ padding: '4rem', textAlign: 'center' }}>Loading orders...</div>;

  return (
    <div className="orders-page">
      <div className="container">
        <h1>My Orders</h1>
        {orders.length === 0 ? (
          <div className="empty-state">
            <Package size={48} />
            <h3>No orders yet</h3>
            <p>When you place an order, it will appear here.</p>
            <Link to="/shop" className="btn-primary">Shop Now</Link>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map(order => (
              <Link to={`/orders/${order._id}`} key={order._id} className="order-card">
                <div className="order-card-header">
                  <div>
                    <div className="order-number">#{order.order_number}</div>
                    <div className="order-date">{new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</div>
                  </div>
                  <span className={`status-badge ${STATUS_COLORS[order.status]}`}>{order.status}</span>
                </div>
                <div className="order-items-preview">
                  {order.items.slice(0, 3).map((item, i) => (
                    <div key={i} className="preview-item">
                      {item.product_image && <img src={item.product_image} alt={item.product_name} />}
                      <span>{item.product_name} × {item.quantity}</span>
                    </div>
                  ))}
                  {order.items.length > 3 && <span className="more-items">+{order.items.length - 3} more</span>}
                </div>
                <div className="order-total">Total: <strong>${order.total?.toFixed(2)}</strong></div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
