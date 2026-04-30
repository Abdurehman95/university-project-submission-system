import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiGrid, FiBook, FiClock, FiCheckSquare, FiTrendingUp,
  FiBell, FiCalendar, FiFileText, FiMessageSquare,
  FiChevronRight, FiAlertCircle, FiPlus, FiLogOut
} from 'react-icons/fi';
import './StudentDashboard.css';

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState('Dashboard');

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

  const courses = [
    { id: 1, name: 'Advanced Database Systems', code: 'CS302', instructor: 'Dr. Sarah Wilson', credits: 4 },
    { id: 2, name: 'Web Dev Frameworks', code: 'CS204', instructor: 'Prof. Henderson', credits: 3 },
    { id: 3, name: 'Network Security', code: 'CS405', instructor: 'Dr. Alice Brown', credits: 4 },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const renderSection = () => {
    switch (activeTab) {
      case 'Dashboard':
        return (
          <>
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
                    <h3 style={{ fontSize: '1.75rem', fontWeight: 700 }}>{stat.value}</h3>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>{stat.title}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <div className="dashboard-main-content">
              <div className="content-left">
                <motion.section
                  className="dashboard-section glass-panel"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <div className="section-header">
                    <h2><FiCalendar /> Track Deadlines</h2>
                    <button className="view-all" onClick={() => setActiveTab('Assignments')}>View All</button>
                  </div>
                  <div className="deadline-list" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {deadlines.map(deadline => (
                      <div key={deadline.id} className={`deadline-item ${deadline.status}`} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'var(--color-bg-primary)', borderRadius: '12px', borderLeft: `4px solid ${deadline.status === 'soon' ? '#f59e0b' : deadline.status === 'track' ? '#10b981' : '#ef4444'}` }}>
                        <div className="deadline-info">
                          <h4 style={{ fontWeight: 600 }}>{deadline.title}</h4>
                          <span style={{ fontSize: '0.85rem', opacity: 0.6 }}>{deadline.course} • {deadline.date}</span>
                        </div>
                        <div className="deadline-status" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          <span className="days-count" style={{ fontWeight: 600, fontSize: '0.85rem' }}>
                            {deadline.daysLeft === 0 ? 'Overdue' : `${deadline.daysLeft} days left`}
                          </span>
                          <FiChevronRight />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.section>
              </div>

              <div className="content-right">
                <motion.section
                  className="dashboard-section glass-panel"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <div className="section-header">
                    <h2><FiMessageSquare /> Feedback</h2>
                  </div>
                  <div className="feedback-preview">
                    <div className="feedback-card" style={{ background: 'var(--color-bg-primary)', padding: '1.25rem', borderRadius: '15px' }}>
                      <div className="feedback-meta" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '0.85rem' }}>
                        <strong>Dr. Sarah Smith</strong>
                        <span>Oct 10</span>
                      </div>
                      <p style={{ fontStyle: 'italic', fontSize: '0.9rem', color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>"Excellent work on the normalization section. Your ER diagram is very clear..."</p>
                      <button className="text-link" onClick={() => setActiveTab('Submissions')} style={{ background: 'none', border: 'none', color: 'var(--color-accent-primary)', fontWeight: 600, cursor: 'pointer' }}>Full Feedback</button>
                    </div>
                  </div>
                </motion.section>
              </div>
            </div>
          </>
        );

      case 'Courses':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="courses-view">
            <div className="section-header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h2>My Enrolled Courses</h2>
              <button className="btn btn-outline">Browse Catalog</button>
            </div>
            <div className="courses-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
              {courses.map(course => (
                <div key={course.id} className="glass-panel course-card" style={{ padding: '2rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                    <FiBook size={32} color="var(--color-accent-primary)" />
                    <span className="badge-code" style={{ padding: '4px 12px', background: 'var(--color-accent-soft)', color: 'var(--color-accent-primary)', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600 }}>{course.code}</span>
                  </div>
                  <h3 style={{ marginBottom: '0.5rem' }}>{course.name}</h3>
                  <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Instructor: {course.instructor}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '1.5rem', borderTop: '1px solid var(--color-glass-border)' }}>
                    <span>{course.credits} Credits</span>
                    <button className="text-link" style={{ fontWeight: 600 }}>View Course</button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        );

      case 'Assignments':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="assignments-view">
            <div className="section-header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h2>Upcoming Assignments</h2>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button className="btn btn-outline">Filter</button>
                <button className="btn btn-success">Submit Project</button>
              </div>
            </div>
            <div className="deadline-list" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {deadlines.map(deadline => (
                <div key={deadline.id} className="glass-panel" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem' }}>
                  <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                    <div style={{ width: '45px', height: '45px', background: 'var(--color-accent-soft)', color: 'var(--color-accent-primary)', borderRadius: '12px', display: 'flex', alignItems: 'center', justify_content: 'center', fontSize: '1.25rem' }}>
                      <FiFileText />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '1.1rem', fontWeight: 600 }}>{deadline.title}</h4>
                      <p style={{ fontSize: '0.9rem', opacity: 0.6 }}>{deadline.course} • Due {deadline.date}</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                    <span style={{ fontWeight: 600, color: deadline.status === 'overdue' ? '#ef4444' : '#f59e0b' }}>
                      {deadline.daysLeft === 0 ? 'Overdue' : `${deadline.daysLeft} days remaining`}
                    </span>
                    <button className="btn btn-outline btn-sm">View Requirements</button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        );

      case 'Submissions':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="submissions-view">
            <div className="section-header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h2>My Submission History</h2>
              <button className="btn btn-outline">Export Transcript</button>
            </div>
            <div className="glass-panel" style={{ overflow: 'hidden' }}>
              <table className="submission-table">
                <thead>
                  <tr>
                    <th>Assignment Title</th>
                    <th>Course Code</th>
                    <th>Date Submitted</th>
                    <th>Evaluation Status</th>
                    <th>Final Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.map(sub => (
                    <tr key={sub.id}>
                      <td style={{ fontWeight: 600 }}>{sub.title}</td>
                      <td style={{ opacity: 0.7 }}>{sub.course}</td>
                      <td>{sub.date}</td>
                      <td>
                        <span className={`status-pill ${sub.status.toLowerCase()}`}>
                          {sub.status}
                        </span>
                      </td>
                      <td style={{ fontWeight: 700, color: 'var(--color-accent-primary)' }}>{sub.score || '--'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        );

      default:
        return <div>Select a section</div>;
    }
  };

  return (
    <div className="student-dashboard-wrapper">
      <aside className="student-sidebar">
        <div className="sidebar-brand">
          <div className="brand-icon">U</div>
          <span className="text-gradient" style={{ fontWeight: 800 }}>UniSubmit</span>
        </div>

        <nav className="sidebar-nav">
          <div className={`nav-link ${activeTab === 'Dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('Dashboard')}>
            <FiGrid /> <span className="nav-label">Dashboard</span>
          </div>
          <div className={`nav-link ${activeTab === 'Courses' ? 'active' : ''}`} onClick={() => setActiveTab('Courses')}>
            <FiBook /> <span className="nav-label">Courses</span>
          </div>
          <div className={`nav-link ${activeTab === 'Assignments' ? 'active' : ''}`} onClick={() => setActiveTab('Assignments')}>
            <FiCalendar /> <span className="nav-label">Assignments</span>
          </div>
          <div className={`nav-link ${activeTab === 'Submissions' ? 'active' : ''}`} onClick={() => setActiveTab('Submissions')}>
            <FiCheckSquare /> <span className="nav-label">Submissions</span>
          </div>
        </nav>

        <div className="sidebar-footer">
          <div className="user-snippet">
            <div className="avatar">AS</div>
            <div className="user-info">
              <div className="user-name" style={{ fontWeight: 600 }}>Alex Smith</div>
              <p style={{ fontSize: '0.75rem', opacity: 0.6 }}>Student</p>
            </div>
          </div>
          <button className="nav-link" style={{ marginTop: '1.5rem', width: '100%', border: 'none', background: 'transparent', justifyContent: 'center' }}>
            <FiLogOut /> <span className="nav-label">Logout</span>
          </button>
        </div>
      </aside>

      <header className="student-header">
        <div className="header-left">
          <h1>{activeTab}</h1>
        </div>
        <div className="header-right">
          <button className="btn-upgrade">
            <FiPlus /> Get Pro
          </button>
          <div className="header-user-dropdown">
            <img 
              src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=100" 
              alt="Profile" 
              className="header-avatar"
            />
            <span style={{ fontWeight: 500, fontSize: '0.9rem' }}>Alex S. <FiGrid size={12} style={{ marginLeft: '4px', opacity: 0.6 }} /></span>
          </div>
        </div>
      </header>

      <main className="student-main">
        {renderSection()}
      </main>
    </div>
  );
};

export default StudentDashboard;
