.product-card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #e2e8f0;
  transition: box-shadow 0.2s, transform 0.2s;
  display: flex;
  flex-direction: column;
}

.product-card:hover {
  box-shadow: 0 8px 24px rgba(0,0,0,0.1);
  transform: translateY(-2px);
}

.product-img-wrap {
  position: relative;
  display: block;
  overflow: hidden;
  background: #f8fafc;
  aspect-ratio: 4/3;
}

.product-img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.product-card:hover .product-img-wrap img { transform: scale(1.04); }

.badge-discount, .badge-oos, .badge-featured {
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 3px 8px;
  border-radius: 5px;
  font-size: 0.72rem;
  font-weight: 700;
}

.badge-discount { background: #ef4444; color: #fff; }
.badge-oos { background: #6b7280; color: #fff; left: auto; right: 10px; }
.badge-featured { background: #3b82f6; color: #fff; }

.product-info {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  flex: 1;
}

.product-brand {
  font-size: 0.72rem;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 600;
}

.product-name {
  color: #0f172a;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 600;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.4;
}

.product-name:hover { color: #3b82f6; }

.product-rating {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.8rem;
  color: #374151;
}

.rating-count { color: #9ca3af; font-size: 0.75rem; }

.product-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  padding-top: 0.5rem;
}

.product-price { display: flex; align-items: baseline; gap: 0.5rem; }

.price-current {
  font-size: 1.05rem;
  font-weight: 700;
  color: #0f172a;
}

.price-original {
  font-size: 0.8rem;
  color: #9ca3af;
  text-decoration: line-through;
}

.btn-add-cart {
  background: #3b82f6;
  color: #fff;
  border: none;
  width: 34px;
  height: 34px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s;
  flex-shrink: 0;
}

.btn-add-cart:hover { background: #2563eb; }
.btn-add-cart:disabled { background: #cbd5e1; cursor: not-allowed; }
