import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiGrid, FiBook, FiClock, FiCheckSquare, FiTrendingUp,
  FiBell, FiCalendar, FiFileText, FiMessageSquare,
  FiChevronRight, FiAlertCircle, FiPlus, FiLogOut, FiStar, FiMenu, FiX
} from 'react-icons/fi';
import './StudentDashboard.css';

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState('Project Overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
      case 'Project Overview':
        return (
          <>
            <motion.div
              className="stats-grid"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {stats.map((stat, i) => (
                <motion.div key={i} className="stat-card glass-panel kpi-card" variants={itemVariants}>
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
                    <h2><FiCalendar /> Active Milestones</h2>
                  </div>
                  <div className="deadline-list" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {deadlines.map(deadline => (
                      <div key={deadline.id} className={`deadline-item ${deadline.status}`} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'var(--color-bg-primary)', borderRadius: '12px', borderLeft: `4px solid ${deadline.status === 'soon' ? '#f59e0b' : deadline.status === 'track' ? '#10b981' : '#ef4444'}` }}>
                        <div className="deadline-info">
                          <h4 style={{ fontWeight: 600 }}>{deadline.title}</h4>
                          <span style={{ fontSize: '0.85rem', opacity: 0.6 }}>{deadline.course} • {deadline.date}</span>
                        </div>
                        <span className="countdown-timer" style={{ fontSize: '0.85rem' }}><FiClock /> {deadline.daysLeft}d left</span>
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
                    <h2><FiTrendingUp /> Overall Progress</h2>
                  </div>
                  <div style={{ padding: '1rem' }}>
                    <div className="progress-container" style={{ height: '12px' }}>
                      <div className="progress-bar" style={{ width: '72%', background: 'var(--color-accent-gradient)' }}></div>
                    </div>
                    <p style={{ textAlign: 'center', marginTop: '1rem', fontWeight: 600 }}>72% Total Completion</p>
                  </div>
                </motion.section>
              </div>
            </div>
          </>
        );

      case 'Acceptance & Task Center':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="courses-view">
            <div className="section-header-row">
              <h2>Pending Project Invitations</h2>
            </div>
            <div className="glass-panel" style={{ padding: '2rem', marginTop: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ marginBottom: '0.5rem' }}>E-Commerce Platform Re-design</h3>
                  <p style={{ opacity: 0.6 }}>Assigned by Prof. Henderson • Oct 20</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button className="btn btn-success btn-sm">Accept Project</button>
                  <button className="btn btn-outline btn-sm">Decline</button>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 'Progress Tracker':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="tab-content">
            <div className="glass-panel" style={{ padding: '2rem' }}>
              <h2>Workflow Progress</h2>
              <div style={{ marginTop: '2rem' }}>
                {[
                  { step: 'Requirements Gathering', status: 'completed' },
                  { step: 'System Design', status: 'completed' },
                  { step: 'Implementation', status: 'active' },
                  { step: 'Testing & QA', status: 'pending' },
                  { step: 'Final Submission', status: 'pending' }
                ].map((s, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1.5rem' }}>
                    <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: s.status === 'completed' ? 'var(--color-success)' : s.status === 'active' ? 'var(--color-accent-primary)' : 'rgba(0,0,0,0.1)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {s.status === 'completed' ? <FiCheckSquare size={16} /> : i + 1}
                    </div>
                    <span style={{ fontWeight: s.status === 'active' ? 700 : 400, opacity: s.status === 'pending' ? 0.4 : 1 }}>{s.step}</span>
                    {s.status === 'active' && <span className="status-badge status-active" style={{ marginLeft: 'auto' }}>In Progress</span>}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        );

      case 'Milestones & Deadlines':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="assignments-view">
            <div className="section-header-row">
              <h2>Project Milestones</h2>
            </div>
            <div className="deadline-list" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
              {deadlines.map(deadline => (
                <div key={deadline.id} className="glass-panel kpi-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem' }}>
                  <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                    <FiCalendar size={24} color="var(--color-accent-primary)" />
                    <div>
                      <h4 style={{ fontWeight: 600 }}>{deadline.title}</h4>
                      <p style={{ fontSize: '0.85rem', opacity: 0.6 }}>{deadline.course}</p>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontWeight: 700, color: '#ef4444' }}>Due: {deadline.date}</p>
                    <span style={{ fontSize: '0.8rem', opacity: 0.5 }}>{deadline.daysLeft} days remaining</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        );

      case 'Submission Upload Center':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="tab-content">
            <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
              <div style={{ width: '80px', height: '80px', background: 'var(--color-accent-soft)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
                <FiPlus size={40} color="var(--color-accent-primary)" />
              </div>
              <h2>Upload Deliverables</h2>
              <p style={{ opacity: 0.6, maxWidth: '400px', margin: '1rem auto 2rem' }}>Drag and drop your project files here. Supported: ZIP, PDF, MP4 (Max 500MB)</p>
              <button className="btn btn-primary">Select Files</button>
            </div>
          </motion.div>
        );

      case 'Revision Requests':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="tab-content">
            <div className="glass-panel" style={{ padding: '2rem' }}>
              <h2>My Revision Requests</h2>
              <p style={{ opacity: 0.6, marginTop: '1rem' }}>No active revision requests at the moment.</p>
              <button className="btn btn-outline" style={{ marginTop: '2rem' }}>New Request</button>
            </div>
          </motion.div>
        );

      case 'Grade & Feedback Center':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="submissions-view">
            <div className="section-header-row">
              <h2>Grades & Detailed Feedback</h2>
            </div>
            <div className="glass-panel" style={{ overflow: 'auto', marginTop: '1rem' }}>
              <table className="submission-table">
                <thead>
                  <tr>
                    <th>Project</th>
                    <th>Date</th>
                    <th>Grade</th>
                    <th>Feedback</th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.map(sub => (
                    <tr key={sub.id}>
                      <td style={{ fontWeight: 600 }}>{sub.title}</td>
                      <td>{sub.date}</td>
                      <td style={{ fontWeight: 700, color: 'var(--color-accent-primary)' }}>{sub.score || '--'}</td>
                      <td><button className="text-link">View Comments</button></td>
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
    <div className={`student-dashboard-wrapper ${isSidebarOpen ? 'sidebar-open' : ''}`}>
      <div className="sidebar-overlay" onClick={() => setIsSidebarOpen(false)}></div>
      <aside className={`student-sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-brand">
          <div className="brand-icon">U</div>
          <span className="text-gradient" style={{ fontWeight: 800 }}>UniSubmit</span>
        </div>

        <nav className="sidebar-nav">
          <div className={`nav-link ${activeTab === 'Project Overview' ? 'active' : ''}`} onClick={() => { setActiveTab('Project Overview'); setIsSidebarOpen(false); }}>
            <FiGrid /> <span className="nav-label">Project Overview</span>
          </div>
          <div className={`nav-link ${activeTab === 'Acceptance & Task Center' ? 'active' : ''}`} onClick={() => { setActiveTab('Acceptance & Task Center'); setIsSidebarOpen(false); }}>
            <FiCheckSquare /> <span className="nav-label">Acceptance Hub</span>
          </div>
          <div className={`nav-link ${activeTab === 'Progress Tracker' ? 'active' : ''}`} onClick={() => { setActiveTab('Progress Tracker'); setIsSidebarOpen(false); }}>
            <FiTrendingUp /> <span className="nav-label">Progress Tracker</span>
          </div>
          <div className={`nav-link ${activeTab === 'Milestones & Deadlines' ? 'active' : ''}`} onClick={() => { setActiveTab('Milestones & Deadlines'); setIsSidebarOpen(false); }}>
            <FiCalendar /> <span className="nav-label">Milestones</span>
          </div>
          <div className={`nav-link ${activeTab === 'Submission Upload Center' ? 'active' : ''}`} onClick={() => { setActiveTab('Submission Upload Center'); setIsSidebarOpen(false); }}>
            <FiPlus /> <span className="nav-label">Submission Upload</span>
          </div>
          <div className={`nav-link ${activeTab === 'Revision Requests' ? 'active' : ''}`} onClick={() => { setActiveTab('Revision Requests'); setIsSidebarOpen(false); }}>
            <FiClock /> <span className="nav-label">Revision Requests</span>
          </div>
          <div className={`nav-link ${activeTab === 'Grade & Feedback Center' ? 'active' : ''}`} onClick={() => { setActiveTab('Grade & Feedback Center'); setIsSidebarOpen(false); }}>
            <FiStar /> <span className="nav-label">Grade Center</span>
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
          <button className="mobile-menu-btn" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            {isSidebarOpen ? <FiX /> : <FiMenu />}
          </button>
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
