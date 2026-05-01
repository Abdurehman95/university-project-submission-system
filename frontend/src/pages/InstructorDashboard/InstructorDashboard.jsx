import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiGrid, FiBook, FiPlus, FiUsers, FiFileText,
  FiClock, FiDownload, FiCheck, FiX, FiPaperclip,
  FiTrendingUp, FiLogOut, FiSend, FiStar, FiFilter, FiBell
} from 'react-icons/fi';
import './InstructorDashboard.css';

const InstructorDashboard = () => {
  const [activeSection, setActiveSection] = useState('Project');
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
      case 'Project':
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="assignments-view">
            <div className="creation-panel glass-card">
              <h2>Project Creation Center</h2>
              <p>Define new project templates and global requirements.</p>

              <form className="form-grid">
                <div className="form-group form-full">
                  <label>Project Title</label>
                  <input type="text" placeholder="e.g. Distributed Systems Implementation" />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <select>
                    <option>Capstone Project</option>
                    <option>Research Paper</option>
                    <option>Lab Series</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Default Deadline</label>
                  <input type="datetime-local" />
                </div>
                <div className="form-group form-full">
                  <label>Project Scope & Objectives</label>
                  <textarea rows="4" placeholder="Outline the learning objectives..."></textarea>
                </div>
                <div className="form-actions" style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                  <button type="button" className="btn btn-outline">Save Template</button>
                  <button type="submit" className="btn btn-success">Initialize Project</button>
                </div>
              </form>
            </div>
          </motion.div>
        );

      case 'Assignment':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="courses-view">
            <div className="section-header-row">
              <h2>Active Assignments</h2>
              <button className="btn btn-success"><FiPlus /> New Assignment</button>
            </div>
            <div className="courses-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
              {courses.map(course => (
                <div key={course.id} className="glass-card course-card kpi-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <span className="badge-code">{course.code}</span>
                    <span className="status-badge status-active">Active</span>
                  </div>
                  <h3>{course.name}</h3>
                  <div className="progress-container">
                    <div className="progress-bar" style={{ width: '65%', background: 'var(--color-accent-primary)' }}></div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', alignItems: 'center', fontSize: '0.85rem' }}>
                    <span>65% Submissions</span>
                    <button className="text-link">Edit</button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        );

      case 'Student progress':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="submissions-view">
            <div className="section-header-row">
              <h2>Student & Group Progress Tracking</h2>
            </div>
            <div className="glass-card" style={{ padding: '2rem' }}>
              {[
                { name: 'Group Alpha', leader: 'John Doe', progress: 85, status: 'On Track' },
                { name: 'Group Beta', leader: 'Jane Smith', progress: 40, status: 'Behind' },
                { name: 'Group Gamma', leader: 'Alice Johnson', progress: 100, status: 'Completed' }
              ].map((group, idx) => (
                <div key={idx} style={{ marginBottom: '2rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <strong>{group.name}</strong>
                    <span className={`status-badge ${group.status === 'On Track' ? 'status-active' : group.status === 'Behind' ? 'status-overdue' : 'status-completed'}`}>{group.status}</span>
                  </div>
                  <div className="progress-container">
                    <div className="progress-bar" style={{ width: `${group.progress}%`, background: group.status === 'Behind' ? '#ef4444' : 'var(--color-success)' }}></div>
                  </div>
                  <span style={{ fontSize: '0.85rem', opacity: 0.6 }}>Leader: {group.leader} • {group.progress}% Completion</span>
                </div>
              ))}
            </div>
          </motion.div>
        );

      case 'Submission':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="submissions-view">
            <div className="section-header-row">
              <h2>Submission Review Panel</h2>
            </div>
            <div className="glass-card data-table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Assignment</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.map(sub => (
                    <tr key={sub.id}>
                      <td>{sub.student}</td>
                      <td>{sub.assignment}</td>
                      <td><span className="status-badge status-pending">{sub.status}</span></td>
                      <td>
                        <button className="btn btn-outline btn-sm" onClick={() => handleOpenEvaluation(sub)}>Review</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        );

      case 'Revision':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="tab-content">
            <div className="glass-panel" style={{ padding: '2rem' }}>
              <h2>Active Revision Requests</h2>
              <div style={{ marginTop: '2rem' }}>
                <div className="glass-panel" style={{ padding: '1.5rem', borderLeft: '4px solid #f59e0b' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h4>Refactoring Request: John Doe</h4>
                    <span className="status-badge status-pending">Awaiting Action</span>
                  </div>
                  <p style={{ fontSize: '0.9rem', marginTop: '1rem' }}>Requested additional feedback on database normalization.</p>
                  <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
                    <button className="btn btn-success btn-sm">Accept & Re-open</button>
                    <button className="btn btn-outline btn-sm">Clarify</button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 'Grading':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="tab-content">
            <div className="glass-panel" style={{ padding: '2rem' }}>
              <h2>Grading & Rubric Tools</h2>
              <div className="courses-grid" style={{ marginTop: '2rem' }}>
                <div className="glass-panel kpi-card" style={{ padding: '1.5rem' }}>
                  <FiStar size={24} color="var(--color-accent-primary)" />
                  <h3 style={{ marginTop: '1rem' }}>Standard Rubric v2</h3>
                  <p style={{ fontSize: '0.85rem', opacity: 0.6 }}>Used in 12 courses</p>
                  <button className="text-link" style={{ marginTop: '1.5rem' }}>Edit Rubric</button>
                </div>
                <div className="glass-panel kpi-card" style={{ padding: '1.5rem' }}>
                  <FiPlus size={24} color="var(--color-success)" />
                  <h3 style={{ marginTop: '1rem' }}>Create New Rubric</h3>
                  <p style={{ fontSize: '0.85rem', opacity: 0.6 }}>Custom criteria sets</p>
                  <button className="text-link" style={{ marginTop: '1.5rem' }}>Initialize</button>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 'Communication':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="tab-content">
            <div className="glass-panel" style={{ padding: '2rem' }}>
              <h2>Communication Center</h2>
              <div className="activity-list" style={{ marginTop: '2rem' }}>
                <div className="activity-item glass-panel" style={{ padding: '1rem', marginBottom: '1rem' }}>
                  <FiSend />
                  <p><strong>Message to CS302:</strong> Reminder about tonight's deadline.</p>
                  <span>Just now</span>
                </div>
                <button className="btn btn-primary" style={{ width: '100%' }}>Send New Broadcast</button>
              </div>
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
          <div className={`nav-link ${activeSection === 'Project' ? 'active' : ''}`} onClick={() => setActiveSection('Project')}>
            <FiPlus /> <span className="nav-label">Project</span>
          </div>
          <div className={`nav-link ${activeSection === 'Assignment' ? 'active' : ''}`} onClick={() => setActiveSection('Assignment')}>
            <FiBook /> <span className="nav-label">Assignment</span>
          </div>
          <div className={`nav-link ${activeSection === 'Student progress' ? 'active' : ''}`} onClick={() => setActiveSection('Student progress')}>
            <FiTrendingUp /> <span className="nav-label">Student progress</span>
          </div>
          <div className={`nav-link ${activeSection === 'Submission' ? 'active' : ''}`} onClick={() => setActiveSection('Submission')}>
            <FiFileText /> <span className="nav-label">Submission</span>
          </div>
          <div className={`nav-link ${activeSection === 'Revision' ? 'active' : ''}`} onClick={() => setActiveSection('Revision')}>
            <FiClock /> <span className="nav-label">Revision</span>
          </div>
          <div className={`nav-link ${activeSection === 'Grading' ? 'active' : ''}`} onClick={() => setActiveSection('Grading')}>
            <FiStar /> <span className="nav-label">Grading</span>
          </div>
          <div className={`nav-link ${activeSection === 'Communication' ? 'active' : ''}`} onClick={() => setActiveSection('Communication')}>
            <FiSend /> <span className="nav-label">Communication</span>
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
