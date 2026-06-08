import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const { addToCart, loading } = useCart();
  const img = product.images?.[0] || 'https://via.placeholder.com/300x200?text=No+Image';
  const discount = product.compare_price
    ? Math.round((1 - product.price / product.compare_price) * 100)
    : null;

  return (
    <div className="product-card">
      <Link to={`/product/${product.slug}`} className="product-img-wrap">
        <img src={img} alt={product.name} loading="lazy" />
        {discount && <span className="badge-discount">-{discount}%</span>}
        {product.stock === 0 && <span className="badge-oos">Out of Stock</span>}
        {product.is_featured && product.stock > 0 && <span className="badge-featured">Featured</span>}
      </Link>
      <div className="product-info">
        <div className="product-brand">{product.brand}</div>
        <Link to={`/product/${product.slug}`} className="product-name">{product.name}</Link>
        <div className="product-rating">
          <Star size={13} fill="#f59e0b" stroke="none" />
          <span>{product.rating?.toFixed(1)}</span>
          <span className="rating-count">({product.review_count})</span>
        </div>
        <div className="product-footer">
          <div className="product-price">
            <span className="price-current">${product.price?.toFixed(2)}</span>
            {product.compare_price && (
              <span className="price-original">${product.compare_price?.toFixed(2)}</span>
            )}
          </div>
          <button
            className="btn-add-cart"
            disabled={product.stock === 0 || loading}
            onClick={() => addToCart(product._id)}
            title="Add to cart"
          >
            <ShoppingCart size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
