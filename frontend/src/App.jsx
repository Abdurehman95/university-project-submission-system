import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Features from './pages/Features/Features';
import HowItWorks from './pages/HowItWorks/HowItWorks';
import ForStudents from './pages/ForStudents/ForStudents';
import ForInstructors from './pages/ForInstructors/ForInstructors';
import ForAdmins from './pages/ForAdmins/ForAdmins';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Contact from './pages/Contact/Contact';
import StudentDashboard from './pages/StudentDashboard/StudentDashboard';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import InstructorDashboard from './pages/InstructorDashboard/InstructorDashboard';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', background: 'white', color: 'red', height: '100vh' }}>
          <h1>Oops! A technical error occurred.</h1>
          <p>Please share the message below with the developer:</p>
          <pre style={{ background: '#f8f8f8', padding: '1rem', marginTop: '1rem', overflow: 'auto' }}>
            {this.state.error?.toString()}
          </pre>
          <button onClick={() => window.location.reload()} style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}>
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

import ProtectedRoute from './components/layout/ProtectedRoute';
import NotificationListener from './components/layout/NotificationListener';

const AppContent = () => {
  const location = useLocation();
  const hideNavPaths = ['/dashboard/student', '/dashboard/admin', '/dashboard/instructor'];
  const shouldHideNav = hideNavPaths.some(path => location.pathname.startsWith(path));

  return (
    <div className="app-wrapper">
      <NotificationListener />
      <div className="bg-image-wrapper">
        <img src="/image.jpg" alt="University campus background" className="bg-image" />
      </div>
      {!shouldHideNav && <Navbar />}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/features" element={<Features />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/students" element={<ForStudents />} />
          <Route path="/instructors" element={<ForInstructors />} />
          <Route path="/admins" element={<ForAdmins />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact" element={<Contact />} />
          
          <Route 
            path="/dashboard/student" 
            element={
              <ProtectedRoute role="student">
                <StudentDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard/admin" 
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard/instructor" 
            element={
              <ProtectedRoute role="instructor">
                <InstructorDashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </main>
      {!shouldHideNav && <Footer />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <AppContent />
      </ErrorBoundary>
    </Router>
  );
}

export default App;
