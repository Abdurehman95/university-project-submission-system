import React from 'react';
import { motion } from 'framer-motion';
import { FiPlusSquare, FiEdit, FiUsers, FiFileText, FiMessageSquare } from 'react-icons/fi';
import '../ForStudents/RolePage.css';

const ForInstructors = () => {
  const coreFunctions = [
    { title: 'Create Assignments', desc: 'Define project requirements with specific titles, descriptions, and hard deadlines.', icon: <FiPlusSquare /> },
    { title: 'Manage Courses', desc: 'Effortlessly handle students enrolled in your courses and track their participation.', icon: <FiUsers /> },
    { title: 'View Submissions', desc: 'Access all uploaded student work in a centralized, organized repository.', icon: <FiFileText /> },
    { title: 'Grade Projects', desc: 'Evaluate student performance and assign marks/scores through a streamlined interface.', icon: <FiEdit /> },
    { title: 'Provide Feedback', desc: 'Write constructive comments to help students understand their mistakes and grow.', icon: <FiMessageSquare /> }
  ];

  return (
    <div className="role-page instructors">
      <section className="role-hero container">
        <h1 className="section-title">Instructor = <span className="text-gradient">“Create & Evaluate”</span></h1>
        <p className="section-subtitle">🎯 <strong>Main Purpose:</strong> Give assignments and assess student work</p>
      </section>

      <section className="role-features container">
        <h2 className="section-title" style={{ fontSize: '2rem', marginBottom: '2rem' }}>🔑 Core Functions</h2>
        <div className="features-grid">
          {coreFunctions.map((item, i) => (
            <motion.div
              key={item.title}
              className="role-feature-card glass-panel"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
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
