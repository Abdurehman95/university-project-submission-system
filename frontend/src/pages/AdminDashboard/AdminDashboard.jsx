import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiGrid, FiUsers, FiBook, FiUserPlus, FiFileText, FiBarChart2,
  FiSettings, FiActivity, FiUser, FiPlus, FiSearch, FiFilter,
  FiDownload, FiEdit2, FiTrash2, FiToggleLeft, FiKey, FiMoreVertical,
  FiBell, FiCalendar, FiShield, FiDatabase, FiAlertTriangle,
  FiLogOut, FiCheckSquare, FiStar, FiClock, FiX, FiAlertCircle, FiMail,
  FiLock, FiEye, FiEyeOff, FiMenu
} from 'react-icons/fi';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  // States for API data
  const [stats, setStats] = useState([]);
  const [users, setUsers] = useState([]);
  const [logs, setLogs] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', role_id: 2, department_id: null });
  const [reportData, setReportData] = useState(null);
  const [isExporting, setIsExporting] = useState(false);
  const [showModalPassword, setShowModalPassword] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'Overview') {
        const statsRes = await api.get('/admin/stats');
        setStats(statsRes.data.stats || []);
        const logsRes = await api.get('/admin/logs');
        setLogs(logsRes.data || []);
      } else if (activeTab === 'Supervision') {
        const usersRes = await api.get('/admin/users');
        setUsers(usersRes.data || []);
      } else if (activeTab === 'Department') {
        const deptsRes = await api.get('/admin/departments');
        setDepartments(deptsRes.data || []);
      } else if (activeTab === 'Security logs') {
        const logsRes = await api.get('/admin/logs');
        setLogs(logsRes.data || []);
      } else if (activeTab === 'Reports') {
        const reportRes = await api.get('/admin/report-data');
        setReportData(reportRes.data);
      }

      // Always ensure departments are loaded for the Add User modal
      if (departments.length === 0) {
        const deptsRes = await api.get('/admin/departments');
        setDepartments(deptsRes.data || []);
      }
    } catch (err) {
      console.error('Failed to fetch data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...newUser,
        role_id: parseInt(newUser.role_id),
        department_id: newUser.department_id ? parseInt(newUser.department_id) : null
      };
      
      await api.post('/admin/users', payload);
      setIsAddUserModalOpen(false);
      setNewUser({ name: '', email: '', password: '', role_id: 2, department_id: null });
      fetchData();
      setAlert({ show: true, message: 'User created successfully', type: 'success' });
      setTimeout(() => setAlert({ show: false, message: '', type: '' }), 5000);
    } catch (err) {
      console.error(err);
      const message = err.response?.data?.message || 'Failed to create user';
      setAlert({ show: true, message: message, type: 'error' });
      setTimeout(() => setAlert({ show: false, message: '', type: '' }), 5000);
    } finally {
      setLoading(false);
    }
  };

  const menuItems = [
    { name: 'Overview', icon: <FiGrid /> },
    { name: 'Department', icon: <FiBarChart2 /> },
    { name: 'Supervision', icon: <FiUsers /> },
    { name: 'Deadline', icon: <FiClock /> },
    { name: 'Security logs', icon: <FiShield /> },
    { name: 'Reports', icon: <FiFileText /> },
    { name: 'Notifications', icon: <FiBell /> },
  ];

  const recentReports = [
    { id: 1, name: 'Weekly User Engagement Report', date: 'Created 12, 2023', status: 'Completed' },
    { id: 2, name: 'Monthly Enrollment Summary', date: 'Created 11, 2023', status: 'Processing' },
    { id: 3, name: 'Monthly Enrollment Summary', date: 'Created 13, 2023', status: 'Completed' },
  ];

  const [hoveredSegment, setHoveredSegment] = useState(null);
  const deptData = [
    { label: 'Engineering', value: 30, color: '#ff781f' },
    { label: 'Arts', value: 36, color: '#6366f1' },
    { label: 'Sciences', value: 10, color: '#10b981' },
    { label: 'Department', value: 7, color: '#ec4899' },
    { label: 'Others', value: 17, color: '#f59e0b' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'Overview':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="tab-content">
            <div className="stats-grid">
              {stats.map((stat, i) => (
                <div key={i} className="stat-card glass-panel kpi-card">
                  <div className="stat-header">
                    <div className="stat-icon" style={{ color: '#6366f1', backgroundColor: `#6366f115` }}>
                      <FiActivity />
                    </div>
                    <span className="stat-trend" style={{ color: stat.trend === 'Stable' ? '#64748b' : '#10b981' }}>{stat.trend}</span>
                  </div>
                  <div className="stat-body">
                    <h3>{stat.value}</h3>
                    <p>{stat.title}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="overview-layout">
              <div className="overview-main">
                <section className="glass-panel content-section" style={{ padding: '2rem' }}>
                  <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                    <h2>Recent System Events</h2>
                    <button className="btn btn-outline btn-sm">View Full Log</button>
                  </div>
                  <div className="log-list">
                    {logs.slice(0, 5).map(log => (
                      <div key={log.id} className="activity-item" style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 0', borderBottom: '1px solid var(--color-glass-border)' }}>
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: log.level === 'Warning' ? '#f59e0b' : '#10b981' }}></span>
                          <div>
                            <p style={{ fontWeight: 600 }}>{log.action}</p>
                            <span style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>By {log.user}</span>
                          </div>
                        </div>
                        <span style={{ fontSize: '0.85rem', opacity: 0.6 }}>{log.time}</span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
              <div className="overview-side">
                <section className="glass-panel content-section" style={{ padding: '2rem' }}>
                  <h2>Quick Actions</h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
                    <button className="btn btn-success" style={{ width: '100%' }} onClick={() => setIsAddUserModalOpen(true)}><FiUserPlus /> New User Enrollment</button>
                    <button className="btn btn-outline" style={{ width: '100%' }}><FiDatabase /> Backup Database</button>
                    <button className="btn btn-outline" style={{ width: '100%', color: '#ef4444' }}><FiAlertTriangle /> System Lockdown</button>
                  </div>
                </section>
              </div>
            </div>
          </motion.div>
        );

      case 'Supervision':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="tab-content">
            <div className="content-toolbar" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
              <div className="search-box glass-panel" style={{ padding: '0.75rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', width: '400px' }}>
                <FiSearch />
                <input type="text" placeholder="Search users..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%' }} />
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button className="btn btn-outline"><FiFilter /> Filters</button>
                <button className="btn btn-success" onClick={() => setIsAddUserModalOpen(true)}><FiPlus /> Add User</button>
              </div>
            </div>

            <div className="glass-panel" style={{ overflow: 'auto', borderRadius: '20px' }}>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Role</th>
                    <th>Department</th>
                    <th>Status</th>
                    <th>Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {users.filter(u => u.name.toLowerCase().includes(searchQuery.toLowerCase())).map(user => (
                    <tr key={user.id}>
                      <td>
                        <div className="user-info-cell">
                          <div className="user-initials">{user.name.split(' ').map(n => n[0]).join('')}</div>
                          <div>
                            <div style={{ fontWeight: 600 }}>{user.name}</div>
                            <div style={{ fontSize: '0.85rem', opacity: 0.6 }}>{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td>{user.role}</td>
                      <td>{user.department}</td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <span className={`status-dot ${user.status.toLowerCase()}`}></span>
                          {user.status}
                        </div>
                      </td>
                      <td>{user.joined}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        );

      case 'Department':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="tab-content">
            <div className="content-toolbar" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
              <h2>Departmental & Project Insights</h2>
              <button className="btn btn-success"><FiPlus /> Export Dataset</button>
            </div>
            <div className="courses-grid">
              {loading ? (
                <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem' }}>Loading departments...</div>
              ) : (
                departments.map((dept, i) => (
                  <div key={i} className="glass-panel kpi-card" style={{ padding: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                      <FiBarChart2 size={32} color="var(--color-accent-primary)" />
                      <FiMoreVertical cursor="pointer" />
                    </div>
                    <h3>{dept.name}</h3>
                    <p style={{ margin: '1rem 0', color: 'var(--color-text-secondary)' }}>Users: {dept.users_count}</p>
                    <div className="progress-container">
                      <div className="progress-bar" style={{ width: `75%`, background: 'var(--color-accent-primary)' }}></div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        );

      case 'Security logs':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="tab-content">
            <section className="glass-panel content-section" style={{ padding: '2rem' }}>
              <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <h2>System Security Audit Trail</h2>
                <button className="btn btn-outline btn-sm">Export Logs</button>
              </div>
              <div className="log-list">
                {logs.map(log => (
                  <div key={log.id} className="activity-item" style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 0', borderBottom: '1px solid var(--color-glass-border)' }}>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                      <FiShield color={log.level === 'Warning' ? '#f59e0b' : '#10b981'} />
                      <div>
                        <p style={{ fontWeight: 600 }}>{log.action}</p>
                        <span style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>{log.user} • {log.time}</span>
                      </div>
                    </div>
                    <span className={`status-badge ${log.level === 'Warning' ? 'status-pending' : 'status-active'}`}>{log.level}</span>
                  </div>
                ))}
              </div>
            </section>
          </motion.div>
        );
      
      // Default / Placeholder cases for complex reporting screens
      case 'Reports':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="tab-content reports-view">
            <div className="reports-stats-row">
              <div className="glass-panel report-stat-card">
                <div className="stat-icon-mini" style={{ background: '#6366f115', color: '#6366f1' }}><FiUsers /></div>
                <div className="stat-content">
                  <h3>{reportData?.summary?.totalUsers || 0}</h3>
                  <p>Total Users</p>
                </div>
              </div>
              <div className="glass-panel report-stat-card">
                <div className="stat-icon-mini" style={{ background: '#10b98115', color: '#10b981' }}><FiCheckSquare /></div>
                <div className="stat-content">
                  <h3>{reportData?.summary?.totalSubmissions || 0}</h3>
                  <p>Total Submissions</p>
                </div>
              </div>
              <div className="glass-panel report-stat-card">
                <div className="stat-icon-mini" style={{ background: '#f59e0b15', color: '#f59e0b' }}><FiBook /></div>
                <div className="stat-content">
                  <h3>{reportData?.summary?.totalProjects || 0}</h3>
                  <p>Active Projects</p>
                </div>
              </div>
            </div>

            <div className="reports-layout">
              <div className="reports-main">
                <div className="charts-grid">
                  <div className="glass-panel chart-box">
                    <div className="chart-header">
                      <h3>Role Distribution</h3>
                    </div>
                    <div className="donut-container">
                      <div className="donut-wrapper">
                        <div className="donut-chart-mock" style={{ background: `conic-gradient(#ff781f 0% 33%, #6366f1 33% 66%, #10b981 66% 100%)` }}>
                          <div className="donut-center">{reportData?.summary?.totalUsers || 0}</div>
                        </div>
                      </div>
                      <div className="donut-legend">
                        {reportData?.roleDistribution?.map((role, i) => (
                          <div key={i} className="legend-item">
                            <span className="dot" style={{ background: i === 0 ? '#ff781f' : i === 1 ? '#6366f1' : '#10b981' }}></span>
                            <span className="label">{role.name}</span>
                            <span className="value">{role.count}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="glass-panel chart-box">
                    <div className="chart-header">
                      <h3>Department Activity</h3>
                    </div>
                    <div className="bar-chart-mock" style={{ height: '150px', display: 'flex', alignItems: 'flex-end', gap: '10px' }}>
                      {reportData?.departmentDistribution?.map((dept, i) => (
                        <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
                          <div style={{ width: '100%', background: 'var(--color-accent-primary)', height: `${(dept.count / (reportData?.summary?.totalUsers || 1)) * 100}%`, borderRadius: '4px 4px 0 0' }}></div>
                          <span style={{ fontSize: '0.7rem', opacity: 0.6, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%', textAlign: 'center' }}>{dept.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="glass-panel content-section" style={{ padding: '2rem' }}>
                  <h2>Submission Status Breakdown</h2>
                  <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {reportData?.submissionStatus?.map((status, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        <div style={{ width: '100px', fontWeight: 600 }}>{status.status}</div>
                        <div className="progress-container" style={{ flex: 1, height: '12px' }}>
                          <div className="progress-bar" style={{ width: `${(status.count / (reportData?.summary?.totalSubmissions || 1)) * 100}%`, background: status.status === 'Approved' ? '#10b981' : '#ff781f' }}></div>
                        </div>
                        <div style={{ width: '30px', textAlign: 'right' }}>{status.count}</div>
                      </div>
                    ))}
                    {(!reportData?.submissionStatus || reportData.submissionStatus.length === 0) && (
                      <p style={{ opacity: 0.6, textAlign: 'center' }}>No submission data available.</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="reports-sidebar">
                <div className="glass-panel reports-center">
                  <div className="reports-center-header">
                    <h2>Available Reports</h2>
                    <FiDownload cursor="pointer" />
                  </div>
                  <div className="log-list">
                    {recentReports.map(report => (
                      <div key={report.id} className="report-item-mini">
                        <div className="report-dot"></div>
                        <div className="report-info">
                          <p>{report.name}</p>
                          <span>{report.date}</span>
                        </div>
                        <span className={`report-status-pill ${report.status.toLowerCase()}`}>{report.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 'Deadline':
      case 'Notifications':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="tab-content" style={{ padding: '2rem', textAlign: 'center' }}>
            <h2>{activeTab} Module</h2>
            <p style={{ opacity: 0.6 }}>This module relies on complex aggregations and will be available in the next iteration.</p>
          </motion.div>
        );
    }
  };

  const user = JSON.parse(localStorage.getItem('user')) || { name: 'Admin', role: { name: 'Admin' } };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <div className="admin-dashboard">
      {/* Sidebar Overlay for Mobile */}
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

      <aside className={`admin-sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-brand">
          <div className="brand-logo">U</div>
          <span className="text-gradient" style={{ fontWeight: 800, fontSize: '1.25rem' }}>UniSubmit Admin</span>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <button
              key={item.name}
              className={`nav-item ${activeTab === item.name ? 'active' : ''}`}
              onClick={() => {
                setActiveTab(item.name);
                setIsSidebarOpen(false);
              }}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.name}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="admin-profile-mini">
            <div className="admin-avatar">{user.name.split(' ').map(n => n[0]).join('')}</div>
            <div className="admin-info">
              <p style={{ fontWeight: 600, fontSize: '0.9rem' }}>{user.name}</p>
              <span style={{ fontSize: '0.75rem', opacity: 0.6 }}>{user?.role?.name || 'Admin'}</span>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="nav-item" 
            style={{ marginTop: '1rem', color: '#ef4444', width: '100%', borderRadius: '15px', justifyContent: 'center' }}
          >
            <FiLogOut /> <span className="nav-label">Logout</span>
          </button>
        </div>
      </aside>

      <header className="admin-header">
        <div className="header-left">
          <button className="mobile-menu-trigger" onClick={() => setIsSidebarOpen(true)}>
            <FiMenu />
          </button>
          <h1>{activeTab}</h1>
        </div>
        <div className="header-right">
          <AnimatePresence>
            {alert.show && (
              <motion.div 
                className={`custom-alert alert-${alert.type}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                style={{ position: 'absolute', top: '80px', right: '2rem', zIndex: 1100, margin: 0, boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
              >
                {alert.type === 'success' ? <FiCheckSquare /> : <FiAlertCircle />}
                {alert.message}
              </motion.div>
            )}
          </AnimatePresence>
          <button className="btn-upgrade">
            <FiPlus /> Upgrade Plan
          </button>
          <div className="header-user-dropdown">
            <div className="header-avatar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-accent-primary)', color: 'white', fontWeight: 600 }}>
              {user.name.split(' ').map(n => n[0]).join('')}
            </div>
            <span style={{ fontWeight: 500, fontSize: '0.9rem' }}>{user.name}</span>
          </div>
        </div>
      </header>

      <main className="admin-main">
        <div className="admin-content-area">
          <AnimatePresence mode="wait">
            {renderContent()}
          </AnimatePresence>
        </div>
      </main>

      {/* Add User Modal */}
      <AnimatePresence>
        {isAddUserModalOpen && (
          <div className="modal-overlay" onClick={() => setIsAddUserModalOpen(false)}>
            <motion.div
              className="glass-modal"
              onClick={e => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <div className="modal-header-premium">
                <div className="header-content">
                   <h3>New User Enrollment</h3>
                   <p>Create a new institutional profile</p>
                </div>
                <button className="close-btn-circle" onClick={() => setIsAddUserModalOpen(false)}>
                  <FiX />
                </button>
              </div>

              <form onSubmit={handleCreateUser} className="modal-form-premium">
                <div className="form-grid-2">
                  <div className="form-group">
                    <label><FiUser /> Full Name</label>
                    <input 
                      type="text" 
                      className="form-control"
                      placeholder="Enter full name"
                      value={newUser.name} 
                      onChange={e => setNewUser({...newUser, name: e.target.value})} 
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label><FiMail /> Email Address</label>
                    <input 
                      type="email" 
                      className="form-control"
                      placeholder="name@university.edu"
                      value={newUser.email} 
                      onChange={e => setNewUser({...newUser, email: e.target.value})} 
                      required 
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label><FiLock /> Initial Password</label>
                  <div className="password-input-wrapper">
                    <input 
                      type={showModalPassword ? "text" : "password"} 
                      className="form-control"
                      placeholder="Min. 8 characters"
                      value={newUser.password} 
                      onChange={e => setNewUser({...newUser, password: e.target.value})} 
                      required 
                    />
                    <div className="password-toggle-icon" onClick={() => setShowModalPassword(!showModalPassword)}>
                      {showModalPassword ? <FiEyeOff /> : <FiEye />}
                    </div>
                  </div>
                </div>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label><FiShield /> System Role</label>
                    <select 
                      className="form-control"
                      value={newUser.role_id} 
                      onChange={e => setNewUser({...newUser, role_id: e.target.value})}
                    >
                      <option value="2">Instructor</option>
                      <option value="3">Student</option>
                      <option value="1">Admin</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label><FiDatabase /> Department</label>
                    <select 
                      className="form-control"
                      value={newUser.department_id || ''} 
                      onChange={e => setNewUser({...newUser, department_id: e.target.value || null})}
                    >
                      <option value="">None / System</option>
                      {departments.map(dept => (
                        <option key={dept.id} value={dept.id}>{dept.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="modal-footer-premium">
                  <button type="button" className="btn btn-outline" onClick={() => setIsAddUserModalOpen(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                    {loading ? 'Creating...' : 'Register User'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;
