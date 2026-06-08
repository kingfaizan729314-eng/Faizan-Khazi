import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import './Auth.css';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '', phone: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      toast.error('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      const user = await register(form.name, form.email, form.password, form.phone);
      toast.success(`Account created! Welcome, ${user.name.split(' ')[0]}!`);
      navigate('/', { replace: true });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }));

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">⚡ TechStore</div>
        <h1>Create account</h1>
        <p className="auth-sub">Join TechStore today</p>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" required placeholder="John Doe" value={form.name} onChange={set('name')} />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" required placeholder="you@example.com" value={form.email} onChange={set('email')} />
          </div>
          <div className="form-group">
            <label>Phone (optional)</label>
            <input type="tel" placeholder="+1 555 000 0000" value={form.phone} onChange={set('phone')} />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" required minLength={6} placeholder="Min 6 characters" value={form.password} onChange={set('password')} />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input type="password" required placeholder="••••••••" value={form.confirm} onChange={set('confirm')} />
          </div>
          <button type="submit" className="btn-auth" disabled={loading}>
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>
        <p className="auth-switch">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
