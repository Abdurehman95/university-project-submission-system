import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../services/api';
import { 
  FiGrid, FiFileText, FiUsers, FiClock, FiCheckSquare, 
  FiPlus, FiTrendingUp, FiLogOut, FiCalendar, FiBook,
  FiChevronRight, FiEdit3, FiTrash2, FiDownload, FiMessageSquare,
  FiSend, FiBell, FiActivity, FiStar, FiX, FiMenu, FiMaximize2
} from 'react-icons/fi';
import { showToast } from '../../utils/toast';
import ThemeToggle from '../../components/common/ThemeToggle';
import FilePreviewModal from '../../components/common/FilePreviewModal';
import './InstructorDashboard.css';

const InstructorDashboard = () => {
  const [activeSection, setActiveSection] = useState('Overview');
  const [stats, setStats] = useState([
    { label: 'Active Projects', value: '4', icon: <FiActivity />, color: '#6366f1' },
    { label: 'Total Submissions', value: '3', icon: <FiFileText />, color: '#10b981' },
    { label: 'Pending Review', value: '1', icon: <FiClock />, color: '#f59e0b' },
    { label: 'Student Avg', value: '84%', icon: <FiStar />, color: '#ec4899' }
  ]);
  const [courses, setCourses] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [showEvaluationModal, setShowEvaluationModal] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [evaluationData, setEvaluationData] = useState({ score: '', comments: '' });
  const [categories, setCategories] = useState([]);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [newProject, setNewProject] = useState({ title: '', category_id: '', description: '', deadline: '' });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [previewFile, setPreviewFile] = useState({ isOpen: false, url: '', name: '' });

  useEffect(() => {
    fetchData();
  }, [activeSection]);

  const fetchData = async () => {
    try {
      if (activeSection === 'Overview') {
        const statsRes = await api.get('/instructor/stats');
        if (statsRes.data.stats) {
          // Map backend stats to our icons and colors
          const updatedStats = statsRes.data.stats.map((s, i) => {
            const defaults = [
              { icon: <FiActivity />, color: '#6366f1' },
              { icon: <FiFileText />, color: '#10b981' },
              { icon: <FiClock />, color: '#f59e0b' },
              { icon: <FiStar />, color: '#ec4899' }
            ];
            return { ...s, ...defaults[i] };
          });
          setStats(updatedStats);
        }
      } else if (activeSection === 'Assignment') {
        const coursesRes = await api.get('/instructor/projects');
        setCourses(coursesRes.data || []);
      } else if (activeSection === 'Submission') {
        const subsRes = await api.get('/instructor/submissions');
        setSubmissions(subsRes.data || []);
      } else if (activeSection === 'Project') {
        const catRes = await api.get('/project-categories');
        setCategories(catRes.data || []);
      }
    } catch (err) {
      console.error('Failed to fetch instructor data:', err);
    }
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    try {
      await api.post('/instructor/projects', newProject);
      showToast('Project created successfully!', 'success');
      setNewProject({ title: '', category_id: '', description: '', deadline: '' });
      setShowProjectModal(false);
      setActiveSection('Assignment');
    } catch (err) {
      console.error(err);
      showToast('Failed to create project', 'error');
    }
  };

  const handleOpenEvaluation = (sub) => {
    setSelectedSubmission(sub);
    setShowEvaluationModal(true);
  };

  const handleSubmitEvaluation = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/instructor/submissions/${selectedSubmission.id}/evaluate`, evaluationData);
      showToast('Evaluation submitted successfully!', 'success');
      setShowEvaluationModal(false);
      setEvaluationData({ score: '', comments: '' });
      fetchData();
    } catch (err) {
      console.error(err);
      showToast('Failed to submit evaluation', 'error');
    }
  };

  const handleRequestRevision = async () => {
    if (!evaluationData.comments) {
      showToast("Please provide feedback for the revision.", "error");
      return;
    }
    try {
      await api.post(`/instructor/submissions/${selectedSubmission.id}/revision`, { comments: evaluationData.comments });
      showToast('Revision requested successfully!', 'success');
      setShowEvaluationModal(false);
      setEvaluationData({ score: '', comments: '' });
      fetchData();
    } catch (err) {
      console.error(err);
      showToast('Failed to request revision', 'error');
    }
  };

  const user = JSON.parse(localStorage.getItem('user')) || { name: 'Instructor', role: { name: 'Instructor' } };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'Overview':
        return (
          <>
            <motion.div className="stats-row" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              {stats.map((stat, i) => (
                <div key={i} className="glass-card stat-card">
                  <div className="stat-icon" style={{ background: `${stat.color}15`, color: stat.color }}>
                    {stat.icon}
                  </div>
                  <div className="stat-info">
                    <h3>{stat.value}</h3>
                    <p>{stat.label}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            <div className="dashboard-grid">
              <section className="glass-card">
                <div className="section-header">
                  <h2>Upcoming Deadlines</h2>
                  <FiCalendar color="var(--color-accent-primary)" />
                </div>
                <div className="deadline-list">
                  <div className="deadline-item">
                    <div className="deadline-info">
                      <h4>Final Project Submission</h4>
                      <span className="deadline-date">Due: Oct 15, 2023</span>
                    </div>
                    <FiChevronRight opacity={0.3} />
                  </div>
                  <div className="deadline-item">
                    <div className="deadline-info">
                      <h4>Mid-term Deliverables</h4>
                      <span className="deadline-date">Due: Sep 30, 2023</span>
                    </div>
                    <FiChevronRight opacity={0.3} />
                  </div>
                </div>
              </section>

              <section className="glass-card">
                <div className="section-header">
                  <h2>Announcements</h2>
                  <FiBell color="#f59e0b" />
                </div>
                <div className="announcement-list">
                  <div className="announcement-item" style={{borderLeftColor: '#f59e0b'}}>
                    <div className="announcement-info">
                      <h4>Grading Rubrics Updated</h4>
                      <p style={{fontSize: '0.85rem', opacity: 0.7}}>New rubrics have been uploaded for the Final Semester.</p>
                      <span className="announcement-time">2 hours ago</span>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </>
        );

      case 'Project':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="project-management">
             <div className="section-header-row">
              <h2>Project Management</h2>
              <button className="btn btn-success" onClick={() => setShowProjectModal(true)}><FiPlus /> Add Project</button>
            </div>

            {showProjectModal && (
              <div className="modal-overlay">
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="modal-content" style={{ maxWidth: '600px' }}>
                  <div className="modal-header">
                    <div>
                      <h2>Initialize New Project</h2>
                      <p style={{opacity: 0.6, fontSize: '0.9rem'}}>Create a new assignment for your students.</p>
                    </div>
                    <button className="close-btn" onClick={() => setShowProjectModal(false)}><FiX /></button>
                  </div>
                  <form onSubmit={handleCreateProject} className="project-form">
                    <div className="form-group">
                      <label>Project Title</label>
                      <input 
                        type="text" 
                        placeholder="Enter project name..." 
                        value={newProject.title}
                        onChange={e => setNewProject({...newProject, title: e.target.value})}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Category</label>
                      <select 
                        value={newProject.category_id}
                        onChange={e => setNewProject({...newProject, category_id: e.target.value})}
                        required
                      >
                        <option value="">Select Category</option>
                        {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Submission Deadline</label>
                      <input 
                        type="date" 
                        value={newProject.deadline}
                        onChange={e => setNewProject({...newProject, deadline: e.target.value})}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Description & Guidelines</label>
                      <textarea 
                        rows="4" 
                        placeholder="Specify requirements..."
                        value={newProject.description}
                        onChange={e => setNewProject({...newProject, description: e.target.value})}
                        required
                      ></textarea>
                    </div>
                    <div className="modal-actions">
                      <button type="submit" className="btn btn-success" style={{width: '100%'}}>Publish Project</button>
                    </div>
                  </form>
                </motion.div>
              </div>
            )}
            
            <div className="courses-view" style={{marginTop: '2rem'}}>
                <p>Use the "Assignment" tab to view existing projects.</p>
            </div>
          </motion.div>
        );

      case 'Assignment':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="courses-view">
            <div className="section-header-row">
              <h2>Active Assignments</h2>
              <button className="btn btn-success" onClick={() => setActiveSection('Project')}><FiPlus /> New Assignment</button>
            </div>
            <div className="courses-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>
              {courses.map(course => (
                <div key={course.id} className="glass-card course-card kpi-card">
                  <div className="course-icon"><FiBook /></div>
                  <div className="course-info">
                    <span className="course-code" style={{fontSize: '0.75rem', opacity: 0.6}}>{course.category}</span>
                    <h3 style={{fontSize: '1.1rem', margin: '0.25rem 0'}}>{course.name}</h3>
                    <div className="course-footer" style={{marginTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                      <span style={{fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-accent-primary)'}}>{course.deadline}</span>
                      <FiChevronRight />
                    </div>
                  </div>
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
            <div className="glass-card data-table-container" style={{padding: '0'}}>
              <table className="data-table">
                <thead style={{background: 'var(--color-bg-primary)'}}>
                  <tr>
                    <th>Student</th>
                    <th>Assignment</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.map(sub => (
                    <tr key={sub.id}>
                      <td style={{fontWeight: 600}}>{sub.student}</td>
                      <td>{sub.assignment}</td>
                      <td>{sub.date}</td>
                      <td><span className={`status-badge ${sub.status === 'Graded' ? 'status-completed' : 'status-pending'}`}>{sub.status}</span></td>
                      <td>
                        {sub.status !== 'Graded' && (
                          <button className="btn btn-outline btn-sm" onClick={() => handleOpenEvaluation(sub)}>Review</button>
                        )}
                        {sub.status === 'Graded' && (
                          <button className="btn btn-outline btn-sm" disabled>Reviewed</button>
                        )}
                      </td>
                    </tr>
                  ))}
                  {submissions.length === 0 && (
                    <tr>
                      <td colSpan="5" style={{textAlign: 'center', padding: '3rem', opacity: 0.5}}>No submissions found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {showEvaluationModal && (
              <div className="modal-overlay">
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="modal-content" style={{ maxWidth: '700px' }}>
                  <div className="modal-header">
                    <div>
                      <h2 style={{color: 'var(--color-accent-primary)'}}>Evaluate: {selectedSubmission.student}</h2>
                      <p style={{fontSize: '0.9rem', opacity: 0.6}}>{selectedSubmission.assignment}</p>
                    </div>
                    <button className="close-btn" onClick={() => setShowEvaluationModal(false)}><FiX /></button>
                  </div>
                  
                  <div className="evaluation-body" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem', marginTop: '1.5rem' }}>
                    <div className="submitted-files glass-panel" style={{ padding: '1rem', background: 'var(--color-bg-primary)' }}>
                      <h4 style={{marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem'}}><FiFileText /> Submitted Files</h4>
                      <div className="file-item" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem', border: '1px solid #eee', borderRadius: '4px', background: 'white'}}>
                        <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                          <FiFileText color="var(--color-accent-primary)" /> <span>submission_v1.zip</span>
                        </div>
                        <div style={{display: 'flex', gap: '0.5rem'}}>
                           <button 
                             type="button"
                             className="btn-icon" 
                             title="Preview"
                             onClick={() => setPreviewFile({ isOpen: true, url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', name: 'submission_v1.pdf' })}
                             style={{ background: 'var(--color-accent-soft)', color: 'var(--color-accent-primary)', border: 'none', padding: '5px', borderRadius: '4px', cursor: 'pointer' }}
                           >
                             <FiMaximize2 size={16} />
                           </button>
                           <FiDownload style={{cursor: 'pointer'}} />
                        </div>
                      </div>
                    </div>

                    <form onSubmit={handleSubmitEvaluation} className="evaluation-form">
                      <div className="grading-rubric" style={{marginBottom: '1.5rem'}}>
                         <h4 style={{marginBottom: '1rem'}}>Grading Rubric</h4>
                         <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.85rem', opacity: 0.7}}>
                           <p>Technical Accuracy: <strong>40%</strong></p>
                           <p>Implementation Quality: <strong>30%</strong></p>
                           <p>Documentation: <strong>20%</strong></p>
                           <p>UI/UX Design: <strong>10%</strong></p>
                         </div>
                      </div>

                      <div className="form-group">
                        <label>Marks (out of 100)</label>
                        <input 
                          type="number" 
                          placeholder="85"
                          value={evaluationData.score}
                          onChange={e => setEvaluationData({...evaluationData, score: e.target.value})}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Constructive Feedback</label>
                        <textarea 
                          rows="4" 
                          placeholder="Provide detailed feedback..."
                          value={evaluationData.comments}
                          onChange={e => setEvaluationData({...evaluationData, comments: e.target.value})}
                          required
                        ></textarea>
                      </div>
                      <div className="modal-actions" style={{display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1rem'}}>
                        <button type="button" className="btn btn-outline" style={{borderColor: '#f97316', color: '#f97316'}} onClick={handleRequestRevision}>
                           Request Revision
                        </button>
                        <button type="submit" className="btn btn-success">
                          <FiSend /> Submit Evaluation
                        </button>
                      </div>
                    </form>
                  </div>
                </motion.div>
              </div>
            )}
          </motion.div>
        );

      case 'Student progress':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="tab-content">
             <div className="section-header-row">
              <h2>Student Progress Monitoring</h2>
            </div>
            <div className="glass-card" style={{ padding: '3rem', textAlign: 'center', marginTop: '1rem' }}>
              <div style={{width: '64px', height: '64px', background: 'var(--color-accent-soft)', color: 'var(--color-accent-primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem'}}>
                <FiTrendingUp size={32} />
              </div>
              <h3>Live Progress Tracker</h3>
              <p style={{ opacity: 0.6, marginTop: '1rem', maxWidth: '500px', margin: '1rem auto' }}>See which students are actively working on their projects and who needs a nudge.</p>
              <div style={{ marginTop: '2rem', padding: '2rem', border: '1px dashed #ccc', borderRadius: '15px' }}>
                 <p>Monitoring <strong>{submissions.length}</strong> active submission attempts.</p>
              </div>
            </div>
          </motion.div>
        );

      case 'Revision':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="tab-content">
             <div className="section-header-row">
              <h2>Revision Management</h2>
            </div>
            <div className="glass-card" style={{ padding: '2rem', marginTop: '1rem' }}>
              <p style={{ opacity: 0.6, marginBottom: '2rem' }}>Submissions currently awaiting revision from students.</p>
              <div className="revisions-list" style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                {submissions.filter(s => s.status === 'Revision Required').map(s => (
                  <div key={s.id} style={{padding: '1.25rem', background: 'var(--color-bg-primary)', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                      <div style={{width: '40px', height: '40px', background: '#fef3c7', color: '#f59e0b', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <FiClock />
                      </div>
                      <div>
                        <h4 style={{fontWeight: 600}}>{s.student}</h4>
                        <p style={{fontSize: '0.85rem', opacity: 0.6}}>{s.assignment}</p>
                      </div>
                    </div>
                    <span className="status-badge" style={{background: '#fef3c7', color: '#92400e'}}>Awaiting Resubmission</span>
                  </div>
                ))}
                {submissions.filter(s => s.status === 'Revision Required').length === 0 && (
                  <div style={{textAlign: 'center', padding: '2rem', opacity: 0.5}}>No active revision requests.</div>
                )}
              </div>
            </div>
          </motion.div>
        );

      default:
        return <div>Section not found</div>;
    }
  };

  const navItems = [
    { id: 'Overview', label: 'Overview', icon: <FiGrid /> },
    { id: 'Project', label: 'Project', icon: <FiPlus /> },
    { id: 'Assignment', label: 'Assignment', icon: <FiCheckSquare /> },
    { id: 'Student progress', label: 'Student progress', icon: <FiTrendingUp /> },
    { id: 'Submission', label: 'Submission', icon: <FiFileText /> },
    { id: 'Revision', label: 'Revision', icon: <FiClock /> },
  ];

  const handleSidebarLogout = () => {
    handleLogout();
  };

  return (
    <div className="instructor-dashboard-wrapper">
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

      <aside className={`instructor-sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-brand">
          <div className="brand-icon">U</div>
          <span className="text-gradient" style={{fontWeight: 800}}>UniSubmit</span>
        </div>

        <nav className="sidebar-nav">
          {navItems.map(item => (
            <div 
              key={item.id}
              className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => {
                setActiveSection(item.id);
                setIsSidebarOpen(false);
              }}
            >
              {item.icon}
              <span className="nav-label">{item.label}</span>
            </div>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="user-snippet">
             <div className="avatar" style={{background: 'var(--color-accent-primary)', color: 'white', fontWeight: 600}}>
               {user.name.split(' ').map(n => n[0]).join('')}
             </div>
             <div className="user-info">
               <div className="user-name" style={{fontWeight: 600}}>{user.name}</div>
               <p style={{fontSize: '0.75rem', opacity: 0.6}}>{user.role?.name || 'Instructor'}</p>
             </div>
          </div>
          <button className="nav-link logout-link" onClick={handleSidebarLogout} style={{marginTop: '1rem', border: 'none', background: 'transparent', width: '100%', justifyContent: 'flex-start'}}>
            <FiLogOut /> <span className="nav-label">Logout</span>
          </button>
        </div>
      </aside>

      <header className="instructor-header">
        <div className="header-left">
          <button className="mobile-menu-trigger" onClick={() => setIsSidebarOpen(true)}>
            <FiMenu />
          </button>
          <h1 style={{fontSize: '1.25rem', fontWeight: 600}}>{activeSection}</h1>
        </div>
        <div className="header-right">
          <ThemeToggle />
          <button className="btn-upgrade">
            <FiPlus /> Get Pro
          </button>
          <div className="header-user-dropdown" style={{display: 'flex', alignItems: 'center', gap: '0.75rem'}}>
            <div className="header-avatar" style={{background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, border: '2px solid rgba(255,255,255,0.4)'}}>
              {user.name.split(' ').map(n => n[0]).join('')}
            </div>
            <span style={{fontWeight: 500, fontSize: '0.9rem'}}>{user.name.split(' ')[0]}</span>
          </div>
        </div>
      </header>

      <main className="instructor-main">
        {renderSection()}
      </main>

      <FilePreviewModal 
        isOpen={previewFile.isOpen}
        onClose={() => setPreviewFile({ ...previewFile, isOpen: false })}
        fileUrl={previewFile.url}
        fileName={previewFile.name}
      />
    </div>
  );
};

export default InstructorDashboard;
