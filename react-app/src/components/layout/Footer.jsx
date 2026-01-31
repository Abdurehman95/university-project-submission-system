import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaTwitter, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <span className="text-gradient">Uni</span>Submit
            </Link>
            <p className="footer-desc">
              Next-generation assignment management platform for modern universities. Streamline submissions, grading, and feedback.
            </p>
            <div className="social-links">
              <a href="#"><FaGithub /></a>
              <a href="#"><FaTwitter /></a>
              <a href="#"><FaLinkedin /></a>
              <a href="#"><FaEnvelope /></a>
            </div>
          </div>

          <div className="footer-links">
            <h4>Platform</h4>
            <ul>
              <li><Link to="/features">Features</Link></li>
              <li><Link to="/how-it-works">How It Works</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-links">
            <h4>Roles</h4>
            <ul>
              <li><Link to="/students">For Students</Link></li>
              <li><Link to="/instructors">For Instructors</Link></li>
              <li><Link to="/admins">For Admins</Link></li>
            </ul>
          </div>

          <div className="footer-links">
            <h4>Resources</h4>
            <ul>
              <li><a href="#">Documentation</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Support</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} UniSubmit. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
