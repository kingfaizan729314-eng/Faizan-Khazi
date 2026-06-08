import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Package } from 'lucide-react';
import api from '../utils/api';
import './Orders.css';

const STATUS_COLORS = {
  pending: 'yellow', processing: 'blue', shipped: 'purple',
  delivered: 'green', cancelled: 'red', refunded: 'gray',
};

const STEPS = ['pending', 'processing', 'shipped', 'delivered'];

export default function OrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/orders/${id}`)
      .then(res => setOrder(res.data.data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="container" style={{ padding: '4rem', textAlign: 'center' }}>Loading...</div>;
  if (!order) return <div className="container" style={{ padding: '4rem', textAlign: 'center' }}>Order not found</div>;

  const stepIdx = STEPS.indexOf(order.status);
  const addr = order.shipping_address;

  return (
    <div className="orders-page">
      <div className="container">
        <Link to="/orders" className="back-link"><ArrowLeft size={16} /> Back to Orders</Link>

        <div className="order-detail-header">
          <div>
            <h1>Order #{order.order_number}</h1>
            <p>Placed on {new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
          <span className={`status-badge lg ${STATUS_COLORS[order.status]}`}>{order.status}</span>
        </div>

        {/* Progress tracker */}
        {!['cancelled', 'refunded'].includes(order.status) && (
          <div className="order-progress">
            {STEPS.map((step, i) => (
              <React.Fragment key={step}>
                <div className={`progress-step ${i <= stepIdx ? 'done' : ''}`}>
                  <div className="step-dot">{i < stepIdx ? '✓' : i + 1}</div>
                  <div className="step-label">{step.charAt(0).toUpperCase() + step.slice(1)}</div>
                </div>
                {i < STEPS.length - 1 && <div className={`progress-line ${i < stepIdx ? 'done' : ''}`} />}
              </React.Fragment>
            ))}
          </div>
        )}

        <div className="order-detail-grid">
          {/* Items */}
          <div className="order-items-card">
            <h3>Items Ordered</h3>
            {order.items.map((item, i) => (
              <div key={i} className="order-line-item">
                {item.product_image && <img src={item.product_image} alt={item.product_name} />}
                <div className="oli-info">
                  <div className="oli-name">{item.product_name}</div>
                  {item.variant_name && <div className="oli-variant">{item.variant_name}</div>}
                  <div className="oli-qty">${item.price?.toFixed(2)} × {item.quantity}</div>
                </div>
                <div className="oli-subtotal">${item.subtotal?.toFixed(2)}</div>
              </div>
            ))}
          </div>

          <div className="order-side">
            {/* Summary */}
            <div className="order-summary-card">
              <h3>Order Summary</h3>
              <div className="sum-row"><span>Subtotal</span><span>${order.subtotal?.toFixed(2)}</span></div>
              {order.discount > 0 && <div className="sum-row green"><span>Discount</span><span>−${order.discount?.toFixed(2)}</span></div>}
              <div className="sum-row"><span>Shipping</span><span>{order.shipping_cost === 0 ? 'Free' : `$${order.shipping_cost?.toFixed(2)}`}</span></div>
              <div className="sum-row"><span>Tax</span><span>${order.tax?.toFixed(2)}</span></div>
              <div className="sum-total"><span>Total</span><span>${order.total?.toFixed(2)}</span></div>
              <div className="payment-info">
                <span>Payment: <strong>{order.payment_method?.toUpperCase()}</strong></span>
                <span className={`pay-status ${order.payment_status}`}>{order.payment_status}</span>
              </div>
            </div>

            {/* Address */}
            {addr && (
              <div className="address-card">
                <h3>Shipping Address</h3>
                <p>{addr.name}</p>
                <p>{addr.street}</p>
                <p>{addr.city}, {addr.state} {addr.postal_code}</p>
                <p>{addr.country}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
