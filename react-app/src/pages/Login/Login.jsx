import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiArrowRight, FiAlertCircle } from 'react-icons/fi';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Demo Mock logic
    if (formData.email === 'student@university.edu' && formData.password === 'password123') {
      navigate('/dashboard/student');
    } else if (formData.email === 'instructor@university.edu' && formData.password === 'password123') {
      navigate('/dashboard/instructor');
    } else if (formData.email === 'admin@university.edu' && formData.password === 'password123') {
      navigate('/dashboard/admin');
    } else {
      setError('Invalid demo credentials. Use student@university.edu, instructor@university.edu, or admin@university.edu (password: password123)');
    }
  };

  return (
    <div className="auth-page container">
      <motion.div
        className="auth-card glass-panel"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="auth-header">
          <h2 className="text-gradient">Welcome Back</h2>
          <p>Login to your account to continue</p>
        </div>

        {error && (
          <motion.div
            className="auth-error"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <FiAlertCircle /> {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label><FiMail /> Email</label>
            <input
              type="email"
              placeholder="yourname@university.edu"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label><FiLock /> Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>

          <div className="form-options">
            <Link to="/forgot-password">Forgot password?</Link>
          </div>

          <button type="submit" className="btn btn-primary auth-btn">
            Login <FiArrowRight />
          </button>
        </form>

        <div className="auth-footer">
          <p>Don't have an account? <Link to="/register">Register here</Link></p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
