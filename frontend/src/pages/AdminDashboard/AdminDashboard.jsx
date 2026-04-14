import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiGrid, FiUsers, FiBook, FiUserPlus, FiFileText,
  FiBarChart2, FiSettings, FiActivity, FiUser,
  FiPlus, FiSearch, FiFilter, FiDownload, FiEdit2,
  FiTrash2, FiToggleLeft, FiKey, FiMoreVertical,
  FiBell, FiCalendar, FiShield, FiDatabase, FiAlertTriangle, FiLogOut
} from 'react-icons/fi';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Mock Data
  const stats = [
    { title: 'Total Users', value: '1,284', icon: <FiUsers />, color: '#6366f1', trend: '+12%' },
    { title: 'Active Courses', value: '42', icon: <FiBook />, color: '#ec4899', trend: '+5%' },
    { title: 'System Uptime', value: '99.9%', icon: <FiActivity />, color: '#10b981', trend: 'Stable' },
    { title: 'Database Size', value: '4.2 GB', icon: <FiDatabase />, color: '#f59e0b', trend: '+0.8%' },
  ];

  const menuItems = [
    { name: 'Overview', icon: <FiGrid /> },
    { name: 'User Management', icon: <FiUsers /> },
    { name: 'Courses & Depts', icon: <FiBook /> },
    { name: 'System Logs', icon: <FiActivity /> },
    { name: 'Access Control', icon: <FiShield /> },
    { name: 'Settings', icon: <FiSettings /> },
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

  const renderContent = () => {
    switch (activeTab) {
      case 'Overview':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="tab-content">
            <div className="stats-grid">
              {stats.map((stat, i) => (
                <div key={i} className="stat-card glass-panel">
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

            <div className="overview-layout" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
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
                    <button className="btn btn-primary" style={{ width: '100%' }}><FiUserPlus /> New User Enrollment</button>
                    <button className="btn btn-outline" style={{ width: '100%' }}><FiDatabase /> Backup Database</button>
                    <button className="btn btn-outline" style={{ width: '100%', color: '#ef4444' }}><FiAlertTriangle /> System Lockdown</button>
                  </div>
                </section>
              </div>
            </div>
          </motion.div>
        );

      case 'User Management':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="tab-content">
            <div className="content-toolbar" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
              <div className="search-box" style={{ background: 'var(--color-bg-secondary)', padding: '0.75rem 1.5rem', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '1rem', width: '400px', border: '1px solid var(--color-glass-border)' }}>
                <FiSearch />
                <input type="text" placeholder="Search by name, email or role..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%' }} />
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button className="btn btn-outline"><FiFilter /> Filters</button>
                <button className="btn btn-primary"><FiPlus /> Add New User</button>
              </div>
            </div>

            <div className="glass-panel" style={{ overflow: 'hidden', borderRadius: '20px' }}>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>User Identification</th>
                    <th>System Role</th>
                    <th>Account Status</th>
                    <th>Last Active</th>
                    <th>Permissions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
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
                      <td><span className={`role-badge ${user.role.toLowerCase()}`}>{user.role}</span></td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <span className={`status-dot ${user.status.toLowerCase()}`}></span>
                          {user.status}
                        </div>
                      </td>
                      <td style={{ fontSize: '0.9rem', opacity: 0.7 }}>Jan 12, 2023</td>
                      <td>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button className="btn-icon"><FiEdit2 /></button>
                          <button className="btn-icon"><FiKey /></button>
                          <button className="btn-icon" style={{ color: '#ef4444' }}><FiTrash2 /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        );

      case 'Courses & Depts':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="tab-content">
            <div className="content-toolbar" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
              <h2>Departmental Oversight</h2>
              <button className="btn btn-primary"><FiPlus /> Create Department</button>
            </div>
            <div className="courses-grid">
              {[
                { name: 'Computer Science', head: 'Dr. Alan Mathison', courses: 24, faculty: 15 },
                { name: 'Electrical Engineering', head: 'Prof. Nikola Tesla', courses: 18, faculty: 12 },
                { name: 'Mathematics', head: 'Dr. Katherine Johnson', courses: 12, faculty: 8 }
              ].map((dept, i) => (
                <div key={i} className="glass-panel" style={{ padding: '2rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                    <FiBook size={32} color="var(--color-accent-primary)" />
                    <FiMoreVertical cursor="pointer" />
                  </div>
                  <h3>{dept.name}</h3>
                  <p style={{ margin: '1rem 0', color: 'var(--color-text-secondary)' }}>Department Head: {dept.head}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '1.5rem', borderTop: '1px solid var(--color-glass-border)' }}>
                    <span>{dept.courses} Courses</span>
                    <span>{dept.faculty} Faculty</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        );

      default:
        return (
          <div className="glass-panel" style={{ padding: '4rem', textAlign: 'center' }}>
            <h2>Module Under Development</h2>
            <p style={{ marginTop: '1rem', opacity: 0.6 }}>The {activeTab} section is being integrated with high-security audit trails.</p>
          </div>
        );
    }
  };

  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <div className="sidebar-brand">
          <div className="brand-logo">A</div>
          <span className="text-gradient" style={{ fontWeight: 800, fontSize: '1.25rem' }}>Admin Control</span>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <button
              key={item.name}
              className={`nav-item ${activeTab === item.name ? 'active' : ''}`}
              onClick={() => setActiveTab(item.name)}
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
              <p style={{ fontWeight: 600, fontSize: '0.9rem' }}>Admin Controller</p>
              <span style={{ fontSize: '0.75rem', opacity: 0.6 }}>Sysadmin Root</span>
            </div>
          </div>
          <button className="nav-item" style={{ marginTop: '1rem', color: '#ef4444' }}>
            <FiLogOut /> <span className="nav-label">Exit System</span>
          </button>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <div className="header-left">
            <h1>{activeTab}</h1>
            <p className="breadcrumb">System Controller / {activeTab}</p>
          </div>
          <div className="header-right">
            <button className="icon-btn-header"><FiBell /><span className="notif-badge">3</span></button>
            <div className="header-date" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem', background: 'var(--color-bg-secondary)', borderRadius: '12px', border: '1px solid var(--color-glass-border)' }}>
              <FiCalendar />
              <span style={{ fontWeight: 600 }}>Oct 24, 2023</span>
            </div>
          </div>
        </header>

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
