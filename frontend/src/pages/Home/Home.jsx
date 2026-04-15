import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiCheckCircle, FiShield, FiSend } from 'react-icons/fi';
import './Home.css';

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero container">
        <motion.div
          className="hero-content"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h1 variants={itemVariants} className="hero-title">
            Modernize Your <span className="text-gradient">Academic Workflow</span>
          </motion.h1>
          <motion.p variants={itemVariants} className="hero-subtitle">
            The ultimate project submission and grading platform designed for universities who value efficiency, security, and student success.
          </motion.p>
          <motion.div variants={itemVariants} className="hero-btns">
            <button className="btn btn-primary">Get Started <FiArrowRight /></button>
            <button className="btn btn-outline">Watch Demo</button>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-visual"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="hero-image-container">
            <img src="/pro3.png" alt="University Workspace" className="hero-main-img" />
          </div>
        </motion.div>
      </section>

      {/* Features Preview */}
      <section className="section features-preview glass-panel container">
        <h2 className="section-title">Everything you need</h2>
        <p className="section-subtitle">A platform built for the complexities of modern education.</p>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon"><FiSend /></div>
            <h3>Seamless Submission</h3>
            <p>Upload files of any size with real-time progress tracking.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><FiCheckCircle /></div>
            <h3>Smart Grading</h3>
            <p>Automated checks and manual rubrics for precise feedback.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><FiShield /></div>
            <h3>Secure Storage</h3>
            <p>Enterprise-grade encryption for all projects and data.</p>
          </div>
        </div>
      </section>

      {/* How It Works Mini */}
      <section className="section how-it-works-mini container">
        <h2 className="section-title">How it works</h2>
        <div className="steps-container">
          <div className="step">
            <div className="step-num">01</div>
            <h3>Create Account</h3>
            <p>Join as a student, instructor, or admin with your university credentials.</p>
          </div>
          <div className="step">
            <div className="step-num">02</div>
            <h3>Enroll / Create</h3>
            <p>Set up courses or join existing ones to start collaborating.</p>
          </div>
          <div className="step">
            <div className="step-num">03</div>
            <h3>Submit & Grade</h3>
            <p>Turn in assignments or evaluate submissions with just a few clicks.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
