import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../../services/api';
import {
  FiGrid, FiBook, FiClock, FiCheckSquare, FiTrendingUp,
  FiBell, FiCalendar, FiFileText, FiMessageSquare,
  FiChevronRight, FiAlertCircle, FiPlus, FiLogOut, FiStar, FiActivity, FiMenu, FiX
} from 'react-icons/fi';
import { AnimatePresence } from 'framer-motion';
import './StudentDashboard.css';

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState('Project Overview');
  const [stats, setStats] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [availableProjects, setAvailableProjects] = useState([]);
  const [grades, setGrades] = useState([]);
  const [revisions, setRevisions] = useState([]);
  const [selectedAssignmentId, setSelectedAssignmentId] = useState('');
  const [file, setFile] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    try {
      if (activeTab === 'Project Overview' || activeTab === 'Progress Tracker') {
        const statsRes = await api.get('/student/stats');
        setStats(statsRes.data.stats || []);
        const assignRes = await api.get('/student/assignments');
        setAssignments(assignRes.data || []);
      } else if (activeTab === 'Acceptance & Task Center') {
        const availRes = await api.get('/student/available-projects');
        setAvailableProjects(availRes.data || []);
      } else if (activeTab === 'Submission Upload Center' || activeTab === 'Milestones & Deadlines') {
        const assignRes = await api.get('/student/assignments');
        setAssignments(assignRes.data || []);
      } else if (activeTab === 'Grade & Feedback Center') {
        const gradeRes = await api.get('/student/grades');
        setGrades(gradeRes.data || []);
      } else if (activeTab === 'Revision Requests') {
        const revRes = await api.get('/student/revisions');
        setRevisions(revRes.data || []);
      }
    } catch (err) {
      console.error('Failed to fetch student data:', err);
    }
  };

  const handleJoinProject = async (projectId) => {
    try {
      await api.post(`/student/projects/${projectId}/join`);
      alert('Project accepted successfully!');
      fetchData();
    } catch (err) {
      console.error(err);
      alert('Failed to accept project');
    }
  };

  const handleResubmit = (assignmentId) => {
    setSelectedAssignmentId(assignmentId);
    setActiveTab('Submission Upload Center');
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmitProject = async (e) => {
    e.preventDefault();
    if (!selectedAssignmentId) {
      alert("Please select an assignment to submit.");
      return;
    }
    const formData = new FormData();
    if (file) {
      formData.append('files[]', file);
    }
    formData.append('notes', 'Project Submission');

    try {
      await api.post(`/student/assignments/${selectedAssignmentId}/submit`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Project submitted successfully!');
      setFile(null);
      setSelectedAssignmentId('');
      fetchData();
      setActiveTab('Project Overview');
    } catch (err) {
      console.error(err);
      alert('Submission failed');
    }
  };

  const getScoreColor = (score) => {
    const s = parseFloat(score);
    if (isNaN(s)) return 'var(--color-text-secondary)';
    if (s < 50) return '#ef4444'; // Red
    if (s <= 85) return '#f97316'; // Orange
    return '#10b981'; // Green
  };

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
                    <FiTrendingUp />
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
                    {assignments.map(a => (
                      <div key={a.id} className="deadline-item track" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'var(--color-bg-primary)', borderRadius: '12px', borderLeft: `4px solid #10b981` }}>
                        <div className="deadline-info">
                          <h4 style={{ fontWeight: 600 }}>{a.project_title}</h4>
                          <span style={{ fontSize: '0.85rem', opacity: 0.6 }}>{a.category} • {a.deadline}</span>
                        </div>
                        <span className="status-badge status-active" style={{ fontSize: '0.85rem' }}>{a.status}</span>
                      </div>
                    ))}
                    {assignments.length === 0 && <p style={{opacity: 0.6}}>No active assignments right now.</p>}
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
                      <div className="progress-bar" style={{ width: '45%', background: 'var(--color-accent-gradient)' }}></div>
                    </div>
                    <p style={{ textAlign: 'center', marginTop: '1rem', fontWeight: 600 }}>In Progress</p>
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
              <h2>Available Projects</h2>
              <p>Explore and join projects created by your instructors.</p>
            </div>
            {availableProjects.map(a => (
               <div key={a.id} className="glass-panel" style={{ padding: '2rem', marginTop: '1rem' }}>
                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                   <div>
                     <h3 style={{ marginBottom: '0.5rem' }}>{a.title}</h3>
                     <p style={{ opacity: 0.6 }}>Instructor: {a.instructor} • Category: {a.category}</p>
                     <p style={{ fontSize: '0.85rem', marginTop: '0.5rem', maxWidth: '600px' }}>{a.description}</p>
                   </div>
                   <div style={{ display: 'flex', gap: '1rem' }}>
                     <button className="btn btn-success btn-sm" onClick={() => handleJoinProject(a.id)}>Accept Project</button>
                   </div>
                 </div>
               </div>
            ))}
            {availableProjects.length === 0 && (
              <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center', marginTop: '1rem' }}>
                <FiAlertCircle size={40} color="var(--color-accent-primary)" style={{ marginBottom: '1rem' }} />
                <p style={{ opacity: 0.6 }}>No new projects available to join at this time.</p>
              </div>
            )}
          </motion.div>
        );

      case 'Progress Tracker':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="tab-content">
            <div className="section-header-row">
              <h2>My Progress Tracker</h2>
            </div>
            <div className="glass-panel" style={{ marginTop: '1rem', padding: '1.5rem' }}>
              <div className="progress-list" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {assignments.map(a => (
                  <div key={a.id} className="progress-item">
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <h4 style={{ fontWeight: 600 }}>{a.project_title}</h4>
                      <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-accent-primary)' }}>{a.status}</span>
                    </div>
                    <div className="progress-container" style={{ height: '10px' }}>
                      <div 
                        className="progress-bar" 
                        style={{ 
                          width: a.status === 'Graded' ? '100%' : a.has_submission ? '75%' : '25%',
                          background: a.status === 'Graded' ? '#10b981' : 'var(--color-accent-gradient)'
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
                {assignments.length === 0 && <p style={{opacity: 0.6}}>Join a project to track your progress.</p>}
              </div>
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
              <p style={{ opacity: 0.6, maxWidth: '400px', margin: '1rem auto 2rem' }}>Select your project and upload the files.</p>
              
              <form onSubmit={handleSubmitProject} style={{ maxWidth: '400px', margin: '0 auto', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label>Select Assignment</label>
                  <select 
                    value={selectedAssignmentId} 
                    onChange={e => setSelectedAssignmentId(e.target.value)} 
                    required 
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ddd', marginTop: '0.5rem' }}
                  >
                    <option value="">Select an assignment...</option>
                    {assignments
                      .filter(a => {
                        const statusMatch = (
                          !a.has_submission || 
                          a.status === 'Revision Required' || 
                          a.status === 'revision_required' ||
                          a.assignment_status === 'revision_required' ||
                          a.status === 'Pending Submission'
                        );
                        return statusMatch;
                      })
                      .map(a => (
                        <option key={a.id} value={a.id}>{a.project_title || 'Untitled Project'}</option>
                      ))
                    }
                  </select>
                </div>
                <div>
                  <label>Upload File (ZIP, PDF)</label>
                  <input type="file" onChange={handleFileChange} style={{ width: '100%', padding: '0.75rem', marginTop: '0.5rem' }} />
                </div>
                <button type="submit" className="btn btn-success" style={{ width: '100%' }}>Submit Project</button>
              </form>
            </div>
          </motion.div>
        );

      case 'Revision Requests':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="tab-content">
            <div className="section-header-row">
              <h2>Revision Requests</h2>
            </div>
            <div className="revisions-list" style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {revisions.map(r => (
                <div key={r.id} className="glass-panel" style={{ padding: '1.5rem', borderLeft: '4px solid #f97316' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h3 style={{ fontSize: '1.1rem' }}>{r.project_title}</h3>
                    <span style={{ fontSize: '0.85rem', opacity: 0.6 }}>Requested on {r.requested_on}</span>
                  </div>
                  <div style={{ background: 'var(--color-bg-primary)', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
                    <p style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.5rem' }}>Instructor Feedback:</p>
                    <p style={{ opacity: 0.8 }}>{r.feedback}</p>
                  </div>
                  <button className="btn btn-outline btn-sm" onClick={() => handleResubmit(r.assignment_id)}>Resubmit Now</button>
                </div>
              ))}
              {revisions.length === 0 && (
                <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
                  <p style={{ opacity: 0.6 }}>No active revision requests.</p>
                </div>
              )}
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
                    <th>Graded On</th>
                    <th>Grade</th>
                    <th>Feedback</th>
                  </tr>
                </thead>
                <tbody>
                  {grades.map(g => (
                    <tr key={g.id}>
                      <td style={{ fontWeight: 600 }}>{g.project_title}</td>
                      <td>{g.graded_on}</td>
                      <td style={{ fontWeight: 700, color: getScoreColor(g.score) }}>{g.score}</td>
                      <td>{g.feedback}</td>
                    </tr>
                  ))}
                  {grades.length === 0 && (
                    <tr>
                      <td colSpan="4" style={{ textAlign: 'center', opacity: 0.6, padding: '2rem' }}>No grades available yet.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        );

      case 'Milestones & Deadlines':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="tab-content">
            <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
              <h2>{activeTab} Module</h2>
              <p style={{ opacity: 0.6 }}>This feature relies on granular task breakdowns, available in Phase 2.</p>
            </div>
          </motion.div>
        );

      default:
        return <div>Select a section</div>;
    }
  };

  const user = JSON.parse(localStorage.getItem('user')) || { name: 'Student', role: { name: 'Student' } };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <div className="student-dashboard-wrapper">
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="sidebar-overlay"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

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
            <FiActivity /> <span className="nav-label">Progress Tracker</span>
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
            <div className="avatar" style={{ background: 'var(--color-accent-primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600 }}>
              {user.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="user-info">
              <div className="user-name" style={{ fontWeight: 600 }}>{user.name}</div>
              <p style={{ fontSize: '0.75rem', opacity: 0.6 }}>{user?.role?.name || 'Student'}</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="nav-link" 
            style={{ marginTop: '1.5rem', width: '100%', border: 'none', background: 'transparent', justifyContent: 'center' }}
          >
            <FiLogOut /> <span className="nav-label">Logout</span>
          </button>
        </div>
      </aside>

      <header className="student-header">
        <div className="header-left">
          <button className="mobile-menu-trigger" onClick={() => setIsSidebarOpen(true)}>
            <FiMenu />
          </button>
          <h1>{activeTab}</h1>
        </div>
        <div className="header-right">
          <button className="btn-upgrade">
            <FiPlus /> Get Pro
          </button>
          <div className="header-user-dropdown">
            <div className="header-avatar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-accent-primary)', color: 'white', fontWeight: 600 }}>
              {user.name.split(' ').map(n => n[0]).join('')}
            </div>
            <span style={{ fontWeight: 500, fontSize: '0.9rem' }}>{user.name.split(' ')[0]} <FiGrid size={12} style={{ marginLeft: '4px', opacity: 0.6 }} /></span>
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
