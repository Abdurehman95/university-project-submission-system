import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiGrid, FiUsers, FiBook, FiUserPlus, FiFileText,
  FiBarChart2, FiSettings, FiActivity, FiUser,
  FiPlus, FiSearch, FiFilter, FiDownload, FiEdit2,
  FiTrash2, FiToggleLeft, FiKey, FiMoreVertical,
  FiBell, FiCalendar, FiBriefcase
} from 'react-icons/fi';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock Data
  const stats = [
    { title: 'Total Users', value: '1,284', icon: <FiUsers />, color: '#6366f1', trend: '+12%' },
    { title: 'Active Courses', value: '42', icon: <FiBook />, color: '#ec4899', trend: '+5%' },
    { title: 'Enrollments', value: '3,150', icon: <FiUserPlus />, color: '#f59e0b', trend: '+18%' },
    { title: 'Submissions', value: '12,402', icon: <FiFileText />, color: '#10b981', trend: '+24%' },
  ];

  const menuItems = [
    { name: 'Overview', icon: <FiGrid /> },
    { name: 'User Management', icon: <FiUsers /> },
    { name: 'Courses', icon: <FiBook /> },
    { name: 'Enrollments', icon: <FiUserPlus /> },
    { name: 'Submissions', icon: <FiFileText /> },
    { name: 'Reports', icon: <FiBarChart2 /> },
    { name: 'Settings', icon: <FiSettings /> },
    { name: 'Activity Logs', icon: <FiActivity /> },
    { name: 'Profile', icon: <FiUser /> },
  ];

  const users = [
    { id: 1, name: 'Dr. Sarah Wilson', email: 's.wilson@univ.edu', role: 'Instructor', status: 'Active', joined: 'Jan 12, 2023' },
    { id: 2, name: 'James Thompson', email: 'j.thompson@student.edu', role: 'Student', status: 'Active', joined: 'Feb 05, 2023' },
    { id: 3, name: 'Emily Davis', email: 'e.davis@univ.edu', role: 'Instructor', status: 'Disabled', joined: 'Mar 20, 2023' },
    { id: 4, name: 'Michael Chen', email: 'm.chen@student.edu', role: 'Student', status: 'Active', joined: 'Apr 11, 2023' },
  ];

  const courses = [
    { id: 1, code: 'CS101', name: 'Intro to Computer Science', instructor: 'Dr. Sarah Wilson', students: 120, status: 'Active' },
    { id: 2, code: 'CS202', name: 'Data Structures', instructor: 'Prof. Robert Miller', students: 85, status: 'Active' },
    { id: 3, code: 'MD301', name: 'UI/UX Design', instructor: 'Jane Smith', students: 45, status: 'Archived' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'Overview':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="tab-content"
          >
            <div className="stats-grid">
              {stats.map((stat, i) => (
                <div key={i} className="stat-card glass-panel">
                  <div className="stat-header">
                    <div className="stat-icon" style={{ color: stat.color, backgroundColor: `${stat.color}15` }}>
                      {stat.icon}
                    </div>
                    <span className="stat-trend">{stat.trend}</span>
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
                <section className="glass-panel content-section">
                  <div className="section-header">
                    <h2>Recent User Activity</h2>
                    <button className="text-btn">View All</button>
                  </div>
                  <div className="activity-list">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="activity-item">
                        <div className="activity-marker"></div>
                        <div className="activity-info">
                          <p><strong>New Instructor Registered:</strong> Dr. Alan Turing (CS Dept)</p>
                          <span>2 hours ago</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
              <div className="overview-side">
                <section className="glass-panel content-section">
                  <div className="section-header">
                    <h2>System Status</h2>
                  </div>
                  <div className="status-indicators">
                    <div className="status-item">
                      <span>Server Load</span>
                      <div className="progress-bar-sm"><div className="progress" style={{ width: '24%' }}></div></div>
                    </div>
                    <div className="status-item">
                      <span>Storage Use</span>
                      <div className="progress-bar-sm"><div className="progress" style={{ width: '68%' }}></div></div>
                    </div>
                    <div className="status-item">
                      <span>API Latency</span>
                      <div className="progress-bar-sm"><div className="progress" style={{ width: '12%', backgroundColor: '#10b981' }}></div></div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </motion.div>
        );

      case 'User Management':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="tab-content"
          >
            <div className="content-toolbar">
              <div className="search-box">
                <FiSearch />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="toolbar-actions">
                <button className="btn btn-secondary"><FiFilter /> Filter</button>
                <button className="btn btn-primary"><FiPlus /> Add User</button>
              </div>
            </div>

            <div className="glass-panel table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Joined</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id}>
                      <td>
                        <div className="user-info-cell">
                          <div className="user-initials">{user.name.split(' ').map(n => n[0]).join('')}</div>
                          <div>
                            <div className="user-name">{user.name}</div>
                            <div className="user-email">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td><span className={`role-badge ${user.role.toLowerCase()}`}>{user.role}</span></td>
                      <td><span className={`status-dot ${user.status.toLowerCase()}`}></span> {user.status}</td>
                      <td>{user.joined}</td>
                      <td>
                        <div className="action-group">
                          <button className="icon-btn"><FiEdit2 /></button>
                          <button className="icon-btn"><FiKey /></button>
                          <button className="icon-btn"><FiToggleLeft /></button>
                          <button className="icon-btn delete"><FiTrash2 /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        );

      case 'Courses':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="tab-content"
          >
            <div className="content-toolbar">
              <div className="search-box">
                <FiSearch />
                <input type="text" placeholder="Search courses..." />
              </div>
              <button className="btn btn-primary"><FiPlus /> Create Course</button>
            </div>

            <div className="courses-grid">
              {courses.map(course => (
                <div key={course.id} className="course-admin-card glass-panel">
                  <div className="course-card-header">
                    <span className="course-code">{course.code}</span>
                    <span className={`status-pill ${course.status.toLowerCase()}`}>{course.status}</span>
                  </div>
                  <h3>{course.name}</h3>
                  <div className="course-meta">
                    <p><FiUser /> {course.instructor}</p>
                    <p><FiUsers /> {course.students} Students</p>
                  </div>
                  <div className="course-card-footer">
                    <button className="btn btn-sm btn-outline">Manage</button>
                    <button className="icon-btn"><FiMoreVertical /></button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        );

      default:
        return (
          <div className="empty-state glass-panel">
            <FiBriefcase size={48} />
            <h3>{activeTab} Module</h3>
            <p>This module is currently being updated to the new administrative interface.</p>
          </div>
        );
    }
  };

  return (
    <div className="admin-dashboard container">
      <aside className="admin-sidebar glass-panel">
        <div className="sidebar-brand">
          <div className="brand-logo">A</div>
          <span>Admin Panel</span>
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
            <div className="admin-avatar">AS</div>
            <div className="admin-info">
              <p>Admin User</p>
              <span>Super Admin</span>
            </div>
          </div>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <div className="header-left">
            <h1>{activeTab}</h1>
            <p className="breadcrumb">Dashboard / {activeTab}</p>
          </div>
          <div className="header-right">
            <button className="icon-btn-header"><FiBell /><span className="notif-badge">3</span></button>
            <div className="header-date">
              <FiCalendar />
              <span>Oct 24, 2023</span>
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
