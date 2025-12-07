import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './ThemeContext';
import Dashboard from './pages/Dashboard';
import CoursesList from './pages/CoursesList';
import CourseDetail from './pages/CourseDetail';
import Compiler from './pages/Compiler';
import Practice from './pages/Practice';
import LessonView from './pages/LessonView';
import Admin from './pages/Admin';

import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Placements from './pages/Placements';
import Community from './pages/Community';
import FeaturePlaceholder from './pages/FeaturePlaceholder';
import './App.css';

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<Admin />} />

            {/* Protected Routes */}
            <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/courses" element={<ProtectedRoute><CoursesList /></ProtectedRoute>} />
            <Route path="/course/:id" element={<ProtectedRoute><CourseDetail /></ProtectedRoute>} />
            <Route path="/course/:courseId/lesson/:topicId" element={<ProtectedRoute><LessonView /></ProtectedRoute>} />
            <Route path="/compiler" element={<ProtectedRoute><Compiler /></ProtectedRoute>} />
            <Route path="/practice" element={<ProtectedRoute><Practice /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/placements" element={<ProtectedRoute><Placements /></ProtectedRoute>} />
            <Route path="/community" element={<ProtectedRoute><Community /></ProtectedRoute>} />

            {/* New Routes for Dropdown Menu */}
            <Route path="/resume" element={<ProtectedRoute><FeaturePlaceholder title="Resume Builder" /></ProtectedRoute>} />
            <Route path="/mock-interview" element={<ProtectedRoute><FeaturePlaceholder title="Mock Interview" /></ProtectedRoute>} />
            <Route path="/leave" element={<ProtectedRoute><FeaturePlaceholder title="Apply for Leave" /></ProtectedRoute>} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
