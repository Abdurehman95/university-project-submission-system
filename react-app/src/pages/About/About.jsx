import React from 'react';
import { motion } from 'framer-motion';
import { FiTarget, FiEye, FiUsers, FiCpu } from 'react-icons/fi';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <section className="about-hero container">
        <motion.h1
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Empowering the <span className="text-gradient">Next Generation</span> of Scholars
        </motion.h1>
        <p className="section-subtitle">
          We bridge the gap between academic Potential and technical possibilities with a platform built for students and educators.
        </p>
      </section>

      <section className="mission-vision container">
        <div className="mv-grid">
          <div className="mv-card glass-panel">
            <FiTarget className="mv-icon" />
            <h3>Our Mission</h3>
            <p>To provide a seamless, secure, and intuitive environment for academic collaboration and project management.</p>
          </div>
          <div className="mv-card glass-panel">
            <FiEye className="mv-icon" />
            <h3>Our Vision</h3>
            <p>To become the global standard for university assignment tracking and evaluation systems.</p>
          </div>
        </div>
      </section>

      <section className="why-built section container">
        <div className="why-content">
          <h2>Why UniSubmit?</h2>
          <p>
            Existing systems are often clunky, outdated, and difficult to use. UniSubmit was built to solve these pain points by offering a modern, responsive, and feature-rich platform that actually works the way you do.
          </p>
          <ul className="stats-list">
            <li>
              <strong>Modern Stack</strong>
              <span>React & Node.js</span>
            </li>
            <li>
              <strong>Target Users</strong>
              <span>Universities & Colleges</span>
            </li>
            <li>
              <strong>Security</strong>
              <span>SSL & Data Encryption</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="tech-overview section container glass-panel">
        <div className="tech-grid">
          <div className="tech-info">
            <FiCpu className="tech-main-icon" />
            <h2>Advanced Technology</h2>
            <p>Our platform uses the latest in cloud infrastructure and frontend optimization to ensure 99.9% uptime and lightning-fast performance.</p>
          </div>
          <div className="tech-stack">
            <div className="stack-item">React 19</div>
            <div className="stack-item">Node.JS</div>
            <div className="stack-item">PostgreSQL</div>
            <div className="stack-item">Vite</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
