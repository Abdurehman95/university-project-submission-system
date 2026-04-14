import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiUsers, FiSettings, FiLayout, FiShield } from 'react-icons/fi';
import '../ForStudents/RolePage.css';

const ForAdmins = () => {
  const content = [
    { title: 'User Management', desc: 'Full control over student and instructor accounts, roles, and permissions.', icon: <FiUsers /> },
    { title: 'Course Control', desc: 'Centralized management of university departments, courses, and sections.', icon: <FiLayout /> },
    { title: 'Reports & Analytics', desc: 'Global system health metrics and university-wide performance data.', icon: <FiSettings /> },
    { title: 'System Security', desc: 'Advanced configuration of authentication, encryption, and data retention.', icon: <FiShield /> }
  ];

  return (
    <div className="role-page admins">
      <section className="role-hero container">
        <h1 className="section-title">Institutional <span className="text-gradient">Control</span></h1>
        <p className="section-subtitle">For Admins: Manage your entire academic institution from a single, secure dashboard.</p>
      </section>

      <section className="role-features container">
        <div className="features-grid">
          {content.map((item, i) => (
            <motion.div
              key={item.title}
              className="role-feature-card glass-panel"
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="role-feature-icon" style={{ borderColor: 'var(--color-accent-primary)' }}>{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="role-cta container">
        <div className="cta-wrapper glass-panel">
          <h2>Ready to manage your institution?</h2>
          <Link to="/dashboard/admin" className="btn btn-primary">Go to Dashboard</Link>
        </div>
      </section>
    </div>
  );
};

export default ForAdmins;
