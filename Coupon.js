import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../utils/api';
import toast from 'react-hot-toast';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [cart, setCart] = useState({ items: [], subtotal: 0, shipping: 0, tax: 0, total: 0, item_count: 0 });
  const [loading, setLoading] = useState(false);

  const fetchCart = useCallback(async () => {
    try {
      const res = await api.get('/cart');
      setCart(res.data.data);
    } catch {}
  }, []);

  useEffect(() => { fetchCart(); }, [user, fetchCart]);

  const addToCart = async (product_id, quantity = 1, variant_id = null) => {
    setLoading(true);
    try {
      const res = await api.post('/cart/items', { product_id, quantity, variant_id });
      const data = res.data;
      if (data.session_id) localStorage.setItem('session_id', data.session_id);
      setCart(data.data);
      toast.success('Added to cart!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add to cart');
    } finally {
      setLoading(false);
    }
  };

  const updateItem = async (itemId, quantity) => {
    try {
      const res = await api.put(`/cart/items/${itemId}`, { quantity });
      setCart(res.data.data);
    } catch (err) {
      toast.error('Failed to update cart');
    }
  };

  const removeItem = async (itemId) => {
    try {
      const res = await api.delete(`/cart/items/${itemId}`);
      setCart(res.data.data);
      toast.success('Item removed');
    } catch {
      toast.error('Failed to remove item');
    }
  };

  const clearCart = async () => {
    try {
      await api.delete('/cart');
      setCart({ items: [], subtotal: 0, shipping: 0, tax: 0, total: 0, item_count: 0 });
    } catch {}
  };

  return (
    <CartContext.Provider value={{ cart, loading, fetchCart, addToCart, updateItem, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
