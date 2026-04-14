import React from 'react';
import { motion } from 'framer-motion';
import { FiUpload, FiClock, FiStar, FiGrid } from 'react-icons/fi';
import './RolePage.css';

const ForStudents = () => {
  const coreFunctions = [
    { title: 'View Assignments', desc: 'See what tasks are given by instructors and access project requirements.', icon: <FiGrid /> },
    { title: 'Submit Projects', desc: 'Securely upload your files (PDF, ZIP, etc.) directly to your instructors.', icon: <FiUpload /> },
    { title: 'Track Deadlines', desc: 'Stay on top of your schedule with visual countdowns for every submission.', icon: <FiClock /> },
    { title: 'View Grades', desc: 'Instant access to your marks and performance indicators after evaluation.', icon: <FiStar /> },
    { title: 'Read Feedback', desc: 'Understand your mistakes and areas for improvement with detailed instructor comments.', icon: <FiStar /> }
  ];

  return (
    <div className="role-page students">
      <section className="role-hero container">
        <h1 className="section-title">Student = <span className="text-gradient">“Submit & Track”</span></h1>
        <p className="section-subtitle">🎯 <strong>Main Purpose:</strong> Submit projects and monitor academic progress</p>
        <div className="one-liner glass-panel">
          💡 <strong>In one line:</strong> Student = “I do the work and submit it”
        </div>
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
