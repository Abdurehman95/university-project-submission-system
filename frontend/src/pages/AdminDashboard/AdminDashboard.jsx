import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiGrid,
  FiUsers,
  FiBook,
  FiUserPlus,
  FiFileText,
  FiBarChart2,
  FiSettings,
  FiActivity,
  FiUser,
  FiPlus,
  FiSearch,
  FiFilter,
  FiDownload,
  FiEdit2,
  FiTrash2,
  FiToggleLeft,
  FiKey,
  FiMoreVertical,
  FiBell,
  FiCalendar,
  FiShield,
  FiDatabase,
  FiAlertTriangle,
  FiLogOut,
  FiCheckSquare,
  FiStar,
  FiClock,
  FiMenu,
  FiX
} from 'react-icons/fi';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Mock Data
  const stats = [
    { title: 'Total Users', value: '1,284', icon: <FiUsers />, color: '#6366f1', trend: '+12%' },
    { title: 'Active Courses', value: '42', icon: <FiBook />, color: '#ec4899', trend: '+5%' },
    { title: 'System Uptime', value: '99.9%', icon: <FiActivity />, color: '#10b981', trend: 'Stable' },
    { title: 'Database Size', value: '4.2 GB', icon: <FiDatabase />, color: '#f59e0b', trend: '+0.8%' },
  ];

  const menuItems = [
    { name: 'Overview', icon: <FiGrid /> },
    { name: 'Department', icon: <FiBarChart2 /> },
    { name: 'Supervision', icon: <FiUsers /> },
    { name: 'Deadline', icon: <FiClock /> },
    { name: 'Security logs', icon: <FiShield /> },
    { name: 'Reports', icon: <FiFileText /> },
    { name: 'Notifications', icon: <FiBell /> },
  ];

  const users = [
    { id: 1, name: 'Dr. Sarah Wilson', email: 's.wilson@univ.edu', role: 'Instructor', status: 'Active', joined: 'Jan 12, 2023' },
    { id: 2, name: 'James Thompson', email: 'j.thompson@student.edu', role: 'Student', status: 'Active', joined: 'Feb 05, 2023' },
    { id: 3, name: 'Emily Davis', email: 'e.davis@univ.edu', role: 'Instructor', status: 'Disabled', joined: 'Mar 20, 2023' },
    { id: 4, name: 'Michael Chen', email: 'm.chen@student.edu', role: 'Student', status: 'Active', joined: 'Apr 11, 2023' },
  ];

  const logs = [
    { id: 1, action: 'User Login', user: 'j.thompson@student.edu', time: '2 mins ago', level: 'Info' },
    { id: 2, action: 'Course Created', user: 'Admin System', time: '45 mins ago', level: 'Success' },
    { id: 3, action: 'Permission Change', user: 'Prof. Henderson', time: '2 hours ago', level: 'Warning' },
    { id: 4, action: 'Bulk Export', user: 'Admin User', time: '5 hours ago', level: 'Info' },
  ];

  const recentReports = [
    { id: 1, name: 'Weekly User Engagement Report', date: 'Created 12, 2023', status: 'Completed' },
    { id: 2, name: 'Monthly Enrollment Summary', date: 'Created 11, 2023', status: 'Processing' },
    { id: 3, name: 'Monthly Enrollment Summary', date: 'Created 13, 2023', status: 'Completed' },
    { id: 4, name: 'Weekly Engagement Report', date: 'Created 19, 2023', status: 'Processing' },
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
                    <div className="stat-icon" style={{ color: stat.color, backgroundColor: `${stat.color}15` }}>
                      {stat.icon}
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
                    {logs.map(log => (
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
                    <button className="btn btn-success" style={{ width: '100%' }}><FiUserPlus /> New User Enrollment</button>
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
                <input type="text" placeholder="Search instructors..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%' }} />
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button className="btn btn-outline"><FiFilter /> Filters</button>
                <button className="btn btn-success"><FiPlus /> Add Instructor</button>
              </div>
            </div>

            <div className="glass-panel" style={{ overflow: 'auto', borderRadius: '20px' }}>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Instructor</th>
                    <th>Dept</th>
                    <th>Active Projects</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.filter(u => u.role === 'Instructor').map(user => (
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
                      <td>Engineering</td>
                      <td><span className="status-badge status-completed">5 Projects</span></td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <span className={`status-dot ${user.status.toLowerCase()}`}></span>
                          {user.status}
                        </div>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button className="btn-icon"><FiActivity /></button>
                          <button className="btn-icon" style={{ color: '#ef4444' }}><FiAlertTriangle /></button>
                        </div>
                      </td>
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
              {[
                { name: 'Computer Science', head: 'Dr. Alan Mathison', projects: 85, completion: 92 },
                { name: 'Electrical Engineering', head: 'Prof. Nikola Tesla', projects: 64, completion: 88 },
                { name: 'Mathematics', head: 'Dr. Katherine Johnson', projects: 42, completion: 95 }
              ].map((dept, i) => (
                <div key={i} className="glass-panel kpi-card" style={{ padding: '2rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                    <FiBarChart2 size={32} color="var(--color-accent-primary)" />
                    <FiMoreVertical cursor="pointer" />
                  </div>
                  <h3>{dept.name}</h3>
                  <p style={{ margin: '1rem 0', color: 'var(--color-text-secondary)' }}>Projects: {dept.projects}</p>
                  <div className="progress-container">
                    <div className="progress-bar" style={{ width: `${dept.completion}%`, background: 'var(--color-accent-primary)' }}></div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                    <span>Completion Rate</span>
                    <strong>{dept.completion}%</strong>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        );

      case 'Reports':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="tab-content reports-view">
            <div className="reports-filters glass-panel">
              <div className="filter-group">
                <label>Date Range</label>
                <div className="filter-selects">
                  <select defaultValue="30">
                    <option value="7">Last 7 Days</option>
                    <option value="30">Last 30 Days</option>
                    <option value="90">Last 90 Days</option>
                  </select>
                  <div className="date-picker-mock"><FiCalendar /> Last 30 Days</div>
                </div>
              </div>
              <div className="filter-group">
                <label>Department</label>
                <select defaultValue="all">
                  <option value="all">All Departments</option>
                  <option value="cs">Computer Science</option>
                  <option value="ee">Electrical Engineering</option>
                </select>
              </div>
              <div className="filter-group">
                <label>User Type</label>
                <select defaultValue="all">
                  <option value="all">All Users</option>
                  <option value="student">Students</option>
                  <option value="instructor">Instructors</option>
                </select>
              </div>
            </div>

            <div className="reports-layout">
              <div className="reports-main">
                <div className="reports-stats-row">
                  {[
                    { label: 'Total Enrollments', value: '15,670', trend: '+18%', icon: <FiBook />, color: '#6366f1' },
                    { label: 'Completion Rate', value: '88.5%', trend: '+5%', icon: <FiCheckSquare />, color: '#10b981' },
                    { label: 'Inactive Users', value: '310', trend: '-1%', icon: <FiUser />, color: '#ec4899' },
                    { label: 'Engagement Score', value: '9.1/10', trend: '+0.5%', icon: <FiStar />, color: '#f59e0b' },
                  ].map((stat, i) => (
                    <div key={i} className="glass-panel report-stat-card">
                      <div className="stat-icon-mini" style={{ color: stat.color, background: `${stat.color}15` }}>{stat.icon}</div>
                      <div className="stat-content">
                        <h3>{stat.value} <span className="trend-text">{stat.trend}</span></h3>
                        <p>{stat.label}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="charts-grid">
                  <div className="glass-panel chart-box">
                    <div className="chart-header">
                      <h3>User Growth Trends</h3>
                      <div className="chart-toggles">
                        <span>Daily</span>
                        <span className="active">Weekly</span>
                        <span>Monthly</span>
                      </div>
                    </div>
                    <div className="chart-placeholder line-chart-mock">
                      {/* Simple line chart representation */}
                      <svg width="100%" height="150" viewBox="0 0 400 150">
                        <path d="M0,120 Q50,100 100,110 T200,60 T300,70 T400,30" fill="none" stroke="var(--color-accent-primary)" strokeWidth="3" />
                        <circle cx="200" cy="60" r="5" fill="var(--color-accent-primary)" />
                      </svg>
                    </div>
                  </div>
                  <div className="glass-panel chart-box">
                    <div className="chart-header">
                      <h3>Course Enrollment Statistics</h3>
                      <select className="chart-select"><option>Sort by: All</option></select>
                    </div>
                    <div className="chart-placeholder bar-chart-mock">
                      <div className="bars-container">
                        {[40, 70, 45, 90, 65, 80, 50, 85, 60, 75].map((h, i) => (
                          <div key={i} className="bar" style={{ height: `${h}%`, background: i % 2 === 0 ? 'var(--color-accent-primary)' : '#ff9d5c' }}></div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="glass-panel chart-box">
                    <div className="chart-header">
                      <h3>Department Performance Breakdown</h3>
                    </div>
                    <div className="chart-placeholder donut-container">
                      <div className="donut-wrapper">
                        <div 
                          className="donut-chart-mock"
                          style={{
                            background: `conic-gradient(
                              #ff781f 0% 30%,
                              #6366f1 30% 66%,
                              #10b981 66% 76%,
                              #ec4899 76% 83%,
                              #f59e0b 83% 100%
                            )`
                          }}
                        >
                          <div className="donut-center">
                            {hoveredSegment ? `${hoveredSegment.value}%` : '100%'}
                          </div>
                        </div>
                      </div>
                      <div className="donut-legend">
                        {deptData.map((dept, idx) => (
                          <div 
                            key={idx} 
                            className={`legend-item ${hoveredSegment?.label === dept.label ? 'active' : ''}`}
                            onMouseEnter={() => setHoveredSegment(dept)}
                            onMouseLeave={() => setHoveredSegment(null)}
                          >
                            <span className="dot" style={{ background: dept.color }}></span>
                            <span className="label">{dept.label}</span>
                            <span className="value">({dept.value}%)</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="glass-panel chart-box">
                    <div className="chart-header">
                      <h3>System Activity Reports</h3>
                    </div>
                    <div className="chart-placeholder activity-chart-mock">
                      <div className="activity-legend">
                        <span><i style={{ background: '#f59e0b' }}></i> Login Frequency</span>
                        <span><i style={{ background: '#10b981' }}></i> Active Sessions</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <aside className="reports-sidebar">
                <div className="glass-panel reports-center">
                  <div className="reports-center-header">
                    <h2>Reports Center</h2>
                    <div className="format-icons">
                      <FiFileText title="PDF" />
                      <FiDatabase title="Excel" />
                      <span className="csv-tag">CSV</span>
                    </div>
                  </div>
                  <div className="report-search">
                    <FiSearch />
                    <input type="text" placeholder="Search reports history..." />
                  </div>
                  
                  <div className="recent-reports-list">
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', opacity: 0.6, marginBottom: '1rem' }}>
                      <span>Recent</span>
                      <span>Status</span>
                    </div>
                    {recentReports.map(report => (
                      <div key={report.id} className="report-item-mini">
                        <div className="report-dot"></div>
                        <div className="report-info">
                          <p>{report.name}</p>
                          <span>{report.date}</span>
                        </div>
                        <span className={`report-status-pill ${report.status.toLowerCase()}`}>
                          {report.status}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="scheduled-reports">
                    <div className="scheduled-header">
                      <h3>Scheduled Automated Reports</h3>
                      <div className="scheduled-actions">
                        <span>Edit</span>
                        <span className="disable">Disable</span>
                      </div>
                    </div>
                    <div className="scheduled-item">
                      <span>Scheduled Automated Reports</span>
                      <div className="scheduled-icons">
                        <FiEdit2 size={14} />
                        <FiTrash2 size={14} />
                      </div>
                    </div>
                  </div>

                  <div className="visual-summary">
                    <h3>Visual Summary</h3>
                    <div className="sparklines-grid">
                      {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className="sparkline-item">
                          <div className="sparkline-mock" style={{ background: i % 2 === 0 ? 'var(--color-accent-soft)' : 'rgba(16, 185, 129, 0.1)' }}></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </aside>
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

      case 'Deadline':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="tab-content">
            <div className="glass-panel" style={{ padding: '2rem' }}>
              <h2>Global Deadline Monitoring</h2>
              <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  { title: 'Midterm Project Submissions', dept: 'Computer Science', rate: 78, color: '#ff781f' },
                  { title: 'Final Thesis Drafts', dept: 'Mathematics', rate: 92, color: '#10b981' },
                  { title: 'Lab Reports Unit 4', dept: 'Engineering', rate: 45, color: '#ef4444' }
                ].map((item, idx) => (
                  <div key={idx} className="glass-panel" style={{ padding: '1.5rem', background: 'rgba(0,0,0,0.02)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <strong>{item.title}</strong>
                      <span className="countdown-timer"><FiClock /> 02d : 14h : 45m</span>
                    </div>
                    <p style={{ fontSize: '0.85rem', opacity: 0.6, marginBottom: '1rem' }}>{item.dept}</p>
                    <div className="progress-container">
                      <div className="progress-bar" style={{ width: `${item.rate}%`, background: item.color }}></div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                      <span>Compliance Rate</span>
                      <strong>{item.rate}%</strong>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        );

      case 'Notifications':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="tab-content">
            <div className="glass-panel" style={{ padding: '2rem' }}>
              <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                <h2>System Notifications</h2>
                <button className="btn btn-success btn-sm">Mark All Read</button>
              </div>
              <div className="notifications-list" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  { title: 'Server Maintenance', msg: 'System will be down for 2 hours on Sunday.', time: '1h ago', type: 'alert' },
                  { title: 'New Instructor Verified', msg: 'Prof. Alan Turing has been added to CS dept.', time: '3h ago', type: 'info' },
                  { title: 'Database Backup Success', msg: 'Weekly automated backup completed successfully.', time: '5h ago', type: 'success' }
                ].map((n, i) => (
                  <div key={i} className="notification-item glass-panel" style={{ padding: '1.25rem', borderLeft: `4px solid ${n.type === 'alert' ? '#ef4444' : n.type === 'success' ? '#10b981' : '#6366f1'}` }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <h4 style={{ fontWeight: 600 }}>{n.title}</h4>
                      <span style={{ fontSize: '0.75rem', opacity: 0.5 }}>{n.time}</span>
                    </div>
                    <p style={{ fontSize: '0.9rem', marginTop: '0.5rem', opacity: 0.8 }}>{n.msg}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        );
    }
  };

  return (
    <div className={`admin-dashboard ${isSidebarOpen ? 'sidebar-open' : ''}`}>
      <div className="sidebar-overlay" onClick={() => setIsSidebarOpen(false)}></div>
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
            <div className="admin-avatar">AD</div>
            <div className="admin-info">
              <p style={{ fontWeight: 600, fontSize: '0.9rem' }}>System Root</p>
              <span style={{ fontSize: '0.75rem', opacity: 0.6 }}>Super Admin</span>
            </div>
          </div>
          <button className="nav-item" style={{ marginTop: '1rem', color: '#ef4444', width: '100%', borderRadius: '15px', justifyContent: 'center' }}>
            <FiLogOut /> <span className="nav-label">Logout</span>
          </button>
        </div>
      </aside>

      <header className="admin-header">
        <div className="header-left">
          <button className="mobile-menu-btn" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            {isSidebarOpen ? <FiX /> : <FiMenu />}
          </button>
          <h1>{activeTab}</h1>
        </div>
        <div className="header-right">
          <button className="btn-upgrade">
            <FiPlus /> Upgrade Plan
          </button>
          <div className="header-user-dropdown">
            <img 
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100" 
              alt="Profile" 
              className="header-avatar"
            />
            <span style={{ fontWeight: 500, fontSize: '0.9rem' }}>muser 56788 <FiGrid size={12} style={{ marginLeft: '4px', opacity: 0.6 }} /></span>
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
    </div>
  );
};

export default AdminDashboard;
