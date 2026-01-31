import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiMessageSquare, FiUser, FiSend, FiMapPin, FiPhone } from 'react-icons/fi';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Contact form:', formData);
  };

  return (
    <div className="contact-page">
      <section className="contact-hero container">
        <h1 className="section-title">Get in <span className="text-gradient">Touch</span></h1>
        <p className="section-subtitle">Have questions? Our support team is here to help you 24/7.</p>
      </section>

      <section className="contact-main container">
        <div className="contact-grid">
          <div className="contact-info">
            <div className="info-card glass-panel">
              <FiMail className="info-icon" />
              <h3>Email Us</h3>
              <p>support@unisubmit.edu</p>
              <p>info@unisubmit.edu</p>
            </div>
            <div className="info-card glass-panel">
              <FiPhone className="info-icon" />
              <h3>Call Us</h3>
              <p>+1 (555) 000-1111</p>
              <p>+1 (555) 000-2222</p>
            </div>
            <div className="info-card glass-panel">
              <FiMapPin className="info-icon" />
              <h3>Visit Us</h3>
              <p>123 Innovation Way</p>
              <p>Tech City, TC 10101</p>
            </div>
          </div>

          <motion.div
            className="contact-form-container glass-panel"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label><FiUser /> Name</label>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label><FiMail /> Email</label>
                <input
                  type="email"
                  placeholder="yourname@university.edu"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label><FiMessageSquare /> Message</label>
                <textarea
                  rows="5"
                  placeholder="How can we help?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary contact-btn">
                Send Message <FiSend />
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
