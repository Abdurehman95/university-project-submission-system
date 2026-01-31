import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiUser, FiArrowRight, FiUsers } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import '../Login/Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Register attempt:', formData);
  };

  return (
    <div className="auth-page container">
      <motion.div
        className="auth-card glass-panel"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="auth-header">
          <h2 className="text-gradient">Join UniSubmit</h2>
          <p>Create your institutional account</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label><FiUsers /> Choose Role</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            >
              <option value="student">Student</option>
              <option value="instructor">Instructor</option>
            </select>
          </div>

          <div className="form-group">
            <label><FiUser /> Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label><FiMail /> University Email</label>
            <input
              type="email"
              placeholder="name@university.edu"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label><FiLock /> Password</label>
            <input
              type="password"
              placeholder="Min 8 characters"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary auth-btn">
            Create Account <FiArrowRight />
          </button>
        </form>

        <div className="auth-footer">
          <p>Already have an account? <Link to="/login">Login here</Link></p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
