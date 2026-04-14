import React from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiBriefcase, FiAperture, FiFileText, FiLock } from 'react-icons/fi';
import './Features.css';

const Features = () => {
  const features = [
    {
      role: 'Students',
      icon: <FiUser />,
      list: ['Assignment submission', 'Deadline tracking', 'Grades & feedback', 'Progress dashboard']
    },
    {
      role: 'Instructors',
      icon: <FiBriefcase />,
      list: ['Assignment creation', 'Easy grading', 'Performance tracking', 'Reports']
    },
    {
      role: 'Admins',
      icon: <FiAperture />,
      list: ['User management', 'Course control', 'Reports & analytics', 'System security']
    }
  ];

  return (
    <div className="features-page">
      <section className="features-hero container">
        <h1 className="section-title">Powerful <span className="text-gradient">Features</span> for Everyone</h1>
        <p className="section-subtitle">A comprehensive set of tools designed to handle every aspect of the academic submission process.</p>
      </section>

      <section className="features-main container">
        <div className="roles-grid">
          {features.map((f, i) => (
            <motion.div
              key={f.role}
              className="role-card glass-panel"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="role-icon">{f.icon}</div>
              <h3>For {f.role}</h3>
              <ul className="feature-list">
                {f.list.map(item => (
                  <li key={item}><FiFileText className="list-icon" /> {item}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="workflow-section section container">
        <div className="workflow-card glass-panel">
          <div className="workflow-header">
            <FiAperture className="workflow-icon" />
            <h2>Submission & Grading Workflow</h2>
          </div>
          <p>Our platform handles the entire lifecycle of an assignment, from creation to final grade reporting, with automated notifications at every step.</p>
        </div>
      </section>

      <section className="security-section section container">
        <div className="security-banner glass-panel">
          <FiLock className="security-icon" />
          <div>
            <h3>Enterprise-Grade Security</h3>
            <p>Role-based access control (RBAC) ensures that only authorized users can access sensitive data and academic records.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;
