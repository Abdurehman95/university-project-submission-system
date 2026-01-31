import React from 'react';
import { motion } from 'framer-motion';
import { FiUserPlus, FiLayers, FiCheckCircle } from 'react-icons/fi';
import './HowItWorks.css';

const HowItWorks = () => {
  const steps = [
    {
      id: '01',
      title: 'Create an account',
      desc: 'Sign up using your university email. Choose your role: Student or Instructor.',
      icon: <FiUserPlus />
    },
    {
      id: '02',
      title: 'Enroll / Create courses',
      desc: 'Students join courses via codes. Instructors set up their virtual classrooms and assignments.',
      icon: <FiLayers />
    },
    {
      id: '03',
      title: 'Submit, grade, get feedback',
      desc: 'Upload your work, get it graded in real-time, and receive detailed pedagogical feedback.',
      icon: <FiCheckCircle />
    }
  ];

  return (
    <div className="how-it-works-page">
      <section className="hiw-hero container">
        <h1 className="section-title">Simplified <span className="text-gradient">Process</span></h1>
        <p className="section-subtitle">How UniSubmit transforms the traditional submission workflow into a digital experience.</p>
      </section>

      <section className="timeline-section container">
        <div className="timeline">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="timeline-card glass-panel">
                <div className="step-badge">{step.id}</div>
                <div className="step-icon">{step.icon}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            </motion.div>
          ))}
          <div className="timeline-line"></div>
        </div>
      </section>

      <section className="cta-section section container">
        <div className="cta-card glass-panel text-center">
          <h2>Ready to streamline your workflow?</h2>
          <p>Join thousands of students and instructors already using UniSubmit.</p>
          <div className="cta-btns">
            <button className="btn btn-primary">Join Now</button>
            <button className="btn btn-outline">Learn More</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
