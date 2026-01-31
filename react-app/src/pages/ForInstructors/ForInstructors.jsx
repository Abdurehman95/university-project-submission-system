import React from 'react';
import { motion } from 'framer-motion';
import { FiPlusSquare, FiEdit, FiTrendingUp, FiPieChart } from 'react-icons/fi';
import '../ForStudents/RolePage.css';

const ForInstructors = () => {
  const content = [
    { title: 'Assignment Creation', desc: 'Powerful tools to define rubrics, setting deadlines, and attach resources.', icon: <FiPlusSquare /> },
    { title: 'Easy Grading', desc: 'Side-by-side view for grading and providing inline feedback on submissions.', icon: <FiEdit /> },
    { title: 'Performance Tracking', desc: 'Identify struggling students early with advanced performance metrics.', icon: <FiTrendingUp /> },
    { title: 'Automated Reports', desc: 'Export grades and participation data with a single click.', icon: <FiPieChart /> }
  ];

  return (
    <div className="role-page instructors">
      <section className="role-hero container">
        <h1 className="section-title">Elevate Your <span className="text-gradient">Teaching</span></h1>
        <p className="section-subtitle">For Instructors: Reduce administrative burden and focus on what matters—educating.</p>
      </section>

      <section className="role-features container">
        <div className="features-grid">
          {content.map((item, i) => (
            <motion.div
              key={item.title}
              className="role-feature-card glass-panel"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="role-feature-icon" style={{ color: 'var(--color-accent-secondary)' }}>{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ForInstructors;
