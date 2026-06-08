import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './Cart.css';

export default function Cart() {
  const { cart, updateItem, removeItem, loading } = useCart();

  if (cart.items.length === 0) return (
    <div className="cart-empty">
      <div className="empty-icon"><ShoppingBag size={56} /></div>
      <h2>Your cart is empty</h2>
      <p>Looks like you haven't added anything yet.</p>
      <Link to="/shop" className="btn-primary">Browse Products <ArrowRight size={16} /></Link>
    </div>
  );

  return (
    <div className="cart-page">
      <div className="container">
        <h1>Shopping Cart <span>({cart.item_count} items)</span></h1>
        <div className="cart-layout">
          {/* Items */}
          <div className="cart-items">
            {cart.items.map(item => (
              <div key={item._id} className="cart-item">
                <img src={item.image || 'https://via.placeholder.com/80'} alt={item.name} />
                <div className="item-details">
                  <Link to={`/product/${item.slug}`} className="item-name">{item.name}</Link>
                  {item.variant_name && <div className="item-variant">{item.variant_name}</div>}
                  <div className="item-price">${item.unit_price?.toFixed(2)} each</div>
                </div>
                <div className="item-qty">
                  <button onClick={() => updateItem(item._id, item.quantity - 1)} disabled={loading}>
                    <Minus size={14} />
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateItem(item._id, item.quantity + 1)} disabled={loading || item.quantity >= item.stock}>
                    <Plus size={14} />
                  </button>
                </div>
                <div className="item-subtotal">${item.subtotal?.toFixed(2)}</div>
                <button className="remove-btn" onClick={() => removeItem(item._id)} title="Remove">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="cart-summary">
            <h3>Order Summary</h3>
            <div className="summary-row"><span>Subtotal</span><span>${cart.subtotal?.toFixed(2)}</span></div>
            <div className="summary-row"><span>Shipping</span><span>{cart.shipping === 0 ? <span className="free">Free</span> : `$${cart.shipping?.toFixed(2)}`}</span></div>
            <div className="summary-row"><span>Tax (8%)</span><span>${cart.tax?.toFixed(2)}</span></div>
            <div className="summary-total"><span>Total</span><span>${cart.total?.toFixed(2)}</span></div>
            {cart.shipping > 0 && (
              <div className="free-shipping-hint">
                Add <strong>${(99 - cart.subtotal).toFixed(2)}</strong> more for free shipping
              </div>
            )}
            <Link to="/checkout" className="btn-checkout">
              Proceed to Checkout <ArrowRight size={16} />
            </Link>
            <Link to="/shop" className="continue-shopping">Continue Shopping</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
