import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX, HiChevronDown } from 'react-icons/hi';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Features', path: '/features' },
    { name: 'Process', path: '/how-it-works' },
    { name: 'Contact', path: '/contact' },
  ];

  const roleLinks = [
    { name: 'Students', path: '/students' },
    { name: 'Instructors', path: '/instructors' },
    { name: 'Admins', path: '/admins' },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        <Link to="/" className="nav-logo" onClick={() => setIsOpen(false)}>
          <img src="/logo.jpg" alt="University Logo" className="nav-logo-img" />
          <span className="text-gradient">Uni</span>Submit
        </Link>

        {/* Desktop Nav */}
        <ul className="nav-menu">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`nav-item ${location.pathname === link.path ? 'active' : ''}`}
              >
                {link.name}
              </Link>
            </li>
          ))}

          <li
            className="nav-dropdown-wrapper"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <div className={`nav-item dropdown-trigger ${roleLinks.some(l => l.path === location.pathname) ? 'active' : ''}`}>
              Roles <HiChevronDown className={`chevron ${dropdownOpen ? 'rotate' : ''}`} />
            </div>
            <AnimatePresence>
              {dropdownOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="nav-dropdown-menu glass-panel"
                >
                  {roleLinks.map((link) => (
                    <li key={link.path}>
                      <Link
                        to={link.path}
                        className={`dropdown-item ${location.pathname === link.path ? 'active' : ''}`}
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </li>
        </ul>

        <div className="nav-actions">
          <Link to="/login" className="btn btn-outline">Login</Link>
          <Link to="/register" className="btn btn-primary">Register</Link>
        </div>

        {/* Mobile Toggle */}
        <button className="nav-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <HiX /> : <HiMenuAlt3 />}
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              className="mobile-menu glass-panel"
            >
              <div className="mobile-links">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`mobile-item ${location.pathname === link.path ? 'active' : ''}`}
                  >
                    {link.name}
                  </Link>
                ))}

                <div className="mobile-divider">Roles</div>
                {roleLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`mobile-item role-mobile-item ${location.pathname === link.path ? 'active' : ''}`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              <div className="mobile-actions">
                <Link to="/login" className="btn btn-outline" onClick={() => setIsOpen(false)}>Login</Link>
                <Link to="/register" className="btn btn-primary" onClick={() => setIsOpen(false)}>Register</Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
