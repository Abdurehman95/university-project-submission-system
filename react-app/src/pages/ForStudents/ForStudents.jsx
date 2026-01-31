import React from 'react';
import { motion } from 'framer-motion';
import { FiUpload, FiClock, FiStar, FiGrid } from 'react-icons/fi';
import './RolePage.css';

const ForStudents = () => {
  const content = [
    { title: 'Assignment Submission', desc: 'Drag and drop your project files. Supports multiple formats and large files.', icon: <FiUpload /> },
    { title: 'Deadline Tracking', desc: 'Visual countdowns and notifications so you never miss a submission window.', icon: <FiClock /> },
    { title: 'Grades & Feedback', desc: 'Instant access to grades and detailed comments from your instructors.', icon: <FiStar /> },
    { title: 'Progress Dashboard', desc: 'A holistic view of all your courses, assignments, and academic standing.', icon: <FiGrid /> }
  ];

  return (
    <div className="role-page students">
      <section className="role-hero container">
        <h1 className="section-title">Success Starts with <span className="text-gradient">Organization</span></h1>
        <p className="section-subtitle">For Students: The easiest way to manage your academic projects and track your progress.</p>
      </section>

      <section className="role-features container">
        <div className="features-grid">
          {content.map((item, i) => (
            <motion.div
              key={item.title}
              className="role-feature-card glass-panel"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="role-feature-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ForStudents;
