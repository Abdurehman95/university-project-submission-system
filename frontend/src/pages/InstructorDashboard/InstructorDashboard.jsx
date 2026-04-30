import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiGrid, FiBook, FiPlus, FiUsers, FiFileText,
  FiClock, FiDownload, FiCheck, FiX, FiPaperclip,
  FiTrendingUp, FiLogOut, FiSend, FiStar, FiFilter, FiBell
} from 'react-icons/fi';
import './InstructorDashboard.css';

const InstructorDashboard = () => {
  const [activeSection, setActiveSection] = useState('Dashboard');
  const [isEvaluationOpen, setIsEvaluationOpen] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [gradingData, setGradingData] = useState({ score: '', comments: '', rubricRating: 0 });

  // Mock Data
  const stats = [
    { label: 'Active Courses', value: '4', icon: <FiBook />, color: '#6366f1' },
    { label: 'Submissions', value: '128', icon: <FiFileText />, color: '#ec4899' },
    { label: 'Pending Review', value: '15', icon: <FiClock />, color: '#f59e0b' },
    { label: 'Student Avg', value: '84%', icon: <FiTrendingUp />, color: '#10b981' },
  ];

  const courses = [
    { id: 1, name: 'Advanced Database Systems', code: 'CS302', students: 45, term: 'Fall 2023' },
    { id: 2, name: 'Web Dev Frameworks', code: 'CS204', students: 52, term: 'Fall 2023' },
    { id: 3, name: 'Network Security', code: 'CS405', students: 38, term: 'Fall 2023' },
  ];

  const submissions = [
    { id: 1, student: 'John Doe', assignment: 'Final Project Proposal', date: 'Oct 20, 2023', status: 'Pending Review' },
    { id: 2, student: 'Jane Smith', assignment: 'Lab 4: React Testing', date: 'Oct 19, 2023', status: 'Graded', score: '92/100' },
    { id: 3, student: 'Alice Johnson', assignment: 'SQL Optimization Lab', date: 'Oct 18, 2023', status: 'Pending Review' },
    { id: 4, student: 'Michael Chen', assignment: 'Final Project Proposal', date: 'Oct 20, 2023', status: 'Pending Review' },
  ];

  const handleOpenEvaluation = (sub) => {
    setSelectedSubmission(sub);
    setIsEvaluationOpen(true);
  };

  const handleCloseEvaluation = () => {
    setIsEvaluationOpen(false);
    setSelectedSubmission(null);
    setGradingData({ score: '', comments: '', rubricRating: 0 });
  };

  const submitEvaluation = (e) => {
    e.preventDefault();
    console.log('Submitting Evaluation for', selectedSubmission.student, gradingData);
    handleCloseEvaluation();
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'Dashboard':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="dashboard-view">
            <div className="stats-row">
              {stats.map((stat, i) => (
                <div key={i} className="glass-card stat-item">
                  <div className="stat-icon-wrapper" style={{ backgroundColor: `${stat.color}15`, color: stat.color }}>
                    {stat.icon}
                  </div>
                  <div>
                    <h3>{stat.value}</h3>
                    <p>{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="section-grid">
              <div className="glass-card">
                <div className="section-header-mini">
                  <h2>Recent Activity</h2>
                  <button className="text-link">Clear</button>
                </div>
                <div className="activity-list">
                  <div className="activity-item">
                    <FiFileText />
                    <p><strong>Jane Smith</strong> submitted "Lab 4: React Testing"</p>
                    <span>12m ago</span>
                  </div>
                  <div className="activity-item">
                    <FiUsers />
                    <p><strong>New Enrollment:</strong> David Lee joined CS302</p>
                    <span>1h ago</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 'Courses':
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="courses-view">
            <div className="section-header-row">
              <h2>Course Management</h2>
              <button className="btn btn-success"><FiPlus /> Add Course</button>
            </div>
            <div className="courses-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
              {courses.map(course => (
                <div key={course.id} className="glass-card course-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <span className="badge-code">{course.code}</span>
                    <FiCheck color="#10b981" />
                  </div>
                  <h3>{course.name}</h3>
                  <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', margin: '0.5rem 0' }}>{course.term}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem', alignItems: 'center' }}>
                    <span><FiUsers /> {course.students} Students</span>
                    <button className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>Manage</button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        );

      case 'Assignments':
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="assignments-view">
            <div className="creation-panel glass-card">
              <h2>Create New Assignment</h2>
              <p>Define project requirements and set deadlines for your students.</p>

              <form className="form-grid">
                <div className="form-group form-full">
                  <label>Assignment Title</label>
                  <input type="text" placeholder="e.g. Final Research Paper" />
                </div>
                <div className="form-group">
                  <label>Course</label>
                  <select>
                    {courses.map(c => <option key={c.id}>{c.name} ({c.code})</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Deadline</label>
                  <input type="datetime-local" />
                </div>
                <div className="form-group form-full">
                  <label>Description</label>
                  <textarea rows="4" placeholder="Detailed instructions for the students..."></textarea>
                </div>
                <div className="form-group form-full">
                  <label>Attachments & Rubric</label>
                  <div className="file-upload-zone">
                    <FiPaperclip size={24} color="var(--color-accent-primary)" />
                    <p>Drop files here or click to upload</p>
                    <span>PDF, DOCX, ZIP (Max 50MB)</span>
                  </div>
                </div>
                <div className="form-actions" style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                  <button type="button" className="btn btn-outline">Save Draft</button>
                  <button type="submit" className="btn btn-success">Publish Assignment</button>
                </div>
              </form>
            </div>
          </motion.div>
        );

      case 'Submissions':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="submissions-view">
            <div className="section-header-row">
              <h2>Submission Review Queue</h2>
              <div className="toolbar-actions">
                <button className="btn btn-outline"><FiFilter /> Filter</button>
                <button className="btn btn-outline"><FiDownload /> Export CSV</button>
              </div>
            </div>
            <div className="glass-card data-table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Student Name</th>
                    <th>Assignment</th>
                    <th>Date Submitted</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.map(sub => (
                    <tr key={sub.id}>
                      <td>{sub.student}</td>
                      <td>{sub.assignment}</td>
                      <td>{sub.date}</td>
                      <td>
                        <span className={`status-indicator ${sub.status === 'Graded' ? 'status-graded' : 'status-pending'}`}>
                          {sub.status}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button className="btn-icon" onClick={() => handleOpenEvaluation(sub)}><FiStar title="Grade" /></button>
                          <button className="btn-icon"><FiDownload title="Download" /></button>
                        </div>
                      </td>
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
    <div className="instructor-dashboard-wrapper">
      <aside className="instructor-sidebar">
        <div className="sidebar-brand">
          <div className="brand-icon">U</div>
          <span className="text-gradient" style={{ fontWeight: 800 }}>UniSubmit</span>
        </div>

        <nav className="sidebar-nav">
          <div className={`nav-link ${activeSection === 'Dashboard' ? 'active' : ''}`} onClick={() => setActiveSection('Dashboard')}>
            <FiGrid /> <span className="nav-label">Dashboard</span>
          </div>
          <div className={`nav-link ${activeSection === 'Courses' ? 'active' : ''}`} onClick={() => setActiveSection('Courses')}>
            <FiBook /> <span className="nav-label">Courses</span>
          </div>
          <div className={`nav-link ${activeSection === 'Assignments' ? 'active' : ''}`} onClick={() => setActiveSection('Assignments')}>
            <FiPlus /> <span className="nav-label">Assignments</span>
          </div>
          <div className={`nav-link ${activeSection === 'Submissions' ? 'active' : ''}`} onClick={() => setActiveSection('Submissions')}>
            <FiFileText /> <span className="nav-label">Submissions</span>
          </div>
        </nav>

        <div className="sidebar-footer">
          <div className="user-snippet">
            <div className="avatar">RH</div>
            <div className="user-info">
              <div className="user-name">Prof. Henderson</div>
              <p style={{ fontSize: '0.75rem', opacity: 0.6 }}>Instructor</p>
            </div>
          </div>
          <button className="nav-link" style={{ marginTop: '1.5rem', width: '100%', border: 'none', background: 'transparent', justifyContent: 'center' }}>
            <FiLogOut /> <span className="nav-label">Logout</span>
          </button>
        </div>
      </aside>

      <header className="instructor-header">
        <div className="header-left">
          <h1>{activeSection}</h1>
        </div>
        <div className="header-right">
          <button className="btn-upgrade">
            <FiPlus /> Upgrade
          </button>
          <div className="header-user-dropdown">
            <img 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100" 
              alt="Profile" 
              className="header-avatar"
            />
            <span style={{ fontWeight: 500, fontSize: '0.9rem' }}>muser 56788 <FiGrid size={12} style={{ marginLeft: '4px', opacity: 0.6 }} /></span>
          </div>
        </div>
      </header>

      <main className="instructor-main">
        {renderSection()}

        {/* Evaluation & Grading Modal */}
        <AnimatePresence>
          {isEvaluationOpen && (
            <div className="modal-overlay">
              <motion.div
                className="grading-modal"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h2 className="text-gradient">Evaluate: {selectedSubmission?.student}</h2>
                    <p>{selectedSubmission?.assignment}</p>
                  </div>
                  <button className="close-btn" onClick={handleCloseEvaluation} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.5rem' }}>
                    <FiX />
                  </button>
                </div>

                <div className="modal-split">
                  <div className="evaluation-left">
                    <div className="glass-card" style={{ marginBottom: '1.5rem' }}>
                      <h3 style={{ marginBottom: '1rem' }}>Submitted Files</h3>
                      <div className="file-item" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem', background: 'var(--color-bg-primary)', borderRadius: '10px' }}>
                        <FiFileText />
                        <span>final_project_v1.zip</span>
                        <FiDownload style={{ marginLeft: 'auto', cursor: 'pointer' }} />
                      </div>
                    </div>

                    <div className="rubric-picker">
                      <h3 style={{ marginBottom: '1rem' }}>Grading Rubric</h3>
                      {[
                        { label: 'Technical Accuracy', weight: '40%' },
                        { label: 'Implementation Quality', weight: '30%' },
                        { label: 'Documentation', weight: '20%' },
                        { label: 'UI/UX Design', weight: '10%' }
                      ].map((item, idx) => (
                        <div key={idx} className={`rubric-item ${gradingData.rubricRating === idx ? 'selected' : ''}`} onClick={() => setGradingData({ ...gradingData, rubricRating: idx })}>
                          <span>{item.label}</span>
                          <strong>{item.weight}</strong>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="evaluation-right">
                    <form onSubmit={submitEvaluation} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                      <div className="form-group">
                        <label>Current Marks (out of 100)</label>
                        <input
                          type="number"
                          placeholder="85"
                          value={gradingData.score}
                          onChange={(e) => setGradingData({ ...gradingData, score: e.target.value })}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Constructive Feedback</label>
                        <textarea
                          rows="8"
                          placeholder="Your comments help the student grow..."
                          value={gradingData.comments}
                          onChange={(e) => setGradingData({ ...gradingData, comments: e.target.value })}
                          required
                        ></textarea>
                      </div>
                      <div className="form-group">
                        <label>Attach Feedback Files (Optional)</label>
                        <div className="file-upload-zone" style={{ padding: '1rem' }}>
                          <FiPaperclip /> Click to attach
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                        <button type="submit" className="btn btn-success" style={{ flex: 1 }}>Submit Evaluation <FiSend /></button>
                      </div>
                    </form>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default InstructorDashboard;
