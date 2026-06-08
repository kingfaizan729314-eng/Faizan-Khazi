import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import toast from 'react-hot-toast';
import './Checkout.css';

const emptyAddr = { name: '', street: '', city: '', state: '', postal_code: '', country: 'US' };

export default function Checkout() {
  const { cart, fetchCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [shipping, setShipping] = useState(emptyAddr);
  const [couponCode, setCouponCode] = useState('');
  const [coupon, setCoupon] = useState(null);
  const [payMethod, setPayMethod] = useState('card');
  const [notes, setNotes] = useState('');
  const [placing, setPlacing] = useState(false);
  const [validatingCoupon, setValidatingCoupon] = useState(false);

  if (!user) { navigate('/login', { state: { from: '/checkout' } }); return null; }

  const set = (key) => (e) => setShipping(s => ({ ...s, [key]: e.target.value }));

  const validateCoupon = async () => {
    if (!couponCode.trim()) return;
    setValidatingCoupon(true);
    try {
      const res = await api.post('/orders/validate-coupon', { code: couponCode, subtotal: cart.subtotal });
      setCoupon(res.data.data);
      toast.success(`Coupon applied! ${res.data.data.type === 'percentage' ? res.data.data.value + '% off' : '$' + res.data.data.value + ' off'}`);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid coupon');
      setCoupon(null);
    } finally {
      setValidatingCoupon(false);
    }
  };

  const discount = coupon
    ? coupon.type === 'percentage'
      ? cart.subtotal * (coupon.value / 100)
      : Math.min(coupon.value, cart.subtotal)
    : 0;

  const newSubtotal = cart.subtotal - discount;
  const shipping_cost = newSubtotal >= 99 ? 0 : 9.99;
  const tax = newSubtotal * 0.08;
  const total = newSubtotal + shipping_cost + tax;

  const placeOrder = async (e) => {
    e.preventDefault();
    const required = ['name', 'street', 'city', 'state', 'postal_code'];
    for (const f of required) {
      if (!shipping[f].trim()) { toast.error(`Please fill in: ${f.replace('_', ' ')}`); return; }
    }

    setPlacing(true);
    try {
      const res = await api.post('/orders/checkout', {
        shipping_address: shipping,
        payment_method: payMethod,
        coupon_code: couponCode || undefined,
        notes: notes || undefined,
      });
      await fetchCart();
      toast.success('Order placed successfully!');
      navigate(`/orders/${res.data.data._id}`, { replace: true });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Checkout failed');
    } finally {
      setPlacing(false);
    }
  };

  return (
    <div className="checkout-page">
      <div className="container">
        <h1>Checkout</h1>
        <form onSubmit={placeOrder} className="checkout-layout">
          {/* Left: address + payment */}
          <div className="checkout-left">
            {/* Shipping */}
            <div className="checkout-section">
              <h2>Shipping Address</h2>
              <div className="form-grid">
                <div className="form-group full">
                  <label>Full Name</label>
                  <input type="text" required value={shipping.name} onChange={set('name')} placeholder="John Doe" />
                </div>
                <div className="form-group full">
                  <label>Street Address</label>
                  <input type="text" required value={shipping.street} onChange={set('street')} placeholder="123 Main St" />
                </div>
                <div className="form-group">
                  <label>City</label>
                  <input type="text" required value={shipping.city} onChange={set('city')} placeholder="New York" />
                </div>
                <div className="form-group">
                  <label>State</label>
                  <input type="text" required value={shipping.state} onChange={set('state')} placeholder="NY" />
                </div>
                <div className="form-group">
                  <label>Postal Code</label>
                  <input type="text" required value={shipping.postal_code} onChange={set('postal_code')} placeholder="10001" />
                </div>
                <div className="form-group">
                  <label>Country</label>
                  <select value={shipping.country} onChange={set('country')}>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="GB">United Kingdom</option>
                    <option value="AU">Australia</option>
                    <option value="IN">India</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="checkout-section">
              <h2>Payment Method</h2>
              <div className="payment-options">
                {[
                  { value: 'card', label: '💳 Credit / Debit Card' },
                  { value: 'paypal', label: '🅿️ PayPal' },
                  { value: 'cod', label: '💵 Cash on Delivery' },
                ].map(p => (
                  <label key={p.value} className={`payment-option ${payMethod === p.value ? 'selected' : ''}`}>
                    <input type="radio" name="payment" value={p.value} checked={payMethod === p.value} onChange={() => setPayMethod(p.value)} />
                    {p.label}
                  </label>
                ))}
              </div>
              {payMethod === 'card' && (
                <div className="card-fields">
                  <div className="form-group full">
                    <label>Card Number</label>
                    <input type="text" placeholder="4242 4242 4242 4242" maxLength={19} />
                  </div>
                  <div className="form-group">
                    <label>Expiry</label>
                    <input type="text" placeholder="MM/YY" maxLength={5} />
                  </div>
                  <div className="form-group">
                    <label>CVV</label>
                    <input type="text" placeholder="123" maxLength={4} />
                  </div>
                </div>
              )}
            </div>

            {/* Notes */}
            <div className="checkout-section">
              <h2>Order Notes (optional)</h2>
              <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Any special instructions..." rows={3} className="notes-input" />
            </div>
          </div>

          {/* Right: order summary */}
          <div className="checkout-right">
            <div className="order-summary">
              <h3>Order Summary</h3>
              <div className="order-items">
                {cart.items.map(item => (
                  <div key={item._id} className="order-item">
                    <img src={item.image || 'https://via.placeholder.com/48'} alt={item.name} />
                    <div className="oi-details">
                      <span className="oi-name">{item.name}</span>
                      <span className="oi-qty">× {item.quantity}</span>
                    </div>
                    <span className="oi-price">${item.subtotal?.toFixed(2)}</span>
                  </div>
                ))}
              </div>

              {/* Coupon */}
              <div className="coupon-row">
                <input
                  type="text" placeholder="Coupon code"
                  value={couponCode}
                  onChange={e => { setCouponCode(e.target.value.toUpperCase()); setCoupon(null); }}
                  className="coupon-input"
                />
                <button type="button" onClick={validateCoupon} disabled={validatingCoupon} className="coupon-btn">
                  {validatingCoupon ? '...' : 'Apply'}
                </button>
              </div>
              {coupon && (
                <div className="coupon-applied">
                  ✅ {coupon.code} – {coupon.type === 'percentage' ? `${coupon.value}%` : `$${coupon.value}`} off
                </div>
              )}

              <div className="summary-lines">
                <div className="summary-row"><span>Subtotal</span><span>${cart.subtotal?.toFixed(2)}</span></div>
                {discount > 0 && <div className="summary-row discount"><span>Discount</span><span>−${discount.toFixed(2)}</span></div>}
                <div className="summary-row"><span>Shipping</span><span>{shipping_cost === 0 ? <em>Free</em> : `$${shipping_cost.toFixed(2)}`}</span></div>
                <div className="summary-row"><span>Tax</span><span>${tax.toFixed(2)}</span></div>
                <div className="summary-total"><span>Total</span><span>${total.toFixed(2)}</span></div>
              </div>

              <button type="submit" className="btn-place-order" disabled={placing}>
                {placing ? 'Placing Order...' : `Place Order · $${total.toFixed(2)}`}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
