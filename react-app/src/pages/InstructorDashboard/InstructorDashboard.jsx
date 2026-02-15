import React from 'react';
import { motion } from 'framer-motion';
import {
  FiBook, FiFileText, FiClock, FiAlertCircle,
  FiUsers, FiBarChart2, FiPlus, FiChevronRight,
  FiEdit, FiDownload, FiMessageSquare, FiBell
} from 'react-icons/fi';
import './InstructorDashboard.css';

const InstructorDashboard = () => {
  // Mock Data
  const stats = [
    { title: 'Active Courses', value: '4', icon: <FiBook />, color: '#6366f1' },
    { title: 'Total Assignments', value: '18', icon: <FiFileText />, color: '#ec4899' },
    { title: 'Pending Reviews', value: '24', icon: <FiClock />, color: '#f59e0b' },
    { title: 'Late Submissions', value: '7', icon: <FiAlertCircle />, color: '#ef4444' },
  ];

  const courses = [
    { id: 1, name: 'Advanced Database Systems', code: 'CS302', students: 45, completion: 88 },
    { id: 2, name: 'Web Development Frameworks', code: 'CS204', students: 52, completion: 92 },
    { id: 3, name: 'Network Security', code: 'CS405', students: 38, completion: 75 },
  ];

  const recentSubmissions = [
    { id: 1, student: 'John Doe', assignment: 'Final Project Proposal', course: 'CS302', date: '2 hours ago', status: 'On-time' },
    { id: 2, student: 'Jane Smith', assignment: 'Lab 4: React Components', course: 'CS204', date: '5 hours ago', status: 'Late' },
    { id: 3, student: 'Alice Johnson', assignment: 'Midterm Research Paper', course: 'CS405', date: '1 day ago', status: 'On-time' },
  ];

  const assignments = [
    { id: 1, title: 'Database Normalization', due: 'Oct 20, 2023', submissions: '42/45', pending: 15 },
    { id: 2, title: 'API Integration Project', due: 'Oct 25, 2023', submissions: '28/52', pending: 8 },
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
          <h1 className="text-gradient">Instructor Dashboard</h1>
          <p>Welcome back, Prof. Henderson. You have 24 submissions to review today.</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-primary create-btn">
            <FiPlus /> Create Assignment
          </button>
          <button className="notification-btn">
            <FiBell />
            <span className="badge">5</span>
          </button>
          <div className="user-avatar instructor">RH</div>
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
          {/* Courses Overview */}
          <motion.section
            className="dashboard-section glass-panel"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="section-header">
              <h2><FiBook /> Managed Courses</h2>
              <button className="view-all">All Courses</button>
            </div>
            <div className="course-list">
              {courses.map(course => (
                <div key={course.id} className="course-item">
                  <div className="course-main-info">
                    <div className="course-title-group">
                      <h4>{course.name}</h4>
                      <span>{course.code} • {course.students} Students</span>
                    </div>
                  </div>
                  <div className="course-progress-wrapper">
                    <div className="progress-bar-container">
                      <div className="progress-bar" style={{ width: `${course.completion}%` }}></div>
                    </div>
                    <span>{course.completion}% Completion</span>
                  </div>
                  <button className="btn-icon"><FiChevronRight /></button>
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
              <button className="view-all">Review Queue</button>
            </div>
            <div className="submission-table-wrapper">
              <table className="submission-table">
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Assignment</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recentSubmissions.map(sub => (
                    <tr key={sub.id}>
                      <td>
                        <div className="student-name">{sub.student}</div>
                        <div className="sub-course">{sub.course}</div>
                      </td>
                      <td>{sub.assignment}</td>
                      <td>
                        <span className={`status-pill ${sub.status.toLowerCase().replace('-', '')}`}>
                          {sub.status}
                        </span>
                      </td>
                      <td className="sub-date">{sub.date}</td>
                      <td>
                        <div className="action-btns">
                          <button className="btn-icon" title="Grade"><FiEdit /></button>
                          <button className="btn-icon" title="Download"><FiDownload /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.section>
        </div>

        <div className="content-right">
          {/* Active Assignments */}
          <motion.section
            className="dashboard-section glass-panel"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="section-header">
              <h2><FiClock /> Assignments</h2>
            </div>
            <div className="assignment-mini-list">
              {assignments.map(ass => (
                <div key={ass.id} className="assignment-mini-card">
                  <h4>{ass.title}</h4>
                  <p>Due: {ass.due}</p>
                  <div className="ass-stats">
                    <span><strong>{ass.submissions}</strong> Turned in</span>
                    <span className="pending-tag">{ass.pending} Pending Review</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Performance Snapshot */}
          <motion.section
            className="dashboard-section glass-panel"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="section-header">
              <h2><FiBarChart2 /> Performance Snapshot</h2>
            </div>
            <div className="performance-metrics">
              <div className="metric-item">
                <span>Class Average</span>
                <strong>84.2%</strong>
              </div>
              <div className="metric-item">
                <span>Timely Submissions</span>
                <strong>92.1%</strong>
              </div>
              <div className="metric-item">
                <span>Feedback Response Time</span>
                <strong>1.2 Days</strong>
              </div>
            </div>
          </motion.section>

          {/* Alerts */}
          <motion.div className="alert-card glass-panel">
            <FiMessageSquare className="alert-icon" />
            <div>
              <h5>Student Inquiry</h5>
              <p>Alex Smith asked a question about "Course CS302"</p>
              <button className="text-link">Respond Now</button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboard;
