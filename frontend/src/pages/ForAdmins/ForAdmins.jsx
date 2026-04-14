import React from 'react';
import { motion } from 'framer-motion';
import { FiUsers, FiSettings, FiLayout, FiShield, FiActivity, FiDatabase } from 'react-icons/fi';
import '../ForStudents/RolePage.css';

const ForAdmins = () => {
  const content = [
    { title: 'User Management', desc: 'Manage students, instructors, and admins. Create, edit, search, and filter users by role.', icon: <FiUsers /> },
    { title: 'Role Assignment', desc: 'Secure system for assigning or changing user roles across the entire institution.', icon: <FiShield /> },
    { title: 'Course & Dept Control', desc: 'Manage departments, create courses, and assign instructors to specific academic sections.', icon: <FiLayout /> },
    { title: 'System Monitoring', desc: 'Access real-time activity logs, analytics, and global system events.', icon: <FiActivity /> },
    { title: 'Access & Security', desc: 'Advanced control over permissions, account status, and sensitive audit trails.', icon: <FiDatabase /> },
    { title: 'Global Settings', desc: 'Configure platform-wide parameters and operational security protocols.', icon: <FiSettings /> }
  ];

  return (
    <div className="role-page admins">
      <section className="role-hero container">
        <h1 className="section-title">Admin Module = <span className="text-gradient">“System Controller”</span></h1>
        <p className="section-subtitle">🎯 <strong>Main Purpose:</strong> Responsible for managing the entire platform, users, and operations.</p>
      </section>

      <section className="role-features container">
        <h2 className="section-title" style={{ fontSize: '2rem', marginBottom: '2rem' }}>🔑 Core Functions</h2>
        <div className="features-grid">
          {content.map((item, i) => (
            <motion.div
              key={item.title}
              className="role-feature-card glass-panel"
              initial={{ opacity: 0, y: 30 }}
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
    </div>
  );
};

export default ForAdmins;
