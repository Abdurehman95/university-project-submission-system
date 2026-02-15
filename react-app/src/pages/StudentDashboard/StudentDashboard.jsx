import React from 'react';
import { motion } from 'framer-motion';
import {
  FiBook, FiClock, FiCheckSquare, FiTrendingUp,
  FiBell, FiCalendar, FiFileText, FiMessageSquare,
  FiChevronRight, FiAlertCircle
} from 'react-icons/fi';
import './StudentDashboard.css';

const StudentDashboard = () => {
  // Mock Data
  const stats = [
    { title: 'Enrolled Courses', value: '6', icon: <FiBook />, color: '#6366f1' },
    { title: 'Pending Assignments', value: '3', icon: <FiClock />, color: '#f59e0b' },
    { title: 'Submitted', value: '12', icon: <FiCheckSquare />, color: '#10b981' },
    { title: 'Average Score', value: '88%', icon: <FiTrendingUp />, color: '#ec4899' },
  ];

  const deadlines = [
    { id: 1, title: 'Database System Project', course: 'CS302', date: 'Oct 15, 2023', daysLeft: 2, status: 'soon' },
    { id: 2, title: 'Network Security Essay', course: 'CS405', date: 'Oct 18, 2023', daysLeft: 5, status: 'track' },
    { id: 3, title: 'AI Ethics Presentation', course: 'CS501', date: 'Oct 12, 2023', daysLeft: 0, status: 'overdue' },
  ];

  const submissions = [
    { id: 1, title: 'Algorithm Analysis Lab', course: 'CS201', date: 'Oct 05, 2023', status: 'Graded', score: '95/100' },
    { id: 2, title: 'Software Engineering Proposal', course: 'CS304', date: 'Oct 08, 2023', status: 'Submitted', score: null },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="dashboard-container container">
      <header className="dashboard-header">
        <div>
          <h1 className="text-gradient">Student Dashboard</h1>
          <p>Welcome back, Alex! Here's what's happening with your projects.</p>
        </div>
        <div className="header-actions">
          <button className="notification-btn">
            <FiBell />
            <span className="badge">3</span>
          </button>
          <div className="user-profile-summary">
            <div className="user-avatar">AS</div>
          </div>
        </div>
      </header>

      <motion.div
        className="stats-grid"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {stats.map((stat, i) => (
          <motion.div key={i} className="stat-card glass-panel" variants={itemVariants}>
            <div className="stat-icon" style={{ backgroundColor: `${stat.color}15`, color: stat.color }}>
              {stat.icon}
            </div>
            <div className="stat-info">
              <h3>{stat.value}</h3>
              <p>{stat.title}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="dashboard-main-content">
        <div className="content-left">
          {/* Upcoming Deadlines */}
          <motion.section
            className="dashboard-section glass-panel"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="section-header">
              <h2><FiCalendar /> Upcoming Deadlines</h2>
              <button className="view-all">View Calendar</button>
            </div>
            <div className="deadline-list">
              {deadlines.map(deadline => (
                <div key={deadline.id} className={`deadline-item ${deadline.status}`}>
                  <div className="deadline-info">
                    <h4>{deadline.title}</h4>
                    <span>{deadline.course} • {deadline.date}</span>
                  </div>
                  <div className="deadline-status">
                    <span className="days-count">
                      {deadline.daysLeft === 0 ? 'Overdue' : `${deadline.daysLeft} days left`}
                    </span>
                    <FiChevronRight />
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Recent Submissions */}
          <motion.section
            className="dashboard-section glass-panel"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="section-header">
              <h2><FiFileText /> Recent Submissions</h2>
              <button className="view-all">See All</button>
            </div>
            <div className="submission-table-wrapper">
              <table className="submission-table">
                <thead>
                  <tr>
                    <th>Assignment</th>
                    <th>Status</th>
                    <th>Grade</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.map(sub => (
                    <tr key={sub.id}>
                      <td>
                        <div className="sub-title">{sub.title}</div>
                        <div className="sub-course">{sub.course}</div>
                      </td>
                      <td>
                        <span className={`status-pill ${sub.status.toLowerCase()}`}>
                          {sub.status}
                        </span>
                      </td>
                      <td>{sub.score || '--'}</td>
                      <td><button className="btn-icon"><FiChevronRight /></button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.section>
        </div>

        <div className="content-right">
          {/* Feedback Section */}
          <motion.section
            className="dashboard-section glass-panel"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="section-header">
              <h2><FiMessageSquare /> Recent Feedback</h2>
            </div>
            <div className="feedback-preview">
              <div className="feedback-card">
                <div className="feedback-meta">
                  <strong>Dr. Sarah Smith</strong>
                  <span>Oct 10, 2023</span>
                </div>
                <p>"Excellent work on the normalization section. Your ER diagram is very clear and covers all requirements..."</p>
                <button className="text-link">Read Full Feedback</button>
              </div>
            </div>
          </motion.section>

          {/* Notifications/Alerts */}
          <motion.section
            className="dashboard-section glass-panel alerts-section"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="section-header">
              <h2>Notifications</h2>
            </div>
            <div className="alert-list">
              <div className="alert-item primary">
                <FiAlertCircle />
                <p>New assignment posted in <strong>CS302</strong></p>
              </div>
              <div className="alert-item warning">
                <FiClock />
                <p>Deadline in 2 days: <strong>DB Project</strong></p>
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
