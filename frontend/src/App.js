import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './ThemeContext';
import Dashboard from './pages/Dashboard';
import CoursesList from './pages/CoursesList';
import CourseDetail from './pages/CourseDetail';
import Compiler from './pages/Compiler';
import Practice from './pages/Practice';
import LessonView from './pages/LessonView';
import Admin from './pages/Admin';
import Admin from './pages/Admin';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Placements from './pages/Placements';
import Community from './pages/Community';
import FeaturePlaceholder from './pages/FeaturePlaceholder';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/courses" element={<CoursesList />} />
            <Route path="/course/:id" element={<CourseDetail />} />
            <Route path="/course/:courseId/lesson/:topicId" element={<LessonView />} />
            <Route path="/compiler" element={<Compiler />} />
            <Route path="/practice" element={<Practice />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/placements" element={<Placements />} />
            <Route path="/community" element={<Community />} />

            {/* New Routes for Dropdown Menu */}
            <Route path="/resume" element={<FeaturePlaceholder title="Resume Builder" />} />
            <Route path="/mock-interview" element={<FeaturePlaceholder title="Mock Interview" />} />
            <Route path="/leave" element={<FeaturePlaceholder title="Apply for Leave" />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
