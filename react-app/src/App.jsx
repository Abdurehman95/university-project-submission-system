import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <div className="bg-image-wrapper">
          <img src="/image.jpg" alt="University campus background" className="bg-image" />
        </div>
        <Navbar />
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
            <Route path="/dashboard/student" element={<StudentDashboard />} />
            <Route path="/dashboard/admin" element={<AdminDashboard />} />
            <Route path="/dashboard/instructor" element={<InstructorDashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
